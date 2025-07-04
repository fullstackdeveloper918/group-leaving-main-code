"use client";
import React, { useEffect, useState } from "react";
import EscrowPayment from "./EscrowPayment";
import axios from "axios";
import CollectionPayment from "./CollectionPayment";
import ContributorsModal from "./ContributorsModal";

const GiftCardCollectionPot = ({ brandKey, groupId,cardShareData }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddCardOpen, setIsAddCardOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(20); // Default selected amount
  const [isCustomAmount, setIsCustomAmount] = useState<any>(false); // Tracks if "Other" is selected
  const [customAmount, setCustomAmount] = useState<any>(20); // Custom amount input
  const [name, setName] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showContributors, setShowContributors] = useState(false);


  console.log(showContributors,"showContributors")
  const handleProceed = () => {
    if (name.trim() === "") {
      setShowWarning(true);
      return;
    }
    setShowWarning(false);
    setShowPayment(true); // This will render the CollectionPayment component
  };

  const [giftCard, setGiftCard] = useState<any>("");
  const [makeAnonymous, setMakeAnonymous] = useState(false);
  console.log(brandKey, "brandKey");
  console.log(isCustomAmount, "customAmount");

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
            Authorization: `Bearer ${data1?.data?.access_token}`,
          },
        }
      );

      const data = await response.json();
      console.log(data, "lsjdflj");

      setGiftCard(data);
    } catch (error) {}
    // return data;
  };

  useEffect(() => {
    // const brandKey = 'yourBrandKeyValue';  // Replace with your actual brandKey value
    fetchGiftCard();
  }, []);
  console.log(giftCard, "giftCard");

  // Calculate base amount, service fee (5%), and total
  const baseAmount = isCustomAmount ? parseFloat(customAmount) : selectedAmount;
  const serviceFee = +(baseAmount * 0.05).toFixed(2);
  const totalAmount = +(baseAmount + serviceFee).toFixed(2);


  console.log(totalAmount,"totalAmount")
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

  return (<>
    <div className="bg-white shadow-lg rounded-lg p-6">
      {
        <>
          <h2 className="text-lg font-semibold mb-4 text-center">
            Group Gift Fund
          </h2>
          <div className="flex justify-center mb-4">
            {
              brandKey ?  
              <img
              src={selectGiftImage} // Replace with your gift card image
              alt="E-Gift Card"
              className="w-32 h-20 object-contain"
            />
            :
            <img
            src={ `https://dating.goaideme.com/${cardShareData?.images?.[0]?.card_images?.[0]}`} // Replace with your gift card image
            alt="E-Gift Card"
            className="w-32 h-20 object-contain"
          />
            }
           
          </div>
          {/* <div className="text-center mb-4 justify-center">
<p className="text-2xl font-bold">£0</p>
</div> */}
          {/* <EscrowPayment /> */}
          <div className="text-center mb-4 justify-center   flex-col">
            {brandKey ? <p className="text-2xl font-bold">INR {giftCard.data?.senderFee}</p> : <p className="text-2xl font-bold">INR {cardShareData?.price}</p>}
           
            <div className="text-center mb-2 gap-2 items-center justify-center flex flex-col">
            <button onClick={() => setShowContributors(true)} className="w-[40%] bg-blue-600 text-[14px] text-black border-2 border-blue-700 px-2 py-2 rounded">
        View Contributors
      </button>

      <button
              onClick={openModal}
              className=" w-[60%] bg-[#558ec9]  text-white  px-4 py-2  rounded-md hover:bg-blue-700 transition"
            >
              Add to Gift Card
            </button>
            </div>
            {/* <div className="text-center mb-2 justify-center">
              <button className="text-black-600 hover:underline">Remove</button>
            </div> */}
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
            <h2 className="text-center font-bold">E-Gift Card</h2>

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

            {/* Show amount, service fee, and total */}
            <p className="mb-2 text-sm text-gray-600">
              Amount: ₹{baseAmount.toFixed(2)}
            </p>
            <p className="mb-2 text-sm text-gray-600">
              Service fee (5%): ₹{serviceFee.toFixed(2)}
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
            {showWarning && (
              <p className="text-red-500 mb-2">Please fill in your name</p>
            )}
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
                setIsCustomAmount={setIsModalOpen}
                cart_id={groupId}
                type={"greeting"}
              />

            </div>


            <p className="text-sm text-gray-500 mt-4 text-center">
              You&apos;ll be taken to our payment provider Stripe to complete
              the payment.
            </p>
          </div>
        </div>
      )}
      
    </div>

<ContributorsModal
isOpen={showContributors}
onClose={() => setShowContributors(false)}
groupId={groupId}
/></>
  );
};

export default GiftCardCollectionPot;
