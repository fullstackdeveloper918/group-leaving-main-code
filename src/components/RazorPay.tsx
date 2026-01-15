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

const RazorPay = ({
  amount,
  type,
  cart_id,
  card_name,
  bundleId,
  numberOfCards,
}: any) => {
  console.log(
    amount,
    "amount",
    bundleId,
    "bundleid",
    cart_id,
    "cartid",
    card_name,
    "card_name",
    type,
    "type",
    "numberOfCards",
    numberOfCards
  );


  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [success, setSuccess] = useState(false);
  const param = useParams();
  const [state, setState] = useState<string>("");
  const [authToken, setAuthToken] = useState<string>("");
  const searchParams = useSearchParams();
  const cardId = searchParams.get("cardId");
  useEffect(() => {
    const cookies = nookies.get();
    const token = cookies.auth_token || "";
    setAuthToken(token);
  }, [state]);

  const cartId = cart_id; // Correct way to extract cart_uuid
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const cookies = nookies.get();
    const userInfoFromCookie: UserInfo | null = cookies.userInfo
      ? JSON.parse(cookies.userInfo)
      : null;
    setUserInfo(userInfoFromCookie);
  }, []);
  const [uniqueId, setUniqueId] = useState<any>("");

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      // const response = await fetch("/api1/create", { method: "POST" });
      const response = await fetch("/api1/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: Math.round(amount * 100) }),
      });
      const data = await response.json();
      setState(data);
      if (!window.Razorpay) {
        // console.error("Razorpay SDK not loaded");
        return;
      }

      const options = {
       key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "", // Ensure this is set in .env.local
        // key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Ensure this is set in .env.local
        amount: Math.round(amount * 100),
        currency: "INR",
        // name: "Wedding",
        name: card_name || "Card Purchase",
        description: "Test Transaction",
        order_id: data.orderId,
        handler: async (response: any) => {

          const paymentId = response.razorpay_payment_id;
          const product_id = param.id;

          // headers["Authorization"] = `Bearer ${getToken}`;
          try {
            const paymentResponse = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/razorpay/save-payment`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${authToken}`,
                  // "Authorization":`Bearer ${authToken}`
                },
                body: JSON.stringify({
                  cart_uuid: cartId,
                  product_id: product_id,
                  user_uuid: userInfo?.uuid,
                  sender_name: name,
                  paymentId: paymentId,
                  payment_for: type === "single" ? "card" : "bundle",
                  is_payment_for_both: type === "bundle" ? true : false,
                  bundle_uuid: bundleId === "bundle_card" ? "" : bundleId,
                  collection_link: "sdfsrwr",
                }),
              }
            );
            if (!paymentResponse.ok) {
              throw new Error("Payment save failed");
            }
            const responseData = await paymentResponse.json();
            if (type === "bundleFor") {
              router.push(`/account/bundles`);
            } else {
              setSuccess(true);
              router.push(`/successfull?cart_uuid=${cartId}`);
            }
            setUniqueId(responseData?.data?.messages_unique_id);
          } catch (error) {
            console.error("Error saving payment:", error);
          }
        },
        prefill: {
          name: userInfo?.name || "Guest User",
          email: userInfo?.email || "testing@gmail.com",
          // contact: "8999999998",
          contact: "", // <-- IMPORTANT: EMPTY to force Razorpay to ask user
          readonly: {
            email: false,
            contact: false,
          },
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

  useEffect(() => {
    if (success) {
      const saveBundle = async () => {
        try {
          const paymentResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/cart/buy-bundle/${userInfo?.uuid}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
              },
              body: JSON.stringify({
                count: numberOfCards,
              }),
            }
          );

          if (!paymentResponse.ok) {
            throw new Error("Number of card bundle not saved for user");
          }

        } catch (error) {
          console.error("Error saving card bundle number:", error);
        }
      };

      saveBundle();
    }
  }, [success, userInfo?.uuid, authToken, numberOfCards]);

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
