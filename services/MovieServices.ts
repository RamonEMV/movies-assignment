import { IReleaseDate } from "@/interfaces/Interfaces";

export async function getMoviesListing(
  criteria: "top_rated" | "upcoming" | "popular" = "popular"
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}movie/${criteria}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getMovieWithDetails(id: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&append_to_response=credits`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getReleaseDates(id: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}movie/${id}/release_dates?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = res.json();

  const result = data as unknown as IReleaseDate;

  return result;
}
