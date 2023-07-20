import {
  ListBulletIcon,
  HeartIcon,
  BookmarkIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import { FunctionComponent } from "react";
import VotesMarker from "../VotesMarker/VotesMarker";

interface ButtonsContainerProps {
  movieScore: number;
}

const ButtonsContainer: FunctionComponent<ButtonsContainerProps> = ({
  movieScore,
}) => {
  const scorePercentage = Math.trunc(movieScore * 10);

  return (
    <div className="flex h-10 w-full items-center pt-12">
      <div className="h-20 w-20 py-3 hover:scale-110">
        <VotesMarker percentage={scorePercentage} />
      </div>
      <p className="text-white font-bold text-lg pl-2">
        User <br />
        Score
      </p>
      <div className="flex justify-between gap-6 px-4">
        <button className="rounded-full h-12 w-12 bg-blue-950  flex items-center justify-center">
          <ListBulletIcon className="text-white w-4 h-4" />
        </button>
        <button className="rounded-full h-12 w-12 bg-blue-950  flex items-center justify-center">
          <HeartIcon className="text-white w-4 h-4" />
        </button>
        <button className="rounded-full h-12 w-12 bg-blue-950  flex items-center justify-center">
          <BookmarkIcon className="text-white w-4 h-4" />
        </button>
        <button className="rounded-full h-12 w-12 bg-blue-950  flex items-center justify-center">
          <StarIcon className="text-white w-4 h-4" />
        </button>
      </div>
      <button className="flex items-center text-white hover:text-gray-400">
        &#9654;
        <p className="font-bold text-lg pl-2">
          Play <br />
          Trailer
        </p>
      </button>
    </div>
  );
};

export default ButtonsContainer;
