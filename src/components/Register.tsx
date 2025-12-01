"use client";
import React, { useState } from "react";
import { Card, Checkbox, Divider, Flex, Form, Input } from "antd";
import dynamic from "next/dynamic";
import SocalLogin from "../components/common/SocialLogin";
import MicroSoftLogin from "../components/common/MicroSoftLogin";
import api from "@/utils/api";
import validation, { capFirst } from "@/utils/validation";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";
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

const Register = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const onFinish = async (values: any) => {
    console.log(values, "lsjdflj");

    let items = {
      full_name: validation.toLowCase(values?.full_name),
      email: String(values.email).toLowerCase(),
      password: values.password,
      marketing_email_and_discounts: values.newsletter,
    };

    try {
      setLoading(true);
      let res = await api.Auth.signUp(items);
      toast.success("Please verify your email to continue", {
        autoClose: 2000,
      });
      console.log("resforregister", res);
      // router.replace("/login")
    } catch (error: any) {
      console.log("errorinregister123", error);
      if (error?.status === 409 || error?.message === "Email already exists") {
        toast.error("Email already exists", { autoClose: 3000 });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-pages d-flex align-items-center h-100 bg-lightBg loginPage register-page-sec">
      <div className="container">
        <Row justify="center">
          <Col className="gutter-row" xs={23} sm={21} md={19} lg={12} xl={10}>
            <h3 className="text-center register-head-txt font-bold">
              Register
            </h3>
            <Card
              className="reg-form"
              bordered={false}
              style={{
                borderRadius: "12px",
                // boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                background: " #558ec912",
                padding: "40px 35px",
                border: "1px solid rgb(85 142 201 / 25%)",
              }}
            >
              <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: false }}
                onFinish={onFinish}
                scrollToFirstError
              >
                <Form.Item
                  className="regform-field-box"
                  name="full_name"
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Please enter valid name",
                    },
                  ]}
                >
                  {/* <label className="labelSignup">Full Name</label> */}
                  <Input
                    size="large"
                    placeholder="Full Name"
                    prefix={<i className="fa-regular fa-user"></i>}
                  />
                </Form.Item>

                <Form.Item
                  className="regform-field-box"
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
                  className="regform-field-box"
                  name="password"
                  rules={[
                    { required: true, message: "Please enter a password" },
                    {
                      min: 8,
                      message: "Password must be at least 8 characters",
                    },
                    {
                      pattern:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=]).*$/,
                      message:
                        "Password must include at least one lowercase letter, one uppercase letter, one number, and one special character (@, #, $, etc.)",
                    },
                  ]}
                >
                  {/* <label className="labelSignup">Password</label> */}
                  <Input.Password
                    size="large"
                    placeholder="Password"
                    prefix={<i className="fa-solid fa-lock"></i>}
                  />
                </Form.Item>
                <small className="text-muted">
                  Must be at least 8 characters
                </small>

                <Form.Item name="newsletter" valuePropName="checked">
                  <Checkbox className="checkBoxWrapper receive-txt-box">
                    Receive occasional emails with exclusive special offers and
                    product updates.
                  </Checkbox>
                </Form.Item>

                <Button
                  size="large"
                  type="primary"
                  htmlType="submit"
                  className="loginBtn regBtn w-100"
                  loading={loading}
                >
                  Register
                </Button>
              </Form>
              <Divider style={{ borderColor: "#333333" }}>
                <div className="divider my-2 text-center">
                  <span>or</span>
                </div>
              </Divider>

              <Flex gap={24} justify="center" align="center" className="my-3">
                <SocalLogin />
                {/* <MicroSoftLogin /> */}
              </Flex>

              <div className="auth-footer text-center mt-2">
                <p>
                  Already have an account?{" "}
                  <Link href="/login" className="alreadyText">
                    Login
                  </Link>
                </p>
                <p className="text-muted">
                  By registering you accept our{" "}
                  <Link href="/terms" className="alreadyText">
                    Terms of Use
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="alreadyText">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default Register;
