"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Loader from "./Loader";

interface Payment {
  payment_id: string;
  product_id: string;
  amount: number;
  method: string;
  payment_status: string;
  bundle_uuid?: string;
  updated_at: string;
  currency: string;
}

interface PaymentResponse {
  data: Payment[];
}

const PaymentHistory: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPayments = async () => {
      const token = Cookies.get("auth_token");
      if (!token) {
        toast.error("Authentication token missing");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/razorpay/payment-list`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch payment history");
        }

        const data: PaymentResponse = await res.json();
        setPayments(data.data);
      } catch (err: any) {
        toast.error(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (loading) return <Loader loading={loading} />;

  return (
    <div className="payment-history">
      <h2 className="text-xl font-bold mb-4">Payment History</h2>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Payment ID</th>
            <th className="border px-4 py-2">Amount</th>
            <th className="border px-4 py-2">Method</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Type</th>
            <th className="border px-4 py-2">Updated At</th>
            <th className="border px-4 py-2">Currency</th>
            <th className="border px-4 py-2">Invoice</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.payment_id}>
              <td className="border px-4 py-2">{payment.payment_id}</td>
              <td className="border px-4 py-2">{payment.amount}</td>
              <td className="border px-4 py-2">{payment.method}</td>
              <td className="border px-4 py-2">{payment.payment_status}</td>
              <td className="border px-4 py-2">
                {payment.bundle_uuid ? "Bundle" : "Single"}
              </td>

              <td className="border px-4 py-2">
                {payment.updated_at
                  ? new Date(payment.updated_at).toLocaleDateString()
                  : "-"}
              </td>
              <td className="border px-4 py-2">{payment.currency}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
