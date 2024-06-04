'use client';
import React, { useEffect, useState, useMemo } from 'react';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import axios from 'axios';

import Widget from '@/components/Widget';
import { getProfile, updateProfile } from '@/actions/auth';
import requests from '@/utils/requests';

axios.defaults.baseURL = 'http://127.0.0.1:8000/';

const token = localStorage.getItem('token');
const config = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        'Accept': 'application/json'
    }
}

// async function getPersonalRating() {
//     const api = requests.fetchMovieDetails + "rates/personal/";
//     const personalRating = axios.get(api, config)
//         .then((response) => {
//             return response.data;
//         })
//     return personalRating;
// }

async function getPersonalReview() {
    const api = requests.fetchMovieDetails + "reviews/personal/";
    const personalReview = axios.get(api, config)
        .then((response) => {
            return response.data;
        })
    return personalReview;
}

const Overview = () => {
    const [profile, setProfile] = useState(Object);
    const [tempProfile, setTempProfile] = useState(Object);
    const [personalRating, setPersonalRating] = useState([]);
    const [personalReview, setPersonalReview] = useState([]);
    const [isEditing, setEditing] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState();
    const [changed, setChanged] = useState(false);

    const options = useMemo(() => countryList().getData(), []);
    const countryOptions = useMemo(() => countryList(), []);

    useEffect(() => {
        const fetchData = async () => {
            const profile = await getProfile();
            // const rate = await getPersonalRating();
            const review = await getPersonalReview();
            if (profile) {
                profile.data.country = profile.data.country ? countryOptions.getLabel(profile.data.country) : '';
                setProfile(profile.data);
                setTempProfile(profile.data);
            }
            // if (rate) {
            //     setPersonalRating(rate);
            // }
            if (review) {
                setPersonalReview(review);
            }
        };
        fetchData();
    }, []);

    const onClick = () => {
        console.log(profile);
        setEditing(!isEditing);
        if (!isEditing) {
            setTempProfile({ ...profile });
        }
    };

    const handleEdit = (e: { preventDefault(): unknown; target: { value: any; }; }, field: any) => {
        e.preventDefault()
        if (profile[field] !== e.target.value) {
            setChanged(true);
        }
        setProfile({
            ...profile,
            [field]: e.target.value
        });
    };

    const handleCountry = (e: any) => {
        setSelectedCountry(e);
        if (profile.country !== e.label) {
            setChanged(true);
        }
        setProfile({
            ...profile,
            "country": e.value
        });
    }

    const handleSave = async (e: any) => {
        e.preventDefault();
        if (changed) {
            const repsonse = await updateProfile(profile);
            if (repsonse.status === 200) {
                setChanged(false);
                setProfile({ ...profile });
                setProfile({ ...profile, "country": countryOptions.getLabel(profile.country) });
            }
        }
        setTempProfile({});
        setEditing(false);
    }

    const handleCancel = (e: any) => {
        e.preventDefault();
        setProfile({ ...tempProfile });
        setTempProfile({});
        setChanged(false);
        setEditing(false);
    }

    return (
        <div className="container mx-auto my-5 p-5 text-lg">
            <Widget />
            <div className="w-full h-64">
                <form className="bg-white p-3 shadow-sm px-[5%] pt-[2%]">
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
                                    <div className="px-4 py-2">{profile.first_name}</div>
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
                                    <div className="px-4 py-2">{profile.last_name}</div>
                                )}
                            </div>

                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Email</div>
                                <div className="px-4 py-2">{profile.account}</div>
                            </div>

                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Birthday</div>
                                <div className="px-4 py-2">{profile.birthday}</div>
                            </div>

                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Country</div>
                                {isEditing ? (
                                    <Select options={options} value={selectedCountry} onChange={handleCountry} />
                                ) : (
                                    <div className="px-4 py-2">{profile.country}</div>
                                )}
                            </div>
                        </div>

                        {isEditing ?
                            (<div>
                                <button onClick={handleSave}
                                    className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">Save</button>
                                <button onClick={handleCancel}
                                    className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">Cancel</button>
                            </div>)
                            :
                            (<button onClick={onClick}
                                className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">Edit</button>)
                        }
                    </div>
                </form>

                <div className="bg-white p-3 shadow-sm px-[5%] pb-[2%] flex justify-start">
                    <div className='flex w-[50%] p-2'>
                        <div className='w-full'>
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
                                <li className='border-gray-400 border-2'>
                                    <div className="text-teal-600">Hello World</div>
                                    <div className="text-gray-500 text-xs">March 2020 - Now</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='flex w-[50%] p-2'>
                        <div className='w-full'>
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
                                {personalReview.map((review: { movie: string }, index) => (
                                    <li key={index} className='border-gray-400 border-2'>
                                        <div className="text-teal-600">{review.movie}</div>
                                        <div className="text-gray-500 text-xs">March 2020 - Now</div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Overview;
