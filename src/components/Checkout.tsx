"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import RazorPay from "./RazorPay";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";

const Checkout = ({ data }: any) => {
  const router = useRouter();
  const [bundledata, setBundledata] = useState<any>([]);
  const [cardType, setCardType] = useState<any>("group");
  const param = useParams();
  const query: any = useSearchParams();
  const cartUuid = query.get("cart_uuid");
  const product_id = param.id;
  const gettoken = Cookies.get("auth_token");
  const cardId = query.get("cardId");

  const [bundleOption, setBundleOption] = useState<any>("single");
  const [numCards, setNumCards] = useState<any>(null);
  const [salePrice, setSalePrice] = useState(22.45);
  const [exact, setExact] = useState<any>();
  const [selectBundle, setSelectBundle] = useState<any>("");
  const [voucher, setVaoucher] = useState<any>("");
  const [voucherDiscount, setVaoucherDiscount] = useState<any>(0);
  const [shareCartData, setShareCartData] = useState<any>(null);
  const { id } = useParams();
  const [shareImageData, setShareImageData] = useState<any>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const postData = {
          cartUuid: id,
        };
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/cart/single-cart-by-id`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${gettoken}`,
            },
            body: JSON.stringify(postData),
          }
        );

        const data = await response.json();
        setShareCartData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);
  useEffect(() => {
    const fetchDataImage = async () => {
      try {
        if (!cardId) {
          return;
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/card/edit-card/${cardId}`,
          { method: "GET" }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Full API response:", data);

        const showImage = data?.data?.[0]?.images?.[0]?.card_images?.[0];
        console.log("Extracted showImage:", showImage);

        if (showImage) {
          setShareImageData(showImage);
        } else {
          console.warn("No image found in response");
        }
      } catch (error) {
        console.error("Error fetching image data:", error);
      }
    };

    fetchDataImage();
  }, [id]);
  const cardShareData = shareCartData?.data || [];

  const handleChange = (e: any) => {
    const selectedCount = data?.data.find(
      (count: any) => count.number_of_cards === Number(e.target.value)
    );

    if (!selectedCount) return;

    setNumCards(Number(e.target.value));
    setSelectBundle(selectedCount);

    const formattedSalePrice = Number(selectedCount.sale_price.toFixed(2));
    const formattedPerCardPrice = Number(
      selectedCount.per_card_price.toFixed(2)
    );

    setSalePrice(formattedSalePrice);
    setExact(formattedPerCardPrice);
  };

  const onChange = (e: any) => {
    setVaoucher(e);
  };

  const amount: number =
    cardType === "individual"
      ? cardShareData?.cardData?.individual_price
      : cardType === "group"
      ? bundleOption === "single"
        ? cardShareData?.cardData?.group_card_price
        : salePrice
      : 54;

  const TotalAmount: number = amount - voucherDiscount;

  const handleApplyDiscount = async () => {
    try {
      const requestData = {
        code: voucher,
        card_price: amount,
      };

      let res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/discount/is-voucher-valid`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${gettoken}`,
          },
          body: JSON.stringify(requestData),
        }
      );

      let posts = await res.json();
      const numberValue = parseFloat(posts?.data.replace(/[^0-9.]/g, ""));
      setVaoucherDiscount(numberValue);

      if (res.status === 200) {
        toast.success("Voucher Added Successfully", { autoClose: 2000 });
      } else if (posts?.statusCode === 401) {
        Cookies.remove("auth_token");
        router.replace("/login");
        window.location.reload();
      }
    } catch (error: any) {
      toast.error("Voucher is not found", { autoClose: 3000 });
    }
  };

  const getBundledata = async () => {
    try {
      let res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/razorpay/puchased-bundle-array`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${gettoken}`,
          },
        }
      );

      let posts = await res.json();
      setBundledata(posts);
    } catch (error) {}
  };

  useEffect(() => {
    getBundledata();
  }, []);

  const [quantity, setQuantity] = useState<any>(0);

  const handleRadioChange = async () => {
    try {
      let res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/card/bundle-quantity-total-count`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${gettoken}`,
          },
        }
      );

      let posts = await res.json();
      setQuantity(posts?.message);

      if (quantity > 0) {
        toast.warning(`Remaining Card Purchase Quantity: ${quantity}`);
      }

      if (quantity === 0) {
        setBundleOption("bundle");
      }
    } catch (error) {}
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-5">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 md:flex">
        <div className="flex-1">
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">Card Type</h2>
            <div className="flex flex-col space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="cardType"
                  value="group"
                  checked={cardType === "group"}
                  onChange={() => setCardType("group")}
                  className="mr-2"
                />
                <span className="text-lg">Group Card</span>
                <span className="ml-auto text-gray-500">
                  ₹{cardShareData?.cardData?.group_card_price} INR
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="cardType"
                  value="individual"
                  checked={cardType === "individual"}
                  onChange={() => setCardType("individual")}
                  className="mr-2"
                />
                <span className="text-lg">Individual Card</span>
                <span className="ml-auto text-gray-500">
                  ₹{cardShareData?.cardData?.individual_price} INR
                </span>
              </label>
            </div>
          </div>
          {cardType !== "individual" ? (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-2">Bundle Discount</h2>
                <div className="flex flex-col space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="bundleOption"
                      value="single"
                      checked={bundleOption === "single"}
                      onChange={() => setBundleOption("single")}
                      className="mr-2"
                    />
                    <span className="text-lg">Single Card</span>
                    <span className="ml-auto text-gray-500">
                      ₹{cardShareData?.cardData?.group_card_price} INR
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="bundleOption"
                      value="bundle"
                      checked={bundleOption === "bundle"}
                      onChange={handleRadioChange}
                      className="mr-2"
                    />
                    <span className="text-lg">Card Bundle</span>
                    <span className="ml-auto text-green-500">
                      From ₹{data?.data[0].sale_price} INR
                    </span>
                  </label>
                </div>

                {bundleOption === "bundle" ? (
                  <div className="mt-4 p-4 bg-gray-50 rounded-md border">
                    <ul className="text-green-600 mb-4 space-y-1">
                      <li>💰 Save up to 40% by buying a bundle</li>
                      <li>🤝 Share bundle with colleagues</li>
                      <li>🕑 No Expiry. No Subscription.</li>
                      <li>🧾 File a single expense claim</li>
                    </ul>
                    <div className="flex flex-col space-y-2">
                      <label className="font-bold text-gray-700">
                        Select number of cards:
                      </label>
                      <select
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded-lg w-full"
                      >
                        {data?.data.map((count: any) => {
                          const basePrice =
                            cardShareData?.cardData?.group_card_price || 0;
                          const salePrice =
                            (count.discount
                              ? basePrice * (1 - count.discount / 100)
                              : basePrice) * (count?.number_of_cards ?? 1);

                          const perCardPrice = count.number_of_cards
                            ? salePrice / count.number_of_cards
                            : 0;

                          count.sale_price = salePrice;
                          count.per_card_price = perCardPrice;

                          return (
                            <option
                              key={count.number_of_cards}
                              value={count.number_of_cards}
                            >
                              {count?.number_of_cards} Cards — ₹
                              {salePrice.toFixed(2)} INR (₹
                              {perCardPrice.toFixed(2)} INR/card) -{" "}
                              {count.discount}% off
                            </option>
                          );
                        })}
                      </select>

                      <p className="text-gray-600 text-sm mt-2">
                        Card bundles require a single payment and won&apos;t
                        renew automatically. They&apos;re valid for all designs
                        and categories, and never expire.
                      </p>
                    </div>
                  </div>
                ) : null}
              </div>
            </>
          ) : (
            "This is a 1-1 card. Group signing will be disabled and only you will be able to add messages.Please select Group Card if you want to collect messages from others and receive a share URL."
          )}

          <div className="space-y-4">
            <RazorPay
              amount={TotalAmount}
              cart_id={id}
              type={bundleOption}
              bundleId={selectBundle?.uuid}
              numberOfCards={bundleOption === "bundle" ? numCards : 1}
            />
          </div>
        </div>

        <div className="flex-1 mt-6 md:mt-0 md:ml-6">
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-0">Your Card</h2>
            <div className="flex justify-between items-start flex-col mb-4">
              <span>Group Card for {cardShareData?.recipient_name}</span>
              <div>
                <div className="flex flex-col w-[150px] h-[150px] items-center">
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}/${shareImageData}`}
                    alt="E-Gift Card"
                    className="w-full h-full mt-3 object-cover rounded-md"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center mb-4">
              <input
                type="text"
                placeholder="Voucher Code"
                className="border border-gray-300 rounded-lg p-2 w-full"
                onChange={(e: any) => onChange(e.target.value)}
                value={voucher}
              />
              <button
                onClick={handleApplyDiscount}
                className="ml-2 bg-blue-500 text-black  border-2 border-blue-700 py-2 px-4 rounded-md hover:bg-blue-600 transition"
              >
                Apply
              </button>
            </div>
            <div className="border-t border-gray-300 pt-4">
              <div className="flex justify-between">
                <span>Card Price</span>
                <span className="font-bold">₹{TotalAmount.toFixed(2)} INR</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Total</span>
                <span className="font-bold text-xl">
                  ₹{TotalAmount.toFixed(2)} INR
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
