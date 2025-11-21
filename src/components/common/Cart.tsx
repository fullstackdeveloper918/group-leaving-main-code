"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const Cart = () => {
  const router = useRouter();
  const gettoken = Cookies.get("auth_token");
  const [data, setData] = useState<any>([]);
  const getdata = async () => {
    try {
      let res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cart/cart-listing`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${gettoken}`,
          },
        }
      );

      let responseData = await res.json();
      setData(responseData);
      if (res.status === 401) {
        Cookies.remove("auth_token");
        router.replace("/login");
        window.location.reload();
        return;
      }
    } catch (error: any) {
      console.log(error, "errorresponsedata");
      toast.error("Something went wrong! Please try again.", {
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 py-md-10">
      <h1 className="font-bold mb-4 mb-md-5 my-card-head">My Carts</h1>
      <div className="w-full account-cart-box">
        {!data?.data || data?.data.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10">
            <p className="mb-4 text-gray-500">No carts found.</p>
            <Link href="/card/farewell">
              <button className="bg-[#558ec9] text-white text-600 px-6 py-2 rounded-full shadow hover:bg-blue-500 transition">
                Add Cards
              </button>
            </Link>
          </div>
        ) : (
          data?.data?.map((card: any) => {
            const formattedDeliveryDate = card.delivery_date
              ? new Date(card.delivery_date).toLocaleDateString("en-CA")
              : "Not Scheduled";
            const formattedCreateDate = card.created_at
              ? new Date(card.created_at).toLocaleDateString("en-CA")
              : "Not Scheduled";

            return (
              <div
                key={card.id}
                className="rounded-lg p-6 mb-4 flex justify-between items-center my-cart-cardbox"
              >
                <div className="flex items-center w-full gap-4 flex-column flex-lg-row">
                  <div className="cd-img-inn">
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_URL}/${card?.images[0]?.card_images[0]}`}
                      alt={card.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="w-full">
                    <div className="flex justify-between cart-cont-para">
                      <div className="">
                        <h2 className="text-xl font-bold text-black">
                          {" "}
                          Card for {card?.recipient_name}
                        </h2>
                        <p className="mb-0 mail-box-wrap">
                          {card?.recipient_email
                            ? card?.recipient_email
                            : "Set email"}
                        </p>
                      </div>
                      {/* Action Buttons */}
                      {card.is_remove_from_cart === 0 ? (
                        <Link href={`/card/pay/${card.cart_uuid}`}>
                          <button className="bg-[#ecc94b] text-black border border-gray-300 px-3 h-10 rounded-pill fw-semibold payCart-btn">
                            Pay now
                          </button>
                        </Link>
                      ) : (
                        <button className="bg-[#001160] text-white border border-gray-300 px-3 h-10 rounded-2xl hover:bg-[#132DAD]">
                          View Gift
                        </button>
                      )}
                    </div>
                    {/* <hr /> */}

                    <div className="flex justify-between w-full lg:flex-row flex-col mt-3">
                      <div className="">
                        <p className="text-gray-500 text-sm mb-0">
                          CREATED: {formattedCreateDate}
                        </p>
                        <p className="text-gray-500 text-sm fw-bold mb-0">
                          STATUS:{" "}
                          <span
                            className={
                              card.active === true
                                ? "text-[#48bb78]"
                                : "text-[#CB6E17]"
                            }
                          >
                            {card.active === true ? "Active" : "Unpaid"}
                          </span>
                        </p>
                      </div>
                      <div className="text-left lg:text-right">
                        {/* Formatted Delivery Date */}
                        <p className="text-gray-500 text-sm mb-0">
                          DELIVERY DATE: {formattedDeliveryDate}
                        </p>
                        <p className="text-gray-500 text-sm mb-0">
                          SIGNATURES: {card.signatures} signatures
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
    </div>
  );
};

export default Cart;
