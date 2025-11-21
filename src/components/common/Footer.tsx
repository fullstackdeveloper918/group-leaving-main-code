"use client";
import React from "react";
import { Row, Col, Typography } from "antd";
// import GoodLuckCad from "../../../public/newimage/logoGroup.png";
import GoodLuckCad from "../../../public/newimage/Groupwish-logo.png";
import {
  FacebookOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  MailOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";

const { Text, Title } = Typography;

const date = new Date();
const year = date.getFullYear();

const Footer: React.FC = () => {
  return (
    <div className="container-fluid pt-12">
      <Row justify="space-around">
        <Col xs={24} sm={12} md={6}>
          <div style={{ textAlign: "center" }}>
            {/* <div className="flex items-center text-2xl font-semibold">
              <span className="text-black">Good</span>
              <span className="text-blueText">luck</span>
              <span className="text-black">cards</span>
            </div> */}

            <Link href={`/`} className="no-underline w-3/12">
              <Image
                src={GoodLuckCad.src}
                height={200}
                width={200}
                alt="Good Luck"
                className="text-4xl font-bold logo_img"
              />
            </Link>

            {/* <p
              className="text-blackText text-left mt-2"
              style={{ maxWidth: "90%" }}
            >
              Clarity gives you the blocks and components you need to create a
              truly professional website.
            </p> */}
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
              <a
                href="/about"
                className="text-black hover:text-blueBg no-underline"
              >
                About
              </a>
            </li>
            <li className="block  py-2  no-underline text-black  transition-all ease-in  text-black hover:text-blueBg hover:px-2  ">
              <a
                href="/office"
                className="text-black hover:text-blueBg no-underline"
              >
                Office
              </a>
            </li>
            <li className="block  py-2  no-underline text-black  transition-all ease-in  text-black hover:text-blueBg hover:px-2  ">
              <a
                href="/license-verification"
                className="text-black hover:text-blueBg no-underline"
              >
                License Verification
              </a>
            </li>
            <li className="block  py-2  no-underline text-black  transition-all ease-in  hover:text-blueBg hover:px-2 ">
              <a
                href="/spay-neuter"
                className="text-black hover:text-blueBg no-underline"
              >
                Spay & Neuter
              </a>
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
                href="/terms"
                className="block  py-2  no-underline text-black  transition-all ease-in  hover:text-blueBg hover:px-2 inline-block "
              >
                Terms & Conditions{" "}
              </a>{" "}
            </li>
            <li className="block">
              <a
                href="/privacy"
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
              <a
                href="/free-ebooks"
                className="text-black hover:text-blueBg no-underline"
              >
                Free eBooks
              </a>
            </li>
            <li className="block  py-2  no-underline text-black  transition-all ease-in  text-black hover:text-blueBg hover:px-2  ">
              <a
                href="/development-tutorial"
                className="text-black hover:text-blueBg no-underline"
              >
                Development Tutorial
              </a>
            </li>
            <li className="block  py-2  no-underline text-black  transition-all ease-in  text-black hover:text-blueBg hover:px-2  ">
              <a
                href="/how-to-blog"
                className="text-black hover:text-blueBg no-underline"
              >
                How to - Blog
              </a>
            </li>
            <li className="block  py-2  no-underline text-black  transition-all ease-in  text-black hover:text-blueBg hover:px-2  ">
              <a
                href="/youtube-playlist"
                className="text-black hover:text-blueBg no-underline"
              >
                Youtube Playlist
              </a>
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
        <Text>© Copyright {year}, All Rights Reserved by Groupluckcards</Text>
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
