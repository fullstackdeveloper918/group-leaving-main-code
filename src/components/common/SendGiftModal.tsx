"use client"
import React, { useState } from "react";
import { toast } from "react-toastify";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string) => void;
  setIsModalOpen:any
};

const SendGiftModal: React.FC<ModalProps> = ({ isOpen, onClose,onSubmit,setIsModalOpen }) => {
    const [email, setEmail] = useState("");
  if (!isOpen) return null;
  const handleSend = () => {
    if (email.trim() === "") {
        toast.warning("Please enter a valid email address.", {
            position: "top-center",
            autoClose: 3000, 
            hideProgressBar: true, 
          });
        
      return;
    }
    onSubmit(email);
    onClose()
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="w-full max-w-md rounded-lg bg-white shadow-lg">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-medium">Send gift to recipient now?</h2>
        </div>
        <div className="px-6 py-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Recipient Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Recipient Email"
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <p className="mt-2 text-sm text-gray-600">
            Are you sure you are ready to send your gift? Others will no longer be able to add messages and we will send an email to the recipient. Please make sure their email is correct.
          </p>
        </div>
        <div className="flex items-center justify-end gap-4 px-6 py-4 border-t">
          <button
            onClick={onClose}
            className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium border-2 text-gray-700 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
         onClick={handleSend}
            className=" rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-black border-2 hover:bg-blue-700"
          >
            Send Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendGiftModal;