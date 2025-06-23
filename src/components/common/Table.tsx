'use client'
import { useRouter } from 'next/navigation';
import React from 'react'
import { MdEdit } from "react-icons/md";

const Table = () => {
  const router = useRouter()

  const handlePickBundle = () => {
    // Route to the bundle selection page
    router.push("/create");
  };

  return (
    <div className="overflow-x-auto flex flex-col items-center gap-4">
    <table className="min-w-full bg-white border rounded-lg">
      <thead className="bg-gray-100">
        <tr>
          <th className="py-2 px-4 text-left font-medium text-gray-600">Title</th>
          <th className="py-2 px-4 text-left font-medium text-gray-600">Receivers</th>
          <th className="py-2 px-4 text-left font-medium text-gray-600">Greetings Created</th>
          <th className="py-2 px-4 text-left font-medium text-gray-600">Greetings Sent</th>
          <th className="py-2 px-4 text-left font-medium text-gray-600">Current Status</th>
          <th className="py-2 px-4 text-left font-medium text-gray-600">Order Date</th>
          <th className="py-2 px-4 text-left font-medium text-gray-600">Next Creation</th>
          <th className="py-2 px-4 text-left font-medium text-gray-600">Modify</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-t">
          {/* <td className="py-3 px-4">
            <img src="https://groupleavingcards.com/images/gift/collection_pot.png"  className="w-20 h-20 object-cover rounded-lg mr-4" />
          </td> */}
          <td className="py-3 px-4 text-[#4285F4] hover:underline cursor-pointer">Batch 2025-02-18</td>
          <td className="py-3 px-4">1</td>
          <td className="py-3 px-4">0</td>
          <td className="py-3 px-4">0</td>
          <td className="py-3 px-4">Pending</td>
          <td className="py-3 px-4">2/18/2025, 3:39:26 PM</td>
          <td className="py-3 px-4"></td>
          <td className="py-3 px-4"><MdEdit size={20} className='cursor-pointer' /></td>
          {/* <td className="py-3 px-4 text-blue-600 hover:underline cursor-pointer">0cVkV16gHzX</td> */}
        </tr>
        {/* Additional rows can be added here */}
      </tbody>
    </table>

    <button
        onClick={handlePickBundle}
        className="bg-[#538AC4] text-white border-2 py-2 px-6 rounded-xl hover:bg-[#3b8cdd]"
      >
        Start New Group
      </button>
  </div>
  )
}

export default Table