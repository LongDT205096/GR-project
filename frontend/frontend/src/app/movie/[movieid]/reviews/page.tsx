"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

import ReviewModal from "@/components/ReviewModal";
import Loader from "@/components/Loader";
import requests from "@/utils/requests";

axios.defaults.baseURL = "http://127.0.0.1:8000/";

async function getMovieReview(movieid: String) {
    const api = requests.fetchMovieDetails + movieid + "/reviews/";
    const movieReview = await axios.get(api)
        .then((response) => {
            return response.data;
        })
    return movieReview;
}

const Review = ({ params }: { params: { movieid: string } }) => {
    const [movieReview, setMovieReview] = useState([] as any);
    const [openModal, setModal] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getMovieReview(params.movieid);
            setMovieReview(data);
            setLoading(false);
        }
        fetchData();
    }, []);

    const handleModal = () => {
        console.log(movieReview.chart.rate_1)
        setModal(!openModal);
    }

    if (loading) {
        return <Loader />;
    }

    return (
        <div>
            <section className="py-8 antialiased md:py-16">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0 flex gap-10">
                    <div className="flex-auto">
                        <div className="mt-6 divide-y divide-gray-200">
                            { movieReview.reviews && 
                                movieReview.reviews.map(
                                    (review: any, index: number) => (
                                        <div key={index} className="gap-3 py-6 sm:flex sm:items-start">
                                        <div className="shrink-0 space-y-2 sm:w-48 md:w-72">
                                            <div className="flex items-center gap-0.5">
                                                <svg className="h-4 w-4 text-yellow-300" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                                                </svg>
    
                                                <svg className="h-4 w-4 text-yellow-300" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                                                </svg>
    
                                                <svg className="h-4 w-4 text-yellow-300" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                                                </svg>
    
                                                <svg className="h-4 w-4 text-yellow-300" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                                                </svg>
    
                                                <svg className="h-4 w-4 text-yellow-300" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                                                </svg>
                                            </div>
    
                                            <div className="space-y-0.5">
                                                <p className="text-base font-semibold text-white">Jese Leos</p>
                                                <p className="text-sm font-normal text-white">November 18 2023 at 15:35</p>
                                            </div>
                                        </div>
    
                                        <div className="mt-4 min-w-0 flex-1 space-y-4 sm:mt-0">
                                            <h1>Title:{review.title}</h1>
                                            <p className="text-base font-normal text-white">{review.content}</p>
    
                                            <div className="flex items-center gap-4">
                                                <p className="text-sm font-medium text-white">Was it helpful to you?</p>
                                                <div className="flex items-center">
                                                    <input id="reviews-radio-3" type="radio" value="" name="reviews-radio-2" className="h-4 w-4 border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500" />
                                                    <label htmlFor="reviews-radio-3" className="ms-2 text-sm font-medium text-gray-300"> Yes: 1 </label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input id="reviews-radio-4" type="radio" value="" name="reviews-radio-2" className="h-4 w-4 border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500" />
                                                    <label htmlFor="reviews-radio-4" className="ms-2 text-sm font-medium text-gray-300">No: 0 </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className="flex-auto w-1/4">
                        <div className="items-center gap-2">
                            <h2 className="text-2xl font-semibold text-white">Reviews</h2>
                        </div>

                        <div className="my-3 gap-8 ">
                            <div className="shrink-0 space-y-4">
                                <p className="text-2xl font-semibold leading-none text-white">4.65 out of 5</p>
                                <button type="button" onClick={handleModal} className="mb-2 me-2 rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300">Write a review</button>
                            </div>

                            <div className="mt-6 min-w-0 flex-1 space-y-3 sm:mt-5">
                                <div className="flex items-center gap-2">
                                    <p className="w-2 shrink-0 text-start text-sm font-medium leading-none text-white">5</p>
                                    <svg className="h-4 w-4 shrink-0 text-yellow-300" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                                    </svg>
                                    <div className="h-1.5 w-80 rounded-full bg-gray-200 ">
                                        <div className="w-[20%] h-1.5 rounded-full bg-yellow-300"></div>
                                    </div>
                                    <a href="#" className="w-8 shrink-0 text-right text-sm font-medium leading-none text-white hover:underline sm:w-auto sm:text-left">{movieReview.chart.rate_5} <span className=" sm:inline">reviews</span></a>
                                </div>

                                <div className="flex items-center gap-2">
                                    <p className="w-2 shrink-0 text-start text-sm font-medium leading-none text-white">4</p>
                                    <svg className="h-4 w-4 shrink-0 text-yellow-300" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                                    </svg>
                                    <div className="h-1.5 w-80 rounded-full bg-gray-200">
                                        <div className="w-[60%] h-1.5 rounded-full bg-yellow-300"></div>
                                    </div>
                                    <a href="#" className="w-8 shrink-0 text-right text-sm font-medium leading-none text-white hover:underline sm:w-auto sm:text-left">{movieReview.chart.rate_4} <span className=" sm:inline">reviews</span></a>
                                </div>

                                <div className="flex items-center gap-2">
                                    <p className="w-2 shrink-0 text-start text-sm font-medium leading-none text-white">3</p>
                                    <svg className="h-4 w-4 shrink-0 text-yellow-300" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                                    </svg>
                                    <div className="h-1.5 w-80 rounded-full bg-gray-200 ">
                                        <div className="w-[15%] h-1.5 rounded-full bg-yellow-300"></div>
                                    </div>
                                    <a href="#" className="w-8 shrink-0 text-right text-sm font-medium leading-none text-white hover:underline sm:w-auto sm:text-left">{movieReview.chart.rate_3} <span className=" sm:inline">reviews</span></a>
                                </div>

                                <div className="flex items-center gap-2">
                                    <p className="w-2 shrink-0 text-start text-sm font-medium leading-none text-white">2</p>
                                    <svg className="h-4 w-4 shrink-0 text-yellow-300" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                                    </svg>
                                    <div className="h-1.5 w-80 rounded-full bg-gray-200 ">
                                        <div className="w-[5%] h-1.5 rounded-full bg-yellow-300"></div>
                                    </div>
                                    <a href="#" className="w-8 shrink-0 text-right text-sm font-medium leading-none text-white hover:underline sm:w-auto sm:text-left">{movieReview.chart.rate_2} <span className=" sm:inline">reviews</span></a>
                                </div>

                                <div className="flex items-center gap-2">
                                    <p className="w-2 shrink-0 text-start text-sm font-medium leading-none text-white">1</p>
                                    <svg className="h-4 w-4 shrink-0 text-yellow-300" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                                    </svg>
                                    <div className="h-1.5 w-80 rounded-full bg-gray-200 ">
                                        <div className="w-[0%] h-1.5 rounded-full bg-yellow-300"></div>
                                    </div>
                                    <a href="#" className="w-8 shrink-0 text-right text-sm font-medium leading-none text-white hover:underline sm:w-auto sm:text-left">{movieReview.chart.rate_1} <span className=" sm:inline">reviews</span></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 text-center">
                    <button type="button" className="mb-2 me-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:underline focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100">View more reviews</button>
                </div>
            </section>
            {openModal && <ReviewModal movieId={params.movieid} handleModal={handleModal} />}
        </div>
    );
}
export default Review;
