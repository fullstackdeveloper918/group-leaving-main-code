"use client";

import { Button } from "antd";
import React from "react";
import { FcGoogle } from "react-icons/fc";

const GoogleLoginPage = () => {
  const handleGoogleLogin = () => {
    // Redirect user to backend Google OAuth URL
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/social/google`;
  };

  return (
    <div className="">
      {/* <h1 className="text-2xl font-bold mb-4">Login with Google</h1> */}

      <Button
        className="google-btn w-100 mb-2"
        size="large"
        onClick={handleGoogleLogin}
        aria-placeholder=""
        icon={<FcGoogle size={20} />} // Add the Google icon here
      >
        Sign in with Google
      </Button>
      {/* <button
        className=""
        onClick={handleGoogleLogin}
      >
        Sign in with Google
      </button> */}
    </div>
  );
};

export default GoogleLoginPage;
