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
      <div className="h-20 w-20 pt-3">
        <VotesMarker percentage={scorePercentage} />
      </div>
      <p className="text-white font-bold text-lg pl-2">
        User <br />
        Score
      </p>
      <div className="w-full flex justify-between px-4">
        <div className="rounded-full h-12 w-12 bg-blue-950  flex items-center justify-center">
          <ListBulletIcon className="text-white w-4 h-4" />
        </div>
        <div className="rounded-full h-12 w-12 bg-blue-950  flex items-center justify-center">
          <HeartIcon className="text-white w-4 h-4" />
        </div>
        <div className="rounded-full h-12 w-12 bg-blue-950  flex items-center justify-center">
          <BookmarkIcon className="text-white w-4 h-4" />
        </div>
        <div className="rounded-full h-12 w-12 bg-blue-950  flex items-center justify-center">
          <StarIcon className="text-white w-4 h-4" />
        </div>
      </div>
      <div className="flex items-center text-white hover:text-gray-400">
        &#9654;
        <p className="font-bold text-lg pl-2">
          Play <br />
          Trailer
        </p>
      </div>
    </div>
  );
};

export default ButtonsContainer;
