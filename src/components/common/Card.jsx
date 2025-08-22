import React from "react";
import Image from "next/image";
import Images from "@/constants/images";
import { Api } from "@/interfaces/interfaces";
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

// const array = [
//   'https://img.freepik.com/premium-psd/greeting-card-with-flowers-it-pink-background_74869-4261.jpg?w=826',
//   "https://img.freepik.com/premium-vector/simple-floral-thank-you-card-with-watercolor-background_694794-178.jpg?w=1380",
//   "https://img.freepik.com/premium-photo/wedding-invitation-with-flowers-flower-middle_1191871-49377.jpg?w=740",
//   "https://img.freepik.com/free-vector/elegant-daisy-flower-wedding-invitation-card-template_44538-9850.jpg?t=st=1726234933~exp=1726238533~hmac=76bd2c3ed266dec873f39372aaa1973615b57c50375696a913e26d05d5c0598f&w=1380",
//   "https://img.freepik.com/free-psd/beautiful-christmas-floral-wreath-frame-design_21799-10722.jpg?t=st=1726234955~exp=1726238555~hmac=c4406c10583bd202e08964dd43e645727f6f30c21b0db39506af66d271629888&w=1380",
//   "https://img.freepik.com/free-vector/summer-wedding-invitation_53876-92838.jpg?t=st=1726235013~exp=1726238613~hmac=83595c3903b855f20775c71b2bc347e136a2d79fd424053a26770c2514f71cdd&w=826",
//   "https://img.freepik.com/free-psd/beautiful-watercolor-wedding-invitation-card-with-elegant-flower-tiny-foliage_44538-10601.jpg?t=st=1726235036~exp=1726238636~hmac=d1dc9a692078bdca87612cb7db66afe125d8c3af762cab4f66d5add701eac784&w=1060"
// ]

const Card = ({ item, index }) => {
  console.log(item, "asdasd");

  const matchingCard = array.find((card) => card.type === item.type);
  console.log(matchingCard, "matchingCard");

  const imageToDisplay = matchingCard
    ? matchingCard.image
    : array[index]?.image;

  return (
    <>
      {/* <div className="max-w-sm 2xl:w-64 2xl:h-80 md:w-40 md:w-48 sm:w-48 md:h-40 sm:w-44  sm:h-44 sm:w-40  sm:h-40 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden"> */}
      {/* <p className="">{item?.collection_uri}</p> */}
      <div className="min-h-[300px] min_height">
        <Link href={`/card/new/${item?.uuid}?category=${item?.title}`}>
          <Image
            className="rounded-t-lg w-full min-h-[300px] object-cover rounded-md"
            src={`${process.env.NEXT_PUBLIC_API_URL}/${item?.images[0]?.card_images[0]}`}
            layout="responsive"
            width={500} // Set appropriate width
            height={300} // Set appropriate height
            alt="card-img"
          />
        </Link>
      </div>
    </>
  );
};

export default Card;
