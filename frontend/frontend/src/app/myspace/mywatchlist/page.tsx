"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from "next/image";
import Link from "next/link";
import { FaHeart } from 'react-icons/fa6';
import Tooltip from '@mui/material/Tooltip';

import ListIcon from "@/components/MoviePage/ListIcon";
import RateModal from '@/components/Review/RateModal';

axios.defaults.baseURL = "http://127.0.0.1:8000";
const token = localStorage.getItem("token");
const api = "account/watchlist/"
const config = {
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
    },
};

const posterpath = "https://image.tmdb.org/t/p/w300";

async function getFavoritedMovie() {
    const res = axios.get(api, { headers: config.headers })
        .then((res) => {
            return res.data.movies;
        })
        .catch((err) => {
            console.log(err);
        });
    return res;
}

const Watchlist = () => {
    const [watchlist, setWatchlist] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            const data = await getFavoritedMovie();
            setWatchlist(data);
            setLoading(false);
        };
        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full">
            <div className="p-3 px-[5%] pt-[2%]">
                <div className="px-4">
                    <div className="flex justify-between">
                        <p className="text-3xl font-bold text-zinc-900 flex items-center">
                            My Watchlist
                        </p>
                        <div className="flex space-x-2 items-center">
                            <span className="text-zinc-700text-xl">Filter by:</span>
                            <form className="max-w-sm mx-auto">
                                <select className=" text-lg bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                    <option selected value="date">Date added</option>
                                    <option value="name">Title</option>
                                    <option value="rate">Rate</option>
                                </select>
                            </form>
                            <span className="text-zinc-700 text-xl">Order:</span>
                            <a href="#" className="text-zinc-700">↑</a>
                            <a href="#" className="text-zinc-700">↓</a>
                        </div>
                    </div>

                </div>
            </div>
            {watchlist.length > 0 ? (
                <div className="flex flex-col justify-center items-center">
                    {watchlist.map((movie: any) => (
                        <div className="pb-3 w-[70%] min-h-[430px]">
                            <div className="bg-white shadow-lg border-gray-400 max-h-80 border sm:rounded-3xl p-8 flex space-x-10">
                                <div className="h-48 min-w-[250px] overflow-visible">
                                    <Link href={`/movie/${movie.id}`}>
                                        <Image
                                            src={posterpath + movie.images.poster}
                                            alt={movie.images.poster}
                                            className="rounded-3xl shadow-lg"
                                            width={400}
                                            height={400}
                                            objectFit="cover"
                                            placeholder="blur"
                                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM0dgn9DwADSwHNRhjk3gAAAABJRU5ErkJggg=="
                                            unoptimized
                                        />
                                    </Link>
                                </div>
                                <div className="flex flex-col w-13/20 space-y-4">
                                    <div className="flex justify-between items-start">
                                        <h2 className="text-zinc-900 text-3xl font-bold">{movie.title}</h2>
                                        <div className="bg-yellow-400 font-bold rounded-xl p-2 text-black">{movie.ave_rate.toFixed(1) + "/ " + "5.0"}</div>
                                    </div>
                                    <div>
                                        <div className="text-lg text-gray-800">{movie.release_date}</div>
                                    </div>
                                    <p className=" text-zinc-900 max-h-40 overflow-y-hidden">{movie.summary}</p>
                                    <ul className="flex gap-5 text-slate-300 sm:justify-start justify-center my-2">
                                        <li className="flex items-center justify-center">
                                            <Tooltip title="Add to list">
                                                <RateModal movieId={movie.id} movieTitle={movie.title} />
                                            </Tooltip>
                                        </li>
                                        <li className="flex items-center justify-center rounded-full bg-slate-800 p-4">
                                            <Tooltip title="Add to Watchlist" arrow>
                                                <FaHeart 
                                                    className="text-red-600 my-auto cursor-pointer"
                                                    onClick={() => {
                                                        axios.delete(api, { data: { movie: movie.id }, headers: config.headers })
                                                            .then((res) => {
                                                                const updatedWatchlist = watchlist.filter((item: any) => item.id !== movie.id);
                                                                setWatchlist(updatedWatchlist);
                                                            })
                                                            .catch((err) => {
                                                                console.log(err);
                                                            });
                                                    }}
                                                />
                                            </Tooltip>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>))}
                </div>
            ) :
                (
                    <div className="px-[5%] h-screen">
                        <div className="px-4 pb-4">
                            <p className="text-zinc-700 text-xl">You haven't added any movies to your watchlist.</p>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default Watchlist;
