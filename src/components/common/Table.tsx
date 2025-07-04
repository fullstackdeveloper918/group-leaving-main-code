"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { MdEdit } from "react-icons/md";

const Table = () => {
  const router = useRouter();

  const handlePickBundle = () => {
    router.push("/create");
  };

  return (
    <div className="w-full mt-5 flex flex-col items-center gap-4">
      {/* ✅ Fixed wrapper for horizontal scroll */}
      <div className="w-full overflow-x-auto border border-grey rounded-lg">
        <table className="w-full bg-white border rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left font-medium text-gray-600 fw-semibold bg-[#dfeaf5e8]">
                Title
              </th>
              <th className="py-3 px-4 text-left font-medium text-gray-600 fw-semibold bg-[#dfeaf5e8]">
                Receivers
              </th>
              <th className="py-3 px-4 text-left font-medium text-gray-600 fw-semibold bg-[#dfeaf5e8]">
                Greetings Created
              </th>
              <th className="py-3 px-4 text-left font-medium text-gray-600 fw-semibold bg-[#dfeaf5e8]">
                Greetings Sent
              </th>
              <th className="py-3 px-4 text-left font-medium text-gray-600 fw-semibold bg-[#dfeaf5e8]">
                Current Status
              </th>
              <th className="py-3 px-4 text-left font-medium text-gray-600 fw-semibold bg-[#dfeaf5e8]">
                Order Date
              </th>
              <th className="py-3 px-4 text-left font-medium text-gray-600 fw-semibold bg-[#dfeaf5e8]">
                Next Creation
              </th>
              <th className="py-3 px-4 text-left font-medium text-gray-600 fw-semibold bg-[#dfeaf5e8]">
                Modify
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="py-3 px-4 text-[#4285F4] hover:underline cursor-pointer fw-semibold">
                Batch 2025-02-18
              </td>
              <td className="py-3 px-4 fw-medium">1</td>
              <td className="py-3 px-4 fw-medium">0</td>
              <td className="py-3 px-4 fw-medium">0</td>
              <td className="py-3 px-4 fw-medium">Pending</td>
              <td className="py-3 px-4 fw-medium">2/18/2025, 3:39:26 PM</td>
              <td className="py-3 px-4 fw-medium"></td>
              <td className="py-3 px-4">
                <MdEdit size={20} className="cursor-pointer" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <button
        onClick={handlePickBundle}
        className="bg-[#538AC4] text-white border-2 py-3 px-6 rounded-pill fw-medium hover:bg-[#3b8cdd] new-grp-btn"
      >
        Start New Group
      </button>
    </div>
  );
};

export default Table;
