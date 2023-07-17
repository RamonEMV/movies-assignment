import { FunctionComponent } from "react";
import { IMovie } from "../../interfaces/Interfaces";
import VotesMarker from "@/components/VotesMarker/VotesMarker";
import { EllipsisHorizontalCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import moment from "moment";

interface MovieListItemProps {
  movie: IMovie;
}

const MovieListItem: FunctionComponent<MovieListItemProps> = ({ movie }) => {
  const scorePercentage = movie.vote_average * 10;

  return (
    <div className="flex overflow-hidden flex-col rounded-xl h-96 w-44 drop-shadow-md bg-white">
      <EllipsisHorizontalCircleIcon
        width={27}
        height={27}
        className="text-gray-400 absolute right-2 top-2 opacity-90"
      />
      <Link href={`/movie/${movie.id}`}>
        <img
          src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${movie.poster_path}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`}
          alt={`${movie.title} poster`}
        />
      </Link>

      <div className="p-2 pt-6">
        <div className="absolute h-10 w-10 bottom-24">
          <VotesMarker percentage={scorePercentage} />
        </div>
        <Link href={`/movie/${movie.id}`}>
          <p className="font-bold">{movie.title}</p>
        </Link>
        <p className="text-gray-500 font-normal">
          {moment(movie.release_date).format("MMM DD[, ]YYYY")}
        </p>
        <p>{movie.genre_ids.map((id) => id + " ")}</p>
      </div>
    </div>
  );
};

export default MovieListItem;
