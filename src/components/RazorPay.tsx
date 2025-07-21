"use client";
import React, { useEffect, useState } from "react";
import Script from "next/script";
import nookies from "nookies";
import { useParams, useRouter, useSearchParams } from "next/navigation";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface UserInfo {
  name: string;
  email: string;
  uuid?: string;
}

const RazorPay = ({ amount, type,bundleId,bundleOption }: any) => {
  //  const getToken = cookies().get("auth_token")?.value || "";
  //   console.log(getToken, "Access Token");
    console.log(amount, "bundleId");
    
    console.log(type, "wertfghdfg");
    console.log(bundleOption, "sfasdfasd");
    
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const param = useParams();
  console.log(param,"param");
  console.log(userInfo,"userInfo");
  console.log(type,"qazxsw");
  
  const [state, setState] = useState<string>("");
  const [authToken, setAuthToken] = useState<string>("");
  console.log(authToken,"authToken");

  useEffect(() => {
    const cookies = nookies.get();
    const token = cookies.auth_token || "";
    setAuthToken(token);
    console.log(token, "Access Token");
  }, [state]);
  const searchParams = useSearchParams();
  console.log(type,"type");
  
  const cartId = searchParams.get("cart_uuid"); // Correct way to extract cart_uuid
  console.log("cartId",cartId)
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const cookies = nookies.get();
    console.log("cookiesUserInfo",cookies.userInfo);
    const userInfoFromCookie: UserInfo | null = cookies.userInfo
      ? JSON.parse(cookies.userInfo)
      : null;
    setUserInfo(userInfoFromCookie);
  }, []);
const [uniqueId,setUniqueId] =useState<any>("")
console.log(uniqueId,"uniqueId");

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch("/api1/create", { method: "POST" });
      const data = await response.json();
setState(data)
      if (!window.Razorpay) {
        console.error("Razorpay SDK not loaded");
        return;
      }

      const options = {
        key: "rzp_test_NPDqhJnbXJi072", // Ensure this is set in .env.local
        // key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Ensure this is set in .env.local
        amount: Math.round(amount * 100),
        currency: "INR",
        name: "Wedding",
        description: "Test Transaction",
        order_id: data.orderId,
        handler: async (response: any) => {
          console.log("Payment successful", response);
          
          const paymentId = response.razorpay_payment_id;
          const product_id = param.id;

          console.log("product_id",product_id)
          console.log("sadfasdfassfdasf",userInfo)
          // headers["Authorization"] = `Bearer ${getToken}`;
          try {
            const paymentResponse = await fetch("https://dating.goaideme.com/razorpay/save-payment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
               'Authorization': `Bearer ${authToken}`
                // "Authorization":`Bearer ${authToken}`
              },
              body: JSON.stringify({
                cart_uuid: cartId,
                product_id: product_id,
                user_uuid: userInfo?.uuid,
                sender_name: name,
                paymentId: paymentId,
                payment_for: type==="single"?"card":"bundle",
                is_payment_for_both: type==="bundle"?true:false,
                bundle_uuid: bundleId==="bundle_card"?"":bundleId,
                collection_link:"sdfsrwr"
              }),
            });
            if (!paymentResponse.ok) {
              throw new Error("Payment save failed");
            }
            const responseData = await paymentResponse.json();
            console.log(responseData,"paymentResponse");
            if (type === "bundleFor") {
              router.push(`/account/bundles`);
            } else{
              router.push(`/successfull?unique_id=${responseData?.data?.messages_unique_id}`);
            }
            setUniqueId(responseData?.data?.messages_unique_id)
            
          } catch (error) {
            console.error("Error saving payment:", error);
          }
        },
        prefill: {
          name: userInfo?.name || "Guest User",
          email: userInfo?.email || "testing@gmail.com",
          contact: "9999999999",
        },
        notes: {
          product_id: param.id,
          user_uuid: userInfo?.uuid,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
      // if (type === "bundle") {
      //   router.push(`/account/bundles`);
      // } else{
      //   router.push(`/payment?${uniqueId}`);
      // }
    } catch (error) {
      console.error("Payment failed", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <button
        onClick={handlePayment}
        disabled={isProcessing}
        className="mt-6 bg-blue-600 text-blueText w-full py-2 rounded-xl border-2 border-[blueText] hover:bg-blue-700"
      >
        {isProcessing ? "Processing..." : `Pay Now: ${amount} INR`}
      </button>
    </>
  );
};

export default RazorPay;
