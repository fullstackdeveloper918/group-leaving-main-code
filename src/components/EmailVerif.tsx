"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MdMarkEmailRead } from "react-icons/md";
import api from "@/utils/api";

const EmailVerif = ({ searchParam }: { searchParam: string }) => {
  const router = useRouter();
  const [message, setMessage] = useState<string>("Verifying...");
  const [loading, setLoading] = useState<boolean>(true);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    const verifyEmail = async () => {
      if (!searchParam) {
        setMessage("❌ Invalid verification link.");
        setLoading(false);
        return;
      }

      try {
        const query = `token=${encodeURIComponent(searchParam)}`;
        // const query = `token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFAeW9wbWFpbC5jb20iLCJpZCI6NTMsImlhdCI6MTczOTUxNTQxMiwiZXhwIjoxNzM5NTE5MDEyfQ.B2lpACfjUQebzYwO_pdb6oi3otTEn4Tk7YTU6dw3Di8`;
        const res = await api.Auth.verify(query);

        if (res.status === 200) {
          setMessage("✅ Email verified successfully!");
          setSuccess(true);
        } else {
          setMessage("❌ Verification failed. Link may have expired.");
        }
      } catch (error) {
        setMessage("❌ Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [searchParam, router]);

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white max-w-md w-full rounded-lg text-center shadow-lg p-6 flex flex-col justify-center items-center gap-2">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Email Verification</h2>
        <p className="text-gray-600">{loading ? "Processing..." : message}</p>

        {!loading && success ? (
          <>
            <MdMarkEmailRead size={100} color="#01ACFF" />
            <p>Hello, John!</p>
            <p>Your email has been verified successfully. Your account is now active.</p>
            <p>Please use the link below to login to your account.</p>
            <button
              onClick={() => router.push("/login")}
              className="bg-[#5292CA] text-white px-6 py-2 rounded-full font-semibold hover:bg-red-600 mt-4"
            >
              Go to Login
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => router.push("/register")}
              className="bg-[#5292CA] text-white px-6 py-2 rounded-full font-semibold hover:bg-red-600 mt-4"
            >
              Go to Registration
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default EmailVerif;
