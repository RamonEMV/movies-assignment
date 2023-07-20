import { FunctionComponent } from "react";
import { LinkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

interface SocialMediaContainerProps {}

const SocialMediaContainer: FunctionComponent<
  SocialMediaContainerProps
> = () => {
  return (
    <div className="flex ">
      <Link href="#">
        <Image
          src={"/facebook.svg"}
          height={25}
          width={25}
          alt="facebook"
          className="mx-2"
        />
      </Link>
      <Link href="#">
        <Image
          src={"/instagram.svg"}
          height={25}
          width={25}
          alt="instagram"
          className="mx-2"
        />
      </Link>
      <Link href="#">
        <Image
          src={"/twitter.svg"}
          height={25}
          width={25}
          alt="twitter"
          className="mx-2"
        />
      </Link>
      <div className="bg-gray-400 h-8 border" />
      <Link href="#">
        <LinkIcon className="m-2" height={20} width={20} />
      </Link>
    </div>
  );
};

export default SocialMediaContainer;
