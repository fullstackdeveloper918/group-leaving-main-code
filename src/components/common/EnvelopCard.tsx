"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import Image from "next/image";

const PageCover = React.forwardRef((props: any, ref: any) => (
  <div
    ref={ref}
    data-density="hard"
    className={`cover ${props.className || ""}`}
    {...props}
  >
    {props.children}
  </div>
));
PageCover.displayName = "PageCover";

const Page = React.forwardRef((props: any, ref: any) => (
  <div className="page" ref={ref}>
    {props.children}
  </div>
));
Page.displayName = "Page";

const EnvelopCard = ({ getdata }: any) => {
  const { id } = useParams();
  const [responseData, setResponseData] = useState<any>(null);

  // Responsive width/height for flipbook
  const getBookSize = () => {
    if (typeof window === "undefined") return { width: 550, height: 650 };

    const w = window.innerWidth;
    if (w < 420) return { width: w - 20, height: (w - 20) * 1.35 };
    if (w < 768) return { width: w - 40, height: (w - 40) * 1.35 };
    return { width: 550, height: 650 };
  };

  const [size, setSize] = useState(getBookSize());

  useEffect(() => {
    const handleResize = () => setSize(getBookSize());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/card/edit-messages-by-unique-id/${id}`
        );
        const data = await res.json();
        setResponseData(data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [id]);

  if (!responseData) return <div>Loading...</div>;

  const messages = responseData?.data?.[0]?.editor_messages || [];

  return (
    <>
      {/* Responsive Styles */}
      <style>{`
        .album-web {
          background: rgb(255, 251, 251);
          text-align: center;
        }

        .page {
          box-shadow: 0 1.5em 3em -1em rgb(70, 69, 69);
          position: relative;
          overflow: hidden;
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
          overflow: hidden;
        }

        .bottom-text {
          position: absolute;
          bottom: 15px;
          font-size: 0.85em;
          color: #333;
          width: 90%;
          left: 50%;
          transform: translateX(-50%);
        }

        /* Mobile Responsive Fixes */
        @media (max-width: 480px) {
          .page, .cover {
            box-shadow: none;
            border-radius: 6px;
          }
          .bottom-text {
            font-size: 0.75em;
          }
        }
      `}</style>

      <div className="mt-5 mb-3" style={{ width: "100%" }}>
        <HTMLFlipBook
          width={size.width}
          height={size.height}
          minWidth={300}
          maxWidth={1000}
          minHeight={400}
          maxHeight={1500}
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
          {/* Front Cover */}
          <PageCover>
            <img
              style={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
              }}
              src={`${process.env.NEXT_PUBLIC_API_URL}/${getdata?.data?.images?.[0]?.card_images?.[0]}`}
              alt="content"
            />
          </PageCover>

          {/* Pages */}
          {messages.length > 0 ? (
            messages.map((item: any, index: number) => (
              <Page key={index}>
                <div
                  style={{
                    position: "absolute",
                    left: item?.x ?? 0,
                    top: item?.y ?? 0,
                    maxWidth: "90%",
                    wordBreak: "break-word",
                  }}
                >
                  {item?.type === "text" && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item?.content || "",
                      }}
                      style={{ fontSize: "1rem" }}
                    />
                  )}

                  {item?.type === "image" && (
                    <img
                      src={item.content}
                      alt="content"
                      style={{ maxWidth: "80%", objectFit: "contain" }}
                    />
                  )}

                  {item?.type === "gif" && (
                    <img
                      src={item.content}
                      alt="gif"
                      style={{ maxWidth: "70%", maxHeight: "50%" }}
                    />
                  )}
                </div>
              </Page>
            ))
          ) : (
            <Page>
              <div style={{ padding: 20, textAlign: "center" }}>
                <h3>No content available</h3>
              </div>
            </Page>
          )}

          {/* Back Cover */}
          <PageCover>
            <Image
              src={"/newimage/logoGroup.png"}
              alt="logo"
              width={150}
              height={50}
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
