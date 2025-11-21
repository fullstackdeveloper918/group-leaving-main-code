"use client";
import GroupCollection from "../../../components/GroupCollection";
import React, { useEffect, useState, useCallback } from "react";
// import { toast } from "react-hot-toast";

interface PageProps {
  params: { id: string };
  searchParams: Record<string, any>;
}

const Page: React.FC<PageProps> = ({ params, searchParams }) => {
  const [isClose, setClose] = useState<boolean>(true);
  const [showContribute, setShowContribute] = useState(false);
  const [contributeData, setContributeData] = useState<any>(null);
  const [contributeName, setContributeName] = useState("");
  const [contributeAmount, setContributeAmount] = useState("");

  return (
    <>
      {/* <button
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
        onClick={() => setShowContribute((v) => !v)}
      >
        {showContribute ? "Hide Contribute" : "Show Contribute"}
      </button>
      {showContribute && contributeData && (
        <div className="bg-white shadow rounded-lg p-6 mb-6 max-w-lg mx-auto text-center">
          <h2 className="text-xl font-bold mb-2">Contribute to Card</h2>
          <img
            src={contributeData?.images?.[0]?.card_images?.[0] || ""}
            alt="Card"
            className="w-40 h-40 object-cover rounded-lg mx-auto mb-4"
          />
          <p className="text-lg font-semibold mb-2">
            Amount: ₹{contributeData?.amount || "-"}
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // handle contribute logic here
              alert(
                `Contributed by: ${contributeName}, Amount: ${contributeAmount}`
              );
            }}
            className="flex flex-col gap-2 items-center"
          >
            <input
              type="text"
              placeholder="Your Name"
              value={contributeName}
              onChange={(e) => setContributeName(e.target.value)}
              className="border px-3 py-2 rounded w-full max-w-xs"
              required
            />
            <input
              type="number"
              placeholder="Amount"
              value={contributeAmount}
              onChange={(e) => setContributeAmount(e.target.value)}
              className="border px-3 py-2 rounded w-full max-w-xs"
              required
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded mt-2"
            >
              Contribute
            </button>
          </form>
        </div>
      )} */}

      <GroupCollection
        params={params}
        searchParams={searchParams}
        // data={data}
        setClose={setClose}
        isClose={isClose}
      />
    </>
  );
};

export default Page;
