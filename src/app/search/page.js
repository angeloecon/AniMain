import { Suspense } from "react";
import SearchContent from "./SearchContent";
import LoadingState from "@/components/UI/LoadingState/LoadingState";

export const metadata = {
  title: "Search Results", 
  description: "Find your favorite anime."
};

export default function SearchResultPage() {
  return (
    <Suspense fallback={<LoadingState message="Loading..."/>}>
      <SearchContent />
    </Suspense>
  );
}
