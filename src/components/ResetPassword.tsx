"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const ResetPassword = () => {
  const [email, setEmail] = useState<any>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
        const requestData = {
           email:email
          };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );
      const data = await response.json();
      // console.log(data, "responseResetPassword");
// toast.success(data.message)
      if (data?.status === 200 && data?.message) {
        toast.success(data?.message, {autoClose:2000});
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } 
    } catch (error:any) {
      toast.error("Error:", error?.message);
    }
  };
  return (
    <>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white  rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">Forgot Password</h1>
        <p className="text-center text-gray-600 mb-6">
          If you’ve forgotten your password we can send you an email to reset
          it.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-700 text-white bg-blueBg d-hide-btn py-2 px-4 rounded-lg hover:bg-blue-800 transition-colors"
          >
            Submit
          </button>
        </form>
        <div className="text-center mt-4">
          <Link href="/login" className="text-blue-600 hover:underline">
            Return to Login
          </Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default ResetPassword;
