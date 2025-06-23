"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const DemoViewCard = ({ downloadBoard, excludeDiv }: any) => {
  const router = useRouter();
  const messages = [
    {
      imgSrc: "https://media1.giphy.com/media/L2qe789Bpy2IM/giphy.gif",
      text: "Happy Birthday Harry! Wishing you a magical birthday filled with enchanting moments and wizardly wonders! May your day be as extraordinary as a trip to Diagon Alley.",
      sender: "Ron",
    },
    {
      imgSrc: "https://media1.giphy.com/media/RgPoybdZLxxd9ZTFq3/giphy.gif",
      text: "Accio birthday celebration! May your special day be as brilliant as a Lumos charm and as joyful as a Weasley family reunion. Have a magical birthday, Harry!",
      sender: "Lupin",
    },
    {
      text: "Happiest of birthdays to the chosen one! May your year be filled with as much adventure and triumph as a year at Hogwarts. Cheers to another magical journey around the sun!",
      sender: "Fred",
    },
    {
      text: "Happy Birthday, fellow wizard! May your day be filled with laughter, joy, and a touch of magic. Remember, age is just a number, but spells are forever!",
      sender: "Hermione",
    },
    {
      text: "Wishing the Boy Who Lived a spectacular birthday! May your day be as golden as a Snitch and as heartwarming as the friendship in the Gryffindor common room.",
      sender: "Ginny",
    },
  ];
  const [boardData, setBoardData] = useState<any>([]);
  console.log(boardData, "boardData");
  let existingResponses = JSON.parse(
    sessionStorage.getItem("signboarddata") || "[]"
  );
  console.log(existingResponses, "existingResponses");

  const getBoard = async () => {
    try {
      let res = await fetch(
        "https://dating.goaideme.com/messages/demo-sign-board-list"
      );
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      setBoardData(data.data);
    } catch (error) {}
  };

  useEffect(() => {
    getBoard();
  }, []);
  const Addmsg = () => {
    try {
      router.replace(`/demo/board/sign_board/${1}`);
    } catch (error) {}
  };
  return (
    <div className="bg-blue-900 min-h-screen p-8">
      <div className="text-center bg-black text-white">
        <div className="gap-3">
          <button className=" " disabled>
            Add to gift card
          </button>
          <button className="btnPrimary" onClick={downloadBoard}>
            Download Board
          </button>
        </div>
        <div>
          <h1 className="text-4xl mt- font-bold mb-4">
            Happy Birthday Harry!{" "}
            <span role="img" aria-label="party">
              🥳
            </span>
          </h1>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
            onClick={Addmsg}
          >
            + Add Your Message
          </button>
        </div>
      </div>
      <div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  mt-6"
        style={{ height: "60%", width: "100%" }}
      >
        {/* {messages.map((msg, index) => ( */}
        {boardData?.map((msg: any, index: number) => {
          const matchingResponse = existingResponses.find(
            (response: any) => response.uuid === msg.uuid
          );
          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-4 text-gray-800"
              // style={{width:"60%"}}
            >
              {msg.image && (
                <img
                  // src={msg.image}
                  src={`https://dating.goaideme.com/${msg.image}`}
                  // alt="Birthday image"
                  className="w-full rounded-md mb-4"
                />
              )}
              {msg.gifUrl == null ? (
                ""
              ) : (
                <img
                  src={msg.gifUrl}
                  alt="Birthday image"
                  className="w-full rounded-md mb-4"
                />
              )}
              {matchingResponse && (
                <Link href={`/demo/board/sign_board/1?uuid=${msg.uuid}`}>
                  <button className="">Edit</button>
                </Link>
              )}
              <p className="text-lg mb-4 demo-board-msg">{msg.message}</p>
              <p className="text-right text-sm font-semibold">
                From {msg.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DemoViewCard;
