"use client";
import React, { useEffect, useRef, useState } from "react";
import CollectionPayment from "./CollectionPayment";
import ContributorsModal from "./ContributorsModal";
import { usePathname } from "next/navigation";
import { AiFillDelete, AiOutlineUser } from "react-icons/ai";
import Cookies from "js-cookie";
import Image from "next/image";
import userIcon from "../assets/icons/abj.png";
import NextTopLoader from "nextjs-toploader";
import Loader from "./common/Loader";
import { toast } from "react-toastify";

type TopLoaderRef = {
  continuousStart: () => void;
  complete: () => void;
};

const GiftCardCollectionPot = ({
  brandKey,
  groupId,
  cardShareData,
  refreshFromCreateBoard,
}: any) => {
  const [isContributorsModalOpen, setIsContributorsModalOpen] = useState(false);
  const [isGiftCardModalOpen, setIsGiftCardModalOpen] = useState(false);
  const [isContributeModalOpen, setIsContributeModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState<string | null>(null);
  const [isCustomAmount, setIsCustomAmount] = useState<any>(false);
  const [name, setName] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showContributors, setShowContributors] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any | null>(null);
  const gettoken = Cookies.get("auth_token");

  // Get current user info from cookies
  const userInfoCookie = Cookies.get("userInfo");
  const currentUserId = userInfoCookie
    ? JSON.parse(decodeURIComponent(userInfoCookie)).uuid
    : null;

  const [selectedContributeAmount, setSelectedContributeAmount] =
    useState<number>(0);
  const [
    selectedContributeAmountOgCurrency,
    setSelectedContributeAmountOgCurrency,
  ] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [reloadlyId, setReloadlyId] = useState<string>("");
  const loaderRef = useRef<TopLoaderRef | null>(null);

  const [giftCard, setGiftCard] = useState<any>("");
  const [makeAnonymous, setMakeAnonymous] = useState(false);
  const [state, setState] = useState<any>("");
  const [selectedProduct, setSelectedProduct] = useState<any>("");
  const [Loading, setLoading] = useState(false);

  const fetchGiftCard = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/reloadly/card/${groupId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${gettoken}`,
          },
        }
      );

      const data = await response.json();
      setGiftCard(data);
    } catch (error) {
      console.error("Error fetching gift card:", error);
    }
  };

  // Check if current user is the creator
  const isCreator = currentUserId && cardShareData?.user_uuid === currentUserId;
  console.log("Current User ID:", cardShareData?.user_uuid);

  const deleteGiftCard = async (uuid: string) => {
    const MIN_DISPLAY_TIME = 500;
    const startTime = Date.now();

    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/reloadly/soft-delete/${uuid}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${gettoken}`,
          },
        }
      );
      toast.success("Gift card deleted successfully");
      if (!response.ok) {
        throw new Error("Failed to delete gift card");
      }
      await fetchGiftCard();

      setIsDeleteModalOpen(false);
      setCardToDelete(null);
    } catch (error) {
      console.error("Error deleting gift card:", error);
      alert("Failed to delete gift card. Please try again.");
    } finally {
      const elapsed = Date.now() - startTime;
      const remaining = MIN_DISPLAY_TIME - elapsed;

      if (remaining > 0) {
        setTimeout(() => setLoading(false), remaining);
      } else {
        setLoading(false);
      }
    }
  };

  const handleDeleteClick = (uuid: string) => {
    setCardToDelete(uuid);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (cardToDelete) {
      deleteGiftCard(cardToDelete);
    }
  };

  const fetchGiftCardProducts = async () => {
    try {
      const response1 = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/order/get-products`,
        {
          method: "POST",
          body: "",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response1.ok) {
        throw new Error("Failed to get products");
      }
      const data1 = await response1.json();
      setState(data1);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchGiftCardProductDetail = async (productId: any, uuid: any) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/order/get-single-product/?product_id=${productId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to get products");
    }
    const data = await response.json();
    data.data.reloadly_cart_id = uuid;
    setSelectedProduct(data.data);
  };

  const addGiftCard = async (giftCard: any) => {
    let temp_body = {
      cartId: groupId,
      giftcard: giftCard,
    };

    const MIN_DISPLAY_TIME = 500;
    const startTime = Date.now();

    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/reloadly/save-card`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(temp_body),
        }
      );

      const data = await response.json();

      if (data) {
        await fetchGiftCard();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      const elapsed = Date.now() - startTime;
      const remaining = MIN_DISPLAY_TIME - elapsed;

      if (remaining > 0) {
        setTimeout(() => setLoading(false), remaining);
      } else {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchGiftCard();
  }, []);

  useEffect(() => {
    if (refreshFromCreateBoard) {
      fetchGiftCard();
    }
  }, [refreshFromCreateBoard]);

  const handleClick = async () => {
    try {
      setLoading(true);
      await fetchGiftCardProducts();
      setIsGiftCardModalOpen(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Loader loading={Loading} />
      <div className="p-6 w-[30%] flex flex-col mt-[36px] mobilewidthGiftCard">
        {
          <>
            {giftCard?.cards?.map((card: any) => (
              <div
                key={card.id}
                className="rounded-lg w-[100%] shadow-lg p-4 mb-6 bg-white"
              >
                <h3 className="text-center text-md font-normal ">
                  Group Gift Fund
                </h3>
                <div className="flex justify-center items-center mb-4 flex-col ">
                  <div className="gift-cards-tools self-end mb-4 flex space-x-6 text-2xl pb-2">
                    <button
                      className="text-center text-md font-normal relative"
                      onClick={async () => {
                        setIsContributorsModalOpen(true);
                        setReloadlyId(card?.uuid);
                      }}
                    >
                      <span className="">
                        <Image src={userIcon} alt="user" />
                      </span>
                    </button>
                    {isCreator && (
                      <AiFillDelete
                        className="cursor-pointer hover:text-red-600 transition"
                        onClick={() => handleDeleteClick(card?.uuid)}
                      />
                    )}
                  </div>
                  <img
                    src={`${card?.logoUrls}`}
                    alt="E-Gift Card"
                    className="w-[70%] h-50 object-contain rounded-md shadow"
                  />
                </div>

                <div className="text-center mb-4 justify-center flex-col">
                  <p className="text-2xl font-bold">
                    {card?.amount.toFixed(2)} INR
                  </p>

                  <div className="text-center mb-2 gap-2 items-center justify-center flex flex-col">
                    <button
                      onClick={async () => {
                        try {
                          setLoading(true);
                          await fetchGiftCardProductDetail(
                            card?.productId,
                            card?.uuid
                          );
                          setIsContributeModalOpen(true);
                        } catch (err) {
                          console.error(err);
                        } finally {
                          setLoading(false);
                        }
                      }}
                      className="bg-greyBorder bgGray text-blackText rounded-lg w-100 text-sm p-2.5 cursor-pointer"
                    >
                      Chip in for{" "}
                      <span className="capitalize">
                        {cardShareData?.recipient_name}
                      </span>{" "}
                      Gift
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {isCreator && (
              <button
                onClick={handleClick}
                className=" btnPrimary text-center w-100 mt-3 rounded-md"
              >
                Add to Gift Card
              </button>
            )}
          </>
        }

        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-md shadow-lg max-w-md w-full">
              <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this gift card? This action
                cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setIsDeleteModalOpen(false);
                    setCardToDelete(null);
                  }}
                  className="px-4 py-2 bg-[#558ec9] text-white rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-[#c95555] text-white rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {isContributorsModalOpen && (
          <ContributorsModal
            isOpen={isContributorsModalOpen}
            onClose={() => setIsContributorsModalOpen(false)}
            groupId={groupId}
            reloadlyId={reloadlyId}
          />
        )}

        {isGiftCardModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white shadow-lg max-w-lg w-full relative overflow-auto broad-model-box">
              <h2 className="model-head-broad font-semibold mb-2 text-center">
                Choose a Gift Card
              </h2>
              {!selectedImage && (
                <button
                  className="absolute top-3 right-2 bg-gray-200 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-300 fw-semibold close-broad-modelbtn"
                  onClick={() => {
                    setIsGiftCardModalOpen(false);
                    setSelectedImage(null);
                  }}
                >
                  X
                </button>
              )}
              {!selectedImage && (
                <div className="bg-blue-100 p-4 ps-0 rounded-md mb-2">
                  <h3 className="text-lg font-semibold">
                    How does a group fund work?
                  </h3>
                  <ul className="text-md text-gray-600 mt-2 ps-0">
                    <li>1. Pick a gift card to add to your board.</li>
                    <li>2. Friends and colleagues can chip in.</li>
                    <li>
                      3. The recipient gets the gift card instantly when they
                      open their board.
                    </li>
                  </ul>
                </div>
              )}
              {selectedImage ? (
                <div className="flex flex-col items-center">
                  <div className="mb-2">
                    <button
                      id="choose-gift-return"
                      className="text-black"
                      onClick={() => setSelectedImage(null)}
                    >
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
                    Money:{" "}
                    <span className="font-bold ml-2">
                      {selectedImage?.senderCurrencyCode}
                    </span>
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
                      setIsGiftCardModalOpen(false);
                      setSelectedImage(null);
                      addGiftCard(selectedImage);
                    }}
                  >
                    Add this Gift Card
                  </button>
                </div>
              ) : (
                <div className="relative">
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
              <p className="text-sm text-gray-500 mt-2 text-center">
                You&apos;ll be redirected to Stripe to finish your payment.
              </p>
            </div>
          </div>
        )}
        {isContributeModalOpen && selectedProduct && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-md shadow-lg max-w-lg w-full relative">
              <h2 className="text-center py-3">Contribute to the Gift Card</h2>

              <button
                className="absolute top-4 right-4 bg-gray-200 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-300"
                onClick={() => setIsContributeModalOpen(false)}
              >
                X
              </button>

              {selectedProduct.denominationType === "FIXED" && (
                <div className="flex flex-wrap justify-evenly gap-3 mb-4">
                  {selectedProduct.fixedSenderDenominations.map(
                    (amount: number, idx: number) => (
                      <button
                        key={amount}
                        className={`px-4 py-2 rounded-md border ${
                          selectedContributeAmount === amount
                            ? "bg-blue-600 text-blueText"
                            : "bg-gray-200 text-black"
                        }`}
                        onClick={() => {
                          setSelectedContributeAmount(amount);
                          setSelectedContributeAmountOgCurrency(
                            selectedProduct.fixedRecipientDenominations[idx]
                          );
                          setIsCustomAmount(false);
                        }}
                      >
                        ₹{amount.toFixed(2)} (
                        {selectedProduct.fixedRecipientDenominations[idx]}{" "}
                        {selectedProduct.recipientCurrencyCode})
                      </button>
                    )
                  )}
                </div>
              )}

              {selectedProduct.denominationType === "RANGE" && (
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Enter amount ({selectedProduct.senderCurrencyCode})
                  </label>
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      const min = selectedProduct.minSenderDenomination;
                      const max = selectedProduct.maxSenderDenomination;

                      if (value < min || value > max) {
                        setError(
                          `Please enter between ₹${min.toFixed(
                            2
                          )} and ₹${max.toFixed(2)}`
                        );
                        setSelectedContributeAmount(0);
                        setSelectedContributeAmountOgCurrency(0);
                      } else {
                        setError("");
                        setSelectedContributeAmount(value);
                        setSelectedContributeAmountOgCurrency(
                          // Math.round(
                          value /
                            selectedProduct.recipientCurrencyToSenderCurrencyExchangeRate
                          // )
                        );
                      }
                    }}
                    className="border-2 border-gray-300 px-4 py-2 rounded-md w-full"
                  />
                  {error && (
                    <p className="text-red-500 text-sm mt-1">{error}</p>
                  )}
                  {!error && (
                    <p className="text-sm text-gray-500 mt-1">
                      Min ₹{selectedProduct.minSenderDenomination.toFixed(2)} –
                      Max ₹{selectedProduct.maxSenderDenomination.toFixed(2)}
                    </p>
                  )}
                </div>
              )}

              <p className="mb-2 text-sm text-gray-600">
                Amount: ₹{selectedContributeAmount.toFixed(2)}
              </p>
              <p className="mb-2 text-sm text-gray-600">
                Service fee (5%): ₹
                {(selectedContributeAmount * 0.05).toFixed(2)}
              </p>
              <p className="mb-4 text-lg font-semibold">
                Total: ₹{(selectedContributeAmount * 1.05).toFixed(2)}
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
                  paymentAmount={selectedContributeAmount * 1.05}
                  name={name}
                  product_id={selectedProduct.productId}
                  groupId={groupId}
                  amount={selectedContributeAmount * 1.05}
                  original_amount={selectedContributeAmount}
                  setIsCustomAmount={setIsContributeModalOpen}
                  reloadly_cart_id={selectedProduct.reloadly_cart_id}
                  reloadly_amount={selectedContributeAmountOgCurrency}
                  type={"greeting"}
                  onSuccess={fetchGiftCard}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default GiftCardCollectionPot;
