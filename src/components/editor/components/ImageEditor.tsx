import React, { useState, useEffect } from "react";
import { useEditorPosition } from "../hooks/useEditorPosition";
import { EditorImageState, ImageElement, Element } from "../types/editor";
import { FaTrash } from "react-icons/fa";
import ImageResizableContainer from "./ImageResizableContainer";

interface TextEditorProps {
  onHide: () => void;
  setElements: React.Dispatch<React.SetStateAction<Element[]>>;
  elements: Element[];
  selectedElement: Element | null;
  content?: string;
  cardIndex: {
    original?: number;
    activeSlide: number;
  };
}

const ImageEditor: React.FC<TextEditorProps> = ({
  onHide,
  setElements,
  elements,
  selectedElement,
  content,
  cardIndex,
}) => {
  const { position, setPosition, isDragging, startDragging } =
    useEditorPosition();

  // 🟨 Ensure square size on mount
  useEffect(() => {
    if (selectedElement) {
      const squareSize = Math.max(
        (selectedElement as ImageElement).width,
        (selectedElement as ImageElement).height
      );
      setPosition({
        x: selectedElement.x,
        y: selectedElement.y,
        width: squareSize,
        height: squareSize,
      });
    }
  }, [selectedElement, setPosition]);

  // 🟨 Enforce square size during resize
  const handleResize = (newWidth: number, newHeight: number) => {
    const size = Math.max(newWidth, newHeight); // Square size
    const updatedPosition = {
      ...position,
      width: size,
      height: size,
    };
    setPosition(updatedPosition);

    // 🔄 Immediate update to `elements` state (live update)
    if (selectedElement && typeof cardIndex.original === "number") {
      const updatedElements = elements.map((el, i) =>
        i === cardIndex.original
          ? {
              ...el,
              width: size,
              height: size,
              x: updatedPosition.x,
              y: updatedPosition.y,
            }
          : el
      );
      setElements(updatedElements);
      localStorage.setItem("slideElements", JSON.stringify(updatedElements));
    }
  };

  const handleSave = () => {
    const imageUrl = content || selectedElement?.content || "";

    const newElement: ImageElement = {
      type:
        imageUrl.endsWith(".gif") || imageUrl.includes("tenor.com")
          ? "gif"
          : "image",
      content: imageUrl,
      slideIndex: cardIndex.activeSlide,
      x: position.x,
      y: position.y,
      width: position.width,
      height: position.height,
      fontSize: "16px", // default
      fontFamily: "Arial", // default
      fontWeight: "normal", // default
      color: "#000000", // default
    };

    if (selectedElement && typeof cardIndex.original === "number") {
      const updatedElements = elements.map((el, i) =>
        i === cardIndex.original ? { ...el, ...newElement } : el
      );
      setElements(updatedElements);
    } else {
      setElements((prev) => [...prev, newElement]);
    }

    onHide();
  };

  const handleDelete = () => {
    if (selectedElement) {
      const updatedElements = elements.filter(
        (el) => el.content !== selectedElement.content
      );
      setElements(updatedElements);
      localStorage.setItem("slideElements", JSON.stringify(updatedElements));
    }
    onHide();
  };

  return (
    <div className="flex flex-col w-full max-w-2xl editor-design">
      <ImageResizableContainer
        position={position}
        setPosition={setPosition}
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
