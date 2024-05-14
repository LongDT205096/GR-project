"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import Link from "next/link";
import Avatar from "../../public/assets/img/avatar.png";

const castprofilepath = "https://image.tmdb.org/t/p/w185";
const CastCarousel = ({ Cast }: { Cast: Array<any> }) => {
  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    centerMode: false,
    centerPadding: "60px",
    focusOnSelect: false,
    autoplay: true,
    mobileFirst: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "80px",
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 800,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "30px",
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
        },
      },
    ],
  };
  return (
    <div className="swiper-component my-5 md:w-[90%] mx-auto">
      <div className="heading">
        <h1 className="text-2xl md:mx-0 mx-3 my-3">Cast & Crew</h1>
      </div>
      <Slider {...settings}>
        {Cast &&
          Cast.map((castdetails, index: React.Key | null | undefined) => (
            <Link key={index} href={`/cast/${castdetails.id}`}>
              <div className="castContainer w-[200px] h-[300px]">
                <div className="rounded-full h-28 w-28 mx-auto overflow-hidden">
                  <Image
                    src={
                      castdetails.profile_path != null
                        ? `${castprofilepath + castdetails.profile_path}`
                        : Avatar
                    }
                    alt={`${castdetails.original_name}`}
                    width={200}
                    height={100}
                    objectFit="cover"
                    className="cursor-pointer slide"
                    unoptimized
                  />
                </div>
                <div className="text-center my-3">
                  <h1 className="font-bold">{castdetails.name}</h1>
                  <p className="font-light text-sm">{castdetails.character}</p>
                </div>
                <p></p>
              </div>
            </Link>
          ))}
      </Slider>
    </div>
  );
};

export default CastCarousel;
