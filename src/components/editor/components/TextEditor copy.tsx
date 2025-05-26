import React, { useState, useRef, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { useEditorPosition } from "../hooks/useEditorPosition";
import Toolbar from "./Toolbar";
import ResizableContainer from "./ResizableContainer";

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

// TextEditor Component
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
  const [editorState, setEditorState] = useState<EditorState>({
    content: content || (selectedElement ? selectedElement.content : ""),
    fontSize: selectedElement?.fontSize || "20px",
    fontFamily: selectedElement?.fontFamily || "Arial",
    fontWeight: selectedElement?.fontWeight || "600",
    color: selectedElement?.color || "#37CAEC",
    isEditing: true,
    showEmailForm: true,
  });

  console.log(selectedElement, "selectedElementlalala");
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const slideRef = useRef<HTMLDivElement>(null); // Reference to slide container

  // Initialize useEditorPosition with slide dimensions
  const { position, setPosition, isDragging, startDragging } =
    useEditorPosition({
      initialX: selectedElement?.x ?? Xposition,
      initialY: selectedElement?.y ?? Yposition,
      slideWidth: 500,
      slideHeight: 650,
      editorWidth: selectedElement?.width ?? 375,
      editorHeight: selectedElement?.height ?? 75,
    });

  // Sync editor state and position
  useEffect(() => {
    setEditorState((prevState) => ({
      ...prevState,
      content: content || (selectedElement ? selectedElement.content : ""),
      fontSize: selectedElement?.fontSize || prevState.fontSize,
      fontFamily: selectedElement?.fontFamily || prevState.fontFamily,
      fontWeight: selectedElement?.fontWeight || prevState.fontWeight,
      color: selectedElement?.color || prevState.color,
    }));

    setPosition((prev) => ({
      ...prev,
      x: Math.max(
        0,
        Math.min(Xposition, 500 - (selectedElement?.width || prev.width))
      ),
      y: Math.max(
        0,
        Math.min(Yposition, 650 - (selectedElement?.height || prev.height))
      ),
      width: selectedElement?.width || prev.width,
      height: selectedElement?.height || prev.height,
    }));
  }, [content, selectedElement, Xposition, Yposition, setPosition]);

  // Adjust drag coordinates to be relative to the slide
  useEffect(() => {
    if (!isDragging || !slideRef.current) return;

    const slideRect = slideRef.current.getBoundingClientRect();
    const handleMouseMove = (e: MouseEvent) => {
      const newX = Math.max(
        0,
        Math.min(
          e.clientX - slideRect.left - position.width / 2,
          500 - position.width
        )
      );
      const newY = Math.max(
        0,
        Math.min(
          e.clientY - slideRect.top - position.height / 2,
          650 - position.height
        )
      );

      setPosition((prev) => ({
        ...prev,
        x: newX,
        y: newY,
      }));
    };

    const handleMouseUp = () => {
      // setIsDragging(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, position.width, position.height, setPosition]);

  // Handle text content changes
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value;
    setEditorState((prev) => ({ ...prev, content }));
  };

  // Save the edited or new element
  const handleSave = () => {
    if (editorRef.current) {
      const newElement: Element = {
        type: "text",
        content: editorRef.current.value,
        slideIndex: cardIndex.activeSlide,
        x: position.x,
        y: position.y,
        fontSize: editorState.fontSize,
        fontFamily: editorState.fontFamily,
        fontWeight: editorState.fontWeight,
        color: editorState.color,
      };

      if (selectedElement && cardIndex.original !== undefined) {
        // Update existing element
        setElements((prev) =>
          prev.map((element, idx) =>
            idx === cardIndex.original ? { ...element, ...newElement } : element
          )
        );
      } else {
        // Add new element
        setElements((prev) => [...prev, newElement]);
      }

      onHide(); // Close modal
    }
  };

  // Delete the selected element
  const handleDelete = () => {
    if (selectedElement && cardIndex.original !== undefined) {
      setElements((prev) =>
        prev.filter((_, idx) => idx !== cardIndex.original)
      );
    }
    onHide(); // Close modal
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
        // width: "79.5%"
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-50px", // Adjust height above the editor as needed
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
        // position={position}
        // setPosition={setPosition}
        isDragging={isDragging}
        startDragging={startDragging}
        onResize={handleResize} // Pass resize callback
        width={position.width}
        height={position.height}>
        <div className="flex flex-col w-full rounded-md shadow-md ">
          <textarea
            ref={editorRef}
            placeholder="Type your text here..."
            value={editorState.content}
            onChange={handleContentChange}
            className=" focus:outline-none m-0 px-1 bg-transparent rounded-mdwhitespace-pre-wrap "
            style={{
              fontFamily: editorState.fontFamily,
              color: editorState.color,
              fontSize: editorState.fontSize,
              fontWeight: editorState.fontWeight,
              cursor: isDragging ? "move" : "text",
              // border: "2px solid #061178",
            }}
          /> 
    </div>
     </ResizableContainer>
          <div className="px-2 pb-2 bg-white">
            <div className="border-t bg-white pt-2 px-4">
              <input
                type="email"
                placeholder="Your email (optional)"
                className="w-full px-0 bg-transparent py-2 pt-4 border-bottom border-gray-200 focus:outline-none focus:border-blue-400 transition-colors"
              />
              <div className="flex justify-center bg-white gap-2 py-2">
                <button
                  onClick={onHide}
                  className="px-4 py-2 text-red-500 hover:bg-red-50 rounded transition editor-cancel"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-[#061178] text-white rounded flex items-center gap-1 hover:bg-indigo-800 transition editor-save"
                >
                  Save
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
