"use client";
import TopBar from "@/components/TopBar";
import { getMoviesListing } from "@/services/MovieServices";
import { useState, useEffect, createContext } from "react";
import useSWRInfinite from "swr/infinite";
import MoviesList from "@/components/list/MoviesList";
import { IGenre, IMovie, IMoviesResponse } from "@/interfaces/Interfaces";
import useSWR from "swr";
import { getMovieGenres } from "@/services/GenreServices";
import GenresContext from "@/context/genresContext";

export default function Home() {
  const [isInfiniteScrollActive, setIsInfiniteScrollActive] =
    useState<boolean>(false);
  const [sortingCriteria, setSetsortingCriteria] = useState<any>("popular");

  const { data, size, setSize, isLoading } = useSWRInfinite(
    (index: number) => ({ criteria: sortingCriteria, page: index + 1 }),
    getMoviesListing
  );

  const { data: genresData } = useSWR("/", getMovieGenres);

  const dataPlaceholder: IMoviesResponse[] = [];
  const jointData = data ? dataPlaceholder.concat(...data) : [];

  const moviesList = jointData.reduce(
    (accumulator: IMovie[], current) => accumulator.concat(current.results),
    []
  );

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (window.scrollY >= scrollableHeight && isInfiniteScrollActive) {
        setSize(size + 1);
      }
    };
    document.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [size]);

  return (
    <GenresContext.Provider value={genresData}>
      <div className="w-screen flex flex-col items-center">
        <TopBar />
        <div className="w-9/12 max-w-7xl py-6">
          <h2 className="text-2xl font-semibold">Popular movies</h2>
          <button onClick={() => setSize(size + 1)}>Load More</button>
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
              {!data || isLoading ? (
                <div>Loading</div>
              ) : (
                <div className="flex flex-col">
                  <MoviesList movies={moviesList} />
                  <button
                    onClick={() => {
                      setSize(size + 1);
                      setIsInfiniteScrollActive(true);
                    }}
                    className="h-12 w-full text-3xl font-bold text-white bg-sky-500 my-4 rounded-xl"
                  >
                    Load more
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </GenresContext.Provider>
  );
}
