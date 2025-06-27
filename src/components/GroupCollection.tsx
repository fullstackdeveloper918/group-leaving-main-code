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
import { useParams } from "next/navigation";

const GroupCollection = ({
  params,
  searchParams,
  data,
  setClose,
  isClose,
}: any) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  console.log(data, "jdkhdur");
  const { id } = useParams();
  const [cookieValue, setCookieValue] = useState<string | null>(null);
  console.log(cookieValue, "cookieValue");
  const [isLocked, setIsLocked] = useState(false); // State to track the lock/unlock state
  const [buttonText, setButtonText] = useState("Lock Collection");
  const [organiser, setOrganiser] = useState("");
  console.log(organiser, "organiser");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shareImageData, setShareImageData] = useState<any>(null);


  const gettoken = Cookies.get("auth_token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://dating.goaideme.com/card/users-cards",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${gettoken}`,
            },
          }
        );

        const data = await response.json();
        setShareImageData(data); // Store response data in state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  console.log(shareImageData, "shareImageData here");


  const cardShareData = shareImageData?.listing?.find(
    (item: any) => item.uuid === id
  );

  console.log("cardShareData heree", cardShareData);

  // const [editCollection, setEditCollection] = useState(data);

  // const gettoken = Cookies.get("auth_token");
  useEffect(() => {
    // Get cookies on the client side
    const cookies = nookies.get(); // retrieves cookies from document.cookie
    const userData = cookies.userInfo ? JSON.parse(cookies.userInfo) : null;
    console.log(userData, "userData");

    setCookieValue(userData?.uuid || null);
    setOrganiser(userData?.full_name || "N/A");
  }, []);

  const lockeCollection = async () => {
    let item = {
      user_uuid: cookieValue,
      link_id: data?.data?.uuid,
      type: isLocked,
    };
    console.log(item, "item");

    try {
      const response = await fetch(
        "https://dating.goaideme.com/razorpay/locked-collecton-link",
        {
          // replace '/api/cart' with the correct endpoint
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${gettoken}`,
          },
          body: JSON.stringify(item),
        }
      );

      // Check if the request was successful
      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }

      const data = await response.json(); // Assuming the response returns JSON
      toast.success(!isLocked ? "Unlock Successfully" : "Lock Successfully", {
        autoClose: 1000,
      });
      console.log(data, "sadfdgsfdg");
      setIsLocked(!isLocked);
      setButtonText(isLocked ? "Unlock Collection" : "Lock Collection");

      //  router.replace(`/share/${data?.data?.uuid}?brandKey=${brandKeys}`);
    } catch (error) {}
  };
  const handleSend = async (email: string) => {
    let item = {
      email: email,
      user_uuid: cookieValue,
    };
    try {
      const response = await fetch(
        "https://dating.goaideme.com/razorpay/submit-now",
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
          "Please make sure the recipient email is valid and try again.",
          { autoClose: 2000 }
        );
      }
      // toast.success(response.data)
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        "Please make sure the recipient email is valid and try again.",
        { autoClose: 2000 }
      );
      //   alert("An error occurred. Please try again.");
    }
  };

  console.log("paramsid", params.id);

  // console.log(editCollection,"editCollection11");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6 text-center">
        {
          searchParams?.brandKey ? 
          <h1 className="text-3xl font-bold mb-4">
          {capFirst(data?.data?.collection_title)}
        </h1>
        :
        <h1 className="text-3xl font-bold mb-4">
          {cardShareData?.title}
        </h1>
        }
        <div className="flex gap-5 mb-4 items-center justify-center">
          <button
            className="bg-blue-600 border-2 border-blue-700 text-black px-4 py-2 rounded-md hover:bg-blue-700 transition"
            onClick={() => setIsSidebarOpen(true)}
          >
            Modify Collection
          </button>
          <button
            className="bg-blue-600  border-2 border-blue-700 text-black px-4 py-2 rounded-md hover:bg-blue-700 transition"
            onClick={lockeCollection}
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
      <div className="flex  items-center justify-center ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl">
          <div className="bg-white shadow-lg  rounded-lg p-6 " >
          <div className="texts-sections" id="flex-orgainisier">
            <div className="MuiAvatar-root MuiAvatar-rounded MuiAvatar-colorDefault mui-gfmqku" aria-label="recipe" style={{backgroundColor: "rgb(230, 101, 129)"}}>F</div>
            <div>
            <h2 className="text-lg font-semibold mb-0">
              {capFirst(organiser)}
            </h2>
            <p className="text-gray-500 mb-4">Coordinator</p></div>
            </div>
            <div className="flex">
              <button className="text-blue-600 hover:underline mb-2">
                Post a note for your team
              </button>
            </div>
            <CopyclickBoard />
            <div className="mt-4 border-t pt-4">
              <h3 className="text-md font-semibold mb-2">
                Include a Greeting Card in this Collection?
              </h3>
              <p className="text-gray-500 mb-4">
                Make your collection extra memorable by including a group
                greeting card. The greeting card will stay at this link and
                gather unlimited personal messages from all contributors.
              </p>
              <Link href={`/card/farewell/1`}>
                <button className="bg-blue-600 text-black px-4 py-2 border-2 border-blue-700 rounded-md hover:bg-blue-700 transition">
                  Include Greeting Card
                </button>
              </Link>
            </div>
          </div>

          <GiftCardCollectionPot
            brandKey={searchParams?.brandKey}
            groupId={params.id}
            cardShareData={cardShareData}
          />
        </div>
      </div>
      <SidebarModal
        isOpen={isSidebarOpen}
        // setEditCollection= {setEditCollection}
        setClose={setClose}
        isClose={isClose}
        onClose={() => setIsSidebarOpen(false)}
        data={data?.data}
        createlinkuserId={cookieValue}
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
