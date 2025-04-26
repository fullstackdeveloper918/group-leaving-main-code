"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import upload_img from "../assets/images/upload_img.png";
import upload_gif from "../assets/images/upload_gif.png";
import EditorModal from "./common/EditorModal";
import EditorCrousal from "./common/EditorCrousal";
import { CopyOutlined } from "@ant-design/icons";
import { Button, Input, Modal, QRCode, Space, Typography } from "antd";
import { toast, ToastContainer } from "react-toastify";
import DemoViewCard from "./common/DemoViewCard";
import DemoBoard from "./common/DemoBoard";
import userIcon from "../assets/icons/ab.png";
import Image from "next/image";
import Custom from "./common/custom";
import Customcraousal from "./common/Customcraousal";
// import { zIndex } from "html2canvas/dist/types/css/property-descriptors/z-index";
import MySignatures from "./common/MySignatures";
import EnvelopCard from "./common/EnvelopCard";
import { useRouter } from "next/navigation";
import CustomEditior from "./common/CustomEditior";
const { Paragraph, Text } = Typography;
const DemoCard = ({ params }: any) => {

  const router= useRouter()
  const [show, setShow] = useState<any>(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalClose = () => {
    setIsModalVisible(false); // Close the modal
  };
  console.log(show, "show");

  const handleShare = () => {
    setIsModalVisible(true);
  };
  const shareableLink =
    "https://group-leaving-new.vercel.app/demo/fwzDVjvbQ_X";

  const handleCopy = () => {
    navigator.clipboard.writeText(shareableLink);
    toast.success("Copied to clipboard", { autoClose: 2000 });
  };
  const addCard = () => {
    setShow(true);
  };

  const showCard = () => {
    setShow(false);
  };

  const contributors = [
    { name: "Harry", amount: 100 },
    { name: "Hermione", amount: 50 },
    { name: "Anonymous", amount: 20 },
    { name: "Neville", amount: 80 },
    { name: "Draco", amount: 2 },
    { name: "Severus", amount: 8 },
    { name: "Minerva", amount: 100 },
  ];

  const totalAmount = contributors.reduce((sum, c) => sum + c.amount, 0);
  const [elements, setElements] = useState<any[]>([]);

  // Step 1: Retrieve from localStorage on component mount
  useEffect(() => {
    const storedElements = localStorage.getItem("slideElements");

    if (storedElements) {
      setElements(JSON.parse(storedElements));
    }
  }, []);
  
    // useEffect(() => {
    //   if (elements.length > 0) {
    //     localStorage.setItem("slideElements", JSON.stringify(elements));
    //   }
    // }, [elements]);
    console.log(elements,"sdasdqweqw");
    const openEnvelop=()=>{
      router.push("/envelop")
    }
  return (
    <>
      {params === "fwzDVjvbQ_X" ? (
        <>
          <section className="bg-demo_banner text-center demo_section common_padding bg-cover bg-no-repeat">
            <ToastContainer/>
            <div className="container-fluid">
              <h1 className="text-md tracking-tight demo_heading">
                This is our demo card
              </h1>
              <p className="demo_paragraph text-grey ">
                You can test it out by adding messages, images and GIFs to see
                how it works. When you create a real card you will see more
                options to manage and customise your card.
              </p>
              <p>
                <b>Like what you see?</b> Create your own card to start
                collecting unlimited messages and pages all at a fixed cost.
              </p>
              <div className="demo_button_wrapper">
                <Link href={`/create`}>
                  <button className=" btnPrimary">Create a Card</button>
                </Link>
                {/* 0cVkV16gHzX */}
                <Link href={`/demo/0cVkV16gHzX`}>
                  <button className="btnSecondary ml-3">View Demo Board</button>
                </Link>
              </div>
            </div>
          </section>
          <section className="greeting_card_sign common_padding">
            <div className="containers">
              <div className=" md:flex block">
                <div className="md:w-1/2  w-full">
                  <div
                    className="flex space-x-2 mb-2 "
                    style={{ paddingLeft: "110px" }}
                  >
                    {/* {show ? (
                      <button
                        className="btnPrimary py-2 px-3"
                        onClick={showCard}
                      >
                        Show Card
                      </button>
                    ) : (
                      <button
                        className="btnPrimary py-2 px-3"
                        onClick={addCard}
                      >
                        Add Card
                      </button>
                    )} */}
                    {/* <button className="bg-lightBg rounded-md p-2"><img src={upload_img.src} alt="upload img" className="upload_img" /></button>
                <button className="bg-lightBg rounded-md p-2"><img src={upload_gif.src} alt="upload img" className="upload_img" /></button> */}
                  </div>

                  {/* {show ? <EditorModal showCard={showCard}/> : <EditorCrousal />} */}
                  {/* {show ? <EditorModal/> : <Customcraousal />} */}
                  {/* {show ? <EditorModal /> : <CustomEditior />} */}
                  {show ? <EditorModal /> : <Custom />}
                  {/* <Carousel /> */}
                  {/* <EditorModal/> */}
                </div>
                <div className="md:w-1/2 w-full md:mt-0 mt-5  flex items-center justify-start flex-col">
                <MySignatures/>
                  <div className="bg-white shadow-lg rounded-lg p-10 w-full max-w-lg flex flex-col gap-2 items-center">
                    <h3 className="text-center text-md font-normal ">
                      Gift Card Collection Pot
                    </h3>
                    <button
                      className="text-center text-md font-normal relative"
                      onClick={() => setIsModalOpen(true)}
                    >
                      <span className="absolute bottom-3 bg-[#061178] text-white rounded-full px-2 text-center">{contributors.length}</span>
                      <span className="">
                        <Image src={userIcon} alt="user" />
                      </span>
                    </button>
                    <img
                      src="https://gift.wegift.io/static/product_assets/AMZ-GB/AMZ-GB-card.png"
                      alt="Amazon"
                      className="voucher_img mx-auto rounded"
                    />
                    <h4 className="font-bold text-center ">£360</h4>
                    <button className="bg-greyBorder text-blackText rounded-lg  w-100 text-sm p-2.5">
                      Contribute to Hagrid Gift Card
                    </button>
                  </div>
                  <div className="w-full" style={{ width: "73%" }}>
                    <button
                      className=" btnPrimary text-center w-100 mt-3 rounded-md"
                      onClick={handleShare}
                    >
                      Share Card
                    </button>
                  </div>
                </div>
                {/* <button className="" onClick={openEnvelop}>click</button> */}
                {/* <EnvelopCard/> */}
              </div>
            </div>
            <Modal
              visible={isModalVisible}
              onCancel={handleModalClose}
              footer={null}
              width={600} // Adjust as needed
              centered
              bodyStyle={{ padding: "24px" }}
            >
              {/* Title */}
              <Typography.Title level={3}>Share Card</Typography.Title>

              {/* Instructions */}
              <Paragraph>
                Share this URL with everyone who you want to be able to add a
                message. They will be able to add a message to the card without
                having to sign up for an account. You can also share the QR code
                if that is easier.
              </Paragraph>

              {/* Shareable Link */}
              <Space
                direction="vertical"
                style={{ width: "100%", marginBottom: "16px" }}
              >
                <Text strong>Shareable link</Text>
                <Input
                  value={shareableLink}
                  readOnly
                  addonAfter={
                    <Button
                      type="text"
                      icon={<CopyOutlined />}
                      onClick={handleCopy}
                    />
                  }
                />
              </Space>

              {/* QR Code */}
              <Space style={{ display: "flex", justifyContent: "center" }}>
                <QRCode value={shareableLink} size={160} />
              </Space>
            </Modal>
          </section>
        </>
      ) : (
        <DemoBoard />
      )}

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          style={{ zIndex: 2 }}
        >
          <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Contributors
            </h2>
            <ul>
              {contributors.map((contributor, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center border-b py-2"
                >
                  <span>{contributor.name}</span>
                  <span>£{contributor.amount.toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center mt-4 font-bold text-gray-800">
              <span>Total:</span>
              <span>£{totalAmount.toFixed(2)}</span>
            </div>
            {/* <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Close
            </button> */}
          </div>
        </div>
      )}
    </>
  );
};

export default DemoCard;
