import React, { useState, useEffect } from "react";
import { Rnd } from "react-rnd";
import nookies from "nookies";
import TextEditor from "../editor/components/TextEditor";
import ImageEditor from "../editor/components/ImageEditor";

// Interfaces
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

// DraggableElement Component
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

  // Initialize userInfo from cookies
  useEffect(() => {
    const cookies = nookies.get();
    const userInfoFromCookie: UserInfo | null = cookies.userInfo
      ? JSON.parse(cookies.userInfo)
      : null;
    setUserInfo(userInfoFromCookie);
  }, []);

  // Sync position and size with elements array
  useEffect(() => {
    const element = elements[index.original];
    if (element) {
      setPosition({
        x: element.x || 0,
        y: element.y || 0,
      });
      if (type === "image" || type === "gif") {
        setSize({
          width: element.width || width,
          height: element.height || height,
        });
      }
    }
  }, [elements, index.original, type, width, height]);

  // Update position and size when selectedElement changes
  useEffect(() => {
    if (selectedElement && selectedElement.originalIndex === index.original) {
      setSize({
        width: selectedElement.width || width,
        height: selectedElement.height || height,
      });
      setPosition({ x: selectedElement.x, y: selectedElement.y });
    }
  }, [selectedElement, index.original, width, height]);

  // Update element in elements array and localStorage
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

  // Handle text element click
  const handleClick = () => {
    // Only open text modal if no modal is open and editing is allowed
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

  // Handle image/GIF element click
  const handleImageClick = () => {
    // Only open image modal if no modal is open and editing is allowed
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

  // Close all modals
  const closeModals = () => {
    setShowTextModal(false);
    setShowImageModal(false);
    setSelectedElement(null);
  };
  console.log(selectedElement, "selectedElement");

  const isImageModalOpenForThisElement =
    showImageModal && selectedElement?.originalIndex === index.original;
  console.log(content, selectedElement, "size here to set");
  return (
    <Rnd
    className={type === "text" ? "editor-react-drag" :""}
      bounds="parent"
      position={position}
      size={type === "text" ? undefined : size}
      onDragStop={(_, d) => {
        setPosition({ x: d.x, y: d.y });
        updateElement(d.x, d.y);
      }}
      onResizeStop={(_, __, ref, ___, pos) => {
        if (type !== "text" && isImageModalOpenForThisElement) {
          const newWidth = parseInt(ref.style.width);
          const newHeight = parseInt(ref.style.height);
          setSize({ width: newWidth, height: newHeight });
          setPosition(pos);
          updateElement(pos.x, pos.y, newWidth, newHeight);
        }
      }}
      disableDragging={!isDraggable}
      enableResizing={
        isDraggable &&
        (type === "image" || type === "gif") &&
        isImageModalOpenForThisElement
      }
      style={{
        width: "100%",
        height: "100%",
        opacity: isEditing ? 1 : 0.5,
        pointerEvents: "auto",
        cursor: isDraggable ? "move" : "default",
        transform: "none", // Explicitly remove transform
      }}
    >
      {(type === "image" || type === "gif") &&
        !isImageModalOpenForThisElement && (
          <div onClick={handleImageClick}>
            <img
              src={content || "/placeholder.svg"}
              alt="uploaded"
              className="rounded-md pointer-events-none"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                width: "100%",
                height: "100%",
                objectFit: "contain", // Or "cover" depending on your need
                display: "block",
                overflow: "hidden",
              }}
            />

            {/* <img
            src={content || "/placeholder.svg"}
            alt="uploaded"
            className="object-cover rounded-md pointer-events-none"
            style={{
              width: size.width,
              height: size.height,
            }}
          /> */}
          </div>
        )}

      {type === "text" && !showTextModal && (
        <div
          className="text-sm"
          style={{
            pointerEvents: isEditing ? "auto" : "none",
            opacity: isEditing ? 1 : 0.5,
            cursor: isEditing ? "pointer" : "not-allowed",
            userSelect: "none",
            width: "100%",
            height: "100%",
            padding: "8px",
            color,
            fontFamily,
            fontSize,
            fontWeight,
            transform: "none",
          }}
          onClick={handleClick}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}

      {showImageModal &&
        selectedElement?.originalIndex === index.original &&
        isEditing && (
          <ImageEditor
            onHide={closeModals}
            setElements={setElements}
            content={content}
            elements={elements}
            selectedElement={selectedElement}
            cardIndex={index}
            onDelete={() => onDelete(index.original)}
          />
        )}

      {showTextModal &&
        selectedElement?.originalIndex === index.original &&
        isEditing && (
          <TextEditor
            onHide={closeModals}
            setElements={setElements}
            content={content}
            elements={elements}
            selectedElement={selectedElement}
            cardIndex={index}
            Xposition={selectedElement?.x || 0}
            Yposition={selectedElement?.y || 0}
          />
        )}
    </Rnd>
  );
};
