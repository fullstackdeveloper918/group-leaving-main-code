"use client"; // Ensure this is at the top for client-side rendering

import React, { useEffect, useState } from "react";
import { CheckCircleIcon, ClipboardIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import Link from "next/link";
import nookies from "nookies";
import { useSearchParams, useRouter } from "next/navigation";

interface UserInfo {
  name: string;
  email: string;
  uuid?: string;
}

const Success = ({ cartUuid }: any) => {
  const [authToken, setAuthToken] = useState<string>("");
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  const cartUuid2 = searchParams.get("cart_uuid");
  const cardId = searchParams.get("cardId"); // "c1088013-bbe7-4c95-903a-cd7099fc0519"

  function getCartUuid(url: string | null): string {
    if (!url) return ""; // handle null
    return url.split("?")[0]; // take only part before '?'
  }

  const cartUuiddata = getCartUuid(cartUuid2);
  console.log(cartUuiddata, "cartUuiddata");

  useEffect(() => {
    const cookies = nookies.get();
    const userInfoFromCookie: UserInfo | null = cookies.userInfo
      ? JSON.parse(cookies.userInfo)
      : null;
    setUserInfo(userInfoFromCookie);
  }, []);

  useEffect(() => {
    const cookies = nookies.get();
    const token = cookies.auth_token || "";
    setAuthToken(token);
  }, []);

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";

  const handleCopy = () => {
    if (cartUuid) {
      navigator.clipboard
        .writeText(`${baseUrl}/share/${cartUuid}`)
        .then(() => {
          toast.success("Link copied successfully");
        })
        .catch(() => {
          toast.error("Failed to copy the link");
        });
    }
  };

  const handleSignCard = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/razorpay/save-payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            cart_uuid: cartUuiddata,
            product_id: cartUuiddata,
            user_uuid: userInfo?.uuid,
            sender_name: "",
            paymentId: "pay_RQvPVchRjd68qz",
            payment_for: "card",
            is_payment_for_both: "",
            bundle_uuid: "",
            collection_link: "sdfsrwr",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data?.error || "Failed to save payment");
        return;
      }

      // Use router.push instead of window.location.href
      router.push(`/share/${cartUuid}`);
    } catch (error) {
      console.error("Error saving payment:", error);
      toast.error("An error occurred while saving payment");
    }
  };

  return (
    <div className="success-container">
      <div className="success-card">
        {/* Steps */}
        <div className="steps-container">
          <div className="step">
            <div className="step-circle">1</div>
            <span className="step-label">Pick a Design</span>
          </div>
          <div className="step">
            <div className="step-circle">2</div>
            <span className="step-label">Enter Details</span>
          </div>
          <div className="step">
            <div className="step-circle">3</div>
            <span className="step-label">Pay and Share</span>
          </div>
        </div>

        {/* Success Message */}
        <div className="success-message">
          <CheckCircleIcon className="success-icon" />
          <h1 className="success-title">Success!</h1>
          <p className="success-description">
            Thanks for your payment, we&apos;ve created your card and it&apos;s
            ready to be signed.
          </p>
        </div>

        {/* Shareable Link */}
        <div className="shareable-link-container">
          <label className="shareable-label">
            Share the link with friends or colleagues so they can add their own
            messages:
          </label>
          <div className="shareable-input-container">
            <input
              type="text"
              readOnly
              value={cartUuid ? `${baseUrl}/share/${cartUuid}` : ""}
              className="shareable-input"
            />
            <button onClick={handleCopy} className="copy-button">
              <ClipboardIcon className="clipboard-icon" />
            </button>
          </div>
        </div>

        {/* Buttons */}
        <div className="button-container">
          {cartUuid && (
            <Link href={`/successfull/receipt/${cartUuid}`}>
              <button className="view-receipt-button">View Receipt</button>
            </Link>
          )}
          {cartUuid && (
            <button
              type="button"
              className="sign-card-button"
              onClick={handleSignCard}
            >
              Sign Card
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Success;
