"use client";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";

interface SidebarModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartId: string;
  data: any;
}

const SidebarModal: React.FC<SidebarModalProps> = ({
  isOpen,
  onClose,
  cartId,
  data,
}) => {
  const [deliveryOption, setDeliveryOption] = useState<"later" | "set-date">(
    "later"
  );
  const [collectionTitle, setCollectionTitle] = useState("");
  const [senderName, setSenderName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [loading, setLoading] = useState(false);
  const gettoken = Cookies.get("auth_token");

  // Fetch cart data when modal opens or cartId changes
  useEffect(() => {
    if (!isOpen || !cartId) return;

    const fetchCartData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/cart/single-cart-by-id`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cartUuid: cartId }),
          }
        );

        if (!res.ok) throw new Error("Failed to fetch cart data");

        const data = await res.json();
        const cartDetail = data?.data || {};
        setCollectionTitle(cartDetail.cardData?.title || "");
        setSenderName(cartDetail.sender_name || "");
        setRecipientEmail(cartDetail.recipient_email || "");
        setDeliveryDate(data?.start_date || "");
        setDeliveryOption(data?.start_date ? "set-date" : "later");
      } catch (error) {
        console.error("Error fetching cart data:", error);
        toast.error("Failed to load cart data");
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, [isOpen, cartId]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cartId) {
      toast.error("Cart ID is missing");
      return;
    }

    const formData: any = {
      cart_uuid: cartId,
      collection_title: collectionTitle,
      sender_name: senderName,
      recipient_email: recipientEmail,
    };

    // Include delivery date only if "set-date" is selected
    if (deliveryOption === "set-date") {
      formData.delivery_date = deliveryDate;
    }

    try {
      setLoading(true);
      console.log("Submitting data:", formData);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cart/modify-cart-details`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${gettoken}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Backend error:", errorData);
        toast.error(errorData?.message || "Failed to save data", {
          autoClose: 2000,
        });
        return;
      }

      const data = await response.json();
      const updatedCart = data?.data || {};

      // Update all state fields with latest data from backend
      setCollectionTitle(updatedCart.collection_title || collectionTitle);
      setSenderName(updatedCart.sender_name || senderName);
      setRecipientEmail(updatedCart.recipient_email || recipientEmail);
      setDeliveryDate(updatedCart.delivery_date || deliveryDate);

      toast.success("Data saved successfully", {
        autoClose: 1000,
        onClose: onClose, // close modal after success
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred while saving the data.", {
        autoClose: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-white/30 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div
        className="fixed top-0 right-0 h-full w-96 bg-white shadow-lg transition-transform"
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

        {loading ? (
          <div className="p-4 text-center">Loading...</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="p-4 space-y-4">
              <label className="block">
                <span className="text-gray-700">
                  Enter a title for your collection:
                </span>
                <input
                  type="text"
                  value={collectionTitle}
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
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Your Name"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                />
              </label>

              <label className="block">
                <span className="text-gray-700">Recipient&apos;s Email</span>
                <input
                  type="email"
                  value={recipientEmail}
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
                      value="set-date"
                      checked={deliveryOption === "set-date"}
                      onChange={(e) =>
                        setDeliveryOption(
                          e.target.value as "set-date" | "later"
                        )
                      }
                    />
                    <span>Choose delivery date</span>
                  </label>
                  <label className="flex items-center space-x-2 mt-1">
                    <input
                      type="radio"
                      name="delivery"
                      value="later"
                      checked={deliveryOption === "later"}
                      onChange={(e) =>
                        setDeliveryOption(
                          e.target.value as "set-date" | "later"
                        )
                      }
                    />
                    <span>Set this later</span>
                  </label>

                  {deliveryOption === "set-date" && (
                    <div className="mt-4">
                      <input
                        type="date"
                        value={deliveryDate}
                        min={new Date().toISOString().split("T")[0]}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                        className="block w-full p-2 border border-gray-300 rounded"
                      />
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
        )}
      </div>
    </div>
  );
};

export default SidebarModal;
