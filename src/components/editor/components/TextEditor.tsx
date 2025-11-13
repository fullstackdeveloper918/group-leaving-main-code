import React, { useState, useRef, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { useEditorPosition } from "../hooks/useEditorPosition";
import Toolbar from "./Toolbar";
import ResizableEditor from "@/components/common/newcustomeditor/ResizableEditor";

// Interfaces
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

interface EditorState {
  message: string;
  name: string;
  content: string;
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  color: string;
  isEditing: boolean;
  showEmailForm: boolean;
}

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
  Xposition: number;
  Yposition: number;
  slides: any[];
  isFirstSlide?: any;
  toast: any;
  activeSlideIndex: number;
}

const TextEditor: React.FC<TextEditorProps> = ({
  onHide,
  setElements,
  selectedElement,
  cardIndex,
  toast,
  activeSlideIndex,
}) => {
  const [editorState, setEditorState] = useState<EditorState>(() => {
    const content = selectedElement?.content || "";
    const [message = "", name = ""] = content.split("\n");

    return {
      message,
      name,
      content,
      fontSize: selectedElement?.fontSize || "22px",
      fontFamily: selectedElement?.fontFamily || "Boogaloo",
      fontWeight: selectedElement?.fontWeight || "500",
      color: selectedElement?.color || "#FF8A00",
      isEditing: true,
      showEmailForm: true,
    };
  });

  const [loading, setLoading] = useState(false);
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);

  const { position, setPosition, isDragging, startDragging } =
    useEditorPosition({
      initialX: selectedElement?.content ? selectedElement?.x : 60,
      initialY: selectedElement?.content ? selectedElement?.y : 200,
      slideWidth: 500,
      slideHeight: 650,
      editorWidth: selectedElement?.width ?? 375,
      editorHeight: selectedElement?.height ?? 100,
    });

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
  }, [activeSlideIndex]);
  const adjustTextareaHeight = () => {
    if (editorRef.current) {
      editorRef.current.style.height = "auto";
      const newHeight = editorRef.current.scrollHeight;
      editorRef.current.style.height = `${newHeight}px`;
      handleResize(position.width, newHeight + 50);
    }
  };
  useEffect(() => {
    adjustTextareaHeight();
  }, [editorState.message]);
  const handleSave = () => {
    if (!editorState.message) return toast.error("Please add your message");
    if (!editorState.name) return toast.error("Please add your name");

    const combinedContent = `${editorState.message}\n${editorState.name}`;

    const newElement: Element = {
      type: "text",
      content: combinedContent,
      slideIndex: activeSlideIndex,
      x: position.x,
      y: position.y,
      width: position.width,
      height: position.height,
      fontSize: editorState.fontSize,
      fontFamily: editorState.fontFamily,
      fontWeight: editorState.fontWeight,
      color: editorState.color,
    };

    if (selectedElement && cardIndex.original !== undefined) {
      setElements((prev) =>
        prev.map((element, idx) =>
          idx === cardIndex.original ? { ...element, ...newElement } : element
        )
      );
    } else {
      setElements((prev) => [...prev, newElement]);
    }

    localStorage.setItem(
      "textEditorData",
      JSON.stringify({ message: editorState.message, name: editorState.name })
    );

    onHide(); // hide immediately
    toast.success("Saved Changes"); // toast can still show
  };

  const handleDelete = () => {
    if (selectedElement && cardIndex.original !== undefined) {
      setElements((prev) =>
        prev.filter((_, idx) => idx !== cardIndex.original)
      );
      toast.success("Deleted Successfully");
    }
    onHide();
  };

  const handleCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const handleResize = (newWidth: number, newHeight: number) => {
    const SLIDE_WIDTH = 500;
    const SLIDE_HEIGHT = 650;

    const clampedWidth = Math.min(Math.max(newWidth, 50), SLIDE_WIDTH);
    const clampedHeight = Math.min(Math.max(newHeight, 50), SLIDE_HEIGHT);

    const updatedPosition = {
      ...position,
      width: clampedWidth,
      height: clampedHeight,
      x: Math.min(position.x, SLIDE_WIDTH - clampedWidth),
      y: Math.min(position.y, SLIDE_HEIGHT - clampedHeight),
    };

    setPosition(updatedPosition);

    if (selectedElement && typeof cardIndex.original === "number") {
      setElements((prev) =>
        prev.map((el, i) =>
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

  return (
    <div
      ref={slideRef}
      className="flex flex-col w-full max-w-2xl editor-design"
      style={{
        position: "absolute",
        top: `${position.y}px`,
        left: `${position.x}px`,
        zIndex: 1000,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-120px",
          zIndex: 9010,
          backgroundColor: "white",
        }}
        className="shadow-2xl border rounded z-9999"
      >
        <Toolbar
          editorState={editorState}
          updateEditorStyle={(style) =>
            setEditorState((prev) => ({ ...prev, ...style }))
          }
          handleCommand={handleCommand}
        />
      </div>
      <ResizableEditor
        isDragging={isDragging}
        startDragging={startDragging}
        onResize={handleResize}
        width={position.width}
        height={position.height}
      >
        <div className="flex flex-col w-full rounded-md shadow-md relative">
          <div
            className="absolute left-[-8px] top-1/2 -translate-y-1/2 w-3 h-3 bg-blueBg rounded-full cursor-ew-resize"
            onMouseDown={(e) => {
              e.preventDefault();
              const startX = e.clientX;
              const startWidth = position.width;
              const startLeft = position.x;

              const onMouseMove = (moveEvent: MouseEvent) => {
                const deltaX = startX - moveEvent.clientX;
                const newWidth = Math.min(
                  Math.max(startWidth + deltaX, 220),
                  400
                );
                const newLeft = Math.min(
                  Math.max(startLeft - deltaX, 0),
                  400 - newWidth
                );
                handleResize(newWidth, position.height);
                setPosition({ ...position, x: newLeft, width: newWidth });
              };

              const onMouseUp = () => {
                window.removeEventListener("mousemove", onMouseMove);
                window.removeEventListener("mouseup", onMouseUp);
              };

              window.addEventListener("mousemove", onMouseMove);
              window.addEventListener("mouseup", onMouseUp);
            }}
          />
          <div
            className="absolute right-[-8px] top-1/2 -translate-y-1/2 w-3 h-3 bg-blueBg rounded-full cursor-ew-resize"
            onMouseDown={(e) => {
              e.preventDefault();
              const startX = e.clientX;
              const startWidth = position.width;

              const onMouseMove = (moveEvent: MouseEvent) => {
                const deltaX = moveEvent.clientX - startX;
                const newWidth = Math.min(
                  Math.max(startWidth + deltaX, 220),
                  400
                );
                handleResize(newWidth, position.height);
              };

              const onMouseUp = () => {
                window.removeEventListener("mousemove", onMouseMove);
                window.removeEventListener("mouseup", onMouseUp);
              };

              window.addEventListener("mousemove", onMouseMove);
              window.addEventListener("mouseup", onMouseUp);
            }}
          />
          <div className="flex flex-col gap-1 p-2">
            <textarea
              ref={editorRef}
              placeholder="Enter your message here"
              value={editorState.message}
              onChange={(e) => {
                setEditorState((prev) => ({
                  ...prev,
                  message: e.target.value,
                }));
                adjustTextareaHeight();
              }}
              className="resize-none outline-none hightTextArea w-full"
              style={{
                fontFamily: editorState.fontFamily,
                fontSize: editorState.fontSize,
                fontWeight: editorState.fontWeight,
                color: editorState.color,
                background: "transparent",
                whiteSpace: "pre-wrap",
                wordWrap: "break-word",
                minHeight: "10px",
                maxHeight: "400px",
                lineHeight: "1",
              }}
            />
            <input
              type="text"
              placeholder="Your name"
              value={editorState.name}
              onChange={(e) =>
                setEditorState((prev) => ({ ...prev, name: e.target.value }))
              }
              className="outline-none text-editor-place"
              style={{
                fontFamily: editorState.fontFamily,
                fontSize: "18px",
                fontWeight: "normal",
                color: editorState.color,
                background: "transparent",
                wordWrap: "break-word",
                maxWidth: "100%",
              }}
            />
          </div>
        </div>
      </ResizableEditor>
      <div className="px-2 pb-2 mt-1">
        <div className=" bg-white pt-2 px-4">
          <input
            type="email"
            placeholder="Your email (optional)"
            className="w-full px-0 bg-transparent py-2 pt-4 border-bottom border-gray-200 focus:outline-none focus:border-blue-400 transition-colors"
          />
          <div className="flex justify-center bg-white gap-2 py-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                onHide();
              }}
              className="px-4 py-2 text-red-500 hover:bg-red-50 rounded transition editor-cancel"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-[#061178] text-white rounded flex items-center gap-1 hover:bg-indigo-800 transition editor-save"
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 text-red-500 hover:bg-red-50 rounded transition editor-delete"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextEditor;
