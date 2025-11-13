"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

interface UserData {
  uuid: string;
}

interface Payment {
  payment_id: string;
  product_id: string;
  date: string;
  status: string;
  amount: number;
  currency: string;
  updated_at: string;
  bundle_uuid?: string;
}

interface PaymentResponse {
  data: Payment[];
}

interface BundleListResponse {
  data: any; // adjust based on API response
}

interface AccountBundlesProps {
  userInfo: UserData;
  data: { data: UserData };
}

const AccountBundles: React.FC<AccountBundlesProps> = ({ userInfo, data }) => {
  const router = useRouter();
  const [state, setState] = useState<BundleListResponse | null>(null);
  
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
 const gettoken = Cookies.get("auth_token");
  const [countBundle, setCountBundle] = useState<number>(0);
  useEffect(() => {
    const fetchBundleCount = async () => {
      if (!gettoken) return;
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${gettoken}`,
          },
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const result = await response.json();
        const bundleCount = result?.data?.bundle_card_count ?? 0;
        setCountBundle(bundleCount);
      } catch (error) {
        console.error("Error fetching bundle count:", error);
      }
    };

    fetchBundleCount();
  }, [gettoken]);

  useEffect(() => {
    const fetchPayments = async () => {
      if (!gettoken) {
        toast.error("Authentication token missing");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/razorpay/payment-list`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${gettoken}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch payment history");

        const data: PaymentResponse = await res.json();
        setPayments(data.data);
      } catch (err: any) {
        toast.error(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [gettoken]);

  const submit = async () => {
    if (!gettoken) return;

    try {
      const requestData = {
        user_uuid: data?.data?.uuid,
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/card/user-paid-bundle-list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${gettoken}`,
        },
        body: JSON.stringify(requestData),
      });

      const posts = await res.json();
      setState(posts);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    submit();
  }, [gettoken]);

  const handlePickBundle = () => {
    router.push("/pricing");
  };

  return (
    <div className="flex flex-col justify-center items-center bg-gray-100 w-full">
      <div className="flex justify-between items-center mb-4 w-full">
        <h1 className="font-bold text-center bundle-head flex-1">My Bundles</h1>
        <span className="font-bold">
          Bundles Left: <span className="font-[500]">{countBundle}</span>
        </span>
      </div>

      <div className="rounded-lg w-full overflow-x-auto bg-white border border-grey mb-4">
        <div className="overflow-x-auto inline-block min-w-full align-middle rounded-lg">
          <table className="min-w-full bg-white border rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left font-medium text-gray-600 fw-semibold bg-[#dfeaf5a8]">
                  Payment ID
                </th>
                <th className="py-3 px-4 text-left font-medium text-gray-600 fw-semibold bg-[#dfeaf5a8]">
                  Amount
                </th>
                <th className="py-3 px-4 text-left font-medium text-gray-600 fw-semibold bg-[#dfeaf5a8]">
                  Created At
                </th>
                <th className="py-3 px-4 text-left font-medium text-gray-600 fw-semibold bg-[#dfeaf5a8]">
                  Currency
                </th>
                
              </tr>
            </thead>
            <tbody>
              {payments
                .filter((payment) => payment.bundle_uuid && payment.bundle_uuid !== "")
                .map((payment) => (
                  <tr key={payment.payment_id}>
                    <td className="border px-4 py-2">{payment.payment_id}</td>
                    <td className="border px-4 py-2">{payment.amount}</td>
                    <td className="border px-4 py-2">
                      {new Date(payment.updated_at).toLocaleDateString()}
                    </td>
                    <td className="border px-4 py-2">{payment.currency}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-gray-500 text-center mb-4 mt-4 fw-semibold">
        Looks like you haven&apos;t got any card bundles yet. Get started by
        selecting a bundle that works for you.
      </p>

      <button
        onClick={handlePickBundle}
        className="bg-[#538AC4] text-white border-2 rounded-pill hover:bg-[#3b8cdd] pickbundle-Btn fw-semibold"
      >
        Pick a Bundle
      </button>
    </div>
  );
};

export default AccountBundles;
