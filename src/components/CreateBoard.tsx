"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/utils/api";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAccessToken } from "@/app/context/AccessTokenContext";
import { parseCookies } from "nookies";
import Cookies from "js-cookie";
const CreateBoard = ({ data }: any) => {
  const { accessToken, setAccessToken } = useAccessToken();
  useEffect(() => {
    const cookies = parseCookies();
    console.log(cookies, "cookies");

    const token = cookies.auth_token;
    console.log(typeof token, "iooioio");

    if (token) {
      setAccessToken(token);
    } else {
      // alert("nothing")
    }
  }, []);
  console.log(accessToken, "accessToken");
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<any>(null);
  const [uuid, setUuid] = useState<string | null>(null);
  console.log(uuid, "uuid");
  const [loading1, setLoading1] = useState<any>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [state, setState] = useState<any>("");
  // const openModal = () => setIsModalOpen(true);
  const openModal = async () => {
    try {
      setLoading1(true);
      const response = await fetch(
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
      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }

      const data = await response.json(); // Assuming the response returns JSON
      console.log(data, "sdfghjkl;");
      const response1 = await fetch(
        " https://dating.goaideme.com/order/get-products",
        {
          // replace '/api/cart' with the correct endpoint
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data?.data?.access_token}`,
          },
          body: "",
        }
      );

      // Check if the request was successful
      if (!response1.ok) {
        throw new Error("Failed to add item to cart");
      }

      const data1 = await response1.json();
      console.log(data1, "data1 here1");
      setState(data1);
      setIsModalOpen(true);
      // toast.success("Added Successfully", {autoClose:2000});
    } catch (error) {
      // setLoading1(false)
    } finally {
      setLoading1(false);
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };
  useEffect(() => {
    const cookies = document.cookie.split("; ");
    console.log(cookies, "asdasdasd");

    // Finding the 'Auth' cookie
    const authCookie = cookies.find((cookie) => cookie.startsWith("Auth="));

    if (authCookie) {
      const cookieValue = authCookie.split("=")[1];
      console.log(cookieValue, "cookieValue");

      try {
        const parsedAuthInfo = JSON.parse(decodeURIComponent(cookieValue));
        console.log(parsedAuthInfo, "parsedAuthInfo");

        // Extracting the 'uid' from the Auth cookie
        if (parsedAuthInfo && parsedAuthInfo.uid) {
          setUuid(parsedAuthInfo.uid); // Setting the UUID
          console.log("UID:", parsedAuthInfo.uid);
        }
      } catch (error) {
        console.error("Error parsing Auth cookie", error);
      }
    }

    // Optionally, you can also extract 'userInfo' cookie if needed
    const userInfoCookie = cookies.find((cookie) =>
      cookie.startsWith("userInfo=")
    );

    if (userInfoCookie) {
      const cookieValue = userInfoCookie.split("=")[1];
      console.log(cookieValue, "userInfo cookieValue");

      try {
        const parsedUserInfo = JSON.parse(decodeURIComponent(cookieValue));
        setUserInfo(parsedUserInfo);

        if (parsedUserInfo && parsedUserInfo.uuid) {
          console.log(parsedUserInfo, "parsedUserInfo");
          setUuid(parsedUserInfo.uuid);
          console.log("UUID from userInfo:", parsedUserInfo.uuid);
        }
      } catch (error) {
        console.error("Error parsing userInfo cookie", error);
      }
    }
  }, []);

  const [collectionTitle, setCollectionTitle] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [loading, setLoading] = useState<any>(false);
  const [addCard, setAddCard] = useState<any>("");
  // State to store other form data
  const [formData, setFormData] = useState({
    selectedGift: "",
  });
  const [brandKeys, setBrandKeys] = useState("");
  console.log(brandKeys, "brandKeys");

  // Handle collection title change
  const handleCollectionTitleChange = (e: any) => {
    setCollectionTitle(e.target.value);
  };
  const handleRecipientNameChange = (e: any) => {
    setRecipientName(e.target.value);
  };

  // Handle other form data changes (e.g., selected gift)
  const handleFormDataChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const [selectedImage, setSelectedImage] = useState<any | null>(null);
  const [addSelectedImage, setAddSelectedImage] = useState<any | null>(null);
  const handleBackClick = () => {
    setSelectedImage(null); // Reset the selected image to show the image grid again
  };

  const gettoken = Cookies.get("auth_token");
  const AddGiftCard = () => {
    setAddCard(selectedImage.brandKey); // Reset the selected image to show the image grid again
    console.log("slectedImagedsssssssss", selectedImage);
    setAddSelectedImage(selectGiftImage);
    setIsModalOpen(false);
    setSelectedImage(null);
  };
  const handleImageClick = (imageData: any) => {
    setSelectedImage(imageData);
    console.log(imageData, "imageData");
    setBrandKeys(imageData.brand?.brandId);
    setIsModalOpen(true); // Open modal when an image is clicked
  };

  // Handle form submission (you can add your submission logic here)
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // const submissionData = {
    //   collectionTitle,
    //   ...formData
    // };

    let item = {
      user_uuid: uuid,
      board_title: collectionTitle,
      board_name: recipientName,
      // gift_card_id:addCard,
      // brandKey:brandKeys,
      // board_name: string
      brand_key: brandKeys,
      // user_uuid : string
    };
    console.log(item, "item");

    // router.replace(`/share/${data?.data?.uuid}`)
    // return
    try {
      setLoading(true);
      const response = await fetch(
        "https://dating.goaideme.com/groupboard/add-groupboard",
        {
          // replace '/api/cart' with the correct endpoint
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Indicates that you're sending JSON
            Authorization: `Bearer ${gettoken}`,
            "Cache-Control": "no-cache",
          },
          body: JSON.stringify(item),
        }
      );

      // Check if the request was successful
      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }

      const data = await response.json(); // Assumin    g the response returns JSON
      if (data.status === 200) {
        toast.success("Added Successfully", { autoClose: 2000 });
        router.replace(`/card/boardpay/${data?.data?.uuid}`);
      }

      console.log(data, "groupboard");

      // router.replace(`/card/boardpay/1`)
    } catch (error) {
      setLoading(false);
    }
  };
  // const submit=async(e:any)=>{
  //     let item={
  //         user_uuid :"",
  //         collection_title :"",

  //     }
  //     try {
  // const res= await api.Collection.create(item)
  //     } catch (error) {

  //     }
  // }

  const faceValues = selectedImage?.logoUrls[0]; // Filter out undefined or null values

  let minFaceValue: number | undefined;
  let maxFaceValue: number | undefined;

  if (faceValues?.length > 0) {
    minFaceValue = Math.min(...faceValues);
    maxFaceValue = Math.max(...faceValues);

    console.log(`Minimum Face Value: ₹${minFaceValue}`);
    console.log(`Maximum Face Value: ₹${maxFaceValue}`);
  } else {
    console.log("No valid face values found.");
  }
  const selectGiftImage = selectedImage?.logoUrls[0];
  console.log(selectGiftImage, "selectGiftImage");
  const handleLogin = () => {
    router.push("/login");
  };
  return (
    <div>
      <ToastContainer />
      <div className="flex flex-col items-center justify-center border border-[#e5e7eb bg-lightBg grp-broad">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Start a Group Board
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md w-full broad-form"
        >
          <label className="block mb-6">
            <span className="text-gray-700 fw-semibold mb-1 inline-block broad-label-txt">
              Who will receive this board?
            </span>
            <input
              type="text"
              value={recipientName}
              onChange={handleRecipientNameChange}
              placeholder="Recipient's Name*"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm broad-input"
              required
            />
          </label>
          <label className="block mb-6">
            <span className="text-gray-700 fw-semibold mb-1 inline-block broad-label-txt">
              Give your board a title
            </span>
            <input
              type="text"
              value={collectionTitle}
              onChange={handleCollectionTitleChange}
              placeholder="Board Name*"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm broad-input"
              required
            />
          </label>
          <div className="mb-6">
            {addSelectedImage === null ? (
              <div className="">
                <h2 className="font-semibold mb-1 broad-label-txt">
                  Gather contributions for a gift card
                </h2>
                <p className="text-gray-600 mb-3 fw-medium broad-label-txt-para">
                  Make your card even more memorable. Launch a Shared Gift Fund
                  for group contributions.
                </p>
                <button
                  type="button"
                  disabled={loading}
                  className="flex items-center justify-center rounded-md font-medium transition duration-300 gift-card-add"
                  // onClick={() => setFormData({ ...formData, selectedGift: 'gift card' })} // Update the selected gift here
                  onClick={openModal}
                >
                  {loading1 ? (
                    <span className="">Loading...</span>
                  ) : (
                    <span className="mr-2">+ Choose a gift card</span>
                  )}
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                {/* <img src={selectGiftImage} alt="" className="" /> */}
                <h2 className="text-center font-bold">Gift Card</h2>
                <img src={addSelectedImage} alt="" className="" />
                <p className="text-center">
                  Once your card is created, anyone can add their contribution.
                </p>
                <button
                  className="text-[#FF0000] hover:text-red-800 font-medium"
                  onClick={() => setAddSelectedImage(null)}
                >
                  Remove Gift Card
                </button>
              </div>
            )}
          </div>
          {/* <Link href={`/share/1`}> */}
          {accessToken ? (
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-blueBg text-white rounded-pill hover:bg-blue-700 transition duration-300 broad-subbtn"
            >
              Next
            </button>
          ) : (
            <Link href={`/login`}>
              <button
                //   disabled={setLoading}
                type="submit"
                className="w-full bg-blueBg text-white py-2 px-4  rounded-md hover:bg-blue-700 transition duration-300"
              >
                Next
              </button>
            </Link>
          )}
          {/* <button
            //   disabled={setLoading}
            type="submit"
            className="w-full bg-blueBg text-white py-2 px-4  rounded-md hover:bg-blue-700 transition duration-300"
          >
            Continue
          </button> */}
          {/* </Link> */}
        </form>
      </div>

      {isModalOpen && (
        <>
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white shadow-lg max-w-lg w-full relative overflow-auto broad-model-box">
              {/* Top-left Cancel Button */}
              <h2 className="model-head-broad font-semibold mb-2 text-center">
                Choose a Gift Card
              </h2>

              <button
                className="absolute top-3 right-2 bg-gray-200 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-300 fw-semibold close-broad-modelbtn"
                onClick={closeModal}
              >
                Close
              </button>

              {/* How Collection Pots Work */}
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
              </div>

              {/* Conditionally render based on whether an image is selected */}
              {selectedImage ? (
                <div className="flex flex-col items-center">
                  <div className="">
                    <button className="text-black" onClick={handleBackClick}>
                      Return
                    </button>
                  </div>
                  <div className="">
                    <img src={selectGiftImage} alt="" className="" />
                  </div>
                  {/* <div className="w-20 h-12 bg-black text-white flex items-center justify-center rounded mb-4">
              {selectedImage.brandName}
            </div> */}
                  <h2 className="text-xl font-bold ">
                    {selectedImage.brandName}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Nation: <span className="font-bold">IND</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Money: <span className="font-bold">INR</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Amount:{" "}
                    <span className="font-bold">
                      {selectedImage?.senderFee}
                    </span>
                  </p>

                  {/* <p className="text-sm text-gray-500">Min Value: <span className="font-bold">{minFaceValue}</span></p>
            <p className="text-sm text-gray-500">Max Value:<span className="font-bold">{maxFaceValue}</span></p> */}
                  {/* <p className="text-sm text-gray-500 text-center mt-2">
              Contribution Fees: <span className="font-bold">{selectedImage.contributionFees}</span>
            </p> */}
                  <p className="text-xs text-gray-400 mt-1 text-center">
                    (If your total exceeds the limit, we&apos;ll split it into
                    multiple gift cards)
                  </p>
                  <Link
                    href="#"
                    className="text-sm text-blue-600 hover:underline mt-2"
                  >
                    View terms
                  </Link>
                  <button
                    className="bg-blue-600 text-black px-4 py-2 rounded mt-2 hover:bg-blue-700"
                    onClick={AddGiftCard}
                  >
                    Add this Gift Card
                  </button>
                </div>
              ) : (
                <div className="relative">
                  {/* Image Grid */}
                  <div className="grid grid-cols-2 gap-4 max-h-80 overflow-y-auto">
                    {state?.data?.content.map((res: any, index: number) => {
                      const imageUrl = res.logoUrls[0]; // You can change this key to any other size if needed

                      return (
                        <div
                          key={index}
                          className="border rounded-lg overflow-hidden"
                          onClick={() => handleImageClick(res)}
                        >
                          <img
                            src={imageUrl}
                            alt={res?.brand?.brandName} // Assuming there's a 'brandName' field in your data
                            className="w-full h-auto object-cover"
                          />
                          <p className="text-center p-2 font-medium">
                            {res?.brand?.brandName}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Optional modal button */}
                  {/* <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => {
                // Trigger modal to show more content
                // Implement modal logic here (e.g., use state to toggle visibility)
              }}
            >
              See All
            </button> */}
                </div>
              )}

              {/* Modal Footer */}
              <p className="text-sm text-gray-500 mt-2 text-center">
                You&apos;ll be redirected to Stripe to finish your payment.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CreateBoard;
