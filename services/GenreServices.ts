import { IGenre } from "@/interfaces/Interfaces";

export async function getMovieGenres() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}genre/movie/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = res.json();

  const result = data as unknown as IGenre[];

  return result;
}
