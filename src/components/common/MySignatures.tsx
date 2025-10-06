"use client";

import { useEffect, useState } from "react";
import { FaTrash, FaComment } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
// import Image from 'next/image';
import { toast } from "react-toastify";

const signatures = [
  {
    id: 1,
    name: "GIF",
    page: 4,
    time: "15 minutes ago",
    img: "https://media.tenor.com/YKuWc8jPN0sAAAAC/tts1-smtts.gif",
  },
  {
    id: 2,
    name: "knkjkjkljljljjljlj",
    page: 5,
    time: "16 minutes ago",
    img: null,
  },
  {
    id: 3,
    name: "Image",
    page: 5,
    time: "16 minutes ago",
    img: "/avatar2.png",
  },
  { id: 4, name: "rdfgfgdfg", page: 5, time: "15 minutes ago", img: null },
];

export default function MySignatures() {
  const [elements, setElements] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    const storedElements = localStorage.getItem("slideElements");
    console.log(typeof storedElements, "asdfasdfasdf");

    if (storedElements) {
      setElements(JSON.parse(storedElements));
    }
  }, []);

  useEffect(() => {
    if (elements.length > 0) {
      localStorage.setItem("slideElements", JSON.stringify(elements));
    } else {
      localStorage.removeItem("slideElements");
    }
  }, [elements]);

  const handleDelete = (index: number) => {
    const updatedElements = elements.filter((_, i) => i !== index);
    setElements(updatedElements);
    toast.success("Delete Successfully");
  };

  return (
    <div className="w-full max-w-[500px] bg-white shadow-md  border-b border-[#ddd] mb-4">
      <div
        className="flex items-center justify-between py-4  cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center space-x-2">
          <div className="relative messgae-icon">
            <FaComment className="text-gray-600" />
            <span className="absolute -top-2 -left-2 bg-blue-600 text-white bg-[#061178] text-xs font-semibold px-1.5 py-0.5 rounded-full">
              {elements.length}
            </span>
          </div>
          <span className="font-semibold select-none">My Messages</span>
        </div>
        {open ? (
          <IoIosArrowDown className="text-gray-600" />
        ) : (
          <IoIosArrowForward className="text-gray-600" />
        )}
      </div>
      {open && elements.length > 0 && (
        <div className="mt-1 space-y-2 p-2 messagebox border border-gray-500 rounded mb-4">
          {elements.map((item, index) => (
            <div
              key={index}
              className={`flex items-center rounded-lg cursor-pointer hover:bg-gray-100 ${
                selected === index ? "bg-gray-200" : ""
              }`}
              onClick={() => setSelected(index)}
            >
              {item.type === "image" || item.type === "gif" ? (
                <img
                  src={item.content}
                  alt={item.type}
                  className="w-8 h-8 rounded border border-gray-500"
                />
              ) : (
                <FaComment className="text-gray-600" />
              )}
              <div className="ml-3 flex-1">
                {item.type === "text" ? (
                  <p
                    className="font-medium text-sm mb-0 pb-0"
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  ></p>
                ) : (
                  <p className="font-medium text-sm">
                    {item.type === "text"
                      ? item.content
                      : item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </p>
                )}
                <p className="text-xs text-gray-500">Page {item.slideIndex}</p>
              </div>
              <FaTrash
                className="text-red cursor-pointer"
                onClick={() => handleDelete(index)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
