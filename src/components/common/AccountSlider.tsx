"use client";
import { useRouter } from "next/navigation";
import React from "react";

const AccountSlider = ({ type }: any) => {
  const router = useRouter();

  // This function is used to navigate to a different URL
  const handleNavigation = (url: string) => {
    router.push(url);
  };
  return (
    <div className="flex justify-start items-center border-gray-200 mb-6 account-tab-outer account-btn">
    <div className="flex space-x-6 account-tab-box">
        {/* Navigate to Cards */}
        {/* <a
          onClick={() => handleNavigation('/account/cart')}
          className={type==="cart"?"text-black text-blue-600 font-semibold border-b-2 border-blue-600 cursor-pointer no-underline":"text-black text-gray-500 hover:text-blue-500 cursor-pointer no-underline"}
        >
          Cart
        </a> */}
        <a
          onClick={() => handleNavigation("/account/cards")}
          className={
            type === "cards"
              ? "text-black text-blue-600 font-semibold border-b-2 border-blue-600 cursor-pointer no-underline"
              : "text-black text-gray-500 hover:text-blue-500 cursor-pointer no-underline"
          }
        >
          Cards
        </a>

        {/* Navigate to Profile */}
        <a
          onClick={() => handleNavigation("/account/profile")}
          className={
            type === "profile"
              ? " text-black text-blue-600 font-semibold border-b-2 border-blue-600 cursor-pointer no-underline"
              : "text-black text-gray-500 hover:text-blue-500 cursor-pointer no-underline"
          }
        >
          Profile
        </a>

        {/* Navigate to Bundles */}
        <a
          onClick={() => handleNavigation("/account/bundles")}
          className={
            type === "bundles"
              ? " text-black text-blue-600 font-semibold border-b-2 border-blue-600 cursor-pointer no-underline"
              : "text-black text-gray-500 hover:text-blue-500 cursor-pointer no-underline"
          }
        >
          Bundles
        </a>

        {/* Navigate to Email Preferences */}
        {/* <a
          onClick={() => handleNavigation('/account/payment-history')}
          className={type==="payment-history"?"text-black text-blue-600 font-semibold border-b-2 border-blue-600 cursor-pointer no-underline":"text-black text-gray-500 hover:text-blue-500 cursor-pointer no-underline"}
        >
          Payment History
        </a> */}
      </div>
    </div>
  );
};

export default AccountSlider;
