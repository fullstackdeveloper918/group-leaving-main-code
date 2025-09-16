import React from "react";
import Filter from "./common/Filter";
import Images from "@/constants/images";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css"; // Import Swiper styles
import Link from "next/link";
import { Api } from "@/interfaces/interfaces";
import { fetchFromServer } from "@/app/actions/fetchFromServer";

const HomeCategorySection = async ({ params, searchParams }: any) => {
  console.log(searchParams?.category, "yuuuuuuu");

  const array = [
    {
      id: 1,
      image: Images.fairwell1,
      card_label: "trending",
      type: "farewell",
    },
    {
      id: 2,
      image: Images.fairwell2,
      card_label: "trending",
      type: "farewell",
    },
    { id: 3, image: Images.fairwell3, card_label: "latest", type: "farewell" },
    {
      id: 4,
      image: Images.fairwell4,
      card_label: "trending",
      type: "farewell",
    },
    { id: 5, image: Images.fairwell5, card_label: "latest", type: "farewell" },
    {
      id: 6,
      image: Images.fairwell6,
      card_label: "trending",
      type: "farewell",
    },
    {
      id: 7,
      image: Images.fairwell7,
      card_label: "trending",
      type: "farewell",
    },
    {
      id: 8,
      image: Images.fairwell8,
      card_label: "trending",
      type: "farewell",
    },
    { id: 9, image: Images.fairwell9, card_label: "latest", type: "farewell" },
    {
      id: 10,
      image: Images.fairwell10,
      card_label: "trending",
      type: "farewell",
    },
    {
      id: 11,
      image: Images.fairwell11,
      card_label: "latest",
      type: "farewell",
    },
    {
      id: 12,
      image: Images.fairwell12,
      card_label: "trending",
      type: "farewell",
    },
    {
      id: 13,
      image: Images.fairwell13,
      card_label: "latest",
      type: "farewell",
    },
    {
      id: 14,
      image: Images.fairwell14,
      card_label: "trending",
      type: "farewell",
    },
    {
      id: 15,
      image: Images.fairwell15,
      card_label: "latest",
      type: "farewell",
    },
    {
      id: 16,
      image: Images.fairwell16,
      card_label: "trending",
      type: "farewell",
    },
    // birthday
    {
      id: 17,
      image: Images.birthday1,
      card_label: "trending",
      type: "birthday",
    },
    {
      id: 18,
      image: Images.birthday2,
      card_label: "trending",
      type: "birthday",
    },
    { id: 19, image: Images.birthday3, card_label: "latest", type: "birthday" },
    {
      id: 20,
      image: Images.birthday4,
      card_label: "trending",
      type: "birthday",
    },
    { id: 21, image: Images.birthday5, card_label: "latest", type: "birthday" },
    {
      id: 22,
      image: Images.birthday6,
      card_label: "trending",
      type: "birthday",
    },
    {
      id: 23,
      image: Images.birthday7,
      card_label: "trending",
      type: "birthday",
    },
    {
      id: 24,
      image: Images.birthday8,
      card_label: "trending",
      type: "birthday",
    },
    { id: 25, image: Images.birthday9, card_label: "latest", type: "birthday" },
    {
      id: 26,
      image: Images.birthday10,
      card_label: "trending",
      type: "birthday",
    },
    // baby
    { id: 27, image: Images.baby1, card_label: "trending", type: "baby" },
    { id: 28, image: Images.baby2, card_label: "trending", type: "baby" },
    { id: 29, image: Images.baby3, card_label: "latest", type: "baby" },
    { id: 30, image: Images.baby4, card_label: "trending", type: "baby" },
    { id: 31, image: Images.baby5, card_label: "latest", type: "baby" },
    { id: 32, image: Images.baby6, card_label: "trending", type: "baby" },
    { id: 33, image: Images.baby7, card_label: "trending", type: "baby" },
    { id: 34, image: Images.baby8, card_label: "trending", type: "baby" },
    { id: 35, image: Images.baby9, card_label: "latest", type: "baby" },
    { id: 36, image: Images.baby10, card_label: "trending", type: "baby" },
    // wedding
    { id: 37, image: Images.wedding1, card_label: "trending", type: "wedding" },
    { id: 38, image: Images.wedding2, card_label: "trending", type: "wedding" },
    { id: 39, image: Images.wedding3, card_label: "latest", type: "wedding" },
    { id: 40, image: Images.wedding4, card_label: "trending", type: "wedding" },
    { id: 41, image: Images.wedding5, card_label: "latest", type: "wedding" },
    { id: 42, image: Images.wedding6, card_label: "trending", type: "wedding" },
    { id: 43, image: Images.wedding7, card_label: "trending", type: "wedding" },
    { id: 44, image: Images.wedding8, card_label: "trending", type: "wedding" },
    { id: 45, image: Images.wedding9, card_label: "latest", type: "wedding" },
    {
      id: 46,
      image: Images.wedding10,
      card_label: "trending",
      type: "wedding",
    },
    // well
    { id: 47, image: Images.well1, card_label: "trending", type: "get-well" },
    { id: 48, image: Images.well2, card_label: "trending", type: "get-well" },
    { id: 49, image: Images.well3, card_label: "latest", type: "get-well" },
    { id: 50, image: Images.well4, card_label: "trending", type: "get-well" },
    { id: 51, image: Images.well5, card_label: "latest", type: "get-well" },
    { id: 52, image: Images.well6, card_label: "trending", type: "get-well" },
    { id: 53, image: Images.well7, card_label: "trending", type: "get-well" },
    { id: 54, image: Images.well8, card_label: "trending", type: "get-well" },
    { id: 55, image: Images.well9, card_label: "latest", type: "get-well" },
    { id: 56, image: Images.well10, card_label: "trending", type: "get-well" },
    // sympathy
    {
      id: 57,
      image: Images.sympathy1,
      card_label: "trending",
      type: "sympathy",
    },
    {
      id: 58,
      image: Images.sympathy2,
      card_label: "trending",
      type: "sympathy",
    },
    { id: 59, image: Images.sympathy3, card_label: "latest", type: "sympathy" },
    {
      id: 60,
      image: Images.sympathy4,
      card_label: "trending",
      type: "sympathy",
    },
    { id: 61, image: Images.sympathy5, card_label: "latest", type: "sympathy" },
    {
      id: 62,
      image: Images.sympathy6,
      card_label: "trending",
      type: "sympathy",
    },
    {
      id: 63,
      image: Images.sympathy7,
      card_label: "trending",
      type: "sympathy",
    },
    {
      id: 64,
      image: Images.sympathy8,
      card_label: "trending",
      type: "sympathy",
    },
    { id: 65, image: Images.sympathy9, card_label: "latest", type: "sympathy" },
    {
      id: 66,
      image: Images.sympathy10,
      card_label: "trending",
      type: "sympathy",
    },
    // teacher
    { id: 67, image: Images.teacher1, card_label: "trending", type: "teacher" },
    { id: 68, image: Images.teacher2, card_label: "trending", type: "teacher" },
    { id: 69, image: Images.teacher3, card_label: "latest", type: "teacher" },
    { id: 70, image: Images.teacher4, card_label: "trending", type: "teacher" },
    { id: 71, image: Images.teacher5, card_label: "latest", type: "teacher" },
    { id: 72, image: Images.teacher6, card_label: "trending", type: "teacher" },
    { id: 73, image: Images.teacher7, card_label: "trending", type: "teacher" },
    { id: 74, image: Images.teacher8, card_label: "trending", type: "teacher" },
    { id: 75, image: Images.teacher9, card_label: "latest", type: "teacher" },
    {
      id: 76,
      image: Images.teacher10,
      card_label: "trending",
      type: "teacher",
    },
    // thanks
    {
      id: 67,
      image: Images.thanks1,
      card_label: "trending",
      type: "thank-you",
    },
    {
      id: 68,
      image: Images.thanks2,
      card_label: "trending",
      type: "thank-you",
    },
    { id: 69, image: Images.thanks3, card_label: "latest", type: "thank-you" },
    {
      id: 70,
      image: Images.thanks4,
      card_label: "trending",
      type: "thank-you",
    },
    { id: 71, image: Images.thanks5, card_label: "latest", type: "thank-you" },
    {
      id: 72,
      image: Images.thanks6,
      card_label: "trending",
      type: "thank-you",
    },
    {
      id: 73,
      image: Images.thanks7,
      card_label: "trending",
      type: "thank-you",
    },
    {
      id: 74,
      image: Images.thanks8,
      card_label: "trending",
      type: "thank-you",
    },
    { id: 75, image: Images.thanks9, card_label: "latest", type: "thank-you" },
    {
      id: 76,
      image: Images.thanks10,
      card_label: "trending",
      type: "thank-you",
    },
    // thanks
    {
      id: 77,
      image: Images.retirement1,
      card_label: "trending",
      type: "retirement",
    },
    {
      id: 78,
      image: Images.retirement2,
      card_label: "trending",
      type: "retirement",
    },
    {
      id: 79,
      image: Images.retirement3,
      card_label: "latest",
      type: "retirement",
    },
    {
      id: 80,
      image: Images.retirement4,
      card_label: "trending",
      type: "retirement",
    },
    {
      id: 81,
      image: Images.retirement5,
      card_label: "latest",
      type: "retirement",
    },
    {
      id: 82,
      image: Images.retirement6,
      card_label: "trending",
      type: "retirement",
    },
    {
      id: 83,
      image: Images.retirement7,
      card_label: "trending",
      type: "retirement",
    },
    {
      id: 84,
      image: Images.retirement8,
      card_label: "trending",
      type: "retirement",
    },
    {
      id: 85,
      image: Images.retirement9,
      card_label: "latest",
      type: "retirement",
    },
    {
      id: 86,
      image: Images.retirement10,
      card_label: "trending",
      type: "retirement",
    },
    // congratulations
    {
      id: 87,
      image: Images.congratulations1,
      card_label: "trending",
      type: "congratulations",
    },
    {
      id: 88,
      image: Images.congratulations2,
      card_label: "trending",
      type: "congratulations",
    },
    {
      id: 89,
      image: Images.congratulations3,
      card_label: "latest",
      type: "congratulations",
    },
    {
      id: 90,
      image: Images.congratulations4,
      card_label: "trending",
      type: "congratulations",
    },
    {
      id: 91,
      image: Images.congratulations5,
      card_label: "latest",
      type: "congratulations",
    },
    {
      id: 92,
      image: Images.congratulations6,
      card_label: "trending",
      type: "congratulations",
    },
    {
      id: 93,
      image: Images.congratulations7,
      card_label: "trending",
      type: "congratulations",
    },
    {
      id: 94,
      image: Images.congratulations8,
      card_label: "trending",
      type: "congratulations",
    },
    {
      id: 95,
      image: Images.congratulations9,
      card_label: "latest",
      type: "congratulations",
    },
    {
      id: 96,
      image: Images.congratulations10,
      card_label: "trending",
      type: "congratulations",
    },
  ];

  const filteredCards = array.filter(
    (card) => card.type === searchParams?.category?.category
  );
  const filteredCards1 = array.filter((card) => card.type);
  // const type = searchParams?.category||"farewell"
  // console.log(type,"ioioio");

  // const type = params.slug[0];

  // console.log(type,"type");

  //  Sidebar

  let data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/card/collection-listing`,
    { cache: "no-store" }
  );
  let data1 = await data.json();
  console.log(data1, "qwe323355");
  //  const url = 'https://dating.goaideme.com/card/collection-listing';

  //  const response1 = await fetch(url, {
  //   method: 'GET',
  //   cache: 'no-store',
  // });

  // const data = await response1.json();
  //   console.log(data, "check145454523");
  const normalizedType =
    searchParams?.category?.replace("-", " ") || "farewell";
  console.log(normalizedType, "normalizedType");

  const matchedObject = data1.data.find((item: any) => {
    const normalizedTags = item.collection_title.replace("-", " ");
    return normalizedTags === normalizedType;
  });
  console.log(matchedObject, "matchedObject");
  const collectionType = matchedObject ? matchedObject.uuid : null;
  console.log(collectionType, "collectionType");

  // All cards

  const api2: Api = {
    url: `${process.env.NEXT_PUBLIC_API_URL}/card/single-card-listing/${collectionType}`,
    method: "GET",
    // body: { key: 'value' }
    // comment only
  };

  const response = await fetchFromServer(api2);
  console.log(response, "response on homecategorysection");

  const cardLabel = "params.slug[1]";
  //  console.log(type, "tyjgjgjgjgpe");

  return (
    <div>
      <Filter
        urlValue={searchParams?.category}
        cardLabel={cardLabel}
        response={data1}
      />
      {/* <Filter searchParams={searchParams} /> */}

      <div className="flex flex-col items-center  bg-white">
        <div className=" flex lg:space-x-8  space-x-6 md:w-full md:max-w-full justify-center max-w-[96%] mx-auto flex_responsive">
          {response?.data > 0
            ? response?.data?.slice(0, 4).map((card: any) => (
                <div
                  key={card.id}
                  className="max-w-sm lg:w-64 lg:h-80 md:w-[150px] md:h-[150px] w-[100px] h-[100px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden"
                >
                  <Link
                    href={`/card/new/${card?.uuid}?category=${card?.title}`}
                  >
                    <Image
                      className="rounded-t-lg w-full h-full object-cover"
                      src={`${process.env.NEXT_PUBLIC_API_URL}/   ${card?.images[0]?.card_images[0]}`}
                      alt="card-img"
                      width={100}
                      height={100}
                    />
                  </Link>
                </div>
              ))
            : response?.data?.slice(0, 4).map((card: any) => (
                <div
                  key={card.id}
                  // className="max-w-sm 2xl:w-64 2xl:h-80 xl:w-56 xl:h-56 md:w-[150px] md:h-[150px] w-[100px] h-[100px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden"
                  className="card_width_img"
                >
                  <Link
                    href={`/card/new/${card?.uuid}?category=${card?.title}`}
                  >
                    <Image
                      className="rounded-t-lg w-full h-full object-cover"
                      src={`${process.env.NEXT_PUBLIC_API_URL}/${card?.images[0]?.card_images[0]}`}
                      alt="card-img"
                      width={500}
                      height={300}
                    />
                  </Link>
                </div>
              ))}
          {/* {filteredCards.length > 0 ? (
            filteredCards.slice(0, 4).map((card) => (
              <div
                key={card.id}
                className="max-w-sm lg:w-64 lg:h-80 md:w-[150px] md:h-[150px] w-[100px] h-[100px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden"
              >
                <a href={`/card/new/${card.id}?category=${card.type}`}>
                  <Image
                    className="rounded-t-lg w-full h-full object-cover"
                    src={card.image}
                    alt="card-img"
                  />
                </a>
              </div>
            ))
          ) : (
            filteredCards1.slice(0, 4).map((card) => (
              <div
                key={card.id}
                className="max-w-sm 2xl:w-64 2xl:h-80 xl:w-56 xl:h-56 md:w-[150px] md:h-[150px] w-[100px] h-[100px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden"
                >
                <a href={`/card/new/${card.id}?category=${card.type}`}>
                  <Image
                    className="rounded-t-lg w-full h-full object-cover"
                    src={card.image}
                    alt="card-img"
                  />
                </a>
              </div>
            ))
          )} */}
        </div>
        <div>
          <Link href={`/card/${searchParams?.category || "farewell"}`}>
            <button className=" btnPrimary mx-auto my-5 mb-3">
              See more designs
            </button>
          </Link>
        </div>
      </div>
      {/* <div className="flex justify-center">
  <Swiper
    spaceBetween={30}
    slidesPerView={4}
    pagination={{ clickable: true }}
    scrollbar={{ draggable: true }}
    modules={[Navigation, Pagination, Scrollbar]}
  >
    {filteredCards?.map((item) => (
      <SwiperSlide key={item.id}>
        <div className="max-w-sm w-44 h-60 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
          <a href={`/card/new/${item.id}?category=${item.type}`}>
            <Image
              className="rounded-t-lg w-full h-full object-cover"
              src={item.image}
              alt="card-img"
            />
          </a>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
</div> */}
    </div>
  );
};

export default HomeCategorySection;
