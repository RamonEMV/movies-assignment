import Slider from "rc-slider";
import { Dispatch, FunctionComponent, SetStateAction } from "react";
import FilterContainer from "./FilterContainer";
import FilterSection from "./FilterSection";
import {
  IGenresResponse,
  IMoviesListingParams,
  SortingCriteria,
} from "@/interfaces/Interfaces";

interface FiltersPanelProps {
  sortingCriteria: SortingCriteria;
  setSetsortingCriteria: Dispatch<SetStateAction<SortingCriteria>>;
  fromDateFilter?: string;
  setFromDateFilter: Dispatch<SetStateAction<string | undefined>>;
  toDateFilter?: string;
  setToDateFilter: Dispatch<SetStateAction<string | undefined>>;
  genresData?: IGenresResponse;
  selectedGenres?: number[];
  setSetselectedGenres: Dispatch<SetStateAction<number[] | undefined>>;
  userScoreFilter?: number[];
  setUserScoreFilter: Dispatch<SetStateAction<number[] | undefined>>;
  runtimeFilter?: number[];
  setRuntimeFilter: Dispatch<SetStateAction<number[] | undefined>>;
  onSubmitSearch: (params: IMoviesListingParams) => void;
}

const FiltersPanel: FunctionComponent<FiltersPanelProps> = ({
  sortingCriteria,
  setSetsortingCriteria,
  fromDateFilter,
  setFromDateFilter,
  toDateFilter,
  setToDateFilter,
  genresData,
  selectedGenres,
  setSetselectedGenres,
  userScoreFilter,
  setUserScoreFilter,
  runtimeFilter,
  setRuntimeFilter,
  onSubmitSearch,
}) => {
  return (
    <div className="flex flex-1 flex-col pr-4 gap-3">
      <FilterContainer title="Sort" className="w-64">
        <button
          className={`border p-2 ${
            sortingCriteria === SortingCriteria.POPULAR
              ? "bg-sky-500 text-white"
              : ""
          } `}
          onClick={() => setSetsortingCriteria(SortingCriteria.POPULAR)}
        >
          Popular
        </button>
        <button
          className={`border p-2 ${
            sortingCriteria === SortingCriteria.UPCOMING
              ? "bg-sky-500 text-white"
              : ""
          } `}
          onClick={() => setSetsortingCriteria(SortingCriteria.UPCOMING)}
        >
          Upcoming
        </button>
        <button
          className={`border p-2 ${
            sortingCriteria === SortingCriteria.TOP_RATED
              ? "bg-sky-500 text-white"
              : ""
          } `}
          onClick={() => setSetsortingCriteria(SortingCriteria.TOP_RATED)}
        >
          Top rated
        </button>
      </FilterContainer>
      <FilterContainer title="Filters" className="w-64">
        <FilterSection title="Release Dates">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between gap-3 items-center">
              <label className="text-gray-500">From</label>
              <input
                type="date"
                className="rounded-lg border p-1"
                value={fromDateFilter}
                onChange={(e) => setFromDateFilter(e.target.value)}
              />
            </div>
            <div className="flex justify-between gap-3 items-center">
              <label className="text-gray-500">To</label>
              <input
                type="date"
                className="rounded-lg border p-1"
                value={toDateFilter}
                onChange={(e) => setToDateFilter(e.target.value)}
              />
            </div>
          </div>
        </FilterSection>
        <FilterSection title="Genres">
          <div className="flex flex-wrap gap-2">
            {genresData?.genres.map((genre) => (
              <button
                onClick={() => {
                  setSetselectedGenres((currentValue) => {
                    const genres = currentValue ? [...currentValue] : [];
                    if (genres.includes(genre.id)) {
                      const filteredGenres = genres.filter(
                        (val) => val !== genre.id
                      );
                      return filteredGenres;
                    }
                    genres.push(genre.id);
                    return genres;
                  });
                }}
                className={`rounded-full border border-gray-400 hover:bg-sky-500 hover:text-white px-2 ${
                  selectedGenres?.includes(genre.id) && `bg-sky-500 text-white`
                }`}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </FilterSection>
        <FilterSection title="User score">
          <Slider
            range
            defaultValue={[0, 10]}
            min={0}
            max={10}
            className="h-10 w-20"
            step={1}
            dots
            marks={{ 0: "0", 5: "5", 10: "10" }}
            value={userScoreFilter}
            onChange={(e) => setUserScoreFilter(e as number[])}
          />
        </FilterSection>
        <FilterSection title="Runtime">
          <Slider
            range
            defaultValue={[0, 400]}
            min={0}
            max={400}
            className="h-10 w-20"
            step={15}
            dots
            marks={{ 0: "0", 120: "120", 240: "240", 360: 360 }}
            value={runtimeFilter}
            onChange={(e) => setRuntimeFilter(e as number[])}
          />
        </FilterSection>
      </FilterContainer>
      <button
        onClick={() =>
          onSubmitSearch({
            criteria: sortingCriteria,
            fromReleaseDate: fromDateFilter,
            toReleaseDate: toDateFilter,
            genres: selectedGenres,
            page: 1,
            runtime: runtimeFilter,
            userScore: userScoreFilter,
          })
        }
        className="mt-2 bg-sky-500 text-white p-3 rounded-full font-bold text-xl"
      >
        Search
      </button>
    </div>
  );
};

export default FiltersPanel;
