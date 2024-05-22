'use client';
import React from 'react';
import Widget from '@/components/Widget';

const Watchlist = () => {
    return (
        <div className="container mx-auto my-5 p-5 text-lg">
            <Widget />
            <div className="bg-white dark:bg-zinc-800 px-4 pb-4">
                    <div className="flex justify-between">
                        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center">
                            My Watchlist
                        </h2>
                        <div className="flex space-x-2 items-center">
                            <span className="text-zinc-700 dark:text-zinc-300">Filter by:</span>
                            <form className="max-w-sm mx-auto">
                                <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option selected value="date">Date added</option>
                                    <option value="name">Name</option>
                                    <option value="rate">Rate</option>
                                </select>
                            </form>
                            <span className="text-zinc-700 dark:text-zinc-300">Order:</span>
                            <a href="#" className="text-zinc-700 dark:text-zinc-300">↑</a>
                            <a href="#" className="text-zinc-700 dark:text-zinc-300">↓</a>
                        </div>
                    </div>
                    <p className="mt-4 text-zinc-700 dark:text-zinc-300">"You haven't added any TV shows to your watchlist."</p>
            </div>
        </div>
    );
}

export default Watchlist;
