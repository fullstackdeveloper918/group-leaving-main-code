"use client"
import React from 'react'
import Images from "../assets/images/logo_1.png"
import Images1 from "../assets/images/logo_2.png"
import Images2 from "../assets/images/logo_3.png"
import Images3 from "../assets/images/logo_4.png"
import Images4 from "../assets/images/logo_5.png"
import Slider from "react-slick";
const PartnerCompanies = () => {
  const settings = {
    // dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 5000,
    cssEase: "linear",               
    pauseOnHover: true
  };
  return (
    <>
    <section className="flex flex-col items-center justify-center py-8 bg-white slider_Section">
    <h2 className="text-center text-lg mb-0 xl:text-xl font-semibold text-gray-600">Trusted by Over Seven Million Users</h2>
    <h3 className="mt-2 text-2xl  xl:text-3xl font-bold text-center text-gray-900">
    Virtual Cards for Individuals & Businesses
      {/* Join over <span className="font-bold">5,000,000</span> other people using our group greeting cards */}
    </h3>
    {/* <div className="flex items-center justify-between md:space-x-8 space-x-0 mt-6 partner_logos">
      <img
        src={Images.src}
        alt="Airbnb Logo"
        style={{width:"15"}}
        className="h-15 w-auto"
      />
      <img
          src={Images1.src}
        alt="Harris Logo"
        className="h-15 w-auto"
      />
      <img
       src={Images2.src}
        alt="Scotiabank Logo"
        className="h-15 w-auto"
      />
      <img
      src={Images3.src}
        alt="Toronto Pearson Logo"
        className="h-15 w-auto"
      />
      <img
       src={Images4.src}
        alt="Accenture Logo"
        className="h-15 w-auto"
      />
    </div>  */}
  </section>
    <div className="slider-containe">
    <Slider {...settings}>
      <div>
      <img
        src={Images.src}
        alt="Airbnb Logo"
        // style={{width:"20"}}
        className="h-15 w-auto"
      />
      </div>
      <div>
      <img
          src={Images1.src}
        alt="Harris Logo"
        className="h-15 w-auto"
      />
      </div>
      <div>
      <img
      src={Images3.src}
        alt="Toronto Pearson Logo"
        className="h-15 w-auto"
      />
      </div>
      <div>
      <img
       src={Images2.src}
        alt="Scotiabank Logo"
        className="h-15 w-auto"
      />
      </div>
      <div>
      <img
       src={Images4.src}
        alt="Accenture Logo"
        className="h-15 w-auto"
      />
      </div>
    </Slider>
  </div>
    </>
  )
}

export default PartnerCompanies