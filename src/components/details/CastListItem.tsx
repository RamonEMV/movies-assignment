import { ICast } from "@/interfaces/Interfaces";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";

interface CastListItemProps {
  castMember: ICast;
}

const CastListItem: FunctionComponent<CastListItemProps> = ({ castMember }) => {
  return (
    <div className="flex overflow-hidden flex-col rounded-xl h-64 w-36 drop-shadow-md bg-white">
      <Link href={"#"}>
        {castMember.profile_path ? (
          <img
            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${castMember.profile_path}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`}
            alt={`${castMember.name} photo`}
            height={175}
            width={144}
          />
        ) : (
          <Image
            src={"/placeholder.svg"}
            alt={castMember.name}
            height={175}
            width={144}
          />
        )}
      </Link>

      <div className="p-2 pt-1">
        <Link href={`#`}>
          <p className="font-bold">
            {castMember.name} {castMember.profile_path}
          </p>
        </Link>
        <p className="text-gray-500 font-normal">{castMember.character}</p>
      </div>
    </div>
  );
};

export default CastListItem;
