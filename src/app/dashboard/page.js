"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import StatsChart from "../../components/StatsChart/StatsChart";
import {
  useUserWatchlist,
  updateAnimeProgress,
  deleteAnimeProgress,
} from "@/lib/watchlist";

const MENU_ITEMS = ["All", "Watching", "Completed", "Plan to Watch", "Dropped"];

export default function DashboardPage() {
  const [isDeleting, setIsDeleting] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const { user, authLoading } = useAuth();
  const { watchlistData, loading } = useUserWatchlist(user?.uid);

  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    if (user || authLoading) {
      return;
    } else {
      router.push("/login");
    }
  }, [user, router, authLoading]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filterStatus]);

  const handleDeleteClick = async (animeId) => {
    if (!confirm("Are you sure to remove this anime?")) return;
    setIsDeleting(true);

    try {
      await deleteAnimeProgress(user.uid, animeId);
    } catch (err) {
      throw err;
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEditClick = (item) => {
    setEditingId(item.id);
    setNewStatus(item.status || "Plan to Watch");
  };

  const handleCancelClick = () => {
    setEditingId(null);
    setNewStatus("");
  };

  const filteredWatchlist = watchlistData.filter((item) => {
    if (filterStatus === "All") return true;
    return item.status === filterStatus;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = filteredWatchlist.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredWatchlist.length / itemsPerPage);

  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  if (authLoading) {
    return <div>Loading Dashboard...</div>;
  }

  if (!user) {
    return <div>Please log in.</div>;
  }

  if (loading) {
    return <div>Loading Anime...</div>;
  }

  if (watchlistData.length === 0) {
    return <div>No items found.</div>;
  }

  return (
    <main className=" bg-gray-50 dark:bg-gray-600 p-8">
      <div className="max-w-4xl mx-auto ">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 ">
          <h1 className="text-3xl text-gray-900 dark:text-gray-200">
            Welcome, <span className="font-bold">{user?.displayName}</span>!
          </h1>
          <button
            onClick={() => router.push("/")}
            className="mt-4 md:mt-0 px-4 py-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-800 flex items-center gap-2 transition duration-300"
          >
            <span className="font-semibold">+</span> Add More Anime
          </button>
        </div>

        <StatsChart watchlist={watchlistData} />

        <div className="flex space-x-2 mb-6 overflow-x-auto pb-2 ">
          {MENU_ITEMS.map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                filterStatus === status
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white dark:bg-gray-950 text-gray-600 dark:text-gray-200 hover:bg-gray-100 border border-gray-200 dark:border-gray-900 dark:hover:bg-gray-800"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="rounded-lg overflow-hidden min-h-[300px] flex flex-col justify-between px-2 py-4 md:px-6 md:py-4 ">
          <div>
            {console.log(watchlistData)}
            {currentItems.length === 0 ? (
              <p className="p-8 text-center text-gray-500 dark:text-gray-200">
                {filterStatus === "All"
                  ? "Your list is empty."
                  : `No '${filterStatus}' anime found.`}
              </p>
            ) : (
              <ul className="space-y-4">
                {currentItems.map((item) => (
                  <li
                    key={item.id}
                    className="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300"
                  >
                    <div
                      className="absolute inset-0 opacity-50 dark:opacity-40 transition-transform duration-700 group-hover:scale-105"
                      style={{
                        backgroundImage: `url(${item.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        filter: "blur(4px)",
                      }}
                    />

                    <div className="relative z-10 p-4 flex flex-col sm:flex-row sm:items-center gap-5">
                      <div className="flex-grow min-w-0">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">
                          {item.title}
                        </h3>
                        {/* edith */}
                        {editingId === item.id ? (
                          <div className="mt-2 animate-fadeIn">
                            <div className="relative w-full sm:w-auto">
                              <select
                                value={newStatus}
                                onChange={(e) => setNewStatus(e.target.value)}
                                className="w-full sm:w-auto px-4 py-1.5 pr-8 border border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-100 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none appearance-none font-medium cursor-pointer"
                              >
                                <option value="Plan to Watch">
                                  Plan to Watch
                                </option>
                                <option value="Watching">Watching</option>
                                <option value="Completed">Completed</option>
                                <option value="Dropped">Dropped</option>
                              </select>
                            </div>
                          </div>
                        ) : (
                          <div className="mt-2 flex items-center gap-2">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                                item.status === "Completed"
                                  ? "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800"
                                  : item.status === "Watching"
                                  ? "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800"
                                  : item.status === "Dropped"
                                  ? "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800"
                                  : "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                              }`}
                            >
                              {item.status || "Not Set"}
                            </span>
                          </div>
                        )}
                        <div className="mt-2 flex items-center gap-1.5 text-xs text-black dark:text-white font-medium">
                          {/* (Calendar icon) */}
                          <svg
                            className="w-3.5 h-3.5 opacity-70"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          {/* (Date Text) */}
                          <span>
                            Added{" "}
                            {item.addedAt
                              ? new Date(
                                  item.addedAt.seconds * 1000
                                ).toLocaleDateString()
                              : "Unknown Date"}
                          </span>
                        </div>
                      </div>

                      {/* (Buttons) */}
                      <div className="flex items-center gap-3 justify-end sm:justify-start">
                        {editingId === item.id ? (
                          <>
                            <button
                              onClick={() => {
                                updateAnimeProgress(user.uid, item.id, {
                                  status: newStatus,
                                });
                                setEditingId(null);
                              }}
                              className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white bg-green-600 rounded-lg shadow hover:bg-green-700 hover:shadow-md transition-all active:scale-95"
                            >
                              <svg
                                className="w-3.5 h-3.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              Save
                            </button>
                            <button
                              onClick={handleCancelClick}
                              className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600 transition-all active:scale-95"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleEditClick(item)}
                              className="p-2 text-black dark:text-white hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-colors"
                              title="Edit Status"
                            >
                              {/* (Edit icon) */}
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDeleteClick(item.id)}
                              disabled={isDeleting === item.tracking_id}
                              className="p-2 text-black dark:text-white hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors disabled:opacity-30"
                              title="Delete Entry"
                            >
                              {/* (Delete icon) */}
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* (pagination) */}
          {filteredWatchlist.length > itemsPerPage && (
            <div className="mt-4 px-4 py-3 border-t border-gray-200 dark:border-gray-400 bg-gray-50 flex items-center justify-between dark:bg-gray-600">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700  bg-white  dark:bg-gray-300 dark:hover:bg-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              <span className="text-sm text-gray-700 dark:text-gray-200">
                Page <span className="font-bold">{currentPage}</span> of{" "}
                {totalPages}
              </span>

              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white dark:bg-gray-300 hover:bg-gray-50 dark:hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
