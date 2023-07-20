import { ICast } from "@/interfaces/Interfaces";
import { FunctionComponent } from "react";
import CastListItem from "./CastListItem";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

interface CastSliderProps {
  title: string;
  cast: ICast[];
}

const CastSlider: FunctionComponent<CastSliderProps> = ({ title, cast }) => {
  const itemsToShow = cast.slice(0, 9);

  return (
    <div className="flex flex-col px-3">
      <h2 className="text-2xl font-semibold over">{title}</h2>
      <div className="flex overflow-x-auto gap-3 pb-2">
        {itemsToShow.map((castMember) => (
          <CastListItem castMember={castMember} />
        ))}
        <div className="">
          <Link href={"#"} className="flex gap-1 items-center h-full">
            <p className="whitespace-nowrap font-semibold">View More</p>
            <ArrowRightIcon height={20} width={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CastSlider;
