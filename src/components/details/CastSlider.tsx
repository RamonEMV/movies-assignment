import { ICast } from "@/interfaces/Interfaces";
import { FunctionComponent } from "react";
import CastListItem from "./CastListItem";

interface CastSliderProps {
  title: string;
  cast: ICast[];
}

const CastSlider: FunctionComponent<CastSliderProps> = ({ title, cast }) => {
  return (
    <div className="flex flex-col justify-normal w-full">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="flex">
        {cast.map((castMember) => (
          <CastListItem castMember={castMember} />
        ))}
      </div>
    </div>
  );
};

export default CastSlider;
