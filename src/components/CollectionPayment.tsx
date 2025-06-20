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

const CollectionPayment = ({
  amount,
  type,
  closeModal,
  brandKey,
  groupId,
  paymentAmount,
  name,
  setIsCustomAmount,
  handleProceed
}: any) => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const param = useParams();
  console.log(param, "param");
  const [giftCard, setGiftCard] = useState<any>("");
  const searchParams = useSearchParams();
  console.log(type, "type");

  const cartId = searchParams.get("cart_uuid"); // Correct way to extract cart_uuid
  console.log("cartId", cartId);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const cookies = nookies.get();
    console.log("cookiesUserInfo", cookies.user_info);
    const userInfoFromCookie: UserInfo | null = cookies.user_info
      ? JSON.parse(cookies.user_info)
      : null;
    setUserInfo(userInfoFromCookie);
  }, []);
  console.log(paymentAmount, "asdasdasasdd");
  const fetchGiftCard = async () => {
    try {
      const response = await fetch(
        "https://dating.goaideme.com/order/create-token",
        {
          // replace '/api/cart' with the correct endpoint
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // 'Authorization': `Bearer ${gettoken}`
          },
          body: "",
        }
      );

      // Check if the request was successful
      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }

      const data = await response.json();

      setGiftCard(data);
    } catch (error) {}
    // return data;
  };

  useEffect(() => {
    // const brandKey = 'yourBrandKeyValue';  // Replace with your actual brandKey value
    fetchGiftCard();
  }, []);
  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch("/api1/create", { method: "POST" });
      const data = await response.json();

      if (!window.Razorpay) {
        console.error("Razorpay SDK not loaded");
        return;
      }

      const options = {


        // key: "rzp_test_NPDqhJnbXJi072",
        // amount: paymentAmount * 100, // Razorpay requires the amount in paise
        // currency: "INR",
        // name: name||"Anonymous",
        // description: "Test Transaction with Escrow",
        // order_id: data.orderId, // Use the order ID from the backend respo7nse
        key: "rzp_test_NPDqhJnbXJi072", // Ensure this is set in .env.local
        // key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Ensure this is set in .env.local
        amount: paymentAmount * 100, // Razorpay requires the amount in paise
        currency: "INR",
        name: name || "Anonymous",
        description: "Test Transaction",
        order_id: data.orderId,
        handler: async (response: any) => {
          console.log("Payment successful", response);

          const paymentId = response.razorpay_payment_id;
          const product_id = param.id;

          console.log("product_id", product_id);

          try {
            const paymentResponse = await fetch(
              "https://dating.goaideme.com/order/create-orders",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${giftCard?.data?.access_token}`,
                },
                body: JSON.stringify({
                  product_id: brandKey,
                  quantity: 1,
                  unit_price: 10,

                  sender_name: name,
                  customIdentifier: "obucks158",
                  productAdditionalRequirements: { userId: "13" },
                  recipient_email: "ansdfaaayone@email.com",
                  country_code: "ES",
                  phone_number: "012345478",
                  preOrder: false,

                  // recipient_email:""
                  // cart_uuid: cartId,
                  // product_id: product_id,
                  // user_uuid: userInfo?.uuid,
                  // paymentId: paymentId,
                  // payment_for: type,
                  // collection_link:"sdfsrwr"
                }),
              }
            );
            if (!paymentResponse.ok) {
              throw new Error("Payment save failed");
            }

            // Redirect based on type after successful payment
            // if (type === "bundle") {
            //   router.push(`/account/bundles`);
            // } else {
            //   router.push(`/payment`);
            // }
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
            setIsCustomAmount(false)

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
         onClick={() =>handlePayment()}
        disabled={isProcessing}
        className="mt-6 bg-blue-600 text-blueText w-full py-2 rounded-xl border-2 border-[blueText] hover:bg-blue-700"
      >
        {isProcessing ? "Processing..." : `Pay Now: ${amount.toFixed(2)} INR`}
      </button>
    </>
  );
};

export default CollectionPayment;
