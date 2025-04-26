
import ForgotPassword from "../../components/ForgotPassword";
import Login from "../../components/Login";
import Register from "../../components/Register";
import ResetPassword from "../../components/ResetPassword";
import React from "react";

const page = ({params,searchParams}:any) => {
    console.log(params?.auth[0],"kjjhjh");
    console.log(searchParams.token,"asdfretwertwert");
    console.log(searchParams.email,"dfghryt");
    
  return (
  <div className="">
   {
  params?.auth[0] === "register" ? (
    <Register />
  ) : params?.auth[0] === "reset-password" ? (
    <ResetPassword />
  ): params?.auth[0] === "forgot-password" ? (
    <ForgotPassword searchParams={searchParams}/>
  ) : (
    <Login />
  )
}
  </div>
  )
}

export default page