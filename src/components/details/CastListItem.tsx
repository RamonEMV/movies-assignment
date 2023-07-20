import { ICast } from "@/interfaces/Interfaces";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";

interface CastListItemProps {
  castMember: ICast;
}

const CastListItem: FunctionComponent<CastListItemProps> = ({ castMember }) => {
  return (
    <div className="flex flex-col rounded-xl h-64 w-36 overflow-hidden drop-shadow-md bg-white shrink-0">
      <div className="h-44 w-36 overflow-hidden">
        <Link href={"#"}>
          {castMember.profile_path ? (
            <img
              src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${castMember.profile_path}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`}
              alt={`${castMember.name} photo`}
            />
          ) : (
            <Image
              src={"/placeholder.svg"}
              alt={castMember.name}
              height={175}
              width={144}
              className="w-full h-full"
            />
          )}
        </Link>
      </div>

      <div className="p-2 pt-1">
        <Link href={`#`}>
          <p className="font-bold">{castMember.name}</p>
        </Link>
        <p className="text-gray-500 font-normal">{castMember.character}</p>
      </div>
    </div>
  );
};

export default CastListItem;
