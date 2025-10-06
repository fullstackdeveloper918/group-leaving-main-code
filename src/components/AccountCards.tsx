"use client";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import Link from "next/link";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
type Card = {
  id: number;
  title: string;
  imageUrl: string;
  created: string;
  status: "Active" | "Unpaid";
  deliveryDate: string;
  signatures: number;
};

// const cards: Card[] = [
//   {
//     id: 1,
//     title: 'qwertyuio',
//     imageUrl: 'https://groupleavingcards.com/images/gift/collection_pot.png', // Replace with actual image path
//     created: '10/04/2024, 03:22 PM',
//     status: 'Active',
//     deliveryDate: 'Not Scheduled',
//     signatures: 0,
//   },
//   {
//     id: 2,
//     title: 'Board for dfgh',
//     imageUrl: 'https://groupleavingcards.com/images/gift/collection_pot.png', // Replace with actual image path
//     created: '10/04/2024, 03:21 PM',
//     status: 'Unpaid',
//     deliveryDate: 'Not Scheduled',
//     signatures: 0,
//   },
// ];

const AccountCards = ({ data }: any) => {
  console.log(data, "AccountCards data");

  const [showModal, setShowModal] = useState(false);
  const [selectedCartUuid, setSelectedCartUuid] = useState<string | null>(null);
  const [cards, setCards] = useState<any[]>(data?.listing || []);
  const [, forceUpdate] = useState(0);
  // const AccountCards = () => {
  const router = useRouter();

  const deliveryDate = "2024-11-28T00:00:00.000Z";
  const dateObject = new Date(deliveryDate);

  // Format the date to YYYY-MM-DD
  const formattedDate = dateObject.toLocaleDateString("en-CA"); // 'en-CA' gives 'YYYY-MM-DD' format

  // console.log(formattedDate, "jljljlj");

  const handleDelete = async (cart_uuid: any) => {
    try {
      const gettoken = Cookies.get("auth_token");
      // Call your delete API here
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/soft-delete/${cart_uuid}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${gettoken}`,
        },
      });

      if (res.ok) {
        // Callback to refresh list or UI
        setShowModal(false);
        toast.success("Card deleted successfully");
        
        // setCards((prev) =>
        //   prev.filter((c) => c.cartDetail[0]?.cart_uuid !== cart_uuid)
        // );
        // forceUpdate((x) => x + 1);
      } else {
        toast.error("Failed to delete.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("An error occurred.");
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 py-md-10">
      <h1 className="font-bold mb-4 mb-md-5 my-card-head">My Cards</h1>

      <div className="w-full account-card-box">
        {!cards || cards.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10">
            <p className="mb-4 text-gray-500">No data found.</p>
          </div>
        ) : (
          cards?.map((card: any) => {
            // {console.log(card,"here to see card text")}
            // Format the delivery date to 'YYYY-MM-DD'
            const formattedDeliveryDate = card.delivery_date
              ? new Date(card.delivery_date).toLocaleDateString("en-CA") // Format if valid
              : "Not Scheduled"; // 'en-CA' gives 'YYYY-MM-DD'
            const formattedCreateDate = card.cartDetail[0].created_at
              ? new Date(card.cartDetail[0].created_at).toLocaleDateString(
                  "en-CA"
                ) // Format if valid
              : "Not Scheduled"; // 'en-CA' gives 'YYYY-MM-DD'
            // console.log(card, "yuyuyu");

            const iiii = card;
            // console.log("cardis", card)
            return (
              <div
                key={card?.cartDetail[0]?.cart_uuid}
                className="rounded-lg p-6 mb-4 flex justify-between items-center account-inner-card"
              >
                <div className="flex w-full card-full-cover-box gap-4">
                  {/* Image */}
                  <div className="cd-img-inn">
                    <img
                      // src={"https://groupleavingcards.com/images/gift/collection_pot.png"}
                      src={`${process.env.NEXT_PUBLIC_API_URL}/${card?.images[0]?.card_images[0]}`}
                      alt={card.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  {/* Card Details */}
                  <div className="outer-card-box-ac">
                    <div className="flex justify-between card-cont-para">
                      <div className="">
                        <h2 className="text-xl font-bold text-black">
                          {" "}
                          Card for {card.cartDetail[0]?.recipient_name}
                        </h2>
                        <p className="mb-0 mail-box-wrap">
                          {card.cartDetail[0]?.recipient_email
                            ? card.cartDetail[0]?.recipient_email
                            : "Set email"}
                        </p>
                      </div>
                      {/* Action Buttons */}

                      <div className="d-flex items-center gap-2">
                        {card.is_remove_from_cart === 0 ? (
                          <Link href={`/card/pay/${card?.card_uuid}`}>
                            <button className="mt-2 bg-blue-500 text-black border border-gray-300 px-4 rounded-full hover:bg-blue-600">
                              Pay now
                            </button>
                          </Link>
                        ) : (
                          // /share/${data?.data?.uuid}?brandKey=${brandKeys}
                          <Link
                            href={`/share/${card?.cartDetail[0]?.cart_uuid}`}
                          >
                            <button className="px-3 h-10 rounded-pill seeGiftbtn">
                              See Gift
                            </button>
                          </Link>
                        )}
                        {/* <AiFillEdit className="cursor-pointer" /> */}
                        <AiFillDelete
                          fill="#db0404"
                          className="cursor-pointer text-red-600"
                          onClick={() => {
                            setSelectedCartUuid(card?.cartDetail[0]?.cart_uuid);
                            setShowModal(true);
                          }}
                        />
                      </div>
                    </div>
                    {/* <hr /> */}

                    <div className="flex justify-between w-full">
                      <div className="">
                        <p className="text-gray-500 text-sm">
                          Created On: {formattedCreateDate}
                        </p>
                        <p className="text-gray-500 text-sm mb-0 fw-semibold">
                          Current Status:{" "}
                          <span
                            className={
                              card.paymentStatus === "captured"
                                ? "text-[#48bb78] font-semibold"
                                : "text-[#CB6E17]"
                            }
                          >
                            {card.paymentStatus === "captured"
                              ? "Active"
                              : "Unpaid"}
                          </span>
                        </p>
                      </div>
                      <div className="text-right">
                        {/* Formatted Delivery Date */}
                        <p className="text-gray-500 text-sm">
                          Scheduled Delivery: {formattedDeliveryDate}
                        </p>
                        <p className="text-gray-500 text-sm">
                          Messages: {card.signatures ? card.signatures : "-"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Section */}
              </div>
            );
          })
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative">
            {/* X Icon Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-4 text-gray-500 hover:text-black text-[32px] "
              aria-label="Close modal"
            >
              &times;
            </button>

            <h2 className="text-lg font-bold mb-4">Are you sure?</h2>
            <p className="mb-4">
              Do you really want to delete this item? This action cannot be
              undone.
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                style={{ background: "#9f9e9e7a", fontWeight: "500" }}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => selectedCartUuid && handleDelete(selectedCartUuid)}
                style={{ background: "#db0404", fontWeight: "500" }}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountCards;
