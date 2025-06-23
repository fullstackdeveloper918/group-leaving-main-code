import React from "react";
import DemoCartimg from "../../assets/images/demo_cart.png";
import Images from "../assets/images/logo_1.png";
const DemoCart = () => {
  return (
    <div className=" bg-gray-100 container-fluid items-center mb-5 relative mt-5">
      <div className="shadow-md">
        <div className="lg:mb-5 imgBottomBefore relative max-w-4xl	mx-auto">
          <h1 className="xl:text-6xl md:text-xl sm:text-md font-semibold mb-4 text-center">
            Try our <strong className="democard">demo card</strong>{" "}
          </h1>
          <p className="text-center">
            One of the teachers has created a group ecard for Hagrid who is
            about to go on a sabbatical in the hope of finding a dragon. Let him
            know how much he means to the school before he leaves.
          </p>
          <div className="w-full  relative ">
            <img
              src={DemoCartimg.src}
              alt="Airbnb Logo"
              width="600"
              height="600"
              className="mx-auto"
            />
          </div>

          <div className="mx-auto text-center">
            <a href="/create" className=" btnPrimary mx-auto">
              Get Started
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoCart;
