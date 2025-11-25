import React from "react";
import { Card, Row, Col, Rate, Typography } from "antd";
const { Text, Title } = Typography;
import Images from "@/constants/images";
import Image from "next/image";
const CustomerReview = (props: any) => {
  const reviews = [
    {
      name: "Samantha Payne",
      handle: "@SamPayne90",
      date: "23 Nov 2023",
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam, purus at amet lectus venenatis, lectus magna fringilla.",
      image: "/profile1.jpg",
      rating: 5,
    },
    {
      name: "Samantha Payne",
      handle: "@SamPayne90",
      date: "23 Nov 2023",
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam, purus at amet lectus venenatis, lectus magna fringilla.",
      image: "/profile2.jpg",
      rating: 4,
    },
    {
      name: "Samantha Payne",
      handle: "@SamPayne90",
      date: "23 Nov 2023",
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam, purus at amet lectus venenatis, lectus magna fringilla.",
      image: "/profile3.jpg",
      rating: 5,
    },
    {
      name: "Samantha Payne",
      handle: "@SamPayne90",
      date: "23 Nov 2023",
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam, purus at amet lectus venenatis, lectus magna fringilla.",
      image: "/profile4.jpg",
      rating: 4,
    },
  ];

  return (
    <>
      {/* Reviews Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-3">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 text-left"
          >
            <p className="text-gray-700 mb-4">
              {review.review}{" "}
              <span className="text-blue-500 cursor-pointer">Show more</span>
            </p>
            <p className="text-sm text-gray-500 mb-2">{review.date}</p>
            {/* User Info */}
            <div className="flex ">
              <img
                src={`https://img.freepik.com/premium-psd/greeting-card-with-flowers-it-pink-background_74869-4261.jpg?w=826`}
                alt={review.name}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <p className="text-sm font-semibold m-0">{review.name}</p>
                <p className="text-sm text-gray-500 m-0">{review.handle}</p>
                {/* Rating */}
                <div className="flex">
                  {Array.from({ length: review.rating }, (_, i) => (
                    <Image
                      src={Images.star}
                      key={i}
                      alt="card 2"
                      className="w-5 h-5 "
                      width={10}
                      height={10}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Dots (Optional) */}
      <div className="flex justify-center mt-6 space-x-2">
        <span className="w-3 h-3 bg-orange-400 rounded-full"></span>
        <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
        <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
      </div>
    </>
  );
};

export default CustomerReview;
