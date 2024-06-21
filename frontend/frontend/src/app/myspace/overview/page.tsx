'use client';
import React, { useEffect, useState, useMemo } from 'react';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import axios from 'axios';

import { getProfile, updateProfile } from '@/actions/auth';
import requests from '@/utils/requests';
import Widget from '@/components/Widget';
import Loader from '@/components/Loader';
import EmblaCarousel from '@/components/EmblaCarousel';

axios.defaults.baseURL = 'http://127.0.0.1:8000/';

async function getRecommendMovies() {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/json'
        }
    }
    const api = requests.fetchRecommend;
    const recommendMovies = axios.get(api, config)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.error("Error fetching movie data:", error);
        });
    return recommendMovies;
}

const Overview = () => {
    const [profile, setProfile] = useState(Object);
    const [tempProfile, setTempProfile] = useState(Object);
    const [recommendMovies, setRecommendMovies] = useState(null);

    const [isEditing, setEditing] = useState(false);
    const [changed, setChanged] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState();

    const [isLoading, setIsLoading] = useState(true);

    const options = useMemo(() => countryList().getData(), []);
    const countryOptions = useMemo(() => countryList(), []);

    useEffect(() => {
        const fetchData = async () => {
            const profile = await getProfile();
            const recommend = await getRecommendMovies();

            await Promise.all([profile, recommend]);

            profile.data.country = profile.data.country ? countryOptions.getLabel(profile.data.country) : '';
            setProfile(profile.data);
            setTempProfile(profile.data);
            setRecommendMovies(recommend);
            setIsLoading(false);
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
        setSelectedCountry(tempProfile.country);
        setTempProfile({});
        setChanged(false);
        setEditing(false);
    }

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="container mx-auto my-10 text-lg h-full bg-white">
            <Widget />
            <div className="w-ful">
                <form className="p-3 px-[5%] pt-[2%]">
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
                    <div className="text-gray-700 w-[80%] mx-auto">
                        <div className="grid md:grid-cols-2 text-sm mt-4 gap-x-2">
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

                { recommendMovies ? (
                <div className="w-full mx-auto">
                    <div className="sm:ml-16 ml-0 h-full overflow-hidden">
                        <div className="heading md:mx-0 mx-auto md:w-auto w-[90%]">
                            <div className="w-full flex justify-between items-center">
                                <h1 className="text-2xl my-3 text-gray-700">Recommend for you</h1>
                            </div>
                        </div>
                        <EmblaCarousel Categories={recommendMovies} />
                    </div>
                </div> ) : "" }
            </div>
        </div>
    );
}

export default Overview;
