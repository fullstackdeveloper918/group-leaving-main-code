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
  setCurrentSlide?: (index: number) => void;
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
  setCurrentSlide,
}) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [size, setSize] = useState({ width, height });
  const [showModal, setShowModal] = useState(false);
  const [selectedElement, setSelectedElement] = useState<any>(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const isEditing = activeSlide === index.activeSlide;
  console.log(showImageModal, "wojo354234");
  console.log(showModal, "0988777");
  console.log(elements, "content");

  useEffect(() => {
    const cookies = nookies.get();
    const userInfoFromCookie = cookies.userInfo
      ? JSON.parse(cookies.userInfo)
      : null;
    setUserInfo(userInfoFromCookie);
  }, []);

  // 🔄 Sync size and position when modal closes and element is updated
  useEffect(() => {
    if (selectedElement) {
      const updatedElement = elements[index.original];
      if (updatedElement) {
        setSize({
          width: updatedElement.width,
          height: updatedElement.height,
        });
        setPosition({
          x: updatedElement.x,
          y: updatedElement.y,
        });
      }
    }
  }, [showImageModal, showModal, elements, selectedElement, index.original]);

  const updateElement = (
    newX: number,
    newY: number,
    newWidth?: number,
    newHeight?: number
  ) => {
    if (typeof index.original === "number") {
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
        console.log(updated,"updated");
        
        return updated;
      });
    }
    
  };

  const handleClick = () => {
    if (type === "text" && !showModal && isEditing) {
      setSelectedElement(elements[index.original]);
      setShowModal(true);
      setCurrentSlide?.(activeSlide);
    }
  };

  const [modal, setModal] = useState<any>(false);
  console.log(modal, "112221");
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  // const handleImageClick = (index: number) => {
  //   if ((type === "image" || type === "gif") && !showImageModal && isEditing) {
  //     setModalIndex(index);
  //     setSelectedElement(elements[index]);
  //     setShowImageModal(true);
  //     setCurrentSlide?.(activeSlide);
  //   }
  // };
  console.log(elements[index.original],"456789o");
  
  const handleImageClick = () => {
    if ((type === "image" || type === "gif") && !showImageModal && isEditing) {
      setSelectedElement(elements[index.original]);
      setShowImageModal(true);
      setCurrentSlide?.(activeSlide);
    }
  };
  const closeModals = () => {
    setShowModal(false);
    setModalIndex(null);
    setShowImageModal(false);
    setSelectedElement(null);
  };

  const handleDelete = () => {
    setElements((prev) => prev.filter((_, i) => i !== index.original));
  };

  console.log(
    activeSlide,
    showModal,
    selectedElement,
    isEditing,
    "Here to fix ossies"
  );

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
        enableResizing={isDraggable && (type === "image" || type === "gif")}
        style={{
          opacity: isEditing ? 1 : 0.5,
          pointerEvents: "auto",
          cursor: isDraggable ? "move" : "default",
        }}
      >
        {/* IMAGE BLOCK */}
        {/* {(type === "image" || type === "gif") && (
          <>
            {modalIndex === index.original ? (
              <img
                src={content || "/placeholder.svg"}
                alt="uploaded"
                className="object-cover rounded-md pointer-events-none"
              />
            ) : (
              <div
                onClick={() => {
                  if (modalIndex === null) handleImageClick(index.original);
                }}
                className={
                  modalIndex !== null ? "pointer-events-none opacity-50" : ""
                }
              >
                <img
                  src={content || "/placeholder.svg"}
                  alt="uploaded"
                  className="object-cover rounded-md pointer-events-none"
                />
              </div>
            )}
          </>
        )} */}
 {(type === "image" || type === "gif") && !showImageModal && (
          <div onClick={handleImageClick}>
            <img
              src={content || "/placeholder.svg"}
              alt="uploaded"
              className="object-cover rounded-md pointer-events-none"
            />
          </div>
        )}

        {/* TEXT BLOCK */}
        {type === "text" && !showModal && (
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
            }}
            onClick={handleClick}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}

        {/* IMAGE EDITOR MODAL */}
        {showImageModal && selectedElement && isEditing && (
          <ImageEditor
            onHide={closeModals}
            setElements={setElements}
            content={content}
            elements={elements}
            selectedElement={selectedElement}
            cardIndex={index}
            onDelete={handleDelete}
          />
        )}

        {/* TEXT EDITOR MODAL */}
        {showModal && selectedElement && isEditing && (
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
