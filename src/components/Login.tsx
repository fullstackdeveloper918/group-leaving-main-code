"use client";
import React, { useState, useEffect } from "react";
import { Card, Divider, Form, Input } from "antd";
import dynamic from "next/dynamic";
import SocalLogin from "../components/common/SocialLogin";
import { useRouter } from "next/navigation";
import api from "../utils/api";
import { toast } from "react-toastify";
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
  const { setAccessToken } = useAccessToken();
  const [form] = Form.useForm();
  useEffect(() => {
    setLoading(false);
    form.resetFields();
  }, [form]);

  const onFinish = async (values: any) => {
    if (loading) return; 
    const payload = {
      email: String(values.email).toLowerCase(),
      password: values.password,
    };

    try {
      setLoading(true);
      const res = await api.Auth.login(payload);

      if (res?.token) {
        api.setToken(res.token); 
        setAccessToken(res.token);
        Cookies.set("auth_token", res.token, {
          sameSite: "None",
          secure: true,
        });
        localStorage.setItem("access_token", res.token);

        await new Promise((resolve) => setTimeout(resolve, 50));
      }

      if (res?.data) {
        Cookies.set("userInfo", JSON.stringify(res.data));
      }

      toast.success("Login Successful", { autoClose: 1000 });

      const redirectPath = Cookies.get("redirect_after_login");
      if (redirectPath) Cookies.remove("redirect_after_login");

      setTimeout(() => {
        if (
          redirectPath &&
          redirectPath !== "/login" &&
          redirectPath !== "/register"
        ) {
          router.replace(redirectPath);
        } else {
          router.replace("/");
        }
      }, 100);
    } catch (error: any) {
      console.error(error, "Login Error");
      setLoading(false);

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Login failed. Please try again.";
      toast.error(message);
    }
  };

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
              <h3 className="text-center mb-3 lg:text-3xl md:xl">Log In</h3>
              <Form
                form={form}
                name="normal_login"
                className="login-form"
                initialValues={{ remember: false }}
                onFinish={onFinish}
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
                  <Input
                    size="large"
                    placeholder="Email"
                    prefix={<i className="fa-regular fa-envelope"></i>}
                    disabled={loading}
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "Please enter a password" },
                  ]}
                >
                  <Input.Password
                    size="large"
                    placeholder="Password"
                    prefix={<i className="fa-solid fa-lock"></i>}
                    disabled={loading}
                  />
                </Form.Item>

                <small className="text-muted">
                  Must be at least 8 characters
                </small>

                <Button
                  size="large"
                  htmlType="submit"
                  className="loginBtn w-100"
                  loading={loading}
                  disabled={loading}
                >
                  Log In
                </Button>
              </Form>

              <Divider style={{ borderColor: "#333333" }}>
                <div className="divider my-2 text-center">
                  <span>or</span>
                </div>
              </Divider>

              <div className="my-3 text-center">
                <SocalLogin />
              </div>

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
