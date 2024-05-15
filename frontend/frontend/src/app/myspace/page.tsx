'use client'

import { getUser } from '@/actions/auth';
import { useState, useEffect } from 'react';
import { updateUser } from '@/actions/auth';

const Profle = () => {
    const [profile, setProfile] = useState(Object);
    const [tempProfile, setTempProfile] = useState(Object);
    const [isEditing, setEditing] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const user = await getUser();
            if (user) {
                setProfile(user.data);
            }
        };
        fetchData();
    }, []);

    const onClick = () => {
        setEditing(!isEditing);
        if (!isEditing) {
            setTempProfile({ ...profile });
        }
    };

    const handleEdit = (e: { preventDefault(): unknown; target: { value: any; }; }, field: any) => {
        e.preventDefault()
        setProfile({
            ...profile,
            [field]: e.target.value
        });
    };

    const handleSave = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setEditing(false);
        updateUser(profile);
    }

    const handleCancel = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setProfile({ ...tempProfile });
        setEditing(false);
    }

    return (
        <div className="container mx-auto my-5 p-5">
            <div className="md:flex no-wrap md:-mx-2 ">
                <div className="w-full md:w-3/12 md:mx-2">
                    <div className="bg-white p-3 border-t-4 border-green-400">
                        <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{ profile.first_name } { profile.last_name }</h1>
                        <h3 className="text-gray-600 font-lg text-semibold leading-6">Bio</h3>
                        <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">{ profile.bio }</p>
                        <ul
                            className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                            <li className="flex items-center py-3">
                                <span>Status</span>
                                <span className="ml-auto"><span
                                    className="bg-green-500 py-1 px-2 rounded text-white text-sm">Active</span></span>
                            </li>
                            <li className="flex items-center py-3">
                                <span>Member since</span>
                                <span className="ml-auto">Nov 07, 2016</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="w-full md:w-9/12 mx-2 h-64">
                    <form className="bg-white p-3 shadow-sm rounded-sm">
                        <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                            <span className="text-green-500">
                                <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </span>
                            <span className="tracking-wide">About</span>
                        </div>
                        <div className="text-gray-700">
                            <div className="grid md:grid-cols-2 text-sm">
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">First Name</div>
                                    {isEditing ? (
                                        <input className="px-4 py-2"
                                            type="text"
                                            value={profile.first_name}
                                            onChange={(e) => handleEdit(e, 'first_name')}
                                        />
                                    ) : (
                                        <div className="px-4 py-2">{ profile.first_name }</div>
                                    )}
                                </div>
                                <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Last Name</div>
                                    {isEditing ? (
                                        <input className="px-4 py-2"
                                            type="text"
                                            value={profile.last_name}
                                            onChange={(e) => handleEdit(e, 'last_name')}
                                        />
                                    ) : (
                                        <div className="px-4 py-2">{ profile.last_name }</div>
                                    )}
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Contact No.</div>
                                    <div className="px-4 py-2">???</div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Country</div>
                                    <div className="px-4 py-2">{ profile.country }</div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Email</div>
                                    <div className="px-4 py-2">{ profile.account }</div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Birthday</div>
                                    <div className="px-4 py-2">{ profile.birthday }</div>
                                </div>
                            </div>
                            {isEditing ?
                                (<div>
                                    <button onClick={handleSave}
                                        className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">Save</button>
                                    <button onClick={handleCancel}
                                        className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">Cancle</button>
                                </div>)
                                :
                                (<button onClick={onClick}
                                    className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">Edit</button>)
                            }
                        </div>
                    </form>

                    <div className="my-4"></div>

                    <div className="bg-white p-3 shadow-sm rounded-sm">
                        <div>
                            <div>
                                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                                    <span className="text-green-500">
                                        <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </span>
                                    <span className="tracking-wide">Your Ratings</span>
                                </div>
                                <ul className="list-inside space-y-2">
                                    <li>
                                        <div className="text-teal-600">Hello World</div>
                                        <div className="text-gray-500 text-xs">March 2020 - Now</div>
                                    </li>
                                    <li>
                                        <div className="text-teal-600">Hello World</div>
                                        <div className="text-gray-500 text-xs">March 2020 - Now</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='mt-5'>
                            <div>
                                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                                    <span className="text-green-500">
                                        <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </span>
                                    <span className="tracking-wide">Your Reviews</span>
                                </div>
                                <ul className="list-inside space-y-2">
                                    <li>
                                        <div className="text-teal-600">Hello World</div>
                                        <div className="text-gray-500 text-xs">March 2020 - Now</div>
                                    </li>
                                    <li>
                                        <div className="text-teal-600">Hello World</div>
                                        <div className="text-gray-500 text-xs">March 2020 - Now</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profle;
