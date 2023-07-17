"use client";
import TopBar from "@/components/TopBar";
import { getMoviesListing } from "../../services/MovieServices";
import { useState } from "react";
import useSWR from "swr";
import MoviesList from "@/components/list/MoviesList";
import { getMovieGenres } from "../../services/GenreServices";

// async function getData() {
//   const res = await getUpcomingMovies();
//   // The return value is *not* serialized
//   // You can return Date, Map, Set, etc.

//   // Recommendation: handle errors
//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error("Failed to fetch data");
//   }

//   return res.json();
// }

export default function Home() {
  const [sortingCriteria, setSetsortingCriteria] = useState<any>("popular");

  const { data, error, isLoading } = useSWR(sortingCriteria, getMoviesListing);
  const { genresData, genresError, isLoadingGenres } = useSWR(
    "/",
    getMovieGenres
  );

  console.log("DATA", genresData);
  return (
    <div className="w-screen flex flex-col items-center">
      <TopBar />
      <div className="w-9/12 max-w-7xl py-6">
        <h2 className="text-2xl font-semibold">Popular movies</h2>
        <div className="w-full flex">
          <div className="flex-1 flex">
            <button onClick={() => setSetsortingCriteria("popular")}>
              Popular
            </button>
            <button onClick={() => setSetsortingCriteria("upcoming")}>
              Upcoming
            </button>
          </div>
          <div className="">
            {isLoading ? (
              <div>Loading</div>
            ) : (
              <MoviesList movies={data.results} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
