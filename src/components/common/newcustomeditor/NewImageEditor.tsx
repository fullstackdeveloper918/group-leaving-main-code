import React, { useState, useEffect } from "react";
import { useEditorPosition } from "../../editor/hooks/useEditorPosition";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import ResizableEditor from "./ResizableEditor";

interface ImageEditorProps {
  onHide: () => void;
  setElements: React.Dispatch<React.SetStateAction<any[]>>;
  elements: any[];
  selectedElement: any;
  content?: string;
  slides?: any;
  activeSlideIndex?: any;
  isFirstSlide?: any;
  toast?: any;
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
  toast,
  onDelete,
}) => {
  const { position, setPosition, isDragging, startDragging } =
    useEditorPosition(
      selectedElement?.x || 0
    );
  const [loading, setLoading] = useState(false);

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
      setElements((prev: any) =>
        prev.map((el: any, i: number) =>
          i === cardIndex.original ? { ...el, ...newElement } : el
        )
      );
    } else {
      setElements((prev: any) => [...prev, newElement]);
    }

    toast.success("Saved Changes");
    setTimeout(() => {
      setLoading(false);
      onHide();
    }, 2000);
  };

  const handleDelete = () => {
    onDelete();
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl editor-design-image">
      <ResizableEditor
        position={position}
        setPosition={setPosition}
        isDragging={isDragging}
        startDragging={startDragging}
        width={position.width}
        height={position.height}
        minWidth={50}
        minHeight={50}
        bounds={{ width: 500, height: 650 }}
      >
        <img
          src={content || selectedElement?.content || "/placeholder.svg"}
          alt="uploaded"
          className="pointer-events-none select-none"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "fill",
            display: "block",
          }}
        />
      </ResizableEditor>
      <div className="px-2 pb-2">
        <div className="mt-2 px-4 w-fit">
          <div className="flex justify-center  gap-2 py-2">
            <button
              onClick={onHide}
              className="px-4 py-2  text-white bg-[#DC3545] hover:bg-[#8b323b] rounded transition editor-cancel"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="px-4 py-2 bg-[#061178] text-white rounded flex items-center gap-1 hover:bg-indigo-800 transition editor-save disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 text-white bg-[#5696DB] hover:bg-[#0d5780] rounded transition editor-delete"
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
