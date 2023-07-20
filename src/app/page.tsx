"use client";
import TopBar from "@/components/TopBar";
import { getMoviesListing } from "@/services/MovieServices";
import { useState, useEffect } from "react";
import useSWRInfinite from "swr/infinite";
import MoviesList from "@/components/list/MoviesList";
import {
  IMovie,
  IMoviesListingParams,
  IMoviesResponse,
  SortingCriteria,
} from "@/interfaces/Interfaces";
import useSWR from "swr";
import { getMovieGenres } from "@/services/GenreServices";
import GenresContext from "@/context/genresContext";
import "rc-slider/assets/index.css";
import LoadingSpinner from "@/components/LoadingSpinner";
import FiltersPanel from "@/components/list/FiltersPanel";

export default function Home() {
  const [isInfiniteScrollActive, setIsInfiniteScrollActive] =
    useState<boolean>(false);
  const [sortingCriteria, setSetsortingCriteria] = useState<SortingCriteria>(
    SortingCriteria.POPULAR
  );
  const [fromDateFilter, setFromDateFilter] = useState<string | undefined>(
    undefined
  );
  const [toDateFilter, setToDateFilter] = useState<string | undefined>(
    undefined
  );
  const [selectedGenres, setSetselectedGenres] = useState<
    number[] | undefined
  >();
  const [userScoreFilter, setUserScoreFilter] = useState<number[] | undefined>(
    undefined
  );
  const [runtimeFilter, setRuntimeFilter] = useState<number[] | undefined>(
    undefined
  );
  const [searchFilters, setSearchFilters] =
    useState<IMoviesListingParams | null>({
      criteria: SortingCriteria.POPULAR,
    });

  const { data, size, setSize, isLoading } = useSWRInfinite(
    (index: number) => ({ ...searchFilters, page: index + 1 }),
    getMoviesListing
  );

  const { data: genresData } = useSWR("/", getMovieGenres);

  const dataPlaceholder: IMoviesResponse[] = [];
  const jointData = data ? dataPlaceholder.concat(...data) : [];

  const moviesList = jointData.reduce(
    (accumulator: IMovie[], current) => accumulator.concat(current.results),
    []
  );

  const onSubmitSearch = (params: IMoviesListingParams) => {
    setSearchFilters(params);
  };

  const onPressNextPage = () => {
    setSize(size + 1);
    setIsInfiniteScrollActive(true);
  };

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
  }, [onPressNextPage]);

  return (
    <GenresContext.Provider value={genresData}>
      <div className="w-full flex flex-col items-center">
        <TopBar />
        <div className="w-9/12 max-w-7xl py-6">
          <h2 className="text-3xl font-semibold">Movies Listing</h2>
          <div className="w-full flex">
            <FiltersPanel
              fromDateFilter={fromDateFilter}
              genresData={genresData}
              runtimeFilter={runtimeFilter}
              selectedGenres={selectedGenres}
              sortingCriteria={sortingCriteria}
              toDateFilter={toDateFilter}
              userScoreFilter={userScoreFilter}
              setFromDateFilter={setFromDateFilter}
              setRuntimeFilter={setRuntimeFilter}
              setSetselectedGenres={setSetselectedGenres}
              setSetsortingCriteria={setSetsortingCriteria}
              setToDateFilter={setToDateFilter}
              setUserScoreFilter={setUserScoreFilter}
              onSubmitSearch={onSubmitSearch}
            />
            <div className="">
              {!data || isLoading ? (
                <div className="w-full h-full">
                  <LoadingSpinner />
                </div>
              ) : (
                <div>
                  {moviesList.length > 0 ? (
                    <div className="flex flex-col">
                      <MoviesList movies={moviesList} />
                      {data[0].total_pages > size && (
                        <button
                          onClick={onPressNextPage}
                          className="h-12 w-full text-3xl font-bold text-white bg-sky-500 my-4 rounded-xl"
                        >
                          Load more
                        </button>
                      )}
                    </div>
                  ) : (
                    <div>No items were found that match your query.</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </GenresContext.Provider>
  );
}
