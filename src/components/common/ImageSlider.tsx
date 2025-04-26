// components/ImageSlider.js
"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css"; // Import Swiper styles
import cardData from "../../constants/CardJson/card.json";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import Card from "./Card";
import Image from "next/image";
import Images from "@/constants/images";
import Link from "next/link";
const array = [
  {
    id: 1,
    image: Images.card_1,
    type: "farewell",
  },
  {
    id: 2,
    image: Images.card_2,
    type: "birthday",
  },
  {
    id: 3,
    image: Images.card_3,
    type: "wedding",
  },
  {
    id: 4,
    image: Images.card_4,
    type: "baby",
  },
  {
    id: 5,
    image: Images.card_5,
    type: "sympathy",
  },
  {
    id: 6,
    image: Images.card_2,
    type: "sympathy",
  },
  {
    id: 7,
    image: Images.card_3,
    type: "sympathy",
  },
];

const ImageSlider = () => {
  return (
    <div>
      <Swiper
        spaceBetween={30}
        slidesPerView={5}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        modules={[Navigation, Pagination, Scrollbar]} // Use modules array here
      >
        {array?.map((item, index) => (
          <SwiperSlide key={index}>
            {/* <Card item={item} index={index} /> */}
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <Link href={`/card/new/1?category=${item?.type}`}>
                <Image
                  className="rounded-t-lg w-100 h-100 object-cover"
                  src={item.image}
                  width={250}
                  height={250}
                  alt="card-img"
                />
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
