import React, { useState, useRef, useEffect } from "react";
import { useEditorPosition } from "../hooks/useEditorPosition";
import Toolbar from "./Toolbar";
import ResizableContainer from "./ResizableContainer";
import { EditorState } from "../types/editor";
import { Element } from "../types/editor";
import { FaTrash } from "react-icons/fa"; // Importing the trash icon from react-icons

interface TextEditorProps {
  onHide: () => void;
  setElements: React.Dispatch<React.SetStateAction<Element[]>>;
  elements: Element[];
  selectedElement: Element | null;
  content?: string; // content is now optional
  cardIndex: {
    original?: number;
    activeSlide: number;
  };
}

const TextEditor: React.FC<TextEditorProps> = ({
  onHide,
  setElements,
  elements,
  selectedElement,
  content, // content now comes as a prop and is optional
  cardIndex,
}) => {
  const [editorState, setEditorState] = useState<EditorState>({
    content: content || (selectedElement ? selectedElement.content : ""), // Use content prop or fallback to selectedElement's content
    fontSize: "24px",
    fontFamily: "Arial",
    fontWeight: "600",
    color: "#37CAEC",
    isEditing: true,
    showEmailForm: true,
  });

  const editorRef = useRef<HTMLTextAreaElement>(null);
  const { position, setPosition, isDragging, startDragging } =
    useEditorPosition();

  // Update editor state when content prop or selectedElement changes
  useEffect(() => {
    setEditorState((prevState) => ({
      ...prevState,
      content: content || (selectedElement ? selectedElement.content : ""), // Re-evaluate content on prop or selectedElement change
    }));
  }, [content, selectedElement]); // Only update when content or selectedElement prop changes

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value;
    setEditorState((prev) => ({ ...prev, content }));
  };

  const toggleEmailForm = () => {
    onHide();
  };

  const handleSave = () => {
    if (editorRef.current) {
      const newElement: Element = {
        type: "text",
        content: editorRef.current.value, // Get content from the textarea
        slideIndex: cardIndex?.activeSlide, // Dynamically set depending on your slides
        x: position.x,
        y: position.y,
        fontSize: editorState.fontSize,
        fontFamily: editorState.fontFamily,
        fontWeight: editorState.fontWeight,
        color: editorState.color,
      };

      if (selectedElement) {
        // If an element is selected, edit only that element
        const updatedElements = elements.map((element, idx) => {
          if (idx === cardIndex?.original) {
            // Only update the selected element
            return { ...element, ...newElement };
          }
          return element;
        });

        setElements(updatedElements); // Update elements state with the edited element
      } else {
        // If no element is selected, add a new element
        setElements((prevElements) => [...prevElements, newElement]);
      }

      toggleEmailForm(); // Close the modal after saving
    }
  };

  const handleDelete = () => {
    if (selectedElement) {
      console.log(selectedElement, "updataElements1");

      // Check if selectedElement has an ID or another unique identifier
      const updatedElements = elements.filter(
        (element) => element.content !== selectedElement.content // Use a unique identifier like id
      );

      console.log(updatedElements, "updatedElements");
      setElements(updatedElements); // Update elements state with the removed element
    }
    toggleEmailForm(); // Close the modal after deleting
  };

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
            value={editorState.content} // Bind to editorState.content
            onChange={handleContentChange}
            className="min-h-[120px] px-4 py-3 focus:outline-none bg-transparent rounded-md mx-2 mb-2 whitespace-pre-wrap textarea-border"
            style={{
              fontFamily: editorState.fontFamily,
              color: editorState.color,
              fontSize: editorState.fontSize,
              fontWeight: editorState.fontWeight,
              cursor: isDragging ? "move" : "text",
              border: "2px solid #061178",
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
                  onClick={toggleEmailForm}
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
                {/* Add delete button */}
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 text-red-500 hover:bg-red-50 rounded transition editor-delete"
                >
                  <FaTrash /> {/* Trash icon */}
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
