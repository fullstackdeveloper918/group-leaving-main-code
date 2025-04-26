import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Page {
  imageIndex: number;
  messages: string[];
}

interface CarouselProps {
  pages: Page[];
}

const images = [
  "https://groupleavingcards.com/assets/design/617318f94c962c605abdeabb.jpg",
  "https://groupleavingcards.com/assets/design/66bd382d51e4bce9bdd31fc6_sm.avif",
  "https://groupleavingcards.com/assets/design/66e30136ffa5cb04d55d990e_sm.avif",
  "https://groupleavingcards.com/assets/design/6734d2bbe8c991dba26a0288_sm.webp",
  "https://groupleavingcards.com/assets/design/66967675b0d2b479aa568c98_sm.avif",
  "https://groupleavingcards.com/assets/design/66d88499b4fb75024aa2d8de_sm.avif",
];
const Carousel = ({ pages }:any) => {
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
    
  return (
    <Slider {...settings}>
    {pages.map((page:any, index:any) => (
      <div key={index}>
        <div
          style={{
            backgroundImage: `url(${images[page.imageIndex]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "400px",
            width: "600px",
            margin: "0 auto",
            borderRadius: "10px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ position: "absolute", bottom: "20px", left: "20px" }}>
            <h3 style={{ color: "#fff", backgroundColor: "rgba(0, 0, 0, 0.5)", padding: "10px" }}>
              Page {index + 1}
            </h3>
            {page.messages.map((msg:any, i:any) => (
              <div key={i} style={{ color: "white", fontSize: "16px", padding: "5px" }}>
                {msg}
              </div>
            ))}
          </div>
        </div>
      </div>
    ))}
  </Slider>
  );
};

export default Carousel;
