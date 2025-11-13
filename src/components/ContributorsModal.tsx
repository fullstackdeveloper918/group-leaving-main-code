import React, { useEffect, useState } from "react";

interface Contributor {
  sender_name: string;
  unit_price: number;
  recipient_email: string;
  country_code: string;
  phone_number: string;
  customIdentifier?: string;
  quantity?: number;
  preOrder?: boolean;
  [key: string]: any;
}

interface ContributeModelProps {
  isOpen: boolean;
  onClose: () => void;
  groupId: string;
  reloadlyId: string;
}

const ContributorsModal: React.FC<ContributeModelProps> = ({
  isOpen,
  onClose,
  groupId,
  reloadlyId,
}) => {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  console.log(reloadlyId, "reloadlyId");
  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    setError(null);
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/order/transaction-list?cartId=${groupId}&reloadlyId=${reloadlyId}`
    )
      .then((res) => res.json())
      .then((data) => {
        setContributors(data.data || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load contributors.");
        setLoading(false);
      });
  }, [isOpen, groupId]);

  // Calculate total contributed
  const total = contributors.reduce(
    (sum, c) =>
      sum +
      parseFloat(
        c.totalOriginalAmount ? c.totalOriginalAmount : c.amount || "0"
      ),
    0
  );

  console.log(contributors, "contribution data");
  // console.log(isOpen,"here to see")
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-20 z-50 shadow-lg">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg relative animate-fadeIn">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-blue-700 text-center">
          Contributors
        </h2>
        {loading ? (
          <div className="text-center py-8 text-blue-500 font-semibold">
            Loading...
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">{error}</div>
        ) : contributors.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No one has contributed to this gift card yet.
          </div>
        ) : (
          <div className="max-h-72 overflow-y-auto mb-4">
            {contributors.map((c, idx) => (
              <div
                key={idx}
                className="py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2"
              >
                <div>
                  <div className="font-semibold text-gray-800">
                    {c.senderName || "Anonymous"}
                  </div>
                  {/* <div className="text-xs text-gray-500">Email: {c.recipient_email}</div>
                  <div className="text-xs text-gray-500">Phone: {c.phone_number}</div> */}
                </div>
                <div className="text-right">
                  <div className="text-blue-700 font-bold text-lg">
                    ₹{c.totalOriginalAmount ? c.totalOriginalAmount : c.amount}
                  </div>
                  {/* <div className="text-xs text-gray-400">Country: {c.country_code}</div> */}
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-4 flex justify-between items-center border-t pt-4">
          <span className="font-semibold text-gray-700">
            Total Contributed:
          </span>
          <span className="text-xl font-bold text-blue-700">
            ₹{total.toFixed(2)}
          </span>
        </div>
        <div className="mt-6 text-center">
          <button
            className="px-6 py-2 bg-[#558ec9] text-white rounded-lg shadow hover:bg-blue-700 transition"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContributorsModal;
