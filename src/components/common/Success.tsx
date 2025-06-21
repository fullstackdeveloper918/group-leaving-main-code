"use client";  // Ensure this is at the top for client-side rendering

import React from "react";
import { CheckCircleIcon, ClipboardIcon } from "@heroicons/react/24/solid";
import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";

const Success = ({ unique_Id }: any) => {
  const handleCopy = () => {
    if (unique_Id) {
      navigator.clipboard
        .writeText(`https://groupwish.in/share/editor/${unique_Id}`)
        .then(() => {
          toast.success("Link copied successfully");
        })
        .catch(() => {
          toast.error("Failed to copy the link");
        });
    }
  };

  return (
    <div className="success-container">
      <ToastContainer />
      <div className="success-card">
        {/* Steps */}
        <div className="steps-container">
          <div className="step">
            <div className="step-circle">1</div>
            <span className="step-label">Pick a Design</span>
          </div>
          <div className="step">
            <div className="step-circle">2</div>
            <span className="step-label">Enter Details</span>
          </div>
          <div className="step">
            <div className="step-circle">3</div>
            <span className="step-label">Pay and Share</span>
          </div>
        </div>

        {/* Success Message */}
        <div className="success-message">
          <CheckCircleIcon className="success-icon" />
          <h1 className="success-title">Success!</h1>
          <p className="success-description">
            Thanks for your payment, we&apos;ve created your card and it&apos;s ready to be signed.
          </p>
        </div>

        {/* Shareable Link */}
        <div className="shareable-link-container">
          <label className="shareable-label">
            Share the link with friends or colleagues so they can add their own messages:
          </label>
          <div className="shareable-input-container">
            <input
              type="text"
              readOnly
              value={
                unique_Id ? `https://groupwish.in/share/editor/${unique_Id}` : ""
              }
              className="shareable-input"
            />
            <button onClick={handleCopy} className="copy-button">
              <ClipboardIcon className="clipboard-icon" />
            </button>
          </div>
        </div>

        {/* Buttons */}
        <div className="button-container">
          {unique_Id && (
            <Link href={`/successfull/receipt/${unique_Id}`}>
              <button className="view-receipt-button">View Receipt</button>
            </Link>
          )}
          {unique_Id && (
            <Link href={`/share/editor/${unique_Id}`}>
              <button className="sign-card-button">Sign Card</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Success;
