import { FunctionComponent, useContext } from "react";
import { IGenre, IMovie } from "../../interfaces/Interfaces";
import VotesMarker from "@/components/VotesMarker/VotesMarker";
import { EllipsisHorizontalCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";
import GenresContext from "@/context/genresContext";

interface MovieListItemProps {
  movie: IMovie;
}

const MovieListItem: FunctionComponent<MovieListItemProps> = ({ movie }) => {
  const scorePercentage = movie.vote_average * 10;

  const genresContext = useContext(GenresContext);

  const genresList = movie.genre_ids.map((genreId, index) => {
    if (!genresContext?.genres) return;
    const name = genresContext.genres.find(
      (genre: IGenre) => genreId === genre.id
    )?.name;
    if (index === movie.genre_ids.length - 1) return name;
    return `${name}, `;
  });

  return (
    <div className="flex overflow-hidden flex-col rounded-xl  w-full drop-shadow-md bg-white">
      <EllipsisHorizontalCircleIcon
        width={27}
        height={27}
        className="text-gray-400 absolute right-2 top-2 opacity-90"
      />
      <div className="">
        <Link href={`/movie/${movie.id}`}>
          {movie.poster_path ? (
            <img
              src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${movie.poster_path}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`}
              alt={`${movie.title} poster`}
            />
          ) : (
            <Image
              src={"/placeholder.svg"}
              alt={"placeholder"}
              height={175}
              width={144}
              className="w-full h-full"
            />
          )}
          <div className="relative h-2 w-10 bottom-6 ">
            <VotesMarker percentage={scorePercentage} />
          </div>
        </Link>
      </div>

      <div className="p-2">
        <Link href={`/movie/${movie.id}`}>
          <p className="font-bold line-clamp-2">{movie.title}</p>
        </Link>
        <p className="text-gray-500 font-normal text-sm">
          {moment(movie.release_date).format("MMM DD[, ]YYYY")}
        </p>
        <p className="text-xs ml-1 text-gray-500">{genresList}</p>
      </div>
    </div>
  );
};

export default MovieListItem;
