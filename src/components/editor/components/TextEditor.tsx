import React, { useState, useRef, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { useEditorPosition } from "../hooks/useEditorPosition";
import Toolbar from "./Toolbar";
import ResizableContainer from "./ResizableContainer";
import { toast } from "react-toastify";

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
}

const TextEditor: React.FC<TextEditorProps> = ({
  onHide,
  setElements,
  elements,
  selectedElement,
  content,
  cardIndex,
  Xposition,
  Yposition,
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

  // Sync editor state and position
  // useEffect(() => {
  //   setEditorState((prevState) => ({
  //     ...prevState,
  //     content: content || (selectedElement ? selectedElement.content : ""),
  //     fontSize: selectedElement?.fontSize || prevState.fontSize,
  //     fontFamily: selectedElement?.fontFamily || prevState.fontFamily,
  //     fontWeight: selectedElement?.fontWeight || prevState.fontWeight,
  //     color: selectedElement?.color || prevState.color,
  //   }));

  //   setPosition((prev) => ({
  //     ...prev,
  //     x: Math.max(
  //       0,
  //       Math.min(Xposition, 500 - (selectedElement?.width || prev.width))
  //     ),
  //     y: Math.max(
  //       0,
  //       Math.min(Yposition, 650 - (selectedElement?.height || prev.height))
  //     ),
  //     width: selectedElement?.width || prev.width,
  //     height: selectedElement?.height || prev.height,
  //   }));
  // }, [content, selectedElement, Xposition, Yposition, setPosition]);

  // Adjust drag coordinates to be relative to the slide
  // useEffect(() => {
  //   if (!isDragging || !slideRef.current) return;

  //   const slideRect = slideRef.current.getBoundingClientRect();
  //   const handleMouseMove = (e: MouseEvent) => {
  //     const newX = Math.max(
  //       0,
  //       Math.min(
  //         e.clientX - slideRect.left - position.width / 2,
  //         500 - position.width
  //       )
  //     );
  //     const newY = Math.max(
  //       0,
  //       Math.min(
  //         e.clientY - slideRect.top - position.height / 2,
  //         650 - position.height
  //       )
  //     );

  //     setPosition((prev) => ({
  //       ...prev,
  //       x: newX,
  //       y: newY,
  //     }));
  //   };

  //   const handleMouseUp = () => {
  //     // setIsDragging(false); // Uncomment if needed
  //   };

  //   document.addEventListener("mousemove", handleMouseMove);
  //   document.addEventListener("mouseup", handleMouseUp);

  //   return () => {
  //     document.removeEventListener("mousemove", handleMouseMove);
  //     document.removeEventListener("mouseup", handleMouseUp);
  //   };
  // }, [isDragging, position.width, position.height, setPosition]);

  // Handle text content changes
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value;
    setEditorState((prev) => ({ ...prev, content }));
  };

  console.log(position, "xy positioning");
  // Save the edited or new element
  const handleSave = () => {
    setLoading(true);
    if (!editorState.message) {
      setLoading(false);
      return toast.error("Please add your message");
    }
    if (!editorState.name) {
      setLoading(false);
      return toast.error("Please add your name");
    }

    const combinedContent = `${editorState.message}\n${editorState.name}`;

    const newElement: Element = {
      type: "text",
      content: combinedContent,
      slideIndex: cardIndex.activeSlide,
      x: position.x, // Ensure current position is used
      y: position.y,
      width: position.width,
      height: position.height,
      fontSize: editorState.fontSize,
      fontFamily: editorState.fontFamily,
      fontWeight: editorState.fontWeight,
      color: editorState.color,
    };

    // Save to React state
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
      JSON.stringify({
        message: editorState.message,
        name: editorState.name,
      })
    );

    toast.success("Saved Changes");

    setTimeout(() => {
      setLoading(false);
      onHide();
    }, 2000);
  };

  // Delete the selected element
  const handleDelete = () => {
    if (selectedElement && cardIndex.original !== undefined) {
      setElements((prev) =>
        prev.filter((_, idx) => idx !== cardIndex.original)
      );
    }
    onHide();
  };

  // Execute document commands for formatting
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
        // Removed transform: none !important
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-50px",
          left: 0,
          width: "100%",
          zIndex: 1010,
          backgroundColor: "white",
        }}
      >
        <Toolbar
          editorState={editorState}
          updateEditorStyle={(style) =>
            setEditorState((prev) => ({ ...prev, ...style }))
          }
          handleCommand={handleCommand}
        />
      </div>
      <ResizableContainer
        isDragging={isDragging}
        startDragging={startDragging}
        onResize={handleResize}
        width={position.width}
        height={position.height}
      >
        <div className="flex flex-col w-full rounded-md shadow-md">
          <div className="flex flex-col gap-1 p-2">
            <input
              placeholder="Enter your message here"
              value={editorState.message}
              onChange={(e) =>
                setEditorState((prev) => ({ ...prev, message: e.target.value }))
              }
              className="resize-none outline-none text-editor-place"
              style={{
                fontFamily: editorState.fontFamily,
                fontSize: editorState.fontSize,
                fontWeight: editorState.fontWeight,
                color: editorState.color,
                background: "transparent",
              }}
            />
            <input
              type="text"
              placeholder="Your name"
              value={editorState.name}
              onChange={(e) =>
                setEditorState((prev) => ({ ...prev, name: e.target.value }))
              }
              className={`outline-none text-editor-place `}
              style={{
                fontFamily: editorState.fontFamily,
                fontSize: "18px",
                fontWeight: "normal",
                color: editorState.color,
                background: "transparent",
              }}
            />
          </div>
        </div>
      </ResizableContainer>
      <div className="px-2 pb-2 mt-1">
        <div className="border-t bg-white pt-2 px-4">
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
