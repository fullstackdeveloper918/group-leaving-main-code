"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Table from "./common/Table";
import Cookies from "js-cookie";

const AccountBunddles = ({ userInfo, data }: any) => {
  const router = useRouter();
  // let posts=null
  const [state, setState] = useState<any>("");
  const gettoken = Cookies.get("auth_token");
  const [countBundle, setCountBundle] = useState<number>(0);

  // Fetch bundle count
  useEffect(() => {
    const fetchBundleCount = async () => {
      if (!gettoken) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/user/profile`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${gettoken}`,
            },
            // body: JSON.stringify({}),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result, "profile data");
        const bundleCount = result?.data?.bundle_card_count ?? 0;
        console.log(bundleCount, "bundle count");
        setCountBundle(bundleCount);
      } catch (error) {
        console.error("Error fetching bundle count:", error);
        toast.error("Failed to fetch profile data");
      }
    };

    fetchBundleCount();
  }, [gettoken]);

  const submit = async () => {
    try {
      const requestData = {
        user_uuid: data?.data?.uuid,
      };

      let res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/card/user-paid-bundle-list`,
        {
          method: "POST", // Method set to POST
          headers: {
            "Content-Type": "application/json", // Indicates that you're sending JSON
            Authorization: `Bearer ${gettoken}`, // Send the token in the Authorization header
          },
          body: JSON.stringify(requestData), // Stringify the data you want to send in the body
        }
      );

      // Parse the response JSON
      let posts = await res.json();
      console.log(posts, "AccountBundle");
      setState(posts);
      // toast.success("Preferences Updated Successfully");
    } catch (error) {}
  };
  useEffect(() => {
    submit();
  }, []);

  const handlePickBundle = () => {
    router.push("/pricing");
  };
  return (
    <div className=" flex flex-col justify-center items-center bg-gray-100 w-full">
      <h1 className="font-bold text-center bundle-head">My Bundles</h1>
      <div className="rounded-lg w-full overflow-x-auto bg-white  border border-grey mb-4">
        {/* <h2 className="text-xl font-semibold mb-4">Signed Cards</h2> */}
        <div className="overflow-x-auto inline-block min-w-full align-middle rounded-lg">
          <table className="min-w-full bg-white border rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left font-medium text-gray-600 fw-semibold bg-[#dfeaf5a8]">
                  Greeting
                </th>
                <th className="py-3 px-4 text-left font-medium text-gray-600 fw-semibold bg-[#dfeaf5a8]">
                  Quantity
                </th>
                <th className="py-3 px-4 text-left font-medium text-gray-600 fw-semibold bg-[#dfeaf5a8]">
                  Price
                </th>
                <th className="py-3 px-4 text-left font-medium text-gray-600 fw-semibold bg-[#dfeaf5a8]">
                  Discount Rate
                </th>
                <th className="py-3 px-4 text-left font-medium text-gray-600 fw-semibold bg-[#dfeaf5a8]">
                  Currency
                </th>
              </tr>
            </thead>
            {/* <tbody>
              {state?.message?.bundles?.length > 0 ? (
                state?.message?.bundles?.map((item: any, index: any) => (
                  <tr key={index} className="border px-3 mt-2">
                    <td className="py-3 px-4">
                      <img
                        src="https://groupleavingcards.com/images/gift/collection_pot.png"
                        className="w-20 h-20 object-cover rounded-lg mr-4"
                      />
                    </td>
                    <td className="py-3 px-4 fw-medium">
                      {item?.bundle?.number_of_cards || "N/A"}
                    </td>
                    <td className="py-3 px-4 fw-medium">
                      {item?.bundle?.sale_price || "N/A"}
                    </td>
                    <td className="py-3 px-4 fw-medium">
                      {item?.bundle?.discount || "N/A"}
                    </td>
                    <td className="py-3 px-4 fw-medium text-blue-600">
                      {item?.bundle?.currency_type}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-3">
                    No bundles found.
                  </td>
                </tr>
              )}
            </tbody> */}
          </table>
        </div>
      </div>
      {/* Message */}
      <p className="text-gray-500 text-center mb-4 mt-4 fw-semibold">
        Looks like you haven&apos;t got any card bundles yet. Get started by
        selecting a bundle that works for you.
      </p>

      {/* Action Button */}
      <button
        onClick={handlePickBundle}
        className="bg-[#538AC4] text-white border-2 rounded-pill hover:bg-[#3b8cdd] pickbundle-Btn fw-semibold"
      >
        Pick a Bundle
      </button>
    </div>
  );
};

export default AccountBunddles;
