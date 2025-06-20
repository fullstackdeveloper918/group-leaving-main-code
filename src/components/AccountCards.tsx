"use client";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import Link from "next/link";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
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
  console.log(data,"uouwerouwe");
  
// const AccountCards = () => {
  const router = useRouter(); 

  // const [data,setData] = useState<any>([])
  // console.log(data, "cshjksd");
  // router.replace(`/share/${data?.data?.uuid}?brandKey=${brandKeys}`);
  // const filterData = data?.listing?.filter((item:any)=> item.paymentStatus==="captured")
  // console.log(data,"filterData");
  // useEffect(()=>{
  //     if(data?.error){
  //         Cookies.remove("auth_token"); // This won't work on the client side
  //         toast.error("Session expired. Please log in again.");
  //         router.replace("/login");
  //                 // window.location.reload();
  //     }
  // },[data])
// const gettoken = Cookies.get("auth_token"); 
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await fetch('https://dating.goaideme.com/card/users-cards', {
  //         method: 'GET',
  //         headers: {
  //           'Authorization': `Bearer ${gettoken}`,
  //         },
  //       });
  
  //       const posts = await data.json();
  //       setData(posts)
  //       console.log("postssssssssssssss",posts)
  
  //       if (posts?.statusCode === 401) {
  //         Cookies.remove("auth_token"); // This won't work on the client side
  //         toast.error("Session expired. Please log in again.");
  //         router.replace("/login");
  //         window.location.reload();
  //       }
  //     } catch (error) {
  //       toast.error("Error fetching profile data:");
  //     }
  //   };
  
  //   fetchData();
  // }, []);
  

  const deliveryDate = "2024-11-28T00:00:00.000Z";
  const dateObject = new Date(deliveryDate);

  // Format the date to YYYY-MM-DD
  const formattedDate = dateObject.toLocaleDateString("en-CA"); // 'en-CA' gives 'YYYY-MM-DD' format

  console.log(formattedDate, "jljljlj");
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-6">My Cards</h1>

      <div className="w-full max-w-4xl">
        {(!data?.listing || data?.listing.length === 0) ? (
          <div className="flex flex-col items-center justify-center py-10">
            <p className="mb-4 text-gray-500">No data found.</p>
          </div>
        ) : (
          data?.listing?.map((card: any) => {
            // Format the delivery date to 'YYYY-MM-DD'
            const formattedDeliveryDate = card.delivery_date
              ? new Date(card.delivery_date).toLocaleDateString("en-CA") // Format if valid
              : "Not Scheduled"; // 'en-CA' gives 'YYYY-MM-DD'
            const formattedCreateDate = card.cartDetail[0].created_at
              ? new Date(card.cartDetail[0].created_at).toLocaleDateString(
                  "en-CA"
                ) // Format if valid
              : "Not Scheduled"; // 'en-CA' gives 'YYYY-MM-DD'
            console.log(card, "yuyuyu");

            const iiii = card;
            // console.log("cardis", card)
            return (
              <div
                key={card.id}
                className="bg-white shadow rounded-lg p-6 mb-4 flex justify-between items-center"
              >
                <div className="flex items-center w-full">
                  {/* Image */}
                  <img
                    // src={"https://groupleavingcards.com/images/gift/collection_pot.png"}
                    src={`https://dating.goaideme.com/${card?.images[0]?.card_images[0]}`}
                    alt={card.title}
                    className="w-40 h-40 object-cover rounded-lg mr-4"
                  />

                  {/* Card Details */}
                  <div className="w-full">
                    <div className="flex justify-between h-12">
                      <div className="">
                        <h2 className="text-lg font-semibold">
                          {" "}
                          Card for {card.cartDetail[0]?.recipient_name}
                        </h2>
                        <p>
                          {card.cartDetail[0]?.recipient_email
                            ? card.cartDetail[0]?.recipient_email
                            : "Set email"}
                        </p>
                      </div>
                      {/* Action Buttons */}
                      {card.is_remove_from_cart === 0 ? (
                        <Link href={`/card/pay/${card?.card_uuid}`}>
                          <button className="mt-2 bg-blue-500 text-black border border-gray-300 px-4 rounded-full hover:bg-blue-600">
                            Pay now
                          </button>
                        </Link>
                      ) : (
                        // /share/${data?.data?.uuid}?brandKey=${brandKeys}
                        <Link href={`/share/${card?.uuid}`}>
                        <button className="bg-[#001160] text-white border border-gray-300 px-3 h-10 rounded-2xl hover:bg-[#132DAD]">
                          View Gift
                        </button>
                        </Link>
                      )}
                      
                    </div>
                    <hr />

                    <div className="flex justify-between w-full">
                      <div className="">
                        <p className="text-gray-500 text-sm">
                          CREATED: {formattedCreateDate}
                        </p>
                        <p className="text-gray-500 text-sm">
                          STATUS:{" "}
                          <span
                            className={
                              card.paymentStatus === "captured"
                                ? "text-[#48bb78] font-semibold"
                                : "text-[#CB6E17]"
                            }
                          >
                            {card.paymentStatus === "captured" ? "Active" : "Unpaid"}
                          </span>
                        </p>
                      </div>
                      <div className="text-right">
                        {/* Formatted Delivery Date */}
                        <p className="text-gray-500 text-sm">
                          DELIVERY DATE: {formattedDeliveryDate}
                        </p>
                        <p className="text-gray-500 text-sm">
                          SIGNATURES: {card.signatures} signatures
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
    </div>
  );
};

export default AccountCards;
