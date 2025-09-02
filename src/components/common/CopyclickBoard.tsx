"use client";
import { Tooltip } from "antd";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const CopyclickBoard = () => {
  const pathname = usePathname(); // Get the path part of the URL
  const searchParams = useSearchParams();
  const url = `${pathname}?${searchParams.toString()}`;
  // console.log(url, "hhhh");
  const [showCopyBoard, setShowCopyBoard] = useState(false);

  const handleClick = () => {
    setShowCopyBoard((prev) => !prev);
  };
  const [value, setValue] = useState(`https://groupwish.in${url}`);
  let currentToastPromise: Promise<void> | null = null;
  const handleCopy = () => {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        // Create a new toast promise
        const newToastPromise = new Promise<void>((resolve) => {
          // Dismiss the current toast if it exists
          if (currentToastPromise) {
            toast.dismiss();
          }

          // Show the new toast
          const toastId = toast.success("Copied to clipboard!", {
            onClose: () => {
              resolve(); // Resolve the promise when the toast is closed
            },
            autoClose: 1000,
          });
        });

        // Set the current toast promise to the new one
        currentToastPromise = newToastPromise;

        // Wait for the toast to close before allowing another to be shown
        currentToastPromise.then(() => {
          currentToastPromise = null; // Clear the reference after the toast closes
        });
        setShowCopyBoard(false);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <>
      <ToastContainer />
      <button
        onClick={handleClick}
        className="bg-blue-600 cursor-grab text-black border-2 border-blue-700 px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Share collection
      </button>
      {showCopyBoard && (
        <div className="mt-2">
          <Tooltip title="Copy share link">
            <input
              type="text"
              className="text-black border-2 border-blue-700 rounded-lg w-full h-12 px-4"
              placeholder="Enter text here"
              value={value}
              aria-disabled
              // onChange={(e) => setValue(e.target.value)}
              onClick={handleCopy}
            />
          </Tooltip>
        </div>
      )}
    </>
  );
};

export default CopyclickBoard;
