import React from 'react';
import { fetchFromServer } from '@/app/actions/fetchFromServer';

const ReceiptPage = async ({ params }: { params: { unique_id: string } }) => {
  // Fetch receipt/payment/card details using the unique_id
  const api = {
    url: `${process.env.NEXT_PUBLIC_API_URL}/card/receipt/${params.unique_id}`,
    method: 'GET',
  };
  let data: any = null;
  try {
    data = await fetchFromServer(api);

    console.log(data,"data egeghfkjggfkl")
  } catch (e) {
    data = null;
  }

  const receipt = data?.data;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Receipt</h1>
        {receipt ? (
          <>
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Card Title:</span>
                <span>{receipt.card_title || '-'}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Recipient:</span>
                <span>{receipt.recipient_name || '-'}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Amount:</span>
                <span>₹{receipt.amount || '-'}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Payment Status:</span>
                <span>{receipt.payment_status || '-'}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Date:</span>
                <span>{receipt.date ? new Date(receipt.date).toLocaleString() : '-'}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Transaction ID:</span>
                <span>{receipt.transaction_id || '-'}</span>
              </div>
            </div>
            <div className="text-center mt-6">
              <span className="text-green-600 font-semibold text-lg">Thank you for your purchase!</span>
            </div>
          </>
        ) : (
          <div className="text-center text-red-500">Receipt not found or failed to load.</div>
        )}
      </div>
    </div>
  );
};

export default ReceiptPage; 