import React, { useState, useEffect, useRef } from "react";
import { Rnd } from "react-rnd";
import nookies from "nookies";
import TextEditor from "../editor/components/TextEditor";
import ImageEditor from "../editor/components/ImageEditor";
import ReactDOM from "react-dom";
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
  toast,
}) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [showTextModal, setShowTextModal] = useState(false);
  const isEditing = activeSlide === index.activeSlide;
  const [showOverlapPopup, setShowOverlapPopup] = useState(false);
  const [pendingElement, setPendingElement] = useState<any>(null);
  const [forceSave, setForceSave] = useState(false);
  const sizeRef = useRef({ width, height });

  // Lock logic for first slide only
  const isFirstSlide = activeSlide === 0;

  // Helper: Check overlap between two elements
  function isOverlapping(a: any, b: any) {
    if (a.slideIndex !== b.slideIndex) return false;
    return !(
      a.x + (a.width || 220) <= b.x ||
      a.x >= b.x + (b.width || 220) ||
      a.y + (a.height || 200) <= b.y ||
      a.y >= b.y + (b.height || 200)
    );
  }

  // Check for overlap before saving/moving
  function checkAndHandleOverlap(newElement: any) {
    const overlap = elements.some(
      (el, i) =>
        i !== index.original &&
        el.slideIndex === newElement.slideIndex &&
        isOverlapping(el, newElement)
    );
    if (overlap && !forceSave) {
      setPendingElement(newElement);
      setShowOverlapPopup(true);
      return true; // Block action
    }
    return false; // No overlap, proceed
  }

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
    if (isFirstSlide) {
      toast("You do not have permission to add to the front cover");
      return;
    }
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
    if (isFirstSlide) {
      toast("You do not have permission to add to the front cover");
      return;
    }
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

  // Overlap popup
  const overlapPopup = showOverlapPopup
    ? ReactDOM.createPortal(
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-[9999]">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h2 className="text-lg font-bold mb-2">
              Overlapping {type === "text" ? "Signature" : "Element"}
            </h2>
            <p className="mb-2">
              Whoa this card is popular, it looks like your{" "}
              {type === "text" ? "signature" : "element"} is overlapping.
              <br />
              Someone may have signed or added content while you were writing
              your message.
            </p>
            <h3 className="font-semibold mt-4 mb-2">
              How to move your {type === "text" ? "signature" : "element"}
            </h3>
            <ul className="list-disc pl-5 mb-4 text-sm text-gray-700">
              <li>
                Drag and drop your {type === "text" ? "signature" : "element"}{" "}
                to a free spot
              </li>
              <li>Change pages by using the arrows below the card</li>
              <li>Once done click the save button</li>
            </ul>
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="text-red-500 hover:underline mr-2"
                onClick={() => {
                  setShowOverlapPopup(false);
                  setForceSave(true);
                  if (pendingElement) {
                    updateElement(
                      pendingElement.x,
                      pendingElement.y,
                      pendingElement.width,
                      pendingElement.height
                    );
                    setPendingElement(null);
                    setForceSave(false);
                    setShowTextModal(false);
                    setShowImageModal(false);
                  }
                }}
              >
                Save anyway
              </button>
              <button
                className="bg-blue-600 text-black px-4 py-2 rounded"
                onClick={() => {
                  setShowOverlapPopup(false);
                  setPendingElement(null);
                  setForceSave(false);
                }}
              >
                Move {type === "text" ? "Signature" : "Element"}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )
    : null;

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
        onDrag={
          showTextModal
            ? (_, d) => {
                if (d.x < 200) return false;
              }
            : undefined
        }
        onDragStop={(_, d) => {
          const newElement = { ...elements[index.original], x: d.x, y: d.y };
          if (!checkAndHandleOverlap(newElement)) {
            if (!isFirstSlide) setPosition({ x: d.x, y: d.y });
            updateElement(d.x, d.y);
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
            const newElement = {
              ...elements[index.original],
              x: pos.x,
              y: pos.y,
              width: newWidth,
              height: newHeight,
            };
            if (!checkAndHandleOverlap(newElement)) {
              if (!isFirstSlide) setPosition(pos);
              sizeRef.current = { width: newWidth, height: newHeight };
              updateElement(pos.x, pos.y, newWidth, newHeight);
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
          >
            <div
              className="p-2"
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
        {/* If you have a gifEditor, add similar logic here: */}
        {/* {showGifModal && (
          <GifEditor
            ...
            isFirstSlide={isFirstSlide}
            toast={toast}
          />
        )} */}
      </Rnd>
      {/* {overlapPopup} */}
    </>
  );
};
