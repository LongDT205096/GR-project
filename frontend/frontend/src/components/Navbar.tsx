import Link from "next/link";
import React from "react";
import Image from "next/image";
import { BiHome, BiMoviePlay, BiSearchAlt, BiSolidLogOut, BiTv } from "react-icons/bi";
import { FaTheaterMasks } from "react-icons/fa";
import MySpaceIcon from "./MySpaceIcon";

const Navbar = () => {
  return (
    <div className="w-full sm:hover:w-48 sidebar flex flex-row sm:flex-col bg-gradient-to-l sm:from-transparent sm:to-neutral-950 text-slate-400 p-3 h-full from-neutral-950 to-neutral-950 rounded-t-2xl sm:rounded-t-none">
      <div className="logo_container sm:block hidden h-[10%] flex-initial cursor-pointer">
        <Image
          src="/assets/img/cinemovia_logo.png"
          alt="logo"
          width={75}
          height={75}
          unoptimized
        />
      </div>
      <div className="NavContainer w-full sm:w-auto flex items-center flex-[2_2_0%]">
        <div className="NavLinks select-none w-full justify-start sm:justify-center flex flex-row sm:flex-col gap-5 overflow-x-scroll no-scrollbar">
          <Link
            href={"/"}
            className="flex items-center link-container hover:text-white"
          >
            <BiHome className="p-3 text-5xl" />
            <span className="navtext hidden font-bold">Home</span>
          </Link>
          <Link
            href={"/search"}
            className="flex items-center link-container hover:text-white"
          >
            <BiSearchAlt className="p-3 text-5xl" />
            <span className="navtext hidden font-bold">Search</span>
          </Link>
          <Link
            href={"/ott"}
            className="flex items-center link-container hover:text-white"
          >
            <BiTv className="p-3 text-5xl" />
            <span className="navtext hidden font-bold">OTT</span>
          </Link>
          <Link
            href={"/movie/page/1"}
            className="flex items-center link-container hover:text-white"
          >
            <BiMoviePlay className="p-3 text-5xl" />
            <span className="navtext hidden font-bold">Movie</span>
          </Link>
          <Link
            href={"/genre"}
            className="flex items-center link-container hover:text-white"
          >
            <FaTheaterMasks className="p-3 text-5xl" />
            <span className="navtext hidden font-bold">Genre</span>
          </Link>
          <Link
            href={"/myspace"}
            className="flex items-center link-container hover:text-white"
          >
            <MySpaceIcon />
            <span className="navtext hidden font-bold">My Space</span>
          </Link>

          <Link 
          href={'/logout'}
          className="flex items-center link-container hover:text-white">
            <BiSolidLogOut className="p-3 text-5xl" />
            <span className="navtext hidden font-bold">Logout</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
