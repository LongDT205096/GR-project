'use client'
import React, { useState } from 'react';
import axios from 'axios';

import requests from '@/utils/requests';

axios.defaults.baseURL = 'http://127.0.0.1:8000/';

const ReviewModal = ({ movieId, handleModal }: { movieId: string, handleModal: () => void }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [spoiled, setSpoiled] = useState(false);

    const handleTitle = (e: { preventDefault(): unknown; target: { value: any; }; }) => {
        e.preventDefault()
        setTitle(e.target.value)
    };

    const handleContent = (e: { preventDefault(): unknown; target: { value: any; }; }) => {
        e.preventDefault()
        setContent(e.target.value)
    };

    const handleSpoiled = (e: { preventDefault(): unknown; target: { checked: any; }; }) => {
        e.preventDefault()
        setSpoiled(e.target.checked)
    };

    const handleSave = () => {
        const api = requests.fetchMovieDetails + movieId + '/reviews/new/';
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json'
            }
        }
        const body = JSON.stringify({
            "title": title,
            "content": content,
            "spoiled": spoiled
        });
        axios.post(api, body, config)
            .then((response) => {
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });
        handleModal();
    }

    return (
        <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center'>
            <div className='absolute top-0 left-0 w-full h-full bg-black opacity-50'></div>
            <div className="relative max-h-full w-full max-w-2xl p-4">
                <div className="relative rounded-lg bg-white shadow">
                    <div className="flex items-center justify-between rounded-t border-b border-gray-200 p-4 md:p-5">
                        <div>
                            <h3 className="mb-1 text-lg font-semibold text-black">Add a review for:</h3>
                            <a href="#" className="font-medium text-black hover:underline">Apple iMac 2021</a>
                        </div>
                        <button type="button" onClick={handleModal} className="absolute right-5 top-5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:hover:bg-gray-600 ">
                            <svg className="h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>

                    <form className="p-4 md:p-5">
                        <div className="mb-4 grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <div className="flex items-center">
                                    <svg className="h-6 w-6 text-yellow-300" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                    </svg>
                                    <svg className="ms-2 h-6 w-6 text-yellow-300" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                    </svg>
                                    <svg className="ms-2 h-6 w-6 text-yellow-300" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                    </svg>
                                    <svg className="ms-2 h-6 w-6 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                    </svg>
                                    <svg className="ms-2 h-6 w-6 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                    </svg>
                                    <span className="ms-2 text-lg font-bold text-black">3.0 out of 5</span>
                                </div>
                            </div>
                            <div className="col-span-2">
                                <div className="flex items-center">
                                    <input type="checkbox"
                                            checked={spoiled}
                                            onChange={handleSpoiled} 
                                            className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600  dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                                    <label htmlFor="review-checkbox" className="ms-2 text-sm font-medium text-black">spoiled</label>
                                    </div>
                                </div>
                            <div className="col-span-2">
                                <label htmlFor="title" className="mb-2 block text-sm font-medium text-black">Review title</label>
                                <input type="text" value={title}
                                        onChange={handleTitle} 
                                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600" required />
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="description" className="mb-2 block text-sm font-medium text-black">Review description</label>
                                <textarea
                                    value={content}
                                    onChange={handleContent}
                                    rows={6} className="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500" required></textarea>
                            </div>

                        </div>
                        <div className="border-t border-gray-200 pt-4 md:pt-5">
                            <button type="submit" onClick={handleSave} className="me-2 inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300">Add review</button>
                            <button type="button" onClick={handleModal} className="me-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-black focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ReviewModal;
