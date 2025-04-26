"use client";
import React, { useEffect, useState } from "react";
import EscrowPayment from "./EscrowPayment";
import axios from "axios";
import CollectionPayment from "./CollectionPayment";

const GiftCardCollectionPot = ({ brandKey, groupId }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddCardOpen, setIsAddCardOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(20); // Default selected amount
  const [isCustomAmount, setIsCustomAmount] = useState<any>(false); // Tracks if "Other" is selected
  const [customAmount, setCustomAmount] = useState<any>(20); // Custom amount input
  const [name, setName] = useState("");
  const [giftCard, setGiftCard] = useState<any>("");
  const [makeAnonymous, setMakeAnonymous] = useState(false);
  console.log(brandKey, "brandKey");

  const fetchGiftCard = async () => {
    try {

      const response1 = await fetch(
        "https://dating.goaideme.com/order/create-token",
        {
          // replace '/api/cart' with the correct endpoint
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // 'Authorization': `Bearer ${gettoken}`
          },
          body: "",
        }
      );

      // Check if the request was successful
      if (!response1.ok) {
        throw new Error("Failed to add item to cart");
      }

      const data1 = await response1.json();


      const response = await fetch(
        ` https://dating.goaideme.com/order/get-single-product?product_id=${brandKey}`, // Sending brandKey as query parameter
        {
          method: "GET", // No body for GET requests
          headers: {
            "Content-Type": "application/json", // Only for JSON responses
              'Authorization': `Bearer ${data1?.data?.access_token}`
          },
        }
      );
  
      const data = await response.json();
      console.log(data, "lsjdflj");
  
      setGiftCard(data);
      
    } catch (error) {
      
    }
    // return data;
  };

  useEffect(() => {
    // const brandKey = 'yourBrandKeyValue';  // Replace with your actual brandKey value
    fetchGiftCard();
  }, []);
  console.log(giftCard, "giftCard");

  const serviceFee = 1.3;
  const totalAmount = isCustomAmount
    ? parseFloat(customAmount) + serviceFee
    : selectedAmount + serviceFee+giftCard.data?.senderFee;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAmountChange = (amount: any) => {
    setIsCustomAmount(false);
    setSelectedAmount(amount);
  };

  const handleCustomAmount = (e: any) => {
    const value = e.target.value;
    if (!isNaN(value) && value >= 2) {
      setCustomAmount(parseFloat(value));
    }
  };
  // Check if giftCard and giftCard.data are defined before accessing imageUrls
  const selectGiftImage = giftCard.data?.logoUrls[0];
  // const selectGiftImage = giftCard.data?.imageUrls["278w-326ppi"];
  // const selectGiftImage = giftCard?.data?.imageUrls ? giftCard.data.imageUrls["278w-326ppi"] : null;

  console.log(selectGiftImage, "selectGiftImage");

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      {
        
        <>
        <h2 className="text-lg font-semibold mb-4 text-center">
        Gift Card Collection Pot
      </h2>
      <div className="flex justify-center mb-4">
        <img
          src={selectGiftImage} // Replace with your gift card image
          alt="Gift Card"
          className="w-32 h-20 object-contain"
        />
      </div>
      {/* <div className="text-center mb-4 justify-center">
<p className="text-2xl font-bold">£0</p>
</div> */}
      {/* <EscrowPayment /> */}
      <div className="text-center mb-4 justify-center">
        <p className="text-2xl font-bold">{giftCard.data?.senderFee} INR</p>
        <button
          onClick={openModal}
          className="bg-blue-600 text-black  border-2 border-blue-700 px-4 py-2  rounded-md hover:bg-blue-700 transition"
        >
          Contribute to Gift Card
        </button>
        <div className="text-center mb-2 justify-center">
          <button className="text-black-600 hover:underline">Delete</button>
        </div>
      </div>
        
        </>
      }

      {/* <div className="mt-6 text-center justify-center">
        <button className="bg-blue-600 text-black border-2 border-blue-700 px-4 py-2 rounded-md hover:bg-blue-700 transition">
          Add Gift Card
        </button>
      </div> */}
      {/* </Link> */}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-lg max-w-sm w-full relative">
            {/* Top-left Cancel Button */}
            <h2 className="text-lg font-semibold mb-4 text-center">
              Add to Gift Card
            </h2>

            <button
              className="absolute top-4 right-4 bg-gray-200 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-300"
              onClick={closeModal}
            >
              X
            </button>

            <div className="flex justify-around mb-4">
              {[10, 15, 20].map((amount) => (
                <button
                  key={amount}
                  className={`px-4 py-2 rounded-md border ${
                    !isCustomAmount && selectedAmount === amount
                      ? "bg-blue-600 text-blueText"
                      : "bg-gray-200 text-black"
                  }`}
                  onClick={() => handleAmountChange(amount)}
                >
                  ₹{amount}
                </button>
              ))}
              <button
                className={`px-4 py-2 rounded-md border ${
                  isCustomAmount
                    ? "bg-blue-600 text-blueText"
                    : "bg-gray-200 text-black"
                }`}
                onClick={() => {
                  setIsCustomAmount(true);
                  setSelectedAmount(0);
                }}
              >
                Other
              </button>
            </div>

            {isCustomAmount && (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Custom Amount (₹)
                </label>
                <input
                  type="number"
                  min="2"
                  value={customAmount}
                  onChange={handleCustomAmount}
                  className="border-2 border-gray-300 px-4 py-2 rounded-md w-full"
                />
                <p className="text-sm text-gray-500 mt-1">Min ₹2.00</p>
              </div>
            )}

            <p className="mb-4 text-sm text-gray-600">
              Service fee: ₹{serviceFee.toFixed(2)}
            </p>
            <p className="mb-4 text-lg font-semibold">
              Total: ₹{totalAmount.toFixed(2)}
            </p>

            <input
              type="text"
              placeholder="Your name"
              value={name}
              disabled={makeAnonymous}
              onChange={(e) => setName(e.target.value)}
              className="border-2 border-gray-300 px-4 py-2 rounded-md mb-4 w-full"
            />

            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="makeAnonymous"
                checked={makeAnonymous}
                onChange={() => setMakeAnonymous(!makeAnonymous)}
                className="mr-2"
              />
              <label htmlFor="makeAnonymous" className="text-sm">
                Make anonymous
              </label>
            </div>

            <div className="flex justify-center mt-4">
              {/* <button
                className="bg-gray-500 text-black px-4 py-2 rounded-md hover:bg-gray-600"
                onClick={closeModal}
              >
                Cancel
              </button> */}
              {/* <button
                className="bg-blue-600  border-2 border-blue-700 px-4 py-2 text-black px-4 py-2 rounded-md hover:bg-blue-700"
                onClick={() => {
                  console.log({
                    selectedAmount,
                    customAmount,
                    name,
                    makeAnonymous,
                  });
                  closeModal();
                }}
              >
                Continue to Payment
              </button> */}
              {/* <EscrowPayment
                closeModal={closeModal}
                paymentAmount={totalAmount}
                name={name}
                brandKey={brandKey}
                groupId={groupId}
              /> */}
              <CollectionPayment
                closeModal={closeModal}
                paymentAmount={totalAmount}
                name={name}
                brandKey={brandKey}
                groupId={groupId}
                amount={totalAmount}
                 cart_id={groupId} type={"card"}
              />
            </div>

            <p className="text-sm text-gray-500 mt-4 text-center">
              You’ll be taken to our payment provider Stripe to complete the
              payment.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GiftCardCollectionPot;
