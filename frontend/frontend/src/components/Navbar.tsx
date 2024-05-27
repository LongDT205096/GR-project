'use client'
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { BiHome, BiMoviePlay, BiSearchAlt, BiSolidLogOut, BiTv } from "react-icons/bi";
import { FaTheaterMasks } from "react-icons/fa";
import { useRouter } from "next/navigation";

import { checkAuthenticated } from "@/actions/auth";
import MySpaceIcon from "./MySpaceIcon";

const Navbar = () => {
    const [user, setUser] = useState(false);
    useEffect(() => { const fetchData = async () => {
        const isAuthenticated = await checkAuthenticated();
        setUser(isAuthenticated as boolean);
    };  
        fetchData();
    }, [user]);

    const router = useRouter();

    const logout = () => {
        localStorage.removeItem("token");
        router.push("/login");
    };

    return (
        <div className="w-full sm:hover:w-48 sidebar flex flex-row sm:flex-col bg-gradient-to-l sm:from-transparent sm:to-neutral-950 text-slate-400 p-3 h-full from-neutral-950 to-neutral-950 rounded-t-2xl sm:rounded-t-none">
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
                        href={"/latest/page/1"}
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
                        href={ user ? ("/myspace/overview") : ("/login") }
                        className="flex items-center link-container hover:text-white"
                    >   
                        <MySpaceIcon />
                        <span className="navtext hidden font-bold">My Space</span>
                    </Link>                    

                    {user ? ( <button onClick={logout}
                        className="flex items-center link-container hover:text-white">
                        <BiSolidLogOut className="p-3 text-5xl" />
                        <span className="navtext hidden font-bold">Logout</span>
                    </button> ) : <></>}
                    
                </div>
            </div>
        </div>
    );
};

export default Navbar;
