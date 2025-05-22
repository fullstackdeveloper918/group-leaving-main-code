import React, { useState, useEffect } from "react";
import { useEditorPosition } from "../hooks/useEditorPosition";
import { FaTrash } from "react-icons/fa";
import ImageResizableContainer from "./ImageResizableContainer";

interface ImageEditorProps {
  onHide: () => void;
  setElements: React.Dispatch<React.SetStateAction<any[]>>;
  elements: any[];
  selectedElement: any;
  content?: string;
  cardIndex: {
    original?: number;
    activeSlide: number;
  };
  onDelete: () => void;
}

const ImageEditor: React.FC<ImageEditorProps> = ({
  onHide,
  setElements,
  elements,
  selectedElement,
  content,
  cardIndex,
  onDelete,
}) => {
  const { position, setPosition, isDragging, startDragging } = useEditorPosition(
    selectedElement?.x || 0,
    selectedElement?.y || 0
  );

  useEffect(() => {
    if (selectedElement) {
      const squareSize = Math.max(selectedElement.width || 320, selectedElement.height || 200);
      setPosition({
        x: Math.max(0, selectedElement.x || 0),
        y: Math.max(0, selectedElement.y || 0),
        width: squareSize,
        height: squareSize,
      });
    }
  }, [selectedElement, setPosition]);

 const handleResize = (newWidth: number, newHeight: number) => {
  const SLIDE_WIDTH = 500;
  const SLIDE_HEIGHT = 650;

  // Clamp width and height to slide dimensions
  const clampedWidth = Math.min(Math.max(newWidth, 50), SLIDE_WIDTH); // Min 50px, max 500px
  const clampedHeight = Math.min(Math.max(newHeight, 50), SLIDE_HEIGHT); // Min 50px, max 650px

  // Adjust position to keep the image within slide boundaries
  const updatedPosition = {
    ...position,
    width: clampedWidth,
    height: clampedHeight,
    x: Math.min(Math.max(position.x, 0), SLIDE_WIDTH - clampedWidth),
    y: Math.min(Math.max(position.y, 0), SLIDE_HEIGHT - clampedHeight),
  };

  setPosition(updatedPosition);
  console.log(updatedPosition, "updatedPosition");

  if (selectedElement && typeof cardIndex.original === "number") {
    setElements((prev: any) =>
      prev.map((el: any, i: number) =>
        i === cardIndex.original
          ? { ...el, width: clampedWidth, height: clampedHeight, x: updatedPosition.x, y: updatedPosition.y }
          : el
      )
    );
  }
};

  const handleSave = () => {
    const imageUrl = content || selectedElement?.content || "";
    if (!imageUrl) {
      console.warn("No image URL provided");
      return;
    }

    const newElement = {
      type: imageUrl.includes("tenor.com") ? "gif" : "image",
      content: imageUrl,
      slideIndex: cardIndex.activeSlide,
      x: Math.max(0, position.x),
      y: Math.max(0, position.y),
      width: position.width,
      height: position.height,
      fontSize: "16px",
      fontFamily: "Arial",
      fontWeight: "normal",
      color: "#000000",
    };

    if (typeof cardIndex.original === "number") {
      setElements((prev:any) =>
        prev.map((el:any, i:number) =>
          i === cardIndex.original ? { ...el, ...newElement } : el
        )
      );
    } else {
      setElements((prev:any) => [...prev, newElement]);
    }

    onHide();
  };

  const handleDelete = () => {
    onDelete();
  };

  return (
    <div className="flex flex-col w-full max-w-2xl editor-design">
      <ImageResizableContainer
        // position={position}
        // setPosition={setPosition}
        isDragging={isDragging}
        startDragging={startDragging}
        width={position.width }
        height={position.height}
        onResize={handleResize}
      >
        <img
          src={content || selectedElement?.content || "/placeholder.svg"}
          alt="uploaded"
          className="w-full h-full object-contain pointer-events-none select-none"
          draggable={false}
        />
        <div className="px-2 pb-2">
          <div className="bg-white mt-2 px-4">
            <div className="flex justify-center gap-2 py-2">
              <button
                onClick={onHide}
                className="px-4 py-2 text-red-500 hover:bg-red-50 rounded transition"
                style={{ color: "red" }}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-[#061178] text-white rounded hover:bg-indigo-800 transition"
              >
                Save
              </button>
              <button
                onClick={handleDelete}
                className=" transition delete-red-btn"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        </div>
      </ImageResizableContainer>
    </div>
  );
};

export default ImageEditor;