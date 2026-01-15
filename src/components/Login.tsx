"use client";
import React, { useState } from "react";
import { Card, Checkbox, Divider, Flex, Form, Input } from "antd";
import dynamic from "next/dynamic";
import SocalLogin from "../components/common/SocialLogin";
import MicroSoftLogin from "../components/common/MicroSoftLogin";
import { useRouter } from "next/navigation";
import { capFirst } from "@/utils/validation";
import api from "../utils/api";
import { setCookie } from "nookies";
import { GooglePayWithCDN } from "./common/GooglePayWithCDN";
import GooglePay from "./common/GooglePay";
import GooglePayButton from "./common/GooglePayButton";
import { toast, ToastContainer } from "react-toastify";
import { useAccessToken } from "../app/context/AccessTokenContext";
import Link from "next/link";
import Cookies from "js-cookie";
const { Row, Col, Button } = {
  Row: dynamic(() => import("antd").then((module) => module.Row), {
    ssr: false,
  }),
  Col: dynamic(() => import("antd").then((module) => module.Col), {
    ssr: false,
  }),
  Button: dynamic(() => import("antd").then((module) => module.Button), {
    ssr: false,
  }),
};
const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // const [correctPass, setCorrectPass] = useState(false);
  const { accessToken, setAccessToken } = useAccessToken();
  const setCookie = (name: string, value: string) => {
    // const expires = new Date();
    // expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    // document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  };

  // const createSessionCookie = (idToken: string) => {
  //   try {
  //     setCookie("auth_token", idToken); // 30 days
  //   } catch (error) {
  //   }
  // };
  const createSessionCookie2 = (idToken: string) => {
    try {
      setCookie("COOKIES_USER_ACCESS_TOKEN", idToken); // 30 days
    } catch (error) {}
  };
  const createSessionCookie1 = (idToken: string) => {
    try {
      setCookie("userToken", idToken); // 30 days
    } catch (error) {}
  };

  // const onFinish = async (values: any) => {
  //   let items = {
  //     full_name: capFirst(values?.full_name),
  //     email: String(values.email).toLowerCase(),
  //     password: values.password,
  //   };
  //   let res = await api.Auth.login(items);
  //   console.log(res, "yuyyyu");

  //   // if (res.token) {
  //     // }
  //     // setCookie(null, "token","yewiryt46836483456ojtkshrti6w48werkweyrt86448", {
  //     //   maxAge: 30 * 24 * 60 * 60,
  //     //   path: "/",
  //     // });

  //   console.log(res, "rereere");
  //   router.replace("/");

  //   try {
  //   } catch (error: any) {}
  // };

  const onFinish1 = async (values: any) => {
    console.log("running login");

    const items = {
      email: String(values.email).toLowerCase(),
      password: values.password,
    };

    console.log("items for login", items);

    try {
      setLoading(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(items),
      });

      const data = await res.json(); // must await

      console.log("Login response:", data);

      // ------------------ ERROR HANDLING ------------------
      if (res.status === 401 || data.message === "Unauthorized") {
        toast.error("Invalid email or password.");
        return;
      }

      if (!res.ok) {
        toast.error(data.message || "Login failed");
        return;
      }

      // ------------------ SUCCESS HANDLING ------------------
      toast.success("Login Successfully", { autoClose: 1000 });
      console.log(data.data, "data user here login");
      // Save user
      Cookies.set("userInfo", JSON.stringify(data.data));

      // Save token
      if (data.token && data.token !== "login") {
        Cookies.set("auth_token", data.token, {
          sameSite: "None",
          secure: true,
        });

        localStorage.setItem("access_token", JSON.stringify(data.token));
      }

      // Optional custom cookies
      createSessionCookie2(JSON.stringify(data.token));
      createSessionCookie1(JSON.stringify(data.data));

      // Redirect
      router.replace("/");
    } catch (error: any) {
      console.log("login error", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const useCDN = true;
  return (
    <section className="auth-pages d-flex align-items-center h-100 bg-lightBg py-12 loginPage">
      <div className="container">
        <Row justify="center">
          <Col className="gutter-row" xs={23} sm={21} md={19} lg={12} xl={10}>
            <Card
              className="mt-3 mb-5"
              bordered={false}
              style={{
                padding: "30px",
                borderRadius: "12px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h3 className="text-center mb-3 lg:text-3xl md:xl ">Log In</h3>
              <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: false }}
                onFinish={onFinish1}
                scrollToFirstError
              >
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      type: "email",
                      message: "Please enter a valid email",
                    },
                  ]}
                >
                  {/* <label className="labelSignup">Email</label> */}
                  <Input
                    size="large"
                    placeholder="Email"
                    prefix={<i className="fa-regular fa-envelope"></i>}
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "Please enter a password" },
                  ]}
                >
                  {/* <label className="labelSignup">Password</label> */}
                  <Input.Password
                    size="large"
                    placeholder="Password"
                    prefix={<i className="fa-solid fa-lock"></i>}
                  />
                  {/* {
                    correctPass && <p className="text-red-400">Please enter correct password</p>
                  } */}
                </Form.Item>
                <small className="text-muted">
                  Must be at least 8 characters
                </small>
                <Button
                  size="large"
                  htmlType="submit"
                  className="loginBtn w-100"
                  loading={loading}
                >
                  Log In
                </Button>
              </Form>
              <Divider style={{ borderColor: "#333333" }}>
                <div className="divider my-2 text-center">
                  <span>or</span>
                </div>
              </Divider>

              <Flex gap={18} justify="center" align="center" className="my-3">
                <SocalLogin />
                {/* <MicroSoftLogin /> */}

                {/* <GooglePayWithCDN 
                    currencyCode='AUD' 
                    countryCode='AU' 
                    totalPrice={'1.00'} 
                    // handleSocialBuy={props.handleSocialBuy}
                /> */}

                {/* <Button size='middle' type='default' shape='circle' htmlType='button' style={{ width: 40, height: 40 }} icon={<Icons.FaceBookIcon />} className='btn-blue fw-medium text-white'></Button> */}
              </Flex>
              {/* <GooglePay 
                    totalPrice={'1.00'} 
                    currencyCode='AUD' 
                    countryCode='AU' 
                    // handleSocialBuy={props.handleSocialBuy}
                /> */}
              {/* <h1>Pay with Google Pay UPI</h1>
                   <GooglePayButton /> */}
              {/* <div className="auth-footer text-center mt-2">
              <p>
                Already have an account? <a href="/login">Login</a>
              </p>
            </div> */}
              <div className="auth-footer text-center mt-2">
                <h6>
                  <Link href="/reset-password">Forgot Password</Link>
                </h6>
                <p>
                  Need an account?{" "}
                  <Link
                    href="/register"
                    className="text-blueBg font-bold alreadyText"
                  >
                    Register
                  </Link>
                </p>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default Login;
