"use client";
import React, { useState } from "react";

const GiftCard = ({ data }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addCard, setAddCard] = useState<any>("");
  const [brandKeys, setBrandKeys] = useState("");
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [selectedImage, setSelectedImage] = useState<any | null>(null);
  const handleBackClick = () => {
    setSelectedImage(null); // Reset the selected image to show the image grid again
  };
  const AddGiftCard = () => {
    setAddCard(selectedImage.brandKey); // Reset the selected image to show the image grid again
    setIsModalOpen(false);
  };
  const handleImageClick = (imageData: any) => {
    setSelectedImage(imageData);
    console.log(imageData, "imageData");
    setBrandKeys(imageData.brandKey);
    setIsModalOpen(true); // Open modal when an image is clicked
  };
  const selectGiftImage = selectedImage?.imageUrls["278w-326ppi"];
  const faceValues = selectedImage?.items
    .map((item: any) => item.faceValue) // Extract faceValue
    .filter((value: any) => value !== undefined && value !== null); // Filter out undefined or null values

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

  console.log(data, "data herer");
  return (
    <>
      <section className="text-center  section_space_50 view_card_section">
        <div className="container-fluid">
          <h2 className="mt-2 text-2xl  xl:text-3xl font-bold text-center text-gray-900">
            Browse Gift Card Options
          </h2>
          <div className="grid grid-cols-3 gap-4 mb-6 mt-4">
            <img
              src="/newimage/apple.png"
              alt="Naked Wines"
              className="w-30 mx-auto rounded"
            />
            <img
              src="/newimage/amazon.png"
              alt="John Lewis"
              className="w-30 mx-auto rounded"
            />
            <img
              src="/newimage/apple.png"
              alt="Amazon"
              className="w-30 mx-auto rounded"
            />
            <img
              src="/newimage/image3.png"
              alt="Virgin Experience"
              className="w-30 mx-auto rounded"
            />
            <img
              src="/newimage/addidas.jpeg"
              alt="Airbnb"
              className="w-30 mx-auto"
            />
            <img
              src="/newimage/aboutu.png"
              alt="Doordash"
              className="w-30 mx-auto rounded"
            />
          </div>
          <button
            onClick={openModal}
            className="xl:mt-5 md:mt-3 px-5 text-white bg-blueText  py-2  rounded-xl border-1 border-[blueText] hover:bg-blue-700"
          >
            View All Gift Cards
          </button>
        </div>
      </section>

      {isModalOpen && (
        <>
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-md shadow-lg max-w-lg w-full relative overflow-auto">
              {/* Top-left Cancel Button */}
              <h2 className="text-lg font-semibold mb-4 text-center">
                Choose a Gift Card
              </h2>

              <button
                className="absolute top-4 right-4 bg-gray-200 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-300"
                onClick={closeModal}
              >
                Close
              </button>

              {/* How Collection Pots Work */}
              <div className="bg-blue-100 p-4 rounded-md mb-4">
                <h3 className="text-sm font-semibold">
                  How does a collection pot function?
                </h3>
                <ul className="text-sm text-gray-600 mt-2">
                  <li>1. Select a gift card to add to your card.</li>
                  <li>
                    2. Everyone can chip in to increase the gift card amount.
                  </li>
                  <li>
                    3. The recipient can claim the gift card as soon as they
                    view their card.
                  </li>
                </ul>
              </div>

              {/* Conditionally render based on whether an image is selected */}
              {selectedImage ? (
                <div className="flex flex-col items-center">
                  <div className="">
                    <button className="text-black" onClick={handleBackClick}>
                      Back
                    </button>
                  </div>
                  <div className="">
                    <img src={selectGiftImage} alt="" className="" />
                  </div>
                  <div className="w-20 h-12 bg-black text-white flex items-center justify-center rounded mb-4">
                    {selectedImage.brandName}
                  </div>
                  <h2 className="text-xl font-bold mb-2">
                    {selectedImage.brandName}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Currency: <span className="font-bold">INR</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Country: <span className="font-bold">IND</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Min Value: <span className="font-bold">{minFaceValue}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Max Value:<span className="font-bold">{maxFaceValue}</span>
                  </p>
                  <p className="text-sm text-gray-500 text-center mt-2">
                    Contribution Fees:{" "}
                    <span className="font-bold">
                      {selectedImage.contributionFees}
                    </span>
                  </p>
                  <p className="text-xs text-gray-400 mt-1 text-center">
                    (We automatically create multiple gift cards if you go over
                    the max)
                  </p>
                  <a
                    href="#"
                    className="text-sm text-blue-600 hover:underline mt-4"
                  >
                    Terms and conditions
                  </a>
                  {/* <button
                    className="bg-blue-600 text-black px-4 py-2 rounded mt-6 hover:bg-blue-700"
                    onClick={AddGiftCard}
                  >
                    Add Gift Card
                  </button> */}
                </div>
              ) : (
                <div className="relative">
                  {/* Image Grid */}
                  <div className="grid grid-cols-2 gap-4 max-h-80 overflow-y-auto">
                    {data?.data?.map((res: any, index: number) => {
                      const imageUrl = res.imageUrls["200w-326ppi"]; // You can change this key to any other size if needed

                      return (
                        <div
                          key={index}
                          className="border rounded-lg overflow-hidden"
                          onClick={() => handleImageClick(res)}
                        >
                          <img
                            src={imageUrl}
                            alt={res.brandName} // Assuming there's a 'brandName' field in your data
                            className="w-full h-auto object-cover"
                          />
                          <p className="text-center p-2 font-medium">
                            {res.brandName}
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
              <p className="text-sm text-gray-500 mt-4 text-center">
                You will be redirected to Stripe, our payment provider, to
                finish your payment.
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default GiftCard;
