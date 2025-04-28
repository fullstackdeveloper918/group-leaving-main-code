import type React from "react";
import { useState, useEffect } from "react";
import { Rnd } from "react-rnd";
import nookies from "nookies";
import TextEditor from "../editor/components/TextEditor";
import ImageEditor from "../editor/components/ImageEditor";

interface DraggableElementProps {
  content: string;
  type: string;
  index: {
    original: number;
    activeSlide: number;
  };
  setElements: React.Dispatch<React.SetStateAction<any[]>>;
  elements: any[];
  initialX: number;
  initialY: number;
  width?: number;
  height?: number;
  isDraggable?: boolean;
  color?: string;
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  activeSlide: number;
}

interface UserInfo {
  name: string;
  email: string;
  uuid?: string;
}

export const DraggableElement: React.FC<DraggableElementProps> = ({
  content,
  type,
  index,
  setElements,
  elements,
  initialX,
  initialY,
  width = 220,
  height = 200,
  isDraggable = true,
  color = "#000",
  fontFamily = "Arial",
  fontSize = "16px",
  fontWeight = "normal",
  activeSlide,
}) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [size, setSize] = useState({ width, height });
  const [showModal, setShowModal] = useState(false);
  const [selectedElement, setSelectedElement] = useState<any>(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (activeSlide !== index.activeSlide) {
      setIsEditing(false);
    }
  }, [activeSlide, index.activeSlide]);

  useEffect(() => {
    const cookies = nookies.get();
    const userInfoFromCookie = cookies.userInfo
      ? JSON.parse(cookies.userInfo)
      : null;
    setUserInfo(userInfoFromCookie);
  }, []);

  const updateElement = (
    newX: number,
    newY: number,
    newWidth?: number,
    newHeight?: number
  ) => {
    setElements((prev: any) => {
      const updated = [...prev];
      updated[index.original] = {
        ...updated[index.original],
        x: newX,
        y: newY,
        width: newWidth ?? updated[index.original].width,
        height: newHeight ?? updated[index.original].height,
        user_uuid: userInfo?.uuid,
        color,
        fontFamily,
        fontSize,
        fontWeight,
      };
      localStorage.setItem("slideElements", JSON.stringify(updated));
      return updated;
    });
  };

  const handleClick = () => {
    if (type === "text" && !showModal) {
      setSelectedElement(elements[index.original]);
      setShowModal(true);
    }
  };

  const handleImageClick = () => {
    console.log(elements[index.original], "check eelemt");
    if ((type === "image" || type === "gif") && !showImageModal) {
      setSelectedElement(elements[index.original]);
      setShowImageModal(true);
    }
  };

  const closeModals = () => {
    setShowModal(false);
    setShowImageModal(false);
    setSelectedElement(null);
    setIsEditing(false);
  };

  const handleDelete = () => {
    setElements((prev) => prev.filter((_, i) => i !== index.original));
  };

  return (
    <>
      <Rnd
        bounds="parent"
        position={position}
        size={type === "text" ? undefined : size}
        onDragStop={(_, d) => {
          setPosition({ x: d.x, y: d.y });
          updateElement(d.x, d.y);
        }}
        onResizeStop={(_, __, ref, ___, pos) => {
          if (type !== "text") {
            const newWidth = parseInt(ref.style.width);
            const newHeight = parseInt(ref.style.height);
            setSize({ width: newWidth, height: newHeight });
            setPosition(pos);
            updateElement(pos.x, pos.y, newWidth, newHeight);
          }
        }}
        disableDragging={!isDraggable}
        // enableResizing={isEditing || type === "image" || type === "gif"}
        // className={`relative flex flex-col items-center ${
        //   type === "text" ? "" : "border-blue-800 border-2"
        // } justify-center bg-gray-50 rounded-md shadow-sm`}
      >
        {/* IMAGE BLOCK */}
        {(type === "image" || type === "gif") && !showImageModal && (
          <div onClick={handleImageClick}>
            <img
              src={content || "/placeholder.svg"}
              alt="uploaded"
              className="w-full h-full object-cover rounded-md pointer-events-none"
            />
          </div>
        )}

        {/* TEXT BLOCK */}
        {type === "text" && !showModal && (
          <div
            className="text-sm"
            style={{
              pointerEvents: "auto",
              userSelect: "none",
              cursor: "pointer",
              width: "100%",
              height: "100%",
              padding: "8px",
              color,
              fontFamily,
              fontSize,
              fontWeight,
            }}
            onClick={handleClick}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}

        {/* IMAGE EDITOR MODAL */}
        {showImageModal && selectedElement && (
          <ImageEditor
            onHide={closeModals}
            setElements={setElements}
            content={content}
            elements={elements}
            selectedElement={selectedElement}
            cardIndex={index}
          />
        )}

        {/* TEXT EDITOR MODAL */}
        {showModal && selectedElement && (
          <TextEditor
            onHide={closeModals}
            setElements={setElements}
            content={content}
            elements={elements}
            selectedElement={selectedElement}
            cardIndex={index}
          />
        )}
      </Rnd>
    </>
  );
};
