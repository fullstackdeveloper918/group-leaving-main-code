"use client";
import React, { useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { AiFillDelete } from "react-icons/ai";

const AccountCards = ({ data }: any) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCartUuid, setSelectedCartUuid] = useState<string | null>(null);
  const [cards, setCards] = useState<any[]>(data?.listing || []);
  const formatDate = (date: string | null | undefined) =>
    date ? new Date(date).toLocaleDateString("en-CA") : "Not Scheduled";

  const handleDelete = async (cart_uuid: string) => {
    try {
      const token = Cookies.get("auth_token");
      if (!token) {
        toast.error("Authentication token missing");
        return;
      }
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cart/soft-delete/${cart_uuid}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        setCards((prev) =>
          prev.filter((c) => c.cartDetail[0]?.cart_uuid !== cart_uuid)
        );
        toast.success("Card deleted successfully");
        setShowModal(false);
      } else {
        toast.error("Failed to delete card");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("An error occurred.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-3 py-md-10">
      <h1 className="font-bold mb-4 mb-md-5 my-card-head">My Cards</h1>
      <div className="w-full account-card-box">
        {!cards || cards.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10">
            <p className="mb-4 text-gray-500">No data found.</p>
          </div>
        ) : (
          cards.map((card) => {
            const detail = card.cartDetail?.[0];
            const formattedDeliveryDate = formatDate(card.delivery_date);
            const formattedCreateDate = formatDate(detail?.created_at);
            const imageSrc = card?.images?.[0]?.card_images?.[0]
              ? `${process.env.NEXT_PUBLIC_API_URL}/${card.images[0].card_images[0]}`
              : "/no-image.png";

            return (
              <div
                key={detail?.cart_uuid}
                className="rounded-lg p-6 mb-4 flex justify-between items-center account-inner-card"
              >
                <div className="flex w-full card-full-cover-box gap-4">
                  <div className="cd-img-inn">
                    <img
                      src={imageSrc}
                      alt={card.title || "Card image"}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  <div className="outer-card-box-ac">
                    <div className="flex justify-between card-cont-para flex-col lg:flex-col gap-2">
                      <div>
                        <h2 className="text-xl font-bold text-black">
                          Card for {detail?.recipient_name || "Recipient"}
                        </h2>
                        <p className="mb-0 mail-box-wrap">
                          {detail?.recipient_email || "Set email"}
                        </p>
                      </div>

                      <div className="d-flex gap-1 lg:mt-0 mt-[7px]">
                        {card.is_remove_from_cart === 0 ? (
                          <Link href={`/card/pay/${detail?.cart_uuid}`}>
                            <button className="bg-[#ecc94b] text-black border border-gray-300 px-3 h-10 rounded-pill fw-semibold payCart-btn">
                              Pay now
                            </button>
                          </Link>
                        ) : (
                          <Link href={`/share/${detail?.cart_uuid}`}>
                            <button className="px-3 h-10 rounded-pill seeGiftbtn">
                              See Gift
                            </button>
                          </Link>
                        )}

                        {/* <Link href={`/share/${detail?.cart_uuid}`}> */}
                        <button
                          onClick={() => {
                            setSelectedCartUuid(detail?.cart_uuid);
                            setShowModal(true);
                          }}
                          className="hoverbutton px-3 h-10 rounded-full text-red-600 border-2 border-red-600 hover:bg-red-600 hover:text-white transition-colors"
                          style={{ color: "red" }} // optional, but redundant with text-red-600
                        >
                          Delete
                        </button>

                        {/* </Link> */}

                        {/* <AiFillDelete
                          fill="#db0404"
                          className="cursor-pointer text-red-600"
                          onClick={() => {
                            setSelectedCartUuid(detail?.cart_uuid);
                            setShowModal(true);
                          }}
                        /> */}
                      </div>
                    </div>

                    <div className="flex justify-between w-full flex-col lg:flex-row">
                      <div>
                        <p
                          className="text-gray-500 text-sm mt-0 mb-0"
                          style={{ marginBottom: "0px !important" }}
                        >
                          Created On: {formattedCreateDate}
                        </p>
                        <p className="text-gray-500 text-sm mb-0 fw-semibold">
                          Current Status:{" "}
                          <span
                            className={
                              card.is_remove_from_cart === 1
                                ? // card.paymentStatus === "captured"
                                  "text-[#48bb78] font-semibold"
                                : "text-[#CB6E17]"
                            }
                          >
                            {card.is_remove_from_cart === 1
                              ? // card.paymentStatus === "captured"
                                "Active"
                              : "Unpaid"}
                          </span>
                        </p>
                      </div>
                      <div className="text-left lg:text-right">
                        <p className="text-gray-500 text-sm mt-0 mb-0">
                          Messages: {card.signatures || "-"}
                        </p>
                        <p className="text-gray-500 text-sm mt-0 mb-0">
                          Delivery: {formattedDeliveryDate}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {showModal && selectedCartUuid && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-4 text-gray-500 hover:text-black text-[32px]"
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
                onClick={() => handleDelete(selectedCartUuid)}
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
