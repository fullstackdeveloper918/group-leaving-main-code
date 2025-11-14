"use client";
import React, { useEffect, useState } from "react";
import CopyclickBoard from "./common/CopyclickBoard";
import Link from "next/link";
import GiftCardCollectionPot from "./GiftCardCollectionPot";
import SidebarModal from "./SidebarModal";
import { toast } from "react-toastify";
import { capFirst } from "../utils/validation";
import nookies from "nookies";
import SendGiftModal from "./common/SendGiftModal";
import Cookies from "js-cookie";
import { useParams, useSearchParams } from "next/navigation";
import Custom from "./common/custom";
import CommonCustomEditor from "./common/newcustomeditor/CommonCustomEdtior";

const GroupCollection = ({
  params,
  searchParams,
  // data,
  setClose,
  isClose,
}: any) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { id } = useParams();
  const [cookieValue, setCookieValue] = useState<string | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [buttonText, setButtonText] = useState("Lock Collection");
  const [organiser, setOrganiser] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shareImageData, setShareImageData] = useState<any>(null);
  const [shareCartData, setShareCartData] = useState<any>(null);
  const gettoken = Cookies.get("auth_token");
  const searchParams2 = useSearchParams();
  const cardId = searchParams2.get("cardId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postData = {
          cartUuid: id,
        };
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/cart/single-cart-by-id`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
          }
        );

        const data = await response.json();
        setShareCartData(data);
        setIsLocked(data?.data?.is_linked_locked);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, isLocked]);

  const lockdata = shareCartData?.data?.is_linked_locked;

  useEffect(() => {
    const fetchDataImage = async () => {
      try {
        if (!cardId) {
          console.error("No card ID found");
          return;
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/card/edit-card/${cardId}`,
          { method: "GET" }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Full API response:", data);

        const showImage = data?.data?.[0]?.images?.[0]?.card_images?.[0];
        console.log("Extracted showImage:", showImage);

        if (showImage) {
          setShareImageData(showImage);
        } else {
          console.warn("No image found in response");
        }
      } catch (error) {
        console.error("Error fetching image data:", error);
      }
    };
    fetchDataImage();
    // Only fetch when we have either shareCartData or id available
  }, []);
  const cardShareData = shareCartData?.data || [];

  useEffect(() => {
    const cookies = nookies.get();
    const userData = cookies.userInfo ? JSON.parse(cookies.userInfo) : null;
    setCookieValue(userData?.uuid || null);
    setOrganiser(userData?.full_name || "N/A");
  }, []);

  const lockeCollection = async () => {
    let item = {
      cart_uuid: id,
      type: !isLocked,
    };
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/razorpay/locked-collecton-link`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${gettoken}`,
          },
          body: JSON.stringify(item),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }
      const data = await response.json();
      toast.success(
        !isLocked
          ? "Editor locked successfully. Editing is now disabled."
          : "Editor unlocked successfully. You can now edit.",
        {
          autoClose: 1000,
        }
      );
      setIsLocked(!isLocked);
      setButtonText(isLocked ? "Unlock Collection" : "Lock Collection");
    } catch (error) {}
  };
  const handleSend = async (email: string) => {
    let item = {
      email: email,
      user_uuid: cookieValue,
      cart_uuid: id,
    };
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/razorpay/submit-now`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${gettoken}`,
          },
          body: JSON.stringify(item),
        }
      );

      if (response.ok) {
        toast.success("Gift sent successfully!", { autoClose: 1000 });
      } else {
        toast.error(
          "Please make sure the recipient email is the same as the modified collection recipient email.",
          { autoClose: 2000 }
        );
      }
    } catch (error) {
      toast.error(
        "Please make sure the recipient email is valid and try again.",
        { autoClose: 2000 }
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {cookieValue && (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6 text-center">
          {searchParams?.brandKey ? (
            <h1 className="text-3xl font-bold mb-4">
              {/* {capFirst(data?.data?.collection_title)} */}
            </h1>
          ) : (
            <h1 className="text-3xl font-bold mb-4">
              {cardShareData?.cartDetail?.[0]?.recipient_name}
            </h1>
          )}

          <div className="flex gap-5 mb-4 items-center justify-center">
            <button
              className="bg-blue-600 border-2 border-blue-700 text-black px-4 py-2 rounded-md hover:bg-blue-700 transition"
              onClick={() => setIsSidebarOpen(true)}
            >
              Modify Collection
            </button>
            <button
              className="bg-blue-600 border-2 border-blue-700 text-black px-4 py-2 rounded-md hover:bg-blue-700 transition"
              onClick={() => lockeCollection()}
            >
              {isLocked ? "Unlock Collection" : "Secure Collection"}
            </button>
          </div>
          <p className="text-gray-600 mb-4">
            No delivery date has been chosen yet. Set one to motivate
            contributions, or send your gift right away by clicking{" "}
            <span className="font-semibold">Send Immediately</span>.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 border-2 border-blue-700 text-black px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Send Immediately
          </button>
        </div>
      )}

      <div className="flex  items-center justify-center w-full">
        <div className="flex flex-col w-full justify-center">
          <div className="bg-white shadow-lg  rounded-lg p-6 ">
            {cookieValue && (
              <>
                <div className="texts-sections" id="flex-orgainisier">
                  <div
                    className="MuiAvatar-root MuiAvatar-rounded MuiAvatar-colorDefault mui-gfmqku"
                    aria-label="recipe"
                    style={{ backgroundColor: "rgb(230, 101, 129)" }}
                  >
                    F
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold mb-0">
                      {capFirst(organiser)}
                    </h2>
                    <p className="text-gray-500 mb-4">Coordinator</p>
                  </div>
                </div>
              </>
            )}
            <CopyclickBoard />
          </div>

          <section className="greeting_card_sign common_padding">
            <div className="containers 2xl:max-w-[1200px] max-w-[1080px] mx-auto ">
              <div className=" lg:flex flex-col lg:flex-row ">
                <div
                  className="flex w-full justify-center mobileflex"
                  style={{ position: "relative" }}
                >
                  {lockdata && <div className="locked-overlay" />}
                  <div
                    className="mt-8 flex flex-col mobileWidth"
                    style={{ width: "550px", maxWidth: "650px" }}
                  >
                    <CommonCustomEditor
                      cardShareData={cardShareData}
                      locked={lockdata}
                    />
                  </div>

                  <GiftCardCollectionPot
                    brandKey={searchParams?.brandKey}
                    groupId={params.id}
                    cardShareData={cardShareData}
                    searchParams={searchParams}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <SidebarModal
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        data={cardShareData}
        cartId={params.id}
      />
      <SendGiftModal
        isOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSend}
      />
    </div>
  );
};

export default GroupCollection;
