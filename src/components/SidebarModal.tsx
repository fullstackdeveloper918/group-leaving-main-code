"use client";
import React, { useEffect, useState } from "react";
import nookies from "nookies";
import Cookies from "js-cookie";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
interface SidebarModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  setClose: any;
  isClose: any;
  createlinkuserId: any;
  // setEditCollection:any
}

const SidebarModal: React.FC<SidebarModalProps> = ({
  isOpen,
  onClose,
  data,
  setClose,
  isClose,
  createlinkuserId,
}) => {
  console.log("databysidebarmodel", data?.collection_title);
  console.log("databysidebarmodel", data);
  const [deliveryOption, setDeliveryOption] = useState("later");
  const [collectionTitle, setCollectionTitle] = useState(
    data?.collection_title
  );
  const [senderName, setSenderName] = useState(data?.sender_name);
  const [recipientEmail, setRecipientEmail] = useState(data?.recipient_email);
  const [deliveryDate, setDeliveryDate] = useState(data?.start_date);
  const [deliveryTime, setDeliveryTime] = useState(data?.end_date);
  const [cookieValue, setCookieValue] = useState<string | null>(null);
  // console.log(cookieValue,"cookieValue");

  const gettoken = Cookies.get("auth_token");

  useEffect(() => {
    // Get cookies on the client side
    const cookies = nookies.get(); // retrieves cookies from document.cookie
    const userData = cookies.user_info ? JSON.parse(cookies.user_info) : null;

    setCookieValue(userData?.uuid || null);
  }, []);

  console.log("cookie value", cookieValue);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Collect form data
    const formData = {
      edit_by: createlinkuserId,
      brandKey: data?.brandKey,
      linkUuid: data?.uuid,
      collection_title: collectionTitle,
      sender_name: senderName,
      recipient_email: recipientEmail,
      delivery_option: deliveryOption,
      start_date: deliveryDate,
      end_date: deliveryTime,
    };

    try {
      // Send form data to the API (replace with your API endpoint)
      const response = await fetch(
        "https://dating.goaideme.com/razorpay/update-link",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${gettoken}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        toast.success("Data saved successfully", { autoClose: 1000 });
        // alert("Data saved successfully");
        setClose(!isClose);
        // console.log("respoSidemodel",formData)
        // console.log("respoSidemodelrs",response)
        //    setEditCollection((prev: any) => ({
        //   ...prev,
        //   data: formData, // Updating the nested `data` properly
        // }));
        onClose(); // Close the modal after successful submission
      } else {
        toast.error("Failed to save data", { autoClose: 2000 });
        // alert("Failed to save data");
      }
    } catch (error) {
      toast.error("An error occurred while saving the data.", {
        autoClose: 2000,
      });
      console.error("Error submitting form:", error);
      // alert("An error occurred while saving the data.");
    }
  };

  console.log("collectionTitle", data);

  return (
    <div
      className={`fixed inset-0 z-50 bg-black bg-opacity-30 transition-opacity ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      onClick={onClose}
    >
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">Preferences</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <IoIosCloseCircleOutline size={30} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-4 space-y-4">
            <label className="block">
              <span className="text-gray-700">
                Enter a title for your collection:
              </span>
              <input
                type="text"
                value={
                  collectionTitle !== undefined
                    ? collectionTitle
                    : data?.collection_title || ""
                }
                onChange={(e) => setCollectionTitle(e.target.value)}
                placeholder="Collection Name"
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">
                Who is sending this collection? (optional)
              </span>
              <input
                type="text"
                value={
                  senderName !== undefined
                    ? senderName
                    : data?.sender_name || ""
                }
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="Your Name"
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Recipient's Email</span>
              <input
                type="email"
                value={
                  recipientEmail !== undefined
                    ? recipientEmail
                    : data?.recipient_email || ""
                }
                onChange={(e) => setRecipientEmail(e.target.value)}
                placeholder="Recipient's Email"
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
              />
            </label>
            <div>
              <span className="text-gray-700">
                When should we deliver the gift to the recipient?
              </span>
              <div className="mt-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="delivery"
                    className="form-radio"
                    value="set-date"
                    checked={deliveryOption === "set-date"}
                    onChange={(e) => setDeliveryOption(e.target.value)}
                  />
                  <span>Choose delivery date</span>
                </label>
                <label className="flex items-center space-x-2 mt-1">
                  <input
                    type="radio"
                    name="delivery"
                    className="form-radio"
                    value="later"
                    checked={deliveryOption === "later"}
                    onChange={(e) => setDeliveryOption(e.target.value)}
                  />
                  <span>Set this later</span>
                </label>
                <p className="mt-2 text-sm text-gray-500">
                  The delivery time is based on your computer's timezone.
                </p>
                {deliveryOption === "set-date" && (
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <label className="block">
                      <span className="sr-only">Date</span>
                      <input
                        type="date"
                        value={deliveryDate}
                        min={new Date().toISOString().split("T")[0]}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                        className="block w-full p-2 border border-gray-300 rounded"
                      />
                    </label>
                    <label className="block">
                      <span className="sr-only">Time</span>
                      <input
                        type="time"
                        value={deliveryTime}
                        onChange={(e) => setDeliveryTime(e.target.value)}
                        className="block w-full p-2 border border-gray-300 rounded"
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-black border-2 py-2 px-4 rounded hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SidebarModal;
