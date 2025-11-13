// 'use client'
import Hero from "@/components/Hero";
import React from "react";
import { fetchFromServer } from "./actions/fetchFromServer";
import { Api } from "@/interfaces/interfaces";
import Image_text_Card from "@/components/common/Image_text_Card";
import CustomerReview from "@/components/common/CustomerReview";
import Cards_works from "@/components/common/Cards_works";
import NewsletterForm from "@/components/Newsletter";
import Link from "next/link";
import { setCookie } from "nookies";
import cardData from "../constants/CardJson/card.json";
import { cookies } from "next/headers";
import PartnerCompanies from "@/components/PartnerCompanies";
import HomeCategorySection from "@/components/HomeCategorySection";
interface HomeProps {
  searchParams: Record<string, string | string[]>;
}
interface ApiResponse<T> {
  data: T;
  status: number;
}
const Home: React.FC<HomeProps> = async ({ searchParams }) => {
  const token:any = searchParams?.token;
  const api: Api = {
    url: "https://fakestoreapi.com/products",
    method: "GET",
  };
  const data: ApiResponse<any> = await fetchFromServer(api);
  const api2: Api = {
    url: "${process.env.NEXT_PUBLIC_API_URL}/card/collection-listing",
    method: "GET",
  };
  
  const data2: ApiResponse<any> = await fetchFromServer(api2);
  let user = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}` 
    }
  });
  let userData = await user.json();

  return (
    <>
      <section>
        <div className="mt-50">
          <Hero {...cardData} token={token} userData={userData.data} />
        </div>
      
        <HomeCategorySection searchParams={searchParams} />
        <Image_text_Card />
        <div className="bg-workBg bg-no-repeat bg-cover py-16 how_we_work">
          <div className="text-center container-fluid">
            <h1 className="xl:text-4xl md:text-xl sm:text-md font-semibold">
              How group cards work?
            </h1>
            <p className="md:text-xl text-md text-gray-600 font-semibold mb-8">
              How to create a group ecard signed by multiple people.
            </p>
          </div>
          <Cards_works />
          <div className="text-center mt-8">
            <Link href={`/create`}>
              <button className="btnPrimary px-4 py-2">Get Started</button>
            </Link>
          </div>
        </div>
        <div className="bg-testimonialBg common_padding bg-no-repeat testimonial_section">
          <div className="mx-auto px-5 text-center container-fluid">
            <h2 className="xl:text-4xl md:text-xl sm:text-md font-semibold mb-10">
              See Why Our Customers Love Our Cards
            </h2>
            <CustomerReview />
          </div>
        </div>
        <NewsletterForm />
      </section>
    </>
  );
};
export default Home;