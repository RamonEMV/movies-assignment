import {
  IMovieWithDetails,
  IMoviesListingParams,
  IMoviesResponse,
  IReleaseDate,
  SortingCriteria,
} from "@/interfaces/Interfaces";
import moment from "moment";

export async function getMoviesListing(
  options: IMoviesListingParams = {
    criteria: SortingCriteria.POPULAR,
    page: 1,
  }
): Promise<IMoviesResponse> {
  const criteriaStrings = {
    top_rated: `include_adult=false&include_video=false&language=en-US&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200`,
    upcoming: `include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc&with_release_type=2|3&primary_release_date.gte=${moment().format(
      "YYYY[-]MM[-]DD"
    )}`,
    popular: "sort_by=popularity.desc",
  };
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}discover/movie?api_key=${
      process.env.NEXT_PUBLIC_API_KEY
    }&include_adult=false&include_video=false${
      options.fromReleaseDate
        ? `&primary_release_date.gte=${moment(options.fromReleaseDate).format(
            "YYYY[-]MM[-]DD"
          )}`
        : ""
    }${
      options.toReleaseDate
        ? `&primary_release_date.lte=${moment(options.toReleaseDate).format(
            "YYYY[-]MM[-]DD"
          )}`
        : ""
    }${
      options.genres
        ? `&with_genres=${options.genres.map((genreId, index) => {
            if (index === options.genres?.length) {
              return genreId.toString;
            }
            return `${genreId.toString()},`;
          })}`
        : ""
    }${
      options.userScore && options.userScore.length > 0
        ? `&vote_average.gte=${options.userScore[0]}`
        : ""
    }${
      options.userScore && options.userScore.length > 1
        ? `&vote_average.lte=${options.userScore[1]}`
        : ""
    }${
      options.runtime && options.runtime.length > 0
        ? `&with_runtime.gte=${options.runtime[0]}`
        : ""
    }${
      options.runtime && options.runtime.length > 1
        ? `&with_runtime.lte=${options.runtime[1]}`
        : ""
    }&page=${options.page}&${criteriaStrings[options.criteria]}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getMovieWithDetails(
  id: number
): Promise<IMovieWithDetails> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&append_to_response=credits`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getReleaseDates(id: number): Promise<IReleaseDate> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}movie/${id}/release_dates?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = res.json();

  const result = data;

  return result;
}
