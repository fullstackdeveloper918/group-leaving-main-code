"use client";
import React, { useEffect, useState } from "react";
import Script from "next/script";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import SuccessPage from "@/components/common/Success";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const EscrowPayment = ({ closeModal, brandKey, groupId,paymentAmount,name }: any) => {
  console.log(groupId, "groupId");

  const router = useRouter();

  const gettoken = Cookies.get("auth_token");

  const AMOUNT = 0; // Amount in INR
  const [isProcessing, setIsProcessing] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [uuid, setUuid] = useState<string | null>(null);
  console.log(uuid, "uuid");
  useEffect(() => {
    const cookies = document.cookie.split("; ");
    const userInfoCookie = cookies.find((cookie) =>
      cookie.startsWith("user_info=")
    );

    if (userInfoCookie) {
      const cookieValue = userInfoCookie.split("=")[1];
      try {
        const parsedUserInfo = JSON.parse(decodeURIComponent(cookieValue));
        setUserInfo(parsedUserInfo);

        // Extracting the UUID from the parsed userInfo object
        if (parsedUserInfo && parsedUserInfo.uuid) {
          setUuid(parsedUserInfo.uuid);
          console.log("UUID:", parsedUserInfo.uuid);
        }
      } catch (error) {
        console.error("Error parsing userInfo cookie", error);
      }
    }
  }, []);
  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      // Call the backend API to create the escrow order
      const response = await fetch("/api/create", { method: "POST" });
      const data = await response.json();

      //   if (data.error) {
      //     console.error("Error from backend:", data.error);
      //     return;
      //   }

      // Log the escrow hold amount and beneficiary account
      console.log("Escrow Hold Amount:", data.holdAmount); // Log hold amount
      console.log("Beneficiary Account:", data.beneficiaryAccount); // Log beneficiary account

      // Configure Razorpay Checkout options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
        amount: paymentAmount * 100, // Razorpay requires the amount in paise
        currency: "INR",
        name: name||"Anonymous",
        description: "Test Transaction with Escrow",
        order_id: data.orderId, // Use the order ID from the backend respo7nse
        handler: function (response: any) {
          console.log("Payment successful", response);
          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/razorpay/save-payment`,
            // 'https://dating.goaideme.com/razorpay/link-by-user-id',
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${gettoken}`,
              },
              body: JSON.stringify({
                payment_for: "group",
                product_id: brandKey,
                user_uuid: uuid,
                collection_link: groupId,
                paymentId: response.razorpay_payment_id,
              }),
            }
          );
          router.replace(`/payment`);
        },
        prefill: {
          name: "Abhay Singh",
          email: "testing@gmail.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      // Initialize and open Razorpay Checkout
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
      // console.log(rzp1,"rzp1paymentStatus")
      closeModal();
      
    } catch (error) {
      console.error("Payment failed", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      {/* <button
        onClick={handlePayment}
        disabled={isProcessing}
        className="w-full bg-blue-500 text-black py-2 border-2 border-blue-700 rounded-md hover:bg-blue-600 transition"
      >
        {isProcessing ? "Processing..." : `Escrow Pay Now: ${AMOUNT} INR`}
      </button> */}
      <div className="text-center mb-4 justify-center">
        {/* <p className="text-2xl font-bold">£{AMOUNT}</p> */}
        <button
          onClick={handlePayment}
          disabled={isProcessing}
          className="bg-blue-600 text-black  border-2 border-blue-700 px-4 py-2  rounded-md hover:bg-blue-700 transition"
        >
          {isProcessing ? "Processing..." : `Continue to Payment`}
        </button>
      </div>
    </>
  );
};

export default EscrowPayment;
