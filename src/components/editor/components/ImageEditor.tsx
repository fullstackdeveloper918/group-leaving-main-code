import React, { useState, useEffect } from "react";
import { useEditorPosition } from "../hooks/useEditorPosition";
import { EditorImageState, ImageElement } from "../types/editor";
import { Element } from "../types/editor";
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
  const [editorState, setEditorState] = useState<EditorImageState>({
    content: content || (selectedElement ? selectedElement.content : ""),
    fontSize: "16px",
    fontFamily: "Arial",
    fontWeight: "normal",
    color: "#000",
    isEditing: true,
    showEmailForm: true,
    width: selectedElement ? (selectedElement as ImageElement).width : 300,
    height: selectedElement ? (selectedElement as ImageElement).height : 200,
  });

  const { position, setPosition, isDragging, startDragging } =
    useEditorPosition();

  useEffect(() => {
    setEditorState((prevState) => ({
      ...prevState,
      content: content || (selectedElement ? selectedElement.content : ""),
      width: selectedElement ? (selectedElement as ImageElement).width : 100,
      height: selectedElement ? (selectedElement as ImageElement).height : 100,
    }));
  }, [content, selectedElement]);

  const toggleEmailForm = () => {
    onHide();
  };

  const detectType = (content: string) => {
    if (content.endsWith(".gif") || content.includes("tenor.com")) {
      return "gif";
    }
    return "image";
  };

  const handleSave = () => {
    const newElement: ImageElement = {
      type: detectType(editorState.content),
      content: editorState.content,
      slideIndex: cardIndex?.activeSlide,
      x: position.x,
      y: position.y,
      fontSize: editorState.fontSize,
      fontFamily: editorState.fontFamily,
      fontWeight: editorState.fontWeight,
      color: editorState.color,
      width: editorState.width, // Use editorState width
      height: editorState.height, // Use editorState height
    };
    if (selectedElement) {
      const updatedElements = elements.map((element, idx) =>
        idx === cardIndex?.original ? { ...element, ...newElement } : element
      );
      setElements(updatedElements);
    } else {
      setElements((prevElements) => [...prevElements, newElement]);
    }

    toggleEmailForm();
  };

  const handleDelete = () => {
    if (selectedElement) {
      const updatedElements = elements.filter(
        (element) => element.content !== selectedElement.content
      );
      setElements(updatedElements);
    }
    toggleEmailForm();
  };

  // Handle resize
  const handleResize = (newWidth: number, newHeight: number) => {
    setEditorState((prev) => ({
      ...prev,
      width: newWidth,
      height: newHeight,
    }));
  };

  return (
    <div className="flex flex-col w-full max-w-2xl editor-design">
      <ImageResizableContainer
        position={position}
        setPosition={setPosition}
        isDragging={isDragging}
        startDragging={startDragging}
        // width={editorState.width} // Use editorState width for resizing
        // height={editorState.height} // Use editorState height for resizing
        onResize={handleResize} // Pass resize handler
      >
        {/* <div className="flex flex-col items-center rounded-md shadow-md w-full h-full"> */}
        <img
          src={editorState?.content || "/placeholder.svg"}
          alt="uploaded"
          className="w-full h-full object-cover rounded-md pointer-events-none"
        />
        {/* </div> */}
        <div className="px-2 pb-2">
          <div className="bg-white pt-2 px-4">
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
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-red-500 hover:bg-red-50 rounded transition editor-delete"
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
