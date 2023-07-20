import Image from "next/image";
import Link from "next/link";
import { PlusIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";

const TopBar = () => {
  return (
    <div className="w-full">
      <div className="overflow-auto h-16 bg-primary flex justify-center text-white font-semibold">
        <div className="w-full xl:max-w-7xl flex flex-row justify-between px-4">
          <div className="flex align-middle gap-7 items-center">
            <Link href="/">
              <Image
                src={"/tmdb-logo.svg"}
                alt="Logo"
                width={154}
                height={20}
              />
            </Link>
            <Link href="/">Movies</Link>
            <Link href="#">TV Shows</Link>
            <Link href="#">People</Link>
            <Link href="#">More</Link>
          </div>
          <div className="flex shrink-0 align-middle gap-7 items-center">
            <PlusIcon className="w-6 h-6 text-white" />
            <Link
              href="#"
              className="border border-white hover:bg-white hover:text-black px-1 rounded-md"
            >
              EN
            </Link>
            <Link href="#">Login</Link>
            <Link href="#">Join TMDB</Link>
            <MagnifyingGlassIcon className="w-6 h-6 text-blue-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
