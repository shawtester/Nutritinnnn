"use client";

import Link from "next/link";
import Slider from "react-slick";

export default function Categories({ categories }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Display 4 items on large screens
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024, // Adjust for medium-sized screens
        settings: {
          slidesToShow: 3, // Show 3 items
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600, // Adjust for smaller screens
        settings: {
          slidesToShow: 2, // Show 2 items on screens smaller than 600px
          slidesToScroll: 2,
          initialSlide: 0, // Adjust for smaller screen size, start from first item
        },
      },
      {
        breakpoint: 480, // Adjust for very small screens
        settings: {
          slidesToShow: 2, // Show 1 item on screens smaller than 480px
          slidesToScroll: 2,
        },
      },
    ],
  };

  if (categories.length === 0) {
    return <></>;
  }

  return (
    <div className="flex flex-col gap-8 justify-center overflow-hidden md:p-10 p-5 bg-gradient-to-r from-pink-400 to-red-500 rounded-xl shadow-lg">
      <div className="flex justify-center w-full">
        <h1 className="text-3xl font-bold text-white text-center">Shop By Category</h1>
      </div>
      <Slider {...settings}>
        {(categories?.length <= 2
          ? [...categories, ...categories, ...categories]
          : categories
        )?.map((category, index) => {
          return (
            <Link href={`/categories/${category?.id}`} key={category?.id || `category-${index}`}>
              <div className="flex flex-col gap-4 items-center justify-center mx-2">
                {/* Stylish image container */}
                <div className="w-full md:w-40 h-48 md:h-44 rounded-lg border-4 border-gradient-to-r from-blue-500 via-purple-600 to-pink-500 p-1 shadow-lg hover:scale-105 transition-all">
                  <div className="w-full h-full border-2 border-gray-300 rounded-lg overflow-hidden ">
                    {/* Image with fixed height and object-fit */}
                    <img
                      className="object-cover w-full h-full"
                      src={category?.imageURL}
                      alt={category?.name || "Category"}
                    />
                  </div>
                </div>
                {/* Title with closer alignment to image */}
                <h2 className="text-xl font-semibold text-gray-800 ">{category?.name}</h2>
              </div>
            </Link>
          );
        })}
      </Slider>
    </div>
  );
}
