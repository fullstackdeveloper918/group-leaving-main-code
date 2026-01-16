import React from "react";
import { fetchFromServer } from "@/app/actions/fetchFromServer";

const ReceiptPage = async ({ params }: { params: { unique_id: string } }) => {
  // const api = {
  //   url: `${process.env.NEXT_PUBLIC_API_URL}/cart/${params?.unique_id}`,
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  // };
  const api = {
  url: `${process.env.NEXT_PUBLIC_API_URL}/cart/single-cart-by-id`,
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: {
  cartUuid: params?.unique_id,
},
 
  // body: JSON.stringify({cartUuid: params?.unique_id}),
};

  let data: any = null;

  try {
    data = await fetchFromServer(api);
  } catch (e) {
    console.error("Error fetching receipt:", e);
    data = null;
  }

  const receipt = data?.data;

  console.log("receipt data details",data)
  console.log("receipt details",receipt)
  console.log("unique_id details",params)

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-100 py-10">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-[30px] text-center text-[25px] text-[#5696db]">Receipt</h1>
        {receipt ? (
          <>
            <div className="mb-4 flex flex-col gap-4 receipt-card">
              <div className=" receipt-list flex justify-between">
                <span className="font-semibold">Product</span>
                <span className="text-[14px]">Group Card</span>
              </div>
              <div className="receipt-list  flex justify-between ">
                <span className="font-semibold">Recipient Name:</span>
                <span className="text-[14px]">{receipt.recipient_name || "-"}</span>
              </div>
              <div className="receipt-list flex justify-between ">
                <span className="font-semibold">Recipient Email:</span>
                <span className="text-[14px]">{receipt.recipient_email || "-"}</span>
              </div>
              <div className="receipt-list flex justify-between ">
                <span className="font-semibold">Sender Name:</span>
                <span className="text-[14px]">{receipt.sender_name || "-"}</span>
              </div>
              <div className="flex justify-between ">
                <span className="font-semibold">Amount:</span>
                <span className="text-[14px]">{receipt.currency_type?.toUpperCase()} {receipt.amount || "-"}</span>
              </div>
            </div>
            <div className="text-center mt-[30px]">
              <span className="text-green-600 text-[20px] font-semibold text-lg">
                Thank you for your purchase!
              </span>
            </div>
          </>
        ) : (
          <div className="text-center text-red-500">
            Receipt not found or failed to load.
          </div>
        )}
      </div>
    </div>
  );
};

export default ReceiptPage;
