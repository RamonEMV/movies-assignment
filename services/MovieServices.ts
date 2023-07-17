import {
  IMovieWithDetails,
  IMoviesResponse,
  IReleaseDate,
} from "@/interfaces/Interfaces";

export async function getMoviesListing(
  options: {
    criteria: "top_rated" | "upcoming" | "popular";
    page: number;
  } = {
    criteria: "popular",
    page: 1,
  }
): Promise<IMoviesResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}movie/${options.criteria}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${options.page}`
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
