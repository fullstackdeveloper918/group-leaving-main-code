import type React from "react";
import { useState, useEffect } from "react";
import { Rnd } from "react-rnd";
import nookies from "nookies";
import TextEditor from "../editor/components/TextEditor";

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
  color?: string; // Added color prop
  fontFamily?: string; // Added fontFamily prop
  fontSize?: string; // Added fontSize prop
  fontWeight?: string; // Added fontWeight prop
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
  color = "#000", // Default color
  fontFamily = "Arial", // Default fontFamily
  fontSize = "16px", // Default fontSize
  fontWeight = "normal" // Default fontWeight
}) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [size, setSize] = useState({ width, height });
  const [showModal, setShowModal] = useState(false);
  const [selectedElement, setSelectedElement] = useState<any>(null);

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
      updated[index?.original] = {
        ...updated[index?.original],
        x: newX,
        y: newY,
        width: newWidth ?? updated[index?.original].width,
        height: newHeight ?? updated[index?.original].height,
        user_uuid: userInfo?.uuid,
        color,
        fontFamily,
        fontSize,
        fontWeight
      };
      localStorage.setItem("slideElements", JSON.stringify(updated));
      return updated;
    });
  };

  const handleClick = () => {
    if (showModal) return;
    setSelectedElement(elements[index?.original]);
    setShowModal(true);
  };

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.target as HTMLImageElement;
    const aspectRatio = img.naturalWidth / img.naturalHeight;
  };

  const modalFn = () => {
    setShowModal(false);
    setSelectedElement(null);
  };

  return (
    <>
      <Rnd
        bounds="parent"
        position={position}
        size={size}
        onDragStop={(_, d) => {
          setPosition({ x: d.x, y: d.y });
          updateElement(d.x, d.y);
        }}
        onResizeStop={(_, __, ref, ___, pos) => {
          const newWidth = parseInt(ref.style.width);
          const newHeight = parseInt(ref.style.height);
          setSize({ width: newWidth, height: newHeight });
          setPosition(pos);
          updateElement(pos.x, pos.y, newWidth, newHeight);
        }}
        disableDragging={!isDraggable}
        enableResizing={type === "image" || type === "gif"}
        className={`${
          type === "image" || type === "gif"
            ? "flex items-center justify-center border border-gray-300 bg-gray-100"
            : ""
        }`}
   
      >
        {type === "image" || type === "gif" ? (
          <img
            src={content || "/placeholder.svg"}
            alt="uploaded"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              pointerEvents: "none",
            }}
            onLoad={handleImageLoad}
          />
        ) : (
          !showModal &&
          !selectedElement && (
            <div
              className="text-sm"
              style={{
                position: "absolute",
                left: position.x,
                top: position.y,
                pointerEvents: "auto",
                userSelect: "none",
                cursor: "pointer",
                color: color, // Apply text color
                fontFamily: fontFamily, // Apply fontFamily
                fontSize: fontSize, // Apply fontSize
                fontWeight: fontWeight, // Apply fontWeight
              }}
              onClick={handleClick}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )
        )}

        {showModal && selectedElement && (
          <TextEditor
            setShowModal={modalFn}
            setElements={setElements}
            elements={elements}
            selectedElement={selectedElement}
            cardIndex={index}
   
          />
        )}
      </Rnd>
    </>
  );
};

