import React, { useState, useEffect } from "react";
import { useEditorPosition } from "../hooks/useEditorPosition";
import { FaTrash } from "react-icons/fa";
import ImageResizableContainer from "./ImageResizableContainer";
import { toast } from "react-toastify";

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
  slides: any[];
  activeSlideIndex: number;
}

const ImageEditor: React.FC<ImageEditorProps> = ({
  onHide,
  setElements,
  elements,
  selectedElement,
  content,
  cardIndex,
  onDelete,
  slides,
  activeSlideIndex,
}) => {
  const { position, setPosition, isDragging, startDragging } =
    useEditorPosition(
      selectedElement?.x || 0
      // selectedElement?.y || 0
    );
  const [loading, setLoading] = useState(false);

  console.log(selectedElement.height, selectedElement.width, "ssssssssssssss");
  useEffect(() => {
    if (selectedElement) {
      const width = selectedElement.width || 320;
      const height = selectedElement.height || 200;

      setPosition({
        x: Math.max(0, selectedElement.x || 0),
        y: Math.max(0, selectedElement.y || 0),
        width: width,
        height: height,
      });
    }
  }, [selectedElement, setPosition]);

  // When activeSlideIndex changes and editor is open, move the element to the new slide
  useEffect(() => {
    if (selectedElement && selectedElement.slideIndex !== activeSlideIndex) {
      setElements((prev: any[]) =>
        prev.map((el, i) =>
          i === cardIndex.original
            ? { ...el, slideIndex: activeSlideIndex }
            : el
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSlideIndex]);

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
            ? {
                ...el,
                width: clampedWidth,
                height: clampedHeight,
                x: updatedPosition.x,
                y: updatedPosition.y,
              }
            : el
        )
      );
    }
  };

  // Slide selection for moving element
  const [targetSlide, setTargetSlide] = useState<number>(cardIndex.activeSlide);

  const handleSave = () => {
    setLoading(true);

    const imageUrl = content || selectedElement?.content || "";
    if (!imageUrl) {
      console.warn("No image URL provided");
      return;
    }

    const newElement = {
      type: imageUrl.includes("tenor.com") ? "gif" : "image",
      content: imageUrl,
      slideIndex: targetSlide,
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
      setElements((prev: any) =>
        prev.map((el: any, i: number) =>
          i === cardIndex.original ? { ...el, ...newElement } : el
        )
      );
    } else {
      setElements((prev: any) => [...prev, newElement]);
    }

    toast.success("Saved Changes"); // ✅ Trigger immediately
    setTimeout(() => {
      setLoading(false);
      onHide(); // Close modal after toast shows
    }, 2000); // 1 second is usually enough
  };

  const handleDelete = () => {
    onDelete();
  };

  return (
    <div className="flex flex-col w-full max-w-2xl editor-design-image">
      {/* Slide selection dropdown */}
      {/* Remove the dropdown for moving to another slide */}
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
          className="w-auto h-auto object-contain pointer-events-none select-none"
          draggable={false}
        />
      </ImageResizableContainer>
      <div className="px-2 pb-2">
        <div className="bg-white mt-2 px-4">
          <div className="flex justify-center align-items-center gap-2 py-2">
            <button
              onClick={onHide}
              className="transition cancel-editBtn"
              style={{ color: "red" }}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="text-white transition image-saveBtn"
            >
              {loading ? "Saving..." : "Save"}
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
    </div>
  );
};

export default ImageEditor;
