"use client";
import React, { useEffect, useState } from "react";
import EscrowPayment from "./EscrowPayment";
import axios from "axios";
import CollectionPayment from "./CollectionPayment";
import ContributorsModal from "./ContributorsModal";
import { usePathname } from "next/navigation";
import { AiFillEdit } from "react-icons/ai";

const GiftCardCollectionPot = ({
  brandKey,
  groupId,
  cardShareData,
  refreshFromCreateBoard,
}: any) => {
  const [isContributorsModalOpen, setIsContributorsModalOpen] = useState(false);
  const [isGiftCardModalOpen, setIsGiftCardModalOpen] = useState(false);
  const [isContributeModalOpen, setIsContributeModalOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(20); // Default selected amount
  const [isCustomAmount, setIsCustomAmount] = useState<any>(false); // Tracks if "Other" is selected
  const [customAmount, setCustomAmount] = useState<any>(20); // Custom amount input
  const [name, setName] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showContributors, setShowContributors] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any | null>(null);

  const pathname = usePathname();
  const parts = pathname.split("/");
  const brandKey2 = parts[parts.length - 1];

  console.log(cardShareData, "cardshareDate herer");

  console.log(showContributors, "showContributors");
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
  const [state, setState] = useState<any>("");
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

      console.log("data1 here", data1);

      const response = await fetch(
        `https://dating.goaideme.com/order/get-single-product?product_id=${brandKey2}`, // Sending brandKey as query parameter
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

  // Fetch gift card products (like in CreateBoard)
  const fetchGiftCardProducts = async () => {
    try {
      const response = await fetch(
        "https://dating.goaideme.com/order/create-token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: "",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to get token");
      }
      const data = await response.json();
      const response1 = await fetch(
        " https://dating.goaideme.com/order/get-products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data?.data?.access_token}`,
          },
          body: "",
        }
      );
      if (!response1.ok) {
        throw new Error("Failed to get products");
      }
      const data1 = await response1.json();
      setState(data1);
    } catch (error) {
      // handle error if needed
    }
  };

  useEffect(() => {
    // const brandKey = 'yourBrandKeyValue';  // Replace with your actual brandKey value
    fetchGiftCard();
  }, []);

  useEffect(() => {
    if (refreshFromCreateBoard) {
      // Call your refresh logic here, e.g., refetchGiftCard();
      fetchGiftCard();
    }
  }, [refreshFromCreateBoard]);

  console.log(giftCard, "giftCard");

  // Calculate base amount, service fee (5%), and total
  const baseAmount = isCustomAmount ? parseFloat(customAmount) : selectedAmount;
  const serviceFee = +(baseAmount * 0.05).toFixed(2);
  const totalAmount = +(baseAmount + serviceFee).toFixed(2);

  console.log(totalAmount, "totalAmount");
  // Remove all isModalOpen, setIsModalOpen, openModal, closeModal, and modal rendering logic from GiftCardCollectionPot
  // Add a prop: onGiftCardAdded (callback)
  // For the Add to Gift Card button, use onClick={() => setIsModalOpen(true)}

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
               console.log(selectedImage,"selectedImage")
  return (
    <>
      <div className="bg-white shadow-lg rounded-lg p-6">
        {
          <>
            <h2 className="text-lg font-semibold mb-4 text-center">
              Group Gift Fund
            </h2>
            <div className="flex justify-center items-center mb-4 flex-col">

                 <div className="gift-cards-tools">
                  <AiFillEdit className="cursor-pointer"  onClick={async () => {
                    await fetchGiftCardProducts();
                    setIsGiftCardModalOpen(true);
                  }}/>

                 </div>

              {brandKey ? (
                <img
                  src={selectGiftImage} // Replace with your gift card image
                  alt="E-Gift Card"
                  className="w-50 h-30 object-contain rounded-md"
                />
              ) : (
                <img
                  src={`https://dating.goaideme.com/${cardShareData?.images?.[0]?.card_images?.[0]}`} // Replace with your gift card image
                  alt="E-Gift Card"
                  className="w-40 h-30 object-contain rounded-md"
                />
              )}
            </div>
            {/* <div className="text-center mb-4 justify-center">
<p className="text-2xl font-bold">£0</p>
</div> */}
            {/* <EscrowPayment /> */}
            <div className="text-center mb-4 justify-center   flex-col">
              {brandKey ? (
                <p className="text-2xl font-bold">
                  INR {giftCard.data?.senderFee}
                </p>
              ) : (
                <p className="text-2xl font-bold">INR {cardShareData?.price}</p>
              )}

              <div className="text-center mb-2 gap-2 items-center justify-center flex flex-col">
                <button
                  onClick={() => setIsContributeModalOpen(true)}
                  className=" w-[40%] bg-[#558ec9]  text-white  px-4 py-2  rounded-md hover:bg-blue-700 transition"
                >
              Add Participant
                </button>

              </div>
              <div className="text-center mb-2 justify-center">
              <button className="text-red hover:underline">Remove</button>
            </div>
            </div>
                <button
                  onClick={async () => {
                    await fetchGiftCardProducts();
                    setIsGiftCardModalOpen(true);
                  }}
                                    className="w-[40%] bg-blue-600 text-[14px] text-black border-2 border-blue-700 px-2 py-2 rounded"

                >
                  Add to Gift Card
                </button>
          </>
        }

        {/* <div className="mt-6 text-center justify-center">
        <button className="bg-blue-600 text-black border-2 border-blue-700 px-4 py-2 rounded-md hover:bg-blue-700 transition">
          Add Gift Card
        </button>
      </div> */}
        {/* </Link> */}

        {/* Remove all isModalOpen, setIsModalOpen, openModal, closeModal, and modal rendering logic from GiftCardCollectionPot */}
        {/* Add a prop: onGiftCardAdded (callback) */}
        {/* For the Add to Gift Card button, use onClick={() => setIsModalOpen(true)} */}

        {isGiftCardModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white shadow-lg max-w-lg w-full relative overflow-auto broad-model-box">
              {/* Top-left Cancel Button */}
              <h2 className="model-head-broad font-semibold mb-2 text-center">
                Choose a Gift Card
              </h2>
                {!selectedImage &&
              <button
                className="absolute top-3 right-2 bg-gray-200 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-300 fw-semibold close-broad-modelbtn"
                onClick={() => {
                  setIsGiftCardModalOpen(false);
                  setSelectedImage(null);
                }}
              >X
              </button>}
              {/* How Collection Pots Work */}
              {!selectedImage &&
              <div className="bg-blue-100 p-4 ps-0 rounded-md mb-2">
                <h3 className="text-lg font-semibold">
                  How does a group fund work?
                </h3>
                <ul className="text-md text-gray-600 mt-2 ps-0">
                  <li>1. Pick a gift card to add to your board.</li>
                  <li>2. Friends and colleagues can chip in.</li>
                  <li>
                    3. The recipient gets the gift card instantly when they open
                    their board.
                  </li>
                </ul>
              </div>}
              {/* Conditionally render based on whether an image is selected */}
              {selectedImage ? (
                <div className="flex flex-col items-center">
                  <div className="mb-2">
                    <button
                    id="choose-gift-return"
                      className="text-black"
                      onClick={() => setSelectedImage(null)} >
                        <i className="fas fa-arrow-left"></i> Back

                    </button>
                  </div>
                  <div className="">
                    <img
                      src={selectedImage.logoUrls?.[0]}
                      alt=""
                      className="w-[100%] rounded-md"
                    />
                  </div>
                  <h2 className="text-xl font-bold mt-3">
                    {selectedImage.brand?.brandName}
                  </h2>
                  <p className="text-sm text-gray-500 mb-2">
                    Nation: <span className="font-bold ml-2">IND</span>
                  </p>
                  <p className="text-sm text-gray-500 mb-2">
                    Money: <span className="font-bold ml-2">{selectedImage?.senderCurrencyCode}</span>
                  </p>
                  <p className="text-sm text-gray-500 mb-2">
                    Amount:{" "}
                    <span className="font-bold ml-2">
                     ₹{selectedImage?.senderFee}
                    </span>
                  </p>
  
                  <p className="text-xs text-gray-400 mt-1 text-center">
                    (If your total exceeds the limit, we&apos;ll split it into
                    multiple gift cards)
                  </p>
                  <a
                    href="#"
                    className="text-sm text-blue-600 hover:underline mt-2"
                  >
                    View terms
                  </a>
                  <button
                    className="bg-[#558ec9] text-white px-4 py-2 rounded mt-2 hover:bg-blue-700"
                    onClick={() => {
                      // Add logic for adding gift card here
                      setIsGiftCardModalOpen(false);
                      setSelectedImage(null);
                    }}
                  >
                    Add this Gift Card
                  </button>
                </div>
              ) : (
                <div className="relative">
                  {/* Image Grid */}
                  <div className="grid grid-cols-2 gap-4 max-h-80 overflow-y-auto">
                    {state?.data?.content?.map((res: any, index: number) => {
                      const imageUrl = res.logoUrls?.[0];
                      return (
                        <div
                          key={index}
                          className="border rounded-lg overflow-hidden"
                          onClick={() => setSelectedImage(res)}
                        >
                          <img
                            src={imageUrl}
                            alt={res?.brand?.brandName}
                            className="w-full h-auto object-cover"
                          />
                          <p className="text-center p-2 font-medium">
                            {res?.brand?.brandName}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              {/* Modal Footer */}
              <p className="text-sm text-gray-500 mt-2 text-center">
                You&apos;ll be redirected to Stripe to finish your payment.
              </p>
            </div>
          </div>
        )}

        {/* Contribute Modal (full payment modal) */}
        {isContributeModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-md shadow-lg max-w-sm w-full relative">
              {/* Top-left Cancel Button */}
              <h2 className="text-center font-bold">E-Gift Card</h2>

              <button
                className="absolute top-4 right-4 bg-gray-200 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-300"
                onClick={() => setIsContributeModalOpen(false)}
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
                <CollectionPayment
                  closeModal={() => setIsContributeModalOpen(false)}
                  paymentAmount={totalAmount}
                  name={name}
                  brandKey={brandKey}
                  groupId={groupId}
                  amount={totalAmount}
                  setIsCustomAmount={setIsContributeModalOpen}
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
    </>
  );
};

export default GiftCardCollectionPot;
