"use client";
import { fetchFromServer } from "@/app/actions/fetchFromServer";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import Cookies from "js-cookie";
import Image from "next/image";

// PageCover Component
const PageCover = React.forwardRef((props: any, ref: any) => {
  return (
    <div className="cover" ref={ref} data-density="hard">
      {props.children}
    </div>
  );
});
PageCover.displayName = "PageCover";

// Page Component
const Page = React.forwardRef((props: any, ref: any) => {
  return (
    <div className="page" ref={ref}>
      <p>{props.children}</p>
    </div>
  );
});
Page.displayName = "Page";

const EnvelopCard = ({ getdata }: any) => {
  const { id } = useParams();
  const [responseData, setResponseData] = useState<any>(null);
  const [shareImageData, setShareImageData] = useState<any>(null);
  console.log(getdata, "getdata");
  console.log(responseData, "responseData");

  const gettoken = Cookies.get("auth_token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/card/users-cards`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${gettoken}`,
            },
          }
        );

        const data = await response.json();
        setShareImageData(data); // Store response data in state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(shareImageData, "shareImageData here");

  // Fetch data when id changes
  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/card/edit-messages-by-unique-id/${id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const data = await response.json();
          setResponseData(data); // Store response data in state
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [id]);

  console.log(responseData, "responseData here");

  // Handle the case when data is still being fetched
  if (
    !responseData ||
    !responseData?.data ||
    !Array.isArray(responseData?.data[0]?.editor_messages)
  ) {
    return <div>Loading...</div>; // Show loading while data is being fetched
  }

  console.log("shareImageData", shareImageData);
  console.log("shareImageData id", id);

  const cardShareData = shareImageData?.listing?.find(
    (item: any) => item?.message_unique_id === id
  );

  console.log("cardShareData", cardShareData);

  return (
    <>
      <style>
        {`
          .album-web {
            background: rgb(255, 251, 251);
            text-align: center;
          }

          .page {
            box-shadow: 0 1.5em 3em -1em rgb(70, 69, 69);
            position: relative;
          }

          .cover {
            background-color: rgb(251, 225, 139);
            box-shadow: 0 1.5em 3em -1em rgb(70, 69, 69);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100%;
            width: 100%;
            position: relative;
          }

          .btn,
          .form-control {
            padding: 0;
            border: 0;
            border-radius: 0;
            color: inherit;
            appearance: none;
            font-size: 1em;
            line-height: 1.2;
            padding: 0.5em var(--padding-x);
            border-width: 2px;
            border-style: solid;
          }

          .btn {
            background-color: aquamarine;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            --padding-x: 1.2em;
            border-color: transparent;
          }

          .form-control {
            --padding-x: 0.5em;
          }

          input {
            text-align: center;
          }

          .formContainer {
            align-items: center;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .bottom-text {
            position: absolute;
            bottom: 20px;
            font-size: 1em;
            color: #333;
            text-align: center;
            width: 100%;
          }
        `}
      </style>

      <div className="mt-5 mb-3">
        <HTMLFlipBook
          width={550}
          height={650}
          minWidth={315}
          maxWidth={1000}
          minHeight={420}
          maxHeight={1350}
          showCover={true}
          flippingTime={1000}
          style={{ margin: "0 auto" }}
          maxShadowOpacity={0.5}
          className="album-web"
          startPage={0}
          size="fixed"
          drawShadow={true}
          usePortrait={true}
          startZIndex={1000}
          autoSize={false}
          mobileScrollSupport={true}
          clickEventForward={false}
          useMouseEvents={true}
          swipeDistance={50}
          showPageCorners={false}
          disableFlipByClick={false}
        >
          <PageCover>
            <img
              style={{ height: "100%" }}
              src={`${process.env.NEXT_PUBLIC_API_URL}/${getdata?.data?.images?.[0]?.card_images?.[0]}`}
              alt="content"
            />
          </PageCover>

          {responseData?.data?.[0]?.editor_messages?.map(
            (item: any, index: any) => (
              <Page
                key={`${item.slideIndex}-${index}`}
                number={item.slideIndex}
              >
                {item && (
                  <div
                    style={{
                      position: "absolute",
                      left: item.x,
                      top: item.y,
                    }}
                  >
                    {item.type === "text" && (
                      <div dangerouslySetInnerHTML={{ __html: item.content }} />
                    )}
                    {item.type === "image" && (
                      <img src={item.content} alt="content" />
                    )}
                    {item.type === "gif" && (
                      <img
                        src={item.content}
                        alt="content"
                        style={{ maxWidth: "50%", maxHeight: "40%" }}
                      />
                    )}
                  </div>
                )}
              </Page>
            )
          )}

          <PageCover className="flex items-center justify-center w-full mx-auto">
            <Image
              src={"/newimage/logoGroup.png"}
              alt="logo"
              width={150}
              height={50}
              className="mx-auto flex items-center justify-center"
            />
            <p className="bottom-text">
              Create a card like this one. Go to Groupwish.com
            </p>
          </PageCover>
        </HTMLFlipBook>
      </div>
    </>
  );
};

export default EnvelopCard;
