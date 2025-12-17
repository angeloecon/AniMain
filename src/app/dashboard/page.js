"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/authcontext";
import { useRouter } from "next/navigation";
import StatsChart from '../../components/StatsChart/StatsChart';

export default function DashboardPage() {
  const { user, isLoadingAuth } = useAuth();
  const router = useRouter();

  const [watchlist, setWatchlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isDeleting, setIsDeleting] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  const fetchWatchlist = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(
        `/api/watchlist/view?user_id=${user.userId}`
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to fetch");
      setWatchlist(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    // if(isLoading) return; // pag kani naa dili mo initial load ang dashboard
    if (user || isLoadingAuth) {
      fetchWatchlist();
      return;
    } else {
      router.push("/login");
    }
  }, [user, router, isLoadingAuth]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filterStatus]);

  const handleRemove = async (tracking_id) => {
    if (!confirm("Are you sure?")) return;
    setIsDeleting(tracking_id);
    try {
      await fetch("/api/watchlist/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tracking_id }),
      });
      setWatchlist((prev) =>
        prev.filter((item) => item.tracking_id !== tracking_id)
      );
    } catch (err) {
      alert(err.message);
    } finally {
      setIsDeleting(null);
    }
  };

  const handleUpdate = async (tracking_id) => {
    try {
      await fetch("/api/watchlist/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tracking_id, status: newStatus }),
      });
      setWatchlist((prev) =>
        prev.map((item) =>
          item.tracking_id === tracking_id
            ? { ...item, status: newStatus }
            : item
        )
      );
      setEditingId(null);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEditClick = (item) => {
    setEditingId(item.tracking_id);
    setNewStatus(item.status || "Plan to Watch");
  };
  const handleCancelClick = () => {
    setEditingId(null);
    setNewStatus("");
  };

  const filteredWatchlist = watchlist.filter((item) => {
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

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  if (isLoading)
    return <div className="text-center p-10">Loading Dashboard...</div>;

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-600 p-8">
      <div className="max-w-4xl mx-auto ">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 ">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-200">
            Welcome, {user?.userEmail}!
          </h1>
          <button
            onClick={() => router.push("/")}
            className="mt-4 md:mt-0 px-6 py-2 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 flex items-center gap-2"
          >
            <span>+</span> Add More Anime
          </button>
        </div>

        <StatsChart watchlist={watchlist} />

        <div className="flex space-x-2 mb-6 overflow-x-auto pb-2 ">
          {["All", "Watching", "Completed", "Plan to Watch", "Dropped"].map(
            (status) => (
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
            )
          )}
        </div>

        <div className="bg-white dark:bg-gray-950 rounded-lg shadow-md overflow-hidden min-h-[300px] flex flex-col justify-between">
          <div>
            {currentItems.length === 0 ? (
              <p className="p-8 text-center text-gray-500 dark:text-gray-200">
                {filterStatus === "All"
                  ? "Your list is empty."
                  : `No '${filterStatus}' anime found.`}
              </p>
            ) : (
              <ul className="divide-y divide-gray-200 dark:divide-gray-500 ">
                {currentItems.map((item) => (
                  <li
                    key={item.tracking_id}
                    className="p-4 flex flex-col sm:flex-row sm:items-center gap-4"
                  >
                    <div className="flex-grow">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-200">
                        {item.anime_title}
                      </h3>
                      {editingId === item.tracking_id ? (
                        <div className="mt-2">
                          <select
                            value={newStatus}
                            onChange={(e) => setNewStatus(e.target.value)}
                            className="px-3 py-1 border border-gray-700 dark:border-gray-200 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-200 rounded-md text-sm"
                          >
                            <option value="Plan to Watch">Plan to Watch</option>
                            <option value="Watching">Watching</option>
                            <option value="Completed">Completed</option>
                            <option value="Dropped">Dropped</option>
                          </select>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Status:{" "}
                          <span className="font-semibold text-gray-700 dark:text-gray-300">
                            {item.status || "Not Set"}
                          </span>
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 ">
                      {editingId === item.tracking_id ? (
                        <>
                          <button
                            onClick={() => handleUpdate(item.tracking_id)}
                            className="px-3 py-1 text-xs font-bold text-white bg-green-600 rounded hover:bg-green-700"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancelClick}
                            className="px-3 py-1 text-xs font-bold text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEditClick(item)}
                            className="px-3 py-1 text-xs font-bold text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleRemove(item.tracking_id)}
                            disabled={isDeleting === item.tracking_id}
                            className="px-3 py-1 text-xs font-bold text-red-600 border border-red-600 rounded hover:bg-red-50 disabled:opacity-50"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {filteredWatchlist.length > itemsPerPage && (
            <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 flex items-center justify-between dark:bg-gray-500">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              <span className="text-sm text-gray-700 dark:text-gray-200">
                Page <span className="font-semibold">{currentPage}</span> of{" "}
                <span className="font-semibold">{totalPages}</span>
              </span>

              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
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
