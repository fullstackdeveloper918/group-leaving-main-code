"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import { capFirst } from "@/utils/validation";

const Filter = ({
  urlValue,
  response,
}: {
  urlValue: string;
  cardLabel: any;
  response: any;
}) => {
 
  const [selectedCategory, setSelectedCategory] = useState(urlValue || "farewell");

 
  return (
    <div className="flex flex-col items-center p-8 bg-white">
      <h2 className="text-center text-lg mb-0 xl:text-xl font-semibold text-gray-600">
        Get Started by Selecting a Card
      </h2>
      <h3 className="mt-2 text-2xl xl:text-3xl font-bold text-center text-gray-900">
        Design or Uploading Your Own!
      </h3>
      <div className="mt-4 flex flex-wrap justify-center gap-4 w-[65%] filter_responsive">
      {response?.data?.map((category: any) => (
        <Link
          key={category?.uuid || category?.collection_title}
          href={`/?category=${category?.collection_title}`}
          className="no-underline"
          scroll={false}
        >
          <span
            onClick={() =>
              setSelectedCategory(
                category?.collection_title.toLowerCase().replace(/\s+/g, "-")
              )
            }
            className={
              selectedCategory === category?.collection_title.toLowerCase().replace(/\s+/g, "-")
                ? "text-white font-semibold cursor-pointer px-3 py-2 rounded-full bg-[#558ec9] transition-all duration-300 ease-in-out"
                : "text-black text-gray-500 hover:bg-[#f4f4f4] cursor-pointer px-3 py-2 rounded-full border transition-all duration-300 ease-in-out"
            }
          >
            {capFirst(category?.collection_title)}
          </span>
        </Link>
      ))}
      </div>
    </div>
  );
};

export default Filter;
