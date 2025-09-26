import React, { useState, useEffect, useRef } from "react";
import { Rnd } from "react-rnd";
import nookies from "nookies";
import TextEditor from "./SingleTextEditor";
import ImageEditor from "./NewImageEditor";
import { FaLock } from "react-icons/fa";

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
  toast: (element: any) => void;
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
  // width = 220,
  // height = 200,
  width,
  height,
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
  toast,
}) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [showTextModal, setShowTextModal] = useState(false);
  const [zIndex, setZIndex] = useState(1); // Default z-index
  const isEditing = activeSlide === index.activeSlide;
  // const sizeRef = useRef({ width, height });
  const sizeRef = useRef<{ width: any; height: any }>({ width: 0, height: 0 });

  // Lock logic for first slide only
  const isFirstSlide = activeSlide === 0;

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
        sizeRef.current = {
          width: element.width || width,
          height: element.height || height,
        };
      }
    }
  }, [elements, index.original, type, width, height]);

  // Update position and size when selectedElement changes
  useEffect(() => {
    if (selectedElement && selectedElement.originalIndex === index.original) {
      setPosition({ x: selectedElement.x, y: selectedElement.y });
      if (type === "image" || type === "gif") {
        sizeRef.current = {
          width: selectedElement.width || width,
          height: selectedElement.height || height,
        };
      }
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

  // Handle image/gif click
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

  // Modal Management for TextEditor
  const closeModals = (fromEditor = false) => {
    if (fromEditor) {
      setShowTextModal(false);
    }
    setShowImageModal(false);
    setSelectedElement(null);
  };

  const isImageModalOpenForThisElement =
    showImageModal && selectedElement?.originalIndex === index.original;

  return (
    <>
      {/* Lock icon for first slide only */}
      {isFirstSlide && (
        <div style={{ position: "absolute", top: 8, left: 8, zIndex: 10000 }}>
          <FaLock size={24} color="#888" title="Front cover is locked" />
        </div>
      )}
      <Rnd
        className={`${type === "text" ? "editor-react-drag" : ""} ${
          showTextModal && "editor-transform"
        }`.trim()}
        bounds="parent"
        position={showTextModal ? { x: 0, y: 0 } : position}
        size={type === "text" ? undefined : sizeRef.current}
        onDragStart={() => {
          if (!isFirstSlide) {
            setZIndex(100); // Set high z-index when dragging starts
          }
        }}
        onDrag={
          showTextModal
            ? (_, d) => {
                if (d.x < 200) return false;
              }
            : undefined
        }
        onDragStop={(_, d) => {
          if (!isFirstSlide) {
            setPosition({ x: d.x, y: d.y });
            updateElement(d.x, d.y);
            setZIndex(1); // Reset z-index after dragging
          }
        }}
        onResize={(_, __, ref, ___, pos) => {
          if (type === "image" || type === "gif") {
            const newWidth = parseInt(ref.style.width);
            const newHeight = parseInt(ref.style.height);
            sizeRef.current = { width: newWidth, height: newHeight };
            if (!isFirstSlide) setPosition({ x: pos.x, y: pos.y });
            updateElement(pos.x, pos.y, newWidth, newHeight);
          }
        }}
        onResizeStop={(_, __, ref, ___, pos) => {
          if (
            (type === "image" || type === "gif") &&
            isImageModalOpenForThisElement
          ) {
            const newWidth = parseInt(ref.style.width);
            const newHeight = parseInt(ref.style.height);
            if (!isFirstSlide) {
              setPosition(pos);
              sizeRef.current = { width: newWidth, height: newHeight };
              updateElement(pos.x, pos.y, newWidth, newHeight);
              setZIndex(1); // Reset z-index after resizing
            }
          }
        }}
        disableDragging={!isDraggable || isFirstSlide}
        enableResizing={
          isDraggable &&
          (type === "image" || type === "gif") &&
          isImageModalOpenForThisElement &&
          !isFirstSlide
        }
        style={{
          width: "100%",
          height: "100%",
          opacity: isEditing ? 1 : 0.5,
          pointerEvents: "auto",
          cursor: "default",
          transform: "none",
          zIndex: zIndex, // Apply dynamic z-index
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
                  width: "100%",
                  height: "100%",
                  objectFit: "fill",
                  display: "block",
                }}
              />
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
              width: width,
              height: height,
              padding: "8px",
              color,
              fontFamily,
              fontSize,
              fontWeight,
              transform: "none",
            }}
            onClick={handleClick}
          >
            <div
              className={`p-2`}
              style={{
                wordBreak: "break-word",
                whiteSpace: "pre-wrap",
                // letterSpacing: "1px",
                // minHeight: "20px",
                // maxHeight: "400px",
                // overflowY: "auto",
              }}
              dangerouslySetInnerHTML={{
                __html: content?.split("\n")[0] || "",
              }}
            />
            <div className="p-2 text-base font-normal">
              {content?.split("\n")[1] || ""}
            </div>
          </div>
        )}
        {showImageModal &&
          selectedElement?.originalIndex === index.original &&
          isEditing && (
            <ImageEditor
              onHide={closeModals}
              setElements={setElements}
              elements={elements}
              selectedElement={selectedElement}
              content={content}
              cardIndex={{ original: index.original, activeSlide }}
              onDelete={() => onDelete(index.original)}
              slides={elements.map((e) => e)}
              activeSlideIndex={activeSlide}
              isFirstSlide={isFirstSlide}
              toast={toast}
            />
          )}
        {showTextModal && (
          <TextEditor
            onHide={() => closeModals(true)}
            setElements={setElements}
            elements={elements}
            selectedElement={selectedElement}
            content={content}
            cardIndex={{ original: index.original, activeSlide }}
            Xposition={position.x}
            Yposition={position.y}
            slides={elements.map((e) => e)}
            activeSlideIndex={activeSlide}
            toast={toast}
            isFirstSlide={isFirstSlide}
          />
        )}
      </Rnd>
    </>
  );
};
