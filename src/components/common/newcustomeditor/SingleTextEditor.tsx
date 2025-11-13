"use client";
import React, { useState, useRef, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { useEditorPosition } from "../../editor/hooks/useEditorPosition";
import Toolbar from "../../editor/components/Toolbar";
import { useParams } from "next/navigation";
import ResizableEditor from "./ResizableEditor";
import Cookies from "js-cookie"; 

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
  user_uuid?: any;
  activeSlideIndex: number;
}

const TextEditor: React.FC<TextEditorProps> = ({
  onHide,
  setElements,
  selectedElement,
  cardIndex,
  toast,
  user_uuid,
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
      fontFamily: selectedElement?.fontFamily || "Verdana",
      fontWeight: selectedElement?.fontWeight || "500",
      color: selectedElement?.color || "#FF8A00",
      isEditing: true,
      showEmailForm: true,
    };
  });

  const [loading, setLoading] = useState(false);
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  const id = params.id;

  const { position, setPosition, isDragging, startDragging } =
    useEditorPosition({
      initialX: selectedElement?.x ?? 60,
      initialY: selectedElement?.y ?? 200,
      slideWidth: 500,
      slideHeight: 620,
      editorWidth: selectedElement?.width ?? 300,
      editorHeight: selectedElement?.height ?? 100,
    });

  useEffect(() => {
    try {
      const userInfo = Cookies.get("userInfo"); // your cookie name
      if (userInfo) {
        const parsedUser = JSON.parse(decodeURIComponent(userInfo));
        if (parsedUser?.full_name && !editorState.name) {
          setEditorState((prev) => ({
            ...prev,
            name: parsedUser.full_name,
          }));
        }
      }
    } catch (error) {
      console.error("Error reading user info from cookies:", error);
    }
  }, []);

  // Auto-resize textarea height
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

  const handleSave = async () => {
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
      JSON.stringify({
        message: editorState.message,
        name: editorState.name,
      })
    );

    try {
      const payload = {
        cartId: id,
        messages_unique_id: id,
        user_uuid: user_uuid,
        editor_messages: [newElement],
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cart/upsert-editor-messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save to server");
      }

      await response.json();
      toast.success("Saved Changes Successfully");

      setLoading(false);
      onHide();
    } catch (error) {
      console.error("API Error:", error);
      toast.error("Failed to sync with server");
      setLoading(false);
    }
  };

  const handleDelete = () => {
    if (selectedElement && cardIndex.original !== undefined) {
      setElements((prev) =>
        prev.filter((_, idx) => idx !== cardIndex.original)
      );
    }
    toast.success("Deleted Successfully");
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
    const MIN_WIDTH = 220;
    const MAX_WIDTH = 400;

    const clampedWidth = Math.min(Math.max(newWidth, MIN_WIDTH), MAX_WIDTH);
    const clampedHeight = Math.min(Math.max(newHeight, 50), SLIDE_HEIGHT);

    const updatedPosition = {
      ...position,
      width: clampedWidth,
      height: clampedHeight,
      x: Math.min(Math.max(position.x, 0), SLIDE_WIDTH - clampedWidth),
      y: Math.min(Math.max(position.y, 0), SLIDE_HEIGHT - clampedHeight),
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
      className="flex flex-col justify-center items-center"
      style={{
        position: "absolute",
        top: `${position.y}px`,
        left: `${position.x}px`,
        width: `${position.width}px`,
        height: `${position.height}px`,
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
              readOnly 
              className="outline-none text-editor-place bg-transparent cursor-default"
              style={{
                fontFamily: editorState.fontFamily,
                fontSize: "18px",
                fontWeight: "normal",
                color: editorState.color,
                wordWrap: "break-word",
                maxWidth: "100%",
              }}
            />
          </div>
        </div>
      </ResizableEditor>

      <div className="px-2 pb-2 mt-1">
        <div className="bg-white shadow-2xl border rounded pt-2 px-4">
          <input
            type="email"
            placeholder="Your email (optional)"
            className="w-full px-0 bg-transparent py-2 border-bottom border-gray-200 focus:outline-none focus:border-blue-400 transition-colors"
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
              disabled={loading}
              className="px-4 py-2 bg-[#061178] text-white rounded flex items-center gap-1 hover:bg-indigo-800 transition editor-save disabled:opacity-50"
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
