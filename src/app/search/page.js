import { Suspense } from "react";
import SearchContent from "./SearchContent";

function SearchFallback() {
  return (
    <main className="h-screen bg-gray-50 dark:bg-gray-600 flex justify-center flex-col items-center">
      <div className="animate-pulse">Loading...</div>
    </main>
  );
}

export default function SearchResultPage() {
  return (
    <Suspense fallback={<SearchFallback />}>
      <SearchContent />
    </Suspense>
  );
}
