"use client"
import CardEditor from '@/components/common/CardEditor'
import MySignatures from '@/components/common/MySignatures'
import React, { useEffect, useState } from 'react'
import Image from "next/image";
// import userIcon from "../../../../../assets/icons/abj.png";
import { toast, ToastContainer } from "react-toastify";
import Cookies from 'js-cookie';
import { Button, Input, Modal, QRCode, Space, Typography } from "antd";
const { Paragraph, Text } = Typography;
import { CopyOutlined } from "@ant-design/icons";

const Page = ({ params }: { params: { id: string } }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [cardData, setCardData] = useState<any>(null);


    const handleModalClose = () => {
      setIsModalVisible(false); // Close the modal
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

    const handleShare = () => {
      setIsModalVisible(true);
    };

    console.log(params,"params here")
    const shareableLink = `https://groupwish.in/share/editor/${params.id}`;
  
    const handleCopy = () => {
      navigator.clipboard.writeText(shareableLink);
      toast.success("Copied to clipboard", { autoClose: 2000 });
    };
    
  const gettoken = Cookies.get("auth_token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://dating.goaideme.com/card/users-cards",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${gettoken}`,
            },
          }
        );

        const data = await response.json();
        if (data && data.listing) {
          const card = data.listing.find(
            (item: any) => item.message_unique_id === params.id
          );
          setCardData(card);
        }
        console.log(data,"data is here")
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (params.id && gettoken) {
        fetchData();
    }
  }, [gettoken, params.id]);

  return (
    <div className='container'>
      <div className=' md:flex block'>
      <CardEditor/>
    
    <div className="md:w-1/2 w-full md:mt-0 mt-5  flex items-center justify-start flex-col">
                  <MySignatures />
                  <div className="bg-white shadow-lg rounded-lg p-10 w-full max-w-lg flex flex-col gap-2 items-center">
                    <h3 className="text-center text-md font-normal ">
                      Shared Gift Fund
                    </h3>
                    <button
                      className="text-center text-md font-normal relative"
                      onClick={() => setIsModalOpen(true)}
                    >
                      <span className="absolute bottom-3 bg-[#061178] text-white rounded-full px-2 text-center">
                        {contributors.length}
                      </span>
                      <span className="">
                        {/* <Image src={userIcon} alt="user" /> */}
                      </span>
                    </button>
                    <Image
                      src={cardData?.images?.[0]?.card_images?.[0] ? `https://dating.goaideme.com/${cardData.images[0].card_images[0]}` : "https://gift.wegift.io/static/product_assets/AMZ-GB/AMZ-GB-card.png"}
                      width={200}
                      height={200}
                      alt={cardData?.title || "Card Image"}
                      className="voucher_img mx-auto rounded"
                    />
                    <h4 className="font-bold text-center ">INR{cardData?.price || '...'}</h4>
                    <button className="bg-greyBorder text-blackText rounded-lg  w-100 text-sm p-2.5">
                      Chip in for {cardData?.title || "Hagrid"}&apos;s Gift
                    </button>
                  </div>
                  <div className="w-full" style={{ width: "73%" }}>
                    <button
                      className=" btnPrimary text-center w-100 mt-3 rounded-md"
                      onClick={handleShare}
                    >
                      Share Your Card
                    </button>
                  </div>
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
              <Typography.Title level={3}>Share Your Card</Typography.Title>

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
    </div>
  )
}

export default Page;