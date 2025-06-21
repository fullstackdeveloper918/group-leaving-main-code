// 'use client'
import Hero from "@/components/Hero";
import React, { useEffect } from "react";
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
// import { setAuthToken } from "./actions/auth";
// Define types for search parameters
interface HomeProps {
  searchParams: Record<string, string | string[]>;
}
// Define API response type
interface ApiResponse<T> {
  data: T;
  status: number;
}
const Home: React.FC<HomeProps> = async ({ searchParams }) => {
  console.log("searchParams:", searchParams);
  const token:any = searchParams?.token;
      console.log("Google Token:", token);
  // Fetch first API response
  const api: Api = {
    url: "https://fakestoreapi.com/products",
    method: "GET",
  };
  const data: ApiResponse<any> = await fetchFromServer(api);
  console.log("API Response:", data);
  // Fetch second API response
  const api2: Api = {
    url: "https://dating.goaideme.com/card/collection-listing",
    method: "GET",
  };
  
  const data2: ApiResponse<any> = await fetchFromServer(api2);
  console.log("Collection Listing Response:", data2.data);
  let user = await fetch('https://dating.goaideme.com/user/profile', {
    method: 'GET', // Method set to GET
    headers: {
      'Authorization': `Bearer ${token}` // Send the token in the Authorization header
    }
  });
  let userData = await user.json();
  console.log("postuser",userData.data)
  // useEffect(()=>{
  //   console.log('this is running');
  // },[])
  return (
    <>
      <section>
        <div className="mt-50">
          <Hero {...cardData} token={token} userData={userData.data} />
        </div>
        {/* <div className="section_space_50">
          <PartnerCompanies />
        </div> */}
        <HomeCategorySection searchParams={searchParams} />
        {/* Section 4 */}
        <Image_text_Card />
        {/* Section 5 */}
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
        {/* Section 6 */}
        <div className="bg-testimonialBg common_padding bg-no-repeat testimonial_section">
          <div className="mx-auto px-5 text-center container-fluid">
            <h2 className="xl:text-4xl md:text-xl sm:text-md font-semibold mb-10">
              See Why Our Customers Love Our Cards
            </h2>
            {/* Reviews Grid */}
            <CustomerReview />
          </div>
        </div>
        {/* Section 7 */}
        <NewsletterForm />
      </section>
    </>
  );
};
export default Home;