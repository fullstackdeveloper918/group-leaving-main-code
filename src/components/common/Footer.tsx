"use client";
import React from "react";
import { Row, Col, Typography } from "antd";
import {
  FacebookOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  MailOutlined,
} from "@ant-design/icons";

const { Text, Title } = Typography;

const Footer: React.FC = () => {
  return (
    <div className="container-fluid pt-12">
      <Row justify="space-around">
        <Col xs={24} sm={12} md={6}>
          <div style={{ textAlign: "center" }}>
            <div className="flex items-center text-2xl font-semibold">
              <span className="text-black">Good</span>
              <span className="text-blueText">luck</span>
              <span className="text-black">cards</span>
            </div>

            <p
              className="text-blackText text-left mt-2"
              style={{ maxWidth: "90%" }}
            >
              Clarity gives you the blocks and components you need to create a
              truly professional website.
            </p>
            <div style={{ marginTop: "20px" }}>
              <FacebookOutlined style={iconStyle} />
              <InstagramOutlined style={iconStyle} />
              <LinkedinOutlined style={iconStyle} />
            </div>
          </div>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Title level={5} className="text-blackText font-semibold  uppercase">
            Company
          </Title>
          <ul className="p-0">
            <li className="block  py-2  no-underline text-black  transition-all ease-in  hover:text-blueBg hover:px-2 ">
              About
            </li>
            <li className="block  py-2  no-underline text-black  transition-all ease-in  text-black hover:text-blueBg hover:px-2  ">
              Office
            </li>
            <li className="block  py-2  no-underline text-black  transition-all ease-in  text-black hover:text-blueBg hover:px-2  ">
              License Verification{" "}
            </li>
            <li className="block  py-2  no-underline text-black  transition-all ease-in  hover:text-blueBg hover:px-2 ">
              Spay & Neuter
            </li>
          </ul>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Title level={5} className="text-blackText font-semibold uppercase">
            Help
          </Title>
          <ul className="p-0">
            <li className="block">
              {" "}
              <a
                href="/pricing"
                className="block  py-2  no-underline text-black  transition-all ease-in  hover:text-blueBg hover:px-2 inline-block "
              >
                Pricing{" "}
              </a>
            </li>
            <li className="block">
              <a
                href="/gift-cards"
                className="block  py-2  no-underline text-black  transition-all ease-in  hover:text-blueBg hover:px-2 inline-block "
              >
                Gift Cards
              </a>
            </li>
            <li className="block">
              <a
                href="/faq"
                className="block  py-2  no-underline text-black  transition-all ease-in  hover:text-blueBg hover:px-2 inline-block "
              >
                FAQ
              </a>
            </li>
            <li className="block">
              <a
                href="/#"
                className="block  py-2  no-underline text-black  transition-all ease-in  hover:text-blueBg hover:px-2 inline-block "
              >
                Terms & Conditions{" "}
              </a>{" "}
            </li>
            <li className="block">
              <a
                href="/#"
                className="block  py-2  no-underline text-black  transition-all ease-in  hover:text-blueBg hover:px-2 inline-block "
              >
                Privacy Policy{" "}
              </a>{" "}
            </li>
          </ul>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Title level={5} className="text-blackText font-semibold uppercase">
            Resources
          </Title>
          <ul className="p-0">
            <li className="block  py-2  no-underline text-black  transition-all ease-in  text-black hover:text-blueBg hover:px-2   hover:text-blueBg hover:px-2">
              Free eBooks
            </li>
            <li className="block  py-2  no-underline text-black  transition-all ease-in  text-black hover:text-blueBg hover:px-2  ">
              Development Tutorial
            </li>
            <li className="block  py-2  no-underline text-black  transition-all ease-in  text-black hover:text-blueBg hover:px-2  ">
              How to - Blog
            </li>
            <li className="block  py-2  no-underline text-black  transition-all ease-in  text-black hover:text-blueBg hover:px-2  ">
              Youtube Playlist
            </li>
          </ul>
        </Col>
      </Row>
      <Row
        justify="center"
        style={{
          marginTop: "40px",
          borderTop: "1px solid #E2E8F0",
          padding: "20px 0",
        }}
      >
        <Text>© Copyright 2024, All Rights Reserved by Groupluckcards</Text>
      </Row>
    </div>
  );
};

const iconStyle = {
  fontSize: "24px",
  color: "#fff",
  marginRight: "15px",
  cursor: "pointer",
};

export default Footer;
