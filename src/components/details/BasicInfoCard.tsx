import { IMovieWithDetails } from "@/interfaces/Interfaces";
import { currencyFormatter } from "@/utils/currencyFormatter";
import { languageCodes } from "@/utils/languageCodes";
import { FunctionComponent } from "react";

interface BasicInfoCardProps {
  movie: IMovieWithDetails;
}

const BasicInfoCard: FunctionComponent<BasicInfoCardProps> = ({ movie }) => {
  return (
    <div className="flex flex-col gap-3 mt-4 px-2">
      <div className="flex flex-col space-y-1">
        <p className="font-semibold">Status</p>
        <p>{movie.status}</p>
      </div>
      <div className="flex flex-col space-y-1">
        <p className="font-semibold">Original Language</p>
        <p>{languageCodes[movie.original_language]}</p>
      </div>
      <div className="flex flex-col space-y-1">
        <p className="font-semibold">Budget</p>
        <p>{currencyFormatter.format(movie.budget)}</p>
      </div>
      <div className="flex flex-col space-y-1">
        <p className="font-semibold">Revenue</p>
        <p>{currencyFormatter.format(movie.revenue)}</p>
      </div>
    </div>
  );
};

export default BasicInfoCard;
