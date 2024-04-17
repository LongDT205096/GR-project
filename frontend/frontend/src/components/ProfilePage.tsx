
"use client"

import Link from 'next/link';
import ProfileImg from '../../public/assets/img/profile.jpg';
import { checkAuthenticated, getUser } from '@/actions/auth';
import { useState, useEffect } from 'react';

const ProfilePage = () => {
    const [profile, setProfile] = useState(Object);
    useEffect(() => {
        const fetchData = async () => {
            const user = await getUser();
            setProfile(user.data);
        };
        fetchData();
    }, []);

    console.log(profile);
    return (
        <div>
            <div className="w-full h-screen items-center justify-center p-3 flex flex-col md:flex-row ">
                <div className="my-3 flex-1 w-full">
                    <div className="max-w-sm p-3 mx-auto bg-neutral-700 rounded-lg shadow dark:bg-gray-800">
                        <div className="flex flex-col items-center pb-10">
                            <img className="my-3 w-24 h-24 mb-3 rounded-full shadow-lg" src={profile.photoURL ? profile.photoURL : './assets/img/profile.jpg'} alt={profile.id} />
                            <h5 className="mb-1 text-xl font-medium text-white dark:text-white">{profile.id}</h5>
                            <span className="text-sm text-white dark:text-gray-200">{profile.account}</span>
                            <div className="flex mt-4 space-x-3 md:mt-6">
                                <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounaded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Logout</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 w-full my-3 justify-center gap-6 flex flex-col">
                    <Link href={"/favourites/movies"}>
                        <div className="max-w-sm md:mx-0 mx-auto p-3 text-center hover:bg-neutral-500 bg-neutral-700 rounded-lg shadow dark:bg-gray-800 py-10">
                            <h1>My Favourite Movies</h1>
                        </div>
                    </Link>
                    <Link href={"/favourites/series"}>
                        <div className="max-w-sm p-3 md:mx-0 mx-auto text-center hover:bg-neutral-500 bg-neutral-700 rounded-lg shadow dark:bg-gray-800 py-10">
                            <h1>My Favourite Series</h1>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage
