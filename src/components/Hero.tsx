"use client";
import Images from "@/constants/images";
import { List } from "antd";
import Image from "next/image";
import card_absolute from "../assets/images/card_absolute.png";
import banner_card from "../assets/images/banner_card_1.png";
import card_absolute_1 from "../assets/images/banner_card_2.png";
import banner_flower from "../assets/images/banner_flower.png";
// import
import Slider from "react-slick";
import React, { useEffect, useState } from "react";
import cardData from "../constants/CardJson/card.json";
import Link from "next/link";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
const categoriesName = [
  "Farewell",
  "Birthday",
  "Baby",
  "Wedding",
  "Get Well",
  "Sympathy",
  "Thank you",
  "Retirement",
  "Congratulations",
  "Anniversary",
  "Welcome",
  "New Home",
];
const Hero = ({
  token,
  userData,
  ...cardData
}: {
  token?: any;
  userData?: any;
  data?: any[];
}) => {
  const [isNewLogin, setIsNewLogin] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [categoryName, setCategoryName] = useState(cardData?.data?.[0] || ""); // :white_tick: Avoid undefined error
 
  useEffect(() => {
    const storedToken = Cookies.get("auth_token");
    if (token && !storedToken && token !== "login") {
      Cookies.set("auth_token", token);
      Cookies.set("user_info", userData);
      setIsNewLogin(true);
    }
    if (token) {
      Cookies.set("userInfo", userData);
    }
  }, [token]);
  useEffect(() => {
    if (isNewLogin) {
      toast.success("Login Successfully!", { autoClose: 1000 });
      setIsNewLogin(false);
    }
  }, [isNewLogin]);
  useEffect(() => {
    const typeWriter = (text: string, index: number) => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text[index]);
        setTimeout(() => typeWriter(text, index + 1), 100);
      } else {
        setIsTyping(false);
        setTimeout(() => {
          setDisplayedText("");
          setIsTyping(true);
          setCurrentCategoryIndex((prev) => (prev + 1) % categoriesName.length);
        }, 1500);
      }
    };
    if (isTyping) {
      setCategoryName(categoriesName[currentCategoryIndex]);
      typeWriter(categoriesName[currentCategoryIndex], 0);
    }
  }, [currentCategoryIndex, isTyping]);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <section className="  dark:bg-gray-900   align-middle  homeBanner ">
        <div className="slider-containe">
          <Slider {...settings}>
            {/********** slide 1 started  ***********/}
            <div className="relative bg-hero_banner_new bg-cover slider_onebg-cover bg-no-repeat  heroSectionHeight">
              <img src={banner_flower.src} className="banner_flower" />
              <div className="container-fluid  py-6 mx-auto  xl:gap-0 lg:py-14  space-y-10 items-center">
                <img src={banner_card.src} className="card_img_left" />
                <div className=" mx-auto text-center w-full md:text-center xs:text-center lg:text-left ">
                  <h1 className="bannerHeaderH1 text-center  mx-auto">
                    Group Greeting Cards{" "}
                    <span className="text-white">
                      for {displayedText || "''"}
                    </span>
                  </h1>
                  <p className="text-white text-center font-medium mx-auto ">
                    The simplest way to share a virtual greeting card with
                    everyone in your office.
                  </p>
                  <div className="bannerButton">
                    <Link href="/create" className=" btnPrimary">
                      {" "}
                      Start a group Card
                    </Link>
                    <Link
                      href="/demo/fwzDVjvbQ_X"
                      className="btnSecondary ml-3"
                    >
                      {" "}
                      Explore our Demo Card
                    </Link>
                  </div>
                </div>
                <img src={banner_card.src} className="card_img_right" />
              </div>
              <img
                src={card_absolute_1.src}
                className="absolute_img"
                alt="img card"
              />
              <img src={banner_flower.src} className="banner_flower_right" />
            </div>
            {/************ slide 1 ended ************/}
            {/************ slide 2 started ************/}
            <div className="relative bg-hero_banner_two bg-cover bg-no-repeat  banner_slider_two heroSectionHeight">
              <div className="container-fluid  py-6 mx-auto  xl:gap-0 lg:py-14  space-y-10 items-center">
                <div className=" mx-auto text-center w-full md:text-lrft  slider_two  xs:text-center lg:text-left ">
                  <h1 className="bannerHeaderH1 text-left ">
                    Gratitude in Every Moment
                  </h1>
                  <p className=" text-left text-grey font-medium ">
                    The most convenient way to share a virtual greeting card
                    with your whole office.
                  </p>
                  <div className="bannerButton text-left">
                    <Link href="/create" className=" btnPrimary">
                      {" "}
                      Start a group Card
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/************ slide 2 ended ************/}
            {/************ slide 3 ended ************/}
            <div className="relative bg-hero_banner_three slider_three bg-cover bg-no-repeat  heroSectionHeight">
              <div className="container-fluid  py-6 mx-auto  xl:gap-0 lg:py-14  space-y-10 items-center">
                <div className=" mx-auto text-center w-full md:text-center xs:text-center lg:text-left ">
                  <h1 className="bannerHeaderH1 text-center  font-light mx-auto">
                    New <span className="font-bold">Christmas Cards </span>
                    Design Available Here
                  </h1>
                </div>
                <img src={banner_card.src} className="card_img_right" />
              </div>
            </div>
            {/************ slide 3 ended ************/}
          </Slider>
        </div>
      </section>
    </>
  );
};
export default Hero;
