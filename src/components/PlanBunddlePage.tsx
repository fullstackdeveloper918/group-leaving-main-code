"use client";
import React, { useEffect, useState } from "react";
import RazorPay from "./RazorPay";
import { useAccessToken } from "@/app/context/AccessTokenContext";
import { parseCookies } from "nookies";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import Cookies from "js-cookie";

const PlanBunddlePage = ({ data2 }: any) => {
  const router = useRouter(); 
  const [voucher, setVaoucher] = useState<any>("");
   const [voucherDiscount, setVaoucherDiscount] = useState<any>(""); 
  const onChange = (e: any) => {
    setVaoucher(e);
  };
     const gettoken = Cookies.get("auth_token");   

     const TotalAmount = (data2.data[0].sale_price - voucherDiscount).toFixed(2);
  console.log(TotalAmount, "TotalAmount");

  const { accessToken, setAccessToken } = useAccessToken();
  useEffect(() => {
    const cookies = parseCookies();
    console.log(cookies, "cookies");
    const token = cookies.auth_token;
    console.log(typeof token, "iooioio");
    if (token) {
      setAccessToken(token);
    } else {
      // alert("nothing")
    }
  }, []);
  console.log(accessToken, "accessToken");


   const handleApplyDiscount = async() => {
  
        console.log("object")
        // setVaoucher1(voucher);
        try {
           const requestData = {
            code: voucher,
            card_price:data2?.data[0]?.sale_price
                // full_name:name,
                // additional_invoice:invoiceDetails
              };
              
              let res = await fetch('https://dating.goaideme.com/discount/is-voucher-valid', {
                method: 'POST', // Method set to POST
                headers: {
                  'Content-Type': 'application/json', // Indicates that you're sending JSON
                   'Authorization': `Bearer ${gettoken}` // Send the token in the Authorization header
                },
                body: JSON.stringify(requestData) // Stringify the data you want to send in the body
              });
              
              // Parse the response JSON
              let posts = await res.json();
              console.log(posts,"jklklkj");
              const numberValue = parseFloat(posts?.data.replace(/[^0-9.]/g, "")); 
              setVaoucherDiscount(numberValue)
              // console.log("voucher discount", voucherDiscount);
              if(res.status===200){
                toast.success("Voucher Added Suceesfully", {autoClose:2000})
              }else if(posts?.statusCode === 401){
                Cookies.remove("auth_token");
                router.replace("/login");
                window.location.reload();
              }
        } catch (error:any) {
          toast.error("Voucher is not found", {autoClose:3000});
        }
      }; 

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center bg-lightBg">
      <ToastContainer />
      <div className="bg-white p-6 rounded-[20px] hover:shadow-lg transition-all  border border-[#e5e7eb] flex flex-col justify-between h-full">
        <h1 className="text-center text-2xl font-bold mb-4">
          {data2.data[0].number_of_cards} Cards Bundle
        </h1>

        <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Your Bundle</h2>

          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-pink-200 flex items-center justify-center rounded-full">
              {/* Use an image or icon here */}
              <img
                className="w-20 h-10"
                //   style={{objectFit:"cover"}}
                src="https://groupleavingcards.com/images/team.png"
                alt="Icon"
              />
            </div>
            <div className="ml-4">
              <h3 className="text-base font-semibold">
                {data2.data[0].number_of_cards} Cards Bundle
              </h3>
              <p className="text-sm text-gray-500">
                {data2.data[0].number_of_cards} cards
              </p>
            </div>
          </div>

          <div className="flex items-center mb-4">
            <input
              type="text"
              placeholder="Voucher Code"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
              onChange={(e: any) => onChange(e.target.value)}
              value={voucher}
            />
            <button
              onClick={handleApplyDiscount}
              className="ml-2 text-blue-600 font-semibold"
            >
              Apply
            </button>
          </div>

          <div className="border-t border-gray-300 pt-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Bundle Price</span>
              <span>{TotalAmount} INR</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span>Tax</span>
              <span>0.00 INR</span>
            </div>
            <div className="flex justify-between text-base font-bold">
              <span>Total</span>
              <span>{TotalAmount} INR</span>
            </div>
          </div>
        </div>
        <div className="p-2">
          {accessToken ? (
            <RazorPay amount={TotalAmount} type={"bundleFor"} bundleId={"bundle_card"} />
          ) : (
            <button type="button" className="mt-6 bg-blue-600 text-blueText w-full py-2 rounded-xl border-2 border-[blueText] hover:bg-blue-700" onClick={()=> router.replace('/login') }>
              Pay Now :${TotalAmount} INR{" "}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanBunddlePage;
