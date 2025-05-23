import React, { useState, useEffect, useRef } from "react";
import nookies from "nookies";


interface UserInfo {
  name: string;
  email: string;
  uuid?: string;
}

interface Element {
  type: string;
  content: string;
  slideIndex: number;
  x: number;
  y: number;
  width?: number;
  height?: number;
  fontSize?: string;
  fontFamily?: string;
  fontWeight?: string;
  color?: string;
  user_uuid?: string;
}

interface DraggableElementProps {
  content: string;
  type: string;
  index: {
    original: number;
    activeSlide: number;
  };
  setElements: React.Dispatch<React.SetStateAction<Element[]>>;
  elements: Element[];
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
  setCurrentSlide?: (index: number) => void;
  showImageModal: boolean;
  setShowImageModal: (value: boolean) => void;
  selectedElement: any;
  setSelectedElement: (element: any) => void;
  onImageClick: (element: Element, index: number) => void;
  onDelete: (index: number) => void;
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
  setCurrentSlide,
  showImageModal,
  setShowImageModal,
  selectedElement,
  setSelectedElement,
  onImageClick,
  onDelete,
}) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [size, setSize] = useState({ width, height });
  const [showTextModal, setShowTextModal] = useState(false);
  const isEditing = activeSlide === index.activeSlide;
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cookies = nookies.get();
    const userInfoFromCookie: UserInfo | null = cookies.userInfo
      ? JSON.parse(cookies.userInfo)
      : null;
    setUserInfo(userInfoFromCookie);
  }, []);

  useEffect(() => {
    const element = elements[index.original];
    if (element) {
      setPosition({ x: element.x || 0, y: element.y || 0 });
      if (type === "image" || type === "gif") {
        setSize({
          width: element.width || width,
          height: element.height || height,
        });
      }
    }
  }, [elements, index.original, type, width, height]);

  const updateElement = (
    newX: number,
    newY: number,
    newWidth?: number,
    newHeight?: number
  ) => {
    setElements((prev) => {
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

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isDraggable || !isEditing) return;
    const startX = e.clientX;
    const startY = e.clientY;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      setPosition((prev) => {
        const newX = prev.x + deltaX;
        const newY = prev.y + deltaY;
        updateElement(newX, newY);
        return { x: newX, y: newY };
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleClick = () => {
    if (type === "text" && !showTextModal && !showImageModal && isEditing) {
      setSelectedElement({
        ...elements[index.original],
        originalIndex: index.original,
      });
      setShowTextModal(true);
      setShowImageModal(false);
      setCurrentSlide?.(activeSlide);
    }
  };

  const handleImageClick = () => {
    if (
      (type === "image" || type === "gif") &&
      !showImageModal &&
      !showTextModal &&
      isEditing
    ) {
      onImageClick(elements[index.original], index.original);
      setShowTextModal(false);
      setCurrentSlide?.(activeSlide);
    }
  };

  const isImageModalOpenForThisElement =
    showImageModal && selectedElement?.originalIndex === index.original;

  return (
    <div
      ref={elementRef}
      onMouseDown={handleMouseDown}
      onClick={type === "text" ? handleClick : handleImageClick}
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        width: type === "text" ? "auto" : size.width,
        height: type === "text" ? "auto" : size.height,
        cursor: isDraggable ? "move" : "default",
        opacity: isEditing ? 1 : 0.5,
        color,
        fontFamily,
        fontSize,
        fontWeight,
        userSelect: "none",
        zIndex: selectedElement?.originalIndex === index.original ? 1000 : 1,
      }}
      className={type === "text" ? "editor-react-drag" : ""}
    >
      {type === "text" ? (
        <div>{content}</div>
      ) : (
        <img
          src={content || "/placeholder.svg"}
          alt={content ? "User uploaded" : "Placeholder"}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            borderRadius: "6px",
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
};
