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
    const size = Math.max(newWidth, newHeight);
    const updatedPosition = { ...position, width: size, height: size };
    setPosition(updatedPosition);

    if (selectedElement && typeof cardIndex.original === "number") {
      setElements((prev) =>
        prev.map((el, i) =>
          i === cardIndex.original
            ? { ...el, width: size, height: size, x: updatedPosition.x, y: updatedPosition.y }
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
      setElements((prev) =>
        prev.map((el, i) =>
          i === cardIndex.original ? { ...el, ...newElement } : el
        )
      );
    } else {
      setElements((prev) => [...prev, newElement]);
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
        width={position.width}
        height={position.height}
        onResize={handleResize}
      >
        <img
          src={content || selectedElement?.content || "/placeholder.svg"}
          alt="uploaded"
          className="w-full h-full object-cover pointer-events-none select-none"
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
                className="px-4 py-2 text-red-500 hover:bg-red-50 rounded transition"
                style={{ color: "red" }}
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