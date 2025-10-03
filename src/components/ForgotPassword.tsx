"use client"
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';

const ForgotPassword = ({searchParams}:any) => {
    const [password, setPassword] = useState<any>("");
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        let item = {
            email:searchParams.email,
            token:searchParams.token,
            password: password,
        };
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/user/update_reset_password`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(item ),
            }
          );
          console.log(response, "responsereset");
    
          if (response.ok) {
            // alert("Password reset email sent!");
            toast.success("Password Changed successfull !", {autoClose:2000})
          } else {
            alert("Failed to send reset email. Please try again.");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white  rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">Reset Password</h1>
        <p className="text-center text-gray-600 mb-6">
        Enter your new password to change your account password.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="Password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="text"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-700 text-white bg-blueBg d-hide-btn  py-2 px-4 rounded-lg hover:bg-blue-800 transition-colors"
          >
            Change Password 
          </button> 
        </form>
        {/* <div className="text-center mt-4">
          <a href="/login" className="text-blue-600 hover:underline">
            Return to Login
          </a>
        </div> */}
      </div>
    </div>
  )
}

export default ForgotPassword