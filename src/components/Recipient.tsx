import Image from "next/image";
import React from "react";
import MultiStepForm from "./common/MultiStepForm";
import cardData from "../constants/CardJson/card.json";
import Images from "@/constants/images";
import { fetchFromServer } from "@/app/actions/fetchFromServer";
import { Api } from "@/interfaces/interfaces";
import { cookies } from "next/headers";
// const array = [
//   {
//     id: 1,
//     image: Images.card_1,
//     type: "farewell"
//   },
//   {
//     id: 2,
//     image: Images.card_2,
//     type: "birthday"
//   },
//   {
//     id: 3,
//     image: Images.card_3,
//     type: "wedding"
//   },
//   {
//     id: 4,
//     image: Images.card_4,
//     type: "baby"
//   },
//   {
//     id: 5,
//     image: Images.card_5,
//     type: "sympathy"
//   },
//   {
//     id: 6,
//     image: Images.card_2,
//     type: "sympathy"
//   },
//   {
//     id: 7,
//     image: Images.card_3,
//     type: "sympathy"
//   },
// ]
// const array = [
//   { id: 1, image: Images.fairwell1, type: "farewell" },
//   { id: 2, image: Images.fairwell2, type: "farewell" },
//   { id: 3, image: Images.fairwell3, type: "farewell" },
//   { id: 4, image: Images.fairwell4, type: "farewell" },
//   { id: 5, image: Images.fairwell5, type: "farewell" },
//   { id: 6, image: Images.fairwell6, type: "farewell" },
//   { id: 7, image: Images.fairwell7, type: "farewell" },
//   { id: 8, image: Images.fairwell8, type: "farewell" },
//   { id: 9, image: Images.fairwell9, type: "farewell" },
//   { id: 10, image: Images.fairwell10, type: "farewell" },
//   { id: 11, image: Images.fairwell11, type: "farewell" },
//   { id: 12, image: Images.fairwell12, type: "farewell" },
//   { id: 13, image: Images.fairwell13, type: "farewell" },
//   { id: 14, image: Images.fairwell14, type: "farewell" },
//   { id: 15, image: Images.fairwell15, type: "farewell" },
//   { id: 16, image: Images.fairwell16, type: "farewell" },
//   // birthday
//   { id: 17, image: Images.birthday1, type: "birthday" },
//   { id: 18, image: Images.birthday2, type: "birthday" },
//   { id: 19, image: Images.birthday3, type: "birthday" },
//   { id: 20, image: Images.birthday4, type: "birthday" },
//   { id: 21, image: Images.birthday5, type: "birthday" },
//   { id: 22, image: Images.birthday6, type: "birthday" },
//   { id: 23, image: Images.birthday7, type: "birthday" },
//   { id: 24, image: Images.birthday8, type: "birthday" },
//   { id: 25, image: Images.birthday9, type: "birthday" },
//   { id: 26, image: Images.birthday10, type: "birthday" },
//   // baby
//   { id: 27, image: Images.baby1, type: "baby" },
//   { id: 28, image: Images.baby2, type: "baby" },
//   { id: 29, image: Images.baby3, type: "baby" },
//   { id: 30, image: Images.baby4, type: "baby" },
//   { id: 31, image: Images.baby5, type: "baby" },
//   { id: 32, image: Images.baby6, type: "baby" },
//   { id: 33, image: Images.baby7, type: "baby" },
//   { id: 34, image: Images.baby8, type: "baby" },
//   { id: 35, image: Images.baby9, type: "baby" },
//   { id: 36, image: Images.baby10, type: "baby" },
//   // wedding
//   { id: 37, image: Images.wedding1, type: "wedding" },
//   { id: 38, image: Images.wedding2, type: "wedding" },
//   { id: 39, image: Images.wedding3, type: "wedding" },
//   { id: 40, image: Images.wedding4, type: "wedding" },
//   { id: 41, image: Images.wedding5, type: "wedding" },
//   { id: 42, image: Images.wedding6, type: "wedding" },
//   { id: 43, image: Images.wedding7, type: "wedding" },
//   { id: 44, image: Images.wedding8, type: "wedding" },
//   { id: 45, image: Images.wedding9, type: "wedding" },
//   { id: 46, image: Images.wedding10, type: "wedding" },
//   // well
//   { id: 47, image: Images.well1, type: "get-well" },
//   { id: 48, image: Images.well2, type: "get-well" },
//   { id: 49, image: Images.well3, type: "get-well" },
//   { id: 50, image: Images.well4, type: "get-well" },
//   { id: 51, image: Images.well5, type: "get-well" },
//   { id: 52, image: Images.well6, type: "get-well" },
//   { id: 53, image: Images.well7, type: "get-well" },
//   { id: 54, image: Images.well8, type: "get-well" },
//   { id: 55, image: Images.well9, type: "get-well" },
//   { id: 56, image: Images.well10, type: "get-well" },
//   // sympathy
//   { id: 57, image: Images.sympathy1, type: "sympathy" },
//   { id: 58, image: Images.sympathy2, type: "sympathy" },
//   { id: 59, image: Images.sympathy3, type: "sympathy" },
//   { id: 60, image: Images.sympathy4, type: "sympathy" },
//   { id: 61, image: Images.sympathy5, type: "sympathy" },
//   { id: 62, image: Images.sympathy6, type: "sympathy" },
//   { id: 63, image: Images.sympathy7, type: "sympathy" },
//   { id: 64, image: Images.sympathy8, type: "sympathy" },
//   { id: 65, image: Images.sympathy9, type: "sympathy" },
//   { id: 66, image: Images.sympathy10, type: "sympathy" },
//   // teacher
//   { id: 67, image: Images.teacher1, type: "teacher" },
//   { id: 68, image: Images.teacher2, type: "teacher" },
//   { id: 69, image: Images.teacher3, type: "teacher" },
//   { id: 70, image: Images.teacher4, type: "teacher" },
//   { id: 71, image: Images.teacher5, type: "teacher" },
//   { id: 72, image: Images.teacher6, type: "teacher" },
//   { id: 73, image: Images.teacher7, type: "teacher" },
//   { id: 74, image: Images.teacher8, type: "teacher" },
//   { id: 75, image: Images.teacher9, type: "teacher" },
//   { id: 76, image: Images.teacher10, type: "teacher" },
//   // thanks
//   { id: 67, image: Images.thanks1, type: "thank-you" },
//   { id: 68, image: Images.thanks2, type: "thank-you" },
//   { id: 69, image: Images.thanks3, type: "thank-you" },
//   { id: 70, image: Images.thanks4, type: "thank-you" },
//   { id: 71, image: Images.thanks5, type: "thank-you" },
//   { id: 72, image: Images.thanks6, type: "thank-you" },
//   { id: 73, image: Images.thanks7, type: "thank-you" },
//   { id: 74, image: Images.thanks8, type: "thank-you" },
//   { id: 75, image: Images.thanks9, type: "thank-you" },
//   { id: 76, image: Images.thanks10, type: "thank-you" },
//   // thanks
//   { id: 77, image: Images.retirement1, type: "retirement" },
//   { id: 78, image: Images.retirement2, type: "retirement" },
//   { id: 79, image: Images.retirement3, type: "retirement" },
//   { id: 80, image: Images.retirement4, type: "retirement" },
//   { id: 81, image: Images.retirement5, type: "retirement" },
//   { id: 82, image: Images.retirement6, type: "retirement" },
//   { id: 83, image: Images.retirement7, type: "retirement" },
//   { id: 84, image: Images.retirement8, type: "retirement" },
//   { id: 85, image: Images.retirement9, type: "retirement" },
//   { id: 86, image: Images.retirement10, type: "retirement" },
//   // congratulations
//   { id: 87, image: Images.congratulations1, type: "congratulations" },
//   { id: 88, image: Images.congratulations2, type: "congratulations" },
//   { id: 89, image: Images.congratulations3, type: "congratulations" },
//   { id: 90, image: Images.congratulations4, type: "congratulations" },
//   { id: 91, image: Images.congratulations5, type: "congratulations" },
//   { id: 92, image: Images.congratulations6, type: "congratulations" },
//   { id: 93, image: Images.congratulations7, type: "congratulations" },
//   { id: 94, image: Images.congratulations8, type: "congratulations" },
//   { id: 95, image: Images.congratulations9, type: "congratulations" },
//   { id: 96, image: Images.congratulations10, type: "congratulations" },
// ];
const Recipient = async ({
  searchParams,
  params,
}: {
  searchParams: any;
  params: any;
}) => {
  console.log(params?.id, "check");
  console.log(searchParams?.category);

  const api: Api = {
    url: `${process.env.NEXT_PUBLIC_API_URL}/card/edit-card/${params?.id}`,
    method: "GET",
    // body: { key: 'value' }
    // comment only
  };

  const data = await fetchFromServer(api);
  console.log(data, "apqwertyuiiRes");
  // const filteredCard = array.find(
  //   (card) =>
  //     card.type === searchParams?.category && card.id === Number(params?.id)
  // );
  // console.log(`https://dating.goaideme.com/${data?.data?.collection_image}`,"poopopopop");
  const showImage = data?.data[0].images[0]?.card_images[0];
  console.log(showImage, "showImage");

  return (
    <div className="min-h-screen flex flex-wrap choose_section">
      {/* Left Part - Card Design */}
      <div className="md:w-1/2 flex-wrap w-2/2  bg-blue-50 flex items-center justify-center md:order-none order_1 bg-blueBg px-3 choose_card-wrapper">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-1 text-white">
            Start a Group Card
          </h1>
          <p className="text-[#d9d9d9] mb-6">
            Watering can {searchParams?.category} Greeting
          </p>

          {/* Card Image */}
          <div className="bg-white rounded-lg shadow-lg p-4 text-white">
            {data?.data ? (
              <span>
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${showImage}`}
                  alt={`Card type: ${data?.data?.title}`}
                  className="rounded-lg object-cover"
                  height={300}
                  width={400}
                />
              </span>
            ) : (
              <p>No card found for this category and ID.</p>
            )}
            {/* {cardData.data
              .filter((card) => card.type === searchParams?.category)
              .map((card: any, index:number) => (
                <span key={index}>
                <Image
                  src={card?.imageSrc}
                  alt="We will miss you - Enjoy your retirement"
                  className="rounded-lg object-cover"
                  height={300}
                  width={400}
                />
                </span>
              ))} */}
          </div>

          {/* Choose another design */}
          <a
            href={`/card/${searchParams?.category}`}
            className="text-red-500 no-underline"
          >
            <p className="mt-6 text-red-500 text-md  text-white hover:underline">
              Select a Different Template
            </p>
          </a>
        </div>
      </div>

      {/* Right Part  Form Section */}
      <div className="md:w-1/2 w-full w-2/2 bg-lightBg flex flex-col items-center justify-center relative px-3 choose_content_wrapper">
        <MultiStepForm params={params?.id} />
      </div>
    </div>
  );
};

export default Recipient;
