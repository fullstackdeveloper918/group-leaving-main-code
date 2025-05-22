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
  x: any;
  y: any;
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
  },
  Xposition:any,
  Yposition:any
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
  Yposition
}) => {
  const [editorState, setEditorState] = useState<EditorState>({
    content: content || (selectedElement ? selectedElement.content : ""),
    fontSize: selectedElement?.fontSize || "24px",
    fontFamily: selectedElement?.fontFamily || "Arial",
    fontWeight: selectedElement?.fontWeight || "600",
    color: selectedElement?.color || "#37CAEC",
    isEditing: true,
    showEmailForm: true,
  });
console.log(editorState,"editorState");
console.log(Xposition,"Xposition");
console.log(Yposition,"Yposition");

  const editorRef = useRef<HTMLTextAreaElement>(null);
  const { position, setPosition, isDragging, startDragging } = useEditorPosition();

  // Sync editor state with content or selectedElement changes
  useEffect(() => {
    setEditorState((prevState) => ({
      ...prevState,
      content: content || (selectedElement ? selectedElement.content : ""),
      fontSize: selectedElement?.fontSize || prevState.fontSize,
      fontFamily: selectedElement?.fontFamily || prevState.fontFamily,
      fontWeight: selectedElement?.fontWeight || prevState.fontWeight,
      color: selectedElement?.color || prevState.color,
    }));
  }, [content, selectedElement]);

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
         x: Xposition,
        y:Yposition,
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
      setElements((prev) => prev.filter((_, idx) => idx !== cardIndex.original));
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

  return (
    <div className="flex flex-col w-full max-w-2xl editor-design">
      <ResizableContainer
        position={position}
        setPosition={setPosition}
        isDragging={isDragging}
        startDragging={startDragging}
      >
        <div className="flex flex-col w-full rounded-md shadow-md">
          <Toolbar
            editorState={editorState}
            updateEditorStyle={(style) =>
              setEditorState((prev) => ({ ...prev, ...style }))
            }
            handleCommand={handleCommand}
          />

          <textarea
            ref={editorRef}
            placeholder="Type your text here..."
            value={editorState.content}
            onChange={handleContentChange}
            className="min-h-[120px] px-4 py-3 focus:outline-none bg-transparent rounded-md mx-2 mb-2 whitespace-pre-wrap textarea-border"
            style={{
              fontFamily: editorState.fontFamily,
              color: editorState.color,
              fontSize: editorState.fontSize,
              fontWeight: editorState.fontWeight,
              cursor: isDragging ? "move" : "text",
              border: "2px solid #061178",
               transform: "none",
            }}
          />

          <div className="px-2 pb-2">
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
      </ResizableContainer>
    </div>
  );
};

export default TextEditor;