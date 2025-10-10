"use client";
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

interface Payment {
  payment_id: string; // Matches API
  product_id: string; // Matches API
  date: string;
  status: string;
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
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/razorpay/payment-list`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch payment history");
        }

        const data: PaymentResponse = await res.json();
        setPayments(data.data); // extract array from response
      } catch (err: any) {
        toast.error(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (loading) return <div>Loading payment history...</div>;

  return (
    <div className="payment-history">
      <h2 className="text-xl font-bold mb-4">Payment History</h2>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Product</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.payment_id}>
              <td className="border px-4 py-2">{payment.payment_id}</td>
              <td className="border px-4 py-2">{payment.product_id}</td>
              <td className="border px-4 py-2">{new Date(payment.date).toLocaleDateString()}</td>
              <td className="border px-4 py-2">{payment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
