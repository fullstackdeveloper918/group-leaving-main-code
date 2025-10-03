import React from "react";
import { fetchFromServer } from "@/app/actions/fetchFromServer";

const ReceiptPage = async ({ params }: { params: { unique_id: string } }) => {
  const api = {
    url: `${process.env.NEXT_PUBLIC_API_URL}/cart/single-cart-by-id`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
  };

  let data: any = null;

  try {
    data = await fetchFromServer(api);
    console.log("API Response:", data);
  } catch (e) {
    console.error("Error fetching receipt:", e);
    data = null;
  }

  const receipt = data?.data;

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-100 py-10">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full h-[700px]">
        <h1 className="text-2xl font-bold mb-[90px] text-center text-[25px]">Receipt</h1>
        {receipt ? (
          <>
            <div className="mb-4  flex flex-col gap-6">
              <div className="flex justify-between mb-2 ">
                <span className="font-semibold">Product</span>
                <span>Group Card</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Recipient Name:</span>
                <span>{receipt.recipient_name || "-"}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Recipient Email:</span>
                <span>{receipt.recipient_email || "-"}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Sender Name:</span>
                <span>{receipt.sender_name || "-"}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Amount:</span>
                <span>{receipt.currency_type} {receipt.amount || "-"}</span>
              </div>
            </div>
            <div className="text-center mt-[200px]">
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
