"use client";
import React, { useEffect, useState } from "react";
import Script from "next/script";
import nookies from "nookies";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
// import ContributorsModal from "./ContributorsModal";

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

const CollectionPayment = ({
  amount,
  type,
  closeModal,
  product_id,
  paymentAmount,
  name,
  setIsCustomAmount,
  handleProceed,
  reloadly_cart_id,
  reloadly_amount,
  groupId,
  onSuccess,
  original_amount,
}: any) => {
  // const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const param = useParams();
  
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const cookies = nookies.get();
    const userInfoFromCookie: UserInfo | null = cookies.user_info
      ? JSON.parse(cookies.user_info)
      : null;
    setUserInfo(userInfoFromCookie);
  }, []);
  const handlePayment = async () => {
    if (!name) {
      toast.error("Please add your name first.");
      return;
    }

    setIsProcessing(true);
    try {
      const response = await fetch("/api1/create", { method: "POST" });
      const data = await response.json();

      if (!window.Razorpay) {
        console.error("Razorpay SDK not loaded");
        return;
      }

      const options = {
        // amount: paymentAmount * 100, // Razorpay requires the amount in paise
        // currency: "INR",
        // name: name||"Anonymous",
        // description: "Test Transaction with Escrow",
        // order_id: data.orderId, // Use the order ID from the backend respo7nse
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "", // Ensure this is set in .env.local
        // key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Ensure this is set in .env.local
        amount: Math.round(paymentAmount * 100), // Razorpay requires the amount in paise
        currency: "INR",
        name: name || "Anonymous",
        description: "Test Transaction",
        order_id: data.orderId,
        handler: async (response: any) => {

          const paymentId = response.razorpay_payment_id;
          
          try {
            const paymentResponse = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/order/create-orders`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  cart_id: groupId,
                  reloadly_cart_id: reloadly_cart_id,
                  product_id: product_id,
                  quantity: 1,
                  unit_price: reloadly_amount,
                  sender_name: name,
                  original_amount: original_amount,
                }),
              }
            );
            if (!paymentResponse.ok) {
              throw new Error("Payment save failed");
            }
            if (paymentResponse) {
              if (onSuccess) await onSuccess();
            }
            
          } catch (error) {
            console.error("Error saving payment:", error);
          }
        },
        prefill: {
          name: userInfo?.name || "Guest User",
          email: userInfo?.email || "testsssing@gmail.com",
          contact: "sadasdas",
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
      setIsCustomAmount(false);
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
        onClick={() => handlePayment()}
        disabled={isProcessing}
        className="mt-6 bg-blue-600 text-blueText w-full py-2 rounded-xl border-2 border-[blueText] hover:bg-blue-700"
      >
        {isProcessing ? "Processing..." : `Pay Now: ${amount.toFixed(2)} INR`}
      </button>
    </>
  );
};

export default CollectionPayment;
