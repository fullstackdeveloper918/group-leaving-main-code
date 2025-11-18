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

  // ❗ DO NOT RENDER HTMLFlipBook UNTIL DATA IS LOADED
  if (!responseData) {
    return <div>Loading...</div>;
  }

  const messages = responseData?.data?.[0]?.editor_messages || [];

  return (
    <>
      <style>{`
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
        .bottom-text {
          position: absolute;
          bottom: 20px;
          font-size: 1em;
          color: #333;
          text-align: center;
          width: 100%;
        }
      `}</style>

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
          {/* Cover page */}
          <PageCover>
            <img
              style={{ height: "100%", width: "100%", objectFit: "cover" }}
              src={`${process.env.NEXT_PUBLIC_API_URL}/${getdata?.data?.images?.[0]?.card_images?.[0]}`}
              alt="content"
            />
          </PageCover>

          {/* Editor message pages */}
          {messages.length > 0 ? (
            messages.map((item: any, index: number) => (
              <Page key={index} number={item?.slideIndex ?? index}>
                <div
                  style={{
                    position: "absolute",
                    left: item?.x ?? 0,
                    top: item?.y ?? 0,
                  }}
                >
                  {item?.type === "text" && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item?.content || "",
                      }}
                    />
                  )}

                  {item?.type === "image" && item?.content && (
                    <img src={item.content} alt="content" />
                  )}

                  {item?.type === "gif" && item?.content && (
                    <img
                      src={item.content}
                      alt="content"
                      style={{ maxWidth: "50%", maxHeight: "40%" }}
                    />
                  )}
                </div>
              </Page>
            ))
          ) : (
            <Page>
              <div style={{ padding: 30, textAlign: "center" }}>
                <h3>No content available</h3>
              </div>
            </Page>
          )}

          {/* Back cover */}
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
