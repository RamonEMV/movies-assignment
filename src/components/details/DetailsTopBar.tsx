"use client";

import Image from "next/image";
import Link from "next/link";
import { PlusIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";

const DetailsTopBar = () => {
  return (
    <div className="overflow-auto w-full h-12 bg-white flex justify-center text-base">
      <div className="flex align-middle gap-11 items-center">
        <Link
          href="#"
          className=" h-full flex items-center hover:text-gray-600 border-b-4 border-blue-400 mx-4"
        >
          Overview <p className="text-xs ml-2">&#9660;</p>
        </Link>
        <Link
          href="#"
          className="p-x-4 h-full flex items-center  hover:text-gray-600"
        >
          Media <p className="text-xs ml-2">&#9660;</p>
        </Link>
        <Link
          href="#"
          className="p-x-4 h-full flex items-center  hover:text-gray-600"
        >
          Fandom <p className="text-xs ml-2">&#9660;</p>
        </Link>
        <Link
          href="#"
          className="p-x-4 h-full flex items-center  hover:text-gray-600"
        >
          Share <p className="text-xs ml-2">&#9660;</p>
        </Link>
      </div>
    </div>
  );
};

export default DetailsTopBar;
