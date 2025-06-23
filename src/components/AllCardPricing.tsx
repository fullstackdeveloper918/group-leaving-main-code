"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import cardPricing from "../assets/images/card_pricing.png";
import greeting_cards from "../assets/images/greeting_cards.png";
const AllCardPricing = ({ data, data2 }: any) => {
  console.log(data2, "checkcards");

  const bundlesRef = useRef<any>(null);
  const router = useRouter();
  const scrollToBundles = () => {
    if (bundlesRef.current) {
      bundlesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handlePush = (id: any) => {
    router.push(`/plan/${id}`);
  };
  return (
    <>
      <div className="flex flex-col items-center py-12 bg-gray-50 bg-lightBg ">
        <div className="container">
          <span className="block text-blueBg text-md font-medium text-center">
            Pricing
          </span>
          <h1 className="2xl:text-4xl text-center lg:text-2xl text-xl font-semibold lg:mb-6 mb-2 text-gray-800">
            Pricing that grows with you
          </h1>
          <p className="text-center text-[#4b5563] mb-10 md:text-xl  text-md 2xl:max-w-[60%] mx-auto font-medium ">
            Create cards one at a time to send to a friend or colleague or
            purchase a card bundle if you plan to send 5 or more cards.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Single Card Section */}
            {data?.data.slice(0, 2).map((res: any, index: number) => (
              <div
                key={index}
                className="bg-white p-6 rounded-[20px] hover:shadow-lg transition-all  border border-[#e5e7eb] flex flex-col justify-between h-full"
              >
                <div>
                  <h2 className="md:text-2xl text-xl font-medium mb-2  text-[#111827]">
                    {res?.card_type}
                  </h2>
                  {/* <div className="flex gap-2 mb-4">
              <button className="px-3 py-1 rounded-md border-2 bg-blue-100 text-blue-600">
                Group
              </button>
              <button className="px-3 py-1 rounded-md border-2 bg-gray-100 text-gray-600">
                Individual
              </button>
            </div> */}
                  <p className=" text-md text-gray-800 mb-4">
                    {res?.card_desc}
                  </p>
                  <p className="text-2xl font-700 text-gray-800 mb-4">
                    {res?.card_price} <span className="text-sm"></span>
                  </p>
                  <ul className="space-y-2 text-gray-600 p-0">
                    {res?.benfit_desc.map((res1: any, index: number) => (
                      <li key={index} className="flex ">
                        <svg
                          width="20"
                          height="17"
                          viewBox="0 0 20 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2.64741 11.0144L1.02906 8.58882C0.875355 8.35849 0.562922 8.29829 0.334645 8.45509C0.139953 8.58882 0.0663789 8.84122 0.158691 9.05862L2.99841 15.747C3.49189 16.7155 4.32379 16.7838 4.97312 16.6233C5.36732 16.5259 5.68789 16.2562 5.96306 15.9575L19.4994 1.26779C19.616 1.14123 19.602 0.94261 19.4688 0.833666C19.3521 0.738252 19.1826 0.744578 19.0734 0.848424L7.77784 11.587C6.26054 13.0296 3.80936 12.756 2.64741 11.0144Z"
                            fill="#558EC9"
                          />
                        </svg>
                        <span className="ml-2 text-md"> {res1}</span>
                      </li>
                    ))}
                    {/* <li className="flex ">
                    <svg
                      width="20"
                      height="17"
                      viewBox="0 0 20 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.64741 11.0144L1.02906 8.58882C0.875355 8.35849 0.562922 8.29829 0.334645 8.45509C0.139953 8.58882 0.0663789 8.84122 0.158691 9.05862L2.99841 15.747C3.49189 16.7155 4.32379 16.7838 4.97312 16.6233C5.36732 16.5259 5.68789 16.2562 5.96306 15.9575L19.4994 1.26779C19.616 1.14123 19.602 0.94261 19.4688 0.833666C19.3521 0.738252 19.1826 0.744578 19.0734 0.848424L7.77784 11.587C6.26054 13.0296 3.80936 12.756 2.64741 11.0144Z"
                        fill="#558EC9"
                      />
                    </svg>
                    <span className="ml-2 text-md">
                      {" "}
                      Images, GIFs, and Stickers
                    </span>
                  </li>
                  <li className="flex ">
                    <svg
                      width="20"
                      height="17"
                      viewBox="0 0 20 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.64741 11.0144L1.02906 8.58882C0.875355 8.35849 0.562922 8.29829 0.334645 8.45509C0.139953 8.58882 0.0663789 8.84122 0.158691 9.05862L2.99841 15.747C3.49189 16.7155 4.32379 16.7838 4.97312 16.6233C5.36732 16.5259 5.68789 16.2562 5.96306 15.9575L19.4994 1.26779C19.616 1.14123 19.602 0.94261 19.4688 0.833666C19.3521 0.738252 19.1826 0.744578 19.0734 0.848424L7.77784 11.587C6.26054 13.0296 3.80936 12.756 2.64741 11.0144Z"
                        fill="#558EC9"
                      />
                    </svg>
                    <span className="ml-2 text-md">Upload your own covers</span>
                  </li>
                  <li className="flex ">
                    <svg
                      width="20"
                      height="17"
                      viewBox="0 0 20 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.64741 11.0144L1.02906 8.58882C0.875355 8.35849 0.562922 8.29829 0.334645 8.45509C0.139953 8.58882 0.0663789 8.84122 0.158691 9.05862L2.99841 15.747C3.49189 16.7155 4.32379 16.7838 4.97312 16.6233C5.36732 16.5259 5.68789 16.2562 5.96306 15.9575L19.4994 1.26779C19.616 1.14123 19.602 0.94261 19.4688 0.833666C19.3521 0.738252 19.1826 0.744578 19.0734 0.848424L7.77784 11.587C6.26054 13.0296 3.80936 12.756 2.64741 11.0144Z"
                        fill="#558EC9"
                      />
                    </svg>
                    <span className="ml-2 text-md">
                      Several fonts, colors, sizes
                    </span>
                  </li>
                  <li className="flex ">
                    <svg
                      width="20"
                      height="17"
                      viewBox="0 0 20 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.64741 11.0144L1.02906 8.58882C0.875355 8.35849 0.562922 8.29829 0.334645 8.45509C0.139953 8.58882 0.0663789 8.84122 0.158691 9.05862L2.99841 15.747C3.49189 16.7155 4.32379 16.7838 4.97312 16.6233C5.36732 16.5259 5.68789 16.2562 5.96306 15.9575L19.4994 1.26779C19.616 1.14123 19.602 0.94261 19.4688 0.833666C19.3521 0.738252 19.1826 0.744578 19.0734 0.848424L7.77784 11.587C6.26054 13.0296 3.80936 12.756 2.64741 11.0144Z"
                        fill="#558EC9"
                      />
                    </svg>
                    <span className="ml-2 text-md"> PDF Download</span>
                  </li>
                  <li className="flex ">
                    <svg
                      width="20"
                      height="17"
                      viewBox="0 0 20 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.64741 11.0144L1.02906 8.58882C0.875355 8.35849 0.562922 8.29829 0.334645 8.45509C0.139953 8.58882 0.0663789 8.84122 0.158691 9.05862L2.99841 15.747C3.49189 16.7155 4.32379 16.7838 4.97312 16.6233C5.36732 16.5259 5.68789 16.2562 5.96306 15.9575L19.4994 1.26779C19.616 1.14123 19.602 0.94261 19.4688 0.833666C19.3521 0.738252 19.1826 0.744578 19.0734 0.848424L7.77784 11.587C6.26054 13.0296 3.80936 12.756 2.64741 11.0144Z"
                        fill="#558EC9"
                      />
                    </svg>
                    <span className="ml-2 text-md">
                      {" "}
                      Schedule Delivery or Send Manually
                    </span>
                  </li>
                  <li className="flex ">
                    <svg
                      width="20"
                      height="17"
                      viewBox="0 0 20 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.64741 11.0144L1.02906 8.58882C0.875355 8.35849 0.562922 8.29829 0.334645 8.45509C0.139953 8.58882 0.0663789 8.84122 0.158691 9.05862L2.99841 15.747C3.49189 16.7155 4.32379 16.7838 4.97312 16.6233C5.36732 16.5259 5.68789 16.2562 5.96306 15.9575L19.4994 1.26779C19.616 1.14123 19.602 0.94261 19.4688 0.833666C19.3521 0.738252 19.1826 0.744578 19.0734 0.848424L7.77784 11.587C6.26054 13.0296 3.80936 12.756 2.64741 11.0144Z"
                        fill="#558EC9"
                      />
                    </svg>
                    <span className="ml-2 text-md">
                      {" "}
                      Group Gift Cards Collection Pots
                    </span>
                  </li> */}
                  </ul>
                </div>
                <Link href={`/create`}>
                  <button className="mt-6 bg-blue-600 text-blueText w-full py-2 rounded-xl border-2 border-[blueText] hover:bg-blue-700">
                    Create a card for {res?.card_price}
                  </button>
                </Link>
              </div>
            ))}
            {/* <div className="bg-white p-6 rounded-[20px] hover:shadow-lg transition-all  border border-blueText  flex flex-col justify-between h-full">
              <div>
                <h2 className="md:text-2xl text-xl font-medium mb-2  text-[#111827]">
                  Group Card
                </h2>

                <p className=" text-md text-gray-800 mb-4">
                  The essentials to provide your best work for clients.
                </p>
                <p className="text-2xl font-700 text-gray-800 mb-4">
                  $6.98 <span className="text-sm">/ month</span>
                </p>
                <ul className="space-y-2 text-gray-600 p-0">
                  <li className="flex ">
                    <svg
                      width="20"
                      height="17"
                      viewBox="0 0 20 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.64741 11.0144L1.02906 8.58882C0.875355 8.35849 0.562922 8.29829 0.334645 8.45509C0.139953 8.58882 0.0663789 8.84122 0.158691 9.05862L2.99841 15.747C3.49189 16.7155 4.32379 16.7838 4.97312 16.6233C5.36732 16.5259 5.68789 16.2562 5.96306 15.9575L19.4994 1.26779C19.616 1.14123 19.602 0.94261 19.4688 0.833666C19.3521 0.738252 19.1826 0.744578 19.0734 0.848424L7.77784 11.587C6.26054 13.0296 3.80936 12.756 2.64741 11.0144Z"
                        fill="#558EC9"
                      />
                    </svg>
                    <span className="ml-2 text-md">
                      {" "}
                      Unlimited Pages & Signatures
                    </span>
                  </li>
                  <li className="flex ">
                    <svg
                      width="20"
                      height="17"
                      viewBox="0 0 20 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.64741 11.0144L1.02906 8.58882C0.875355 8.35849 0.562922 8.29829 0.334645 8.45509C0.139953 8.58882 0.0663789 8.84122 0.158691 9.05862L2.99841 15.747C3.49189 16.7155 4.32379 16.7838 4.97312 16.6233C5.36732 16.5259 5.68789 16.2562 5.96306 15.9575L19.4994 1.26779C19.616 1.14123 19.602 0.94261 19.4688 0.833666C19.3521 0.738252 19.1826 0.744578 19.0734 0.848424L7.77784 11.587C6.26054 13.0296 3.80936 12.756 2.64741 11.0144Z"
                        fill="#558EC9"
                      />
                    </svg>
                    <span className="ml-2 text-md">
                      {" "}
                      Images, GIFs, and Stickers
                    </span>
                  </li>
                  <li className="flex ">
                    <svg
                      width="20"
                      height="17"
                      viewBox="0 0 20 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.64741 11.0144L1.02906 8.58882C0.875355 8.35849 0.562922 8.29829 0.334645 8.45509C0.139953 8.58882 0.0663789 8.84122 0.158691 9.05862L2.99841 15.747C3.49189 16.7155 4.32379 16.7838 4.97312 16.6233C5.36732 16.5259 5.68789 16.2562 5.96306 15.9575L19.4994 1.26779C19.616 1.14123 19.602 0.94261 19.4688 0.833666C19.3521 0.738252 19.1826 0.744578 19.0734 0.848424L7.77784 11.587C6.26054 13.0296 3.80936 12.756 2.64741 11.0144Z"
                        fill="#558EC9"
                      />
                    </svg>
                    <span className="ml-2 text-md">Upload your own covers</span>
                  </li>
                  <li className="flex ">
                    <svg
                      width="20"
                      height="17"
                      viewBox="0 0 20 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.64741 11.0144L1.02906 8.58882C0.875355 8.35849 0.562922 8.29829 0.334645 8.45509C0.139953 8.58882 0.0663789 8.84122 0.158691 9.05862L2.99841 15.747C3.49189 16.7155 4.32379 16.7838 4.97312 16.6233C5.36732 16.5259 5.68789 16.2562 5.96306 15.9575L19.4994 1.26779C19.616 1.14123 19.602 0.94261 19.4688 0.833666C19.3521 0.738252 19.1826 0.744578 19.0734 0.848424L7.77784 11.587C6.26054 13.0296 3.80936 12.756 2.64741 11.0144Z"
                        fill="#558EC9"
                      />
                    </svg>
                    <span className="ml-2 text-md">
                      Several fonts, colors, sizes
                    </span>
                  </li>
                  <li className="flex ">
                    <svg
                      width="20"
                      height="17"
                      viewBox="0 0 20 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.64741 11.0144L1.02906 8.58882C0.875355 8.35849 0.562922 8.29829 0.334645 8.45509C0.139953 8.58882 0.0663789 8.84122 0.158691 9.05862L2.99841 15.747C3.49189 16.7155 4.32379 16.7838 4.97312 16.6233C5.36732 16.5259 5.68789 16.2562 5.96306 15.9575L19.4994 1.26779C19.616 1.14123 19.602 0.94261 19.4688 0.833666C19.3521 0.738252 19.1826 0.744578 19.0734 0.848424L7.77784 11.587C6.26054 13.0296 3.80936 12.756 2.64741 11.0144Z"
                        fill="#558EC9"
                      />
                    </svg>
                    <span className="ml-2 text-md"> PDF Download</span>
                  </li>
                  <li className="flex ">
                    <svg
                      width="20"
                      height="17"
                      viewBox="0 0 20 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.64741 11.0144L1.02906 8.58882C0.875355 8.35849 0.562922 8.29829 0.334645 8.45509C0.139953 8.58882 0.0663789 8.84122 0.158691 9.05862L2.99841 15.747C3.49189 16.7155 4.32379 16.7838 4.97312 16.6233C5.36732 16.5259 5.68789 16.2562 5.96306 15.9575L19.4994 1.26779C19.616 1.14123 19.602 0.94261 19.4688 0.833666C19.3521 0.738252 19.1826 0.744578 19.0734 0.848424L7.77784 11.587C6.26054 13.0296 3.80936 12.756 2.64741 11.0144Z"
                        fill="#558EC9"
                      />
                    </svg>
                    <span className="ml-2 text-md">
                      {" "}
                      Schedule Delivery or Send Manually
                    </span>
                  </li>
                  <li className="flex ">
                    <svg
                      width="20"
                      height="17"
                      viewBox="0 0 20 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.64741 11.0144L1.02906 8.58882C0.875355 8.35849 0.562922 8.29829 0.334645 8.45509C0.139953 8.58882 0.0663789 8.84122 0.158691 9.05862L2.99841 15.747C3.49189 16.7155 4.32379 16.7838 4.97312 16.6233C5.36732 16.5259 5.68789 16.2562 5.96306 15.9575L19.4994 1.26779C19.616 1.14123 19.602 0.94261 19.4688 0.833666C19.3521 0.738252 19.1826 0.744578 19.0734 0.848424L7.77784 11.587C6.26054 13.0296 3.80936 12.756 2.64741 11.0144Z"
                        fill="#558EC9"
                      />
                    </svg>
                    <span className="ml-2 text-md">
                      {" "}
                      Group Gift Cards Collection Pots
                    </span>
                  </li>
                </ul>
              </div>
              <Link href={`/create`}>
                <button className="mt-6 bg-blue-600 bg-blueText text-bgWhite w-full py-2 rounded-xl border-2 border-[blueText] hover:bg-blue-700">
                  Create a card for $6.98
                </button>
              </Link>
            </div> */}

            {/* buldle cards */}

            <div className="bg-white p-6 rounded-[20px] hover:shadow-lg transition-all  border border-[#e5e7eb] flex flex-col justify-between h-full">
              <div>
                <h2 className="md:text-2xl text-xl font-medium mb-2  text-[#111827]">
                  Card Bundle
                </h2>

                {/* <div className="flex gap-2 mb-4">
              <button className="px-3 py-1 rounded-md border-2 bg-blue-100 text-blue-600">
                Group
              </button>
              <button className="px-3 py-1 rounded-md border-2 bg-gray-100 text-gray-600">
                Individual
              </button>
            </div> */}
                <p className=" text-md text-gray-800 mb-4">
                  The essentials to provide your best work for clients.
                </p>
                <p className="text-2xl font-700 text-gray-800 mb-4">$10</p>
                <ul className="space-y-2 text-gray-600 p-0">
                  <li className="flex ">
                    <svg
                      width="20"
                      height="17"
                      viewBox="0 0 20 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.64741 11.0144L1.02906 8.58882C0.875355 8.35849 0.562922 8.29829 0.334645 8.45509C0.139953 8.58882 0.0663789 8.84122 0.158691 9.05862L2.99841 15.747C3.49189 16.7155 4.32379 16.7838 4.97312 16.6233C5.36732 16.5259 5.68789 16.2562 5.96306 15.9575L19.4994 1.26779C19.616 1.14123 19.602 0.94261 19.4688 0.833666C19.3521 0.738252 19.1826 0.744578 19.0734 0.848424L7.77784 11.587C6.26054 13.0296 3.80936 12.756 2.64741 11.0144Z"
                        fill="#558EC9"
                      />
                    </svg>
                    <span className="ml-2 text-md">
                      No limit on pages or signatures
                    </span>
                  </li>
                  <li className="flex ">
                    <svg
                      width="20"
                      height="17"
                      viewBox="0 0 20 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.64741 11.0144L1.02906 8.58882C0.875355 8.35849 0.562922 8.29829 0.334645 8.45509C0.139953 8.58882 0.0663789 8.84122 0.158691 9.05862L2.99841 15.747C3.49189 16.7155 4.32379 16.7838 4.97312 16.6233C5.36732 16.5259 5.68789 16.2562 5.96306 15.9575L19.4994 1.26779C19.616 1.14123 19.602 0.94261 19.4688 0.833666C19.3521 0.738252 19.1826 0.744578 19.0734 0.848424L7.77784 11.587C6.26054 13.0296 3.80936 12.756 2.64741 11.0144Z"
                        fill="#558EC9"
                      />
                    </svg>
                    <span className="ml-2 text-md">
                      Add images, GIFs, and stickers
                    </span>
                  </li>
                  <li className="flex ">
                    <svg
                      width="20"
                      height="17"
                      viewBox="0 0 20 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.64741 11.0144L1.02906 8.58882C0.875355 8.35849 0.562922 8.29829 0.334645 8.45509C0.139953 8.58882 0.0663789 8.84122 0.158691 9.05862L2.99841 15.747C3.49189 16.7155 4.32379 16.7838 4.97312 16.6233C5.36732 16.5259 5.68789 16.2562 5.96306 15.9575L19.4994 1.26779C19.616 1.14123 19.602 0.94261 19.4688 0.833666C19.3521 0.738252 19.1826 0.744578 19.0734 0.848424L7.77784 11.587C6.26054 13.0296 3.80936 12.756 2.64741 11.0144Z"
                        fill="#558EC9"
                      />
                    </svg>
                    <span className="ml-2 text-md">
                      Use your own cover designs
                    </span>
                  </li>
                  <li className="flex ">
                    <svg
                      width="20"
                      height="17"
                      viewBox="0 0 20 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.64741 11.0144L1.02906 8.58882C0.875355 8.35849 0.562922 8.29829 0.334645 8.45509C0.139953 8.58882 0.0663789 8.84122 0.158691 9.05862L2.99841 15.747C3.49189 16.7155 4.32379 16.7838 4.97312 16.6233C5.36732 16.5259 5.68789 16.2562 5.96306 15.9575L19.4994 1.26779C19.616 1.14123 19.602 0.94261 19.4688 0.833666C19.3521 0.738252 19.1826 0.744578 19.0734 0.848424L7.77784 11.587C6.26054 13.0296 3.80936 12.756 2.64741 11.0144Z"
                        fill="#558EC9"
                      />
                    </svg>
                    <span className="ml-2 text-md">
                      Customize fonts, colors, and text sizes
                    </span>
                  </li>
                  <li className="flex ">
                    <svg
                      width="20"
                      height="17"
                      viewBox="0 0 20 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.64741 11.0144L1.02906 8.58882C0.875355 8.35849 0.562922 8.29829 0.334645 8.45509C0.139953 8.58882 0.0663789 8.84122 0.158691 9.05862L2.99841 15.747C3.49189 16.7155 4.32379 16.7838 4.97312 16.6233C5.36732 16.5259 5.68789 16.2562 5.96306 15.9575L19.4994 1.26779C19.616 1.14123 19.602 0.94261 19.4688 0.833666C19.3521 0.738252 19.1826 0.744578 19.0734 0.848424L7.77784 11.587C6.26054 13.0296 3.80936 12.756 2.64741 11.0144Z"
                        fill="#558EC9"
                      />
                    </svg>
                    <span className="ml-2 text-md">Download as PDF</span>
                  </li>
                  <li className="flex ">
                    <svg
                      width="20"
                      height="17"
                      viewBox="0 0 20 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.64741 11.0144L1.02906 8.58882C0.875355 8.35849 0.562922 8.29829 0.334645 8.45509C0.139953 8.58882 0.0663789 8.84122 0.158691 9.05862L2.99841 15.747C3.49189 16.7155 4.32379 16.7838 4.97312 16.6233C5.36732 16.5259 5.68789 16.2562 5.96306 15.9575L19.4994 1.26779C19.616 1.14123 19.602 0.94261 19.4688 0.833666C19.3521 0.738252 19.1826 0.744578 19.0734 0.848424L7.77784 11.587C6.26054 13.0296 3.80936 12.756 2.64741 11.0144Z"
                        fill="#558EC9"
                      />
                    </svg>
                    <span className="ml-2 text-md">
                      Schedule delivery or send whenever you like
                    </span>
                  </li>
                  <li className="flex ">
                    <svg
                      width="20"
                      height="17"
                      viewBox="0 0 20 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.64741 11.0144L1.02906 8.58882C0.875355 8.35849 0.562922 8.29829 0.334645 8.45509C0.139953 8.58882 0.0663789 8.84122 0.158691 9.05862L2.99841 15.747C3.49189 16.7155 4.32379 16.7838 4.97312 16.6233C5.36732 16.5259 5.68789 16.2562 5.96306 15.9575L19.4994 1.26779C19.616 1.14123 19.602 0.94261 19.4688 0.833666C19.3521 0.738252 19.1826 0.744578 19.0734 0.848424L7.77784 11.587C6.26054 13.0296 3.80936 12.756 2.64741 11.0144Z"
                        fill="#558EC9"
                      />
                    </svg>
                    <span className="ml-2 text-md">
                      Group gift card collection pots
                    </span>
                  </li>
                </ul>
              </div>
              {/* <Link href={`/create`}> */}
              <button
                onClick={scrollToBundles}
                className="mt-5 bg-blue-600 text-blueText w-full py-2 rounded-xl border-2 border-[blueText] hover:bg-blue-700"
              >
                View Bundle
              </button>
              {/* </Link> */}
            </div>
          </div>
        </div>
      </div>

      {/* Card Bundles Section */}
      <div ref={bundlesRef} className="container py-20 ">
        <h1 className="2xl:text-4xl text-center lg:text-2xl text-xl font-semibold lg:mb-6 mb:2 text-gray-800">
          Pricing and Card Bundles
        </h1>
        <p className="text-center text-[#4b5563] mb-10 md:text-xl  text-md 2xl:max-w-[60%] mx-auto font-medium ">
          Create cards one at a time to send to a friend or colleague or
          purchase a card bundle if you plan to send 5 or more cards.
        </p>

        {/* Card Bundles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
          {/* Bundle Option 1 */}
          {data2?.data.map((res: any, index: number) => (
            <div
              key={index}
              className="bg-white p-6 rounded-[20px] hover:shadow-lg transition-all  border border-[#e5e7eb] flex flex-col justify-between h-full relative"
            >
              <div className="md:pt-3">
                <h2 className="text-xl font-semibold mb-2 text-center text-gray-800 margin_responsive flex card_bulk_images items-center ">
                  <img src={greeting_cards.src} alt="img" />{" "}
                  <span>{res?.number_of_cards} cards</span>
                </h2>
                <p className="text-center text-xl font-bold text-gray-800 mb-2 mb-0">
                  <span className="line-through text-[#707070] font-normal text-md">
                    ${res?.cost_price.toFixed(2)}
                  </span>{" "}
                  ${res?.sale_price.toFixed(2)}
                </p>
                <p className="text-center text-green-600 saveAmount">
                  Save {res?.discount}%
                </p>
                <p className="text-center text-gray-600 mt-2 mb-0">
                  ${res?.price} per card
                </p>
              </div>
              <button
                onClick={() => handlePush(res?.uuid)}
                className="mt-6 bg-blue-600 text-blueText w-full py-2 rounded-xl border-2 border-[blueText] hover:bg-blue-700 margin_responsive"
              >
                Select this plan
              </button>
            </div>
          ))}

          {/* Bundle Option 2 */}
          {/* <div className="bg-white p-6 rounded-[20px] hover:shadow-lg transition-all  border border-[#e5e7eb] flex flex-col justify-between h-full">
            <div>
              <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
                10 cards
              </h2>
              <p className="text-center text-2xl font-bold text-gray-800 mb-2">
                <span className="line-through text-gray-400">$49.90</span>{" "}
                $42.00
              </p>
              <p className="text-center text-green-600">Save 15%</p>
              <p className="text-center text-gray-600 mt-2">$4.20 per card</p>
            </div>
            <button
              onClick={handlePush}
              className="mt-6 bg-blue-600 text-blueText w-full py-2 rounded-xl border-2 border-[blueText] hover:bg-blue-700"
            >
              Select this plan
            </button>
          </div> */}

          {/* Bundle Option 3 */}
          {/* <div className="bg-white p-6 rounded-[20px] hover:shadow-lg transition-all  border border-[#e5e7eb] flex flex-col justify-between h-full">
            <div>
              <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
                25 cards
              </h2>
              <div className="flex justify-center mb-2">
                <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded">
                  POPULAR
                </span>
              </div>
              <p className="text-center text-2xl font-bold text-gray-800 mb-2">
                <span className="line-through text-gray-400">$124.75</span>{" "}
                $93.50
              </p>
              <p className="text-center text-green-600">Save 25%</p>
              <p className="text-center text-gray-600 mt-2">$3.74 per card</p>
            </div>
            <button
              onClick={handlePush}
              className="mt-6 bg-blue-600 text-blueText w-full py-2 rounded-xl border-2 border-[blueText] hover:bg-blue-700"
            >
              Select this plan
            </button>
          </div> */}

          {/* Bundle Option 4 */}
          {/* <div className="bg-white p-6 rounded-[20px] hover:shadow-lg transition-all  border border-[#e5e7eb] flex flex-col justify-between h-full">
            <div>
              <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
                50 cards
              </h2>
              <p className="text-center text-2xl font-bold text-gray-800 mb-2">
                <span className="line-through text-gray-400">$249.50</span>{" "}
                $174.00
              </p>
              <p className="text-center text-green-600">Save 30%</p>
              <p className="text-center text-gray-600 mt-2">$3.48 per card</p>
            </div>
            <button
              onClick={handlePush}
              className="mt-6 bg-blue-600 text-blueText w-full py-2 rounded-xl border-2 border-[blueText] hover:bg-blue-700"
            >
              Select this plan
            </button>
          </div> */}

          {/* Bundle Option 5 */}
          {/* <div className="bg-white p-6 rounded-[20px] hover:shadow-lg transition-all  border border-[#e5e7eb] flex flex-col justify-between h-full">
            <div>
              <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
                100 cards
              </h2>
              <p className="text-center text-2xl font-bold text-gray-800 mb-2">
                <span className="line-through text-gray-400">$499.00</span>{" "}
                $299.00
              </p>
              <p className="text-center text-green-600">Save 40%</p>
              <p className="text-center text-gray-600 mt-2">$2.99 per card</p>
            </div>
            <button
              onClick={handlePush}
              className="mt-6 bg-blue-600 text-blueText w-full py-2 rounded-xl border-2 border-[blueText] hover:bg-blue-700"
            >
              Select this plan
            </button>
          </div> */}

          {/* Custom Option */}
          {/* <div className="bg-white p-6 rounded-[20px] hover:shadow-lg transition-all  border border-[#e5e7eb] flex flex-col justify-between h-full">
            <div>
              <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
                Custom
              </h2>
              <p className="text-center text-gray-600 mb-4">
                Looking for more cards or corporate plans? Contact us to get a
                custom plan.
              </p>
            </div>
            <button
              onClick={handlePush}
              className="mt-6 bg-blue-600 text-blueText w-full py-2 rounded-xl border-2 border-[blueText] hover:bg-blue-700"
            >
              Select this plan
            </button>
          </div> */}
        </div>

        {/* Card Bundle Disclaimer */}
        <p className="text-center text-gray-500 mt-6 text-md font-semibold max-w-[60%]:">
          Card bundles are a one-time payment and do not automatically renew.
          You can use them on all designs and categories and they do not expire.
        </p>
      </div>

      <section className="container-fluid bg-lightBg  common_padding px-5 rounded-md relative card_pricing_Wapper">
        <div>
          <h4 className="2xl:text-4xl text-left lg:text-2xl text-xl font-semibold lg:mb-6 mb-4 text-gray-800">
            Gift Card Pricing
          </h4>

          <p className="mt-3 text-left text-gray-400 max-w-[60%]  md:text-md lg:text-md  ">
            Gift cards are included with all greeting cards at no additional
            cost. We do however charge a small fee on each contribution to cover
            the cost of managing the service, payment costs and fraud
            prevention. The fee depends on the currency, but is around 5%. We
            show this fee to all contributors so it is always clear how much
            they are contributing to the card and what the fee is. We dont
            charge any other fees when redeeming the gift card so the recipient
            will get the full value of the card. Gift cards are included with
            all greeting cards at no additional cost. We have also We dont
            charge any additional fees when redeeming the gift card so the
            recipient will get the full value of the card.
          </p>
        </div>
        <div className="card_pricing_img">
          <img src={cardPricing.src} alt="img pricing" />
        </div>
      </section>
    </>
  );
};

export default AllCardPricing;
