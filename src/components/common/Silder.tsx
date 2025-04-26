import React from 'react'
import Image from "next/image";

import herobannner1 from "../../assets/images/1.png"
import herobannner2 from "../../assets/images/2.png"
import herobannner3 from "../../assets/images/3.png"
import herobannner4 from "../../assets/images/4.png"
import herobannner5 from "../../assets/images/5.png"
import Slider from "react-slick";
const Silder = () => {
    const images = [
        herobannner1,
        herobannner2,
        herobannner3,
        herobannner4,
        herobannner5,
      ];
    // const settings = {
    //     className: "center",
    //     infinite: true,
    //     centerPadding: "60px",
    //     slidesToShow: 5,
    //     swipeToSlide: true,
    //     autoplay: true,
    //     afterChange: function(index:any) {
    //       console.log(
    //         `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
    //       );
    //     }
    //   };
    const settings = {
        // dots: true,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        speed: 3000,
        autoplaySpeed: 100,
        cssEase: "linear",               
        pauseOnHover: true
      };
  return (
    <div className="slider-container">
    <Slider {...settings}>
  {images.map((image, index) => (
    <div key={index}>
    <Image 
        src={image.src} 
        alt={`Slide ${index + 1}`} 
        layout="responsive" 
        width={100} 
        height={600}
        objectFit="cover"
      />
    </div>
  ))}
  </Slider>
{/* </Slider> */}

    </div>
  )
}

export default Silder