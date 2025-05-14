import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "quill-emoji/dist/quill-emoji.css";
import { useEditorPosition } from "../hooks/useEditorPosition";

interface TextEditorProps {
  onHide: () => void;
  setElements: React.Dispatch<React.SetStateAction<any[]>>;
  elements: any[];
  selectedElement: any;
  content?: string;
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
  content,
  cardIndex,
}) => {
  const { position, setPosition, isDragging, startDragging } = useEditorPosition(
    selectedElement?.x || 0,
    selectedElement?.y || 0
  );
  const [textContent, setTextContent] = useState(content || "");
  const [fontSize, setFontSize] = useState(selectedElement?.fontSize || "16px");
  const [fontFamily, setFontFamily] = useState(selectedElement?.fontFamily || "Arial");
  const [fontWeight, setFontWeight] = useState(selectedElement?.fontWeight || "normal");
  const [color, setColor] = useState(selectedElement?.color || "#000000");

  useEffect(() => {
    if (selectedElement) {
      setPosition({
        x: Math.max(0, selectedElement.x || 0),
        y: Math.max(0, selectedElement.y || 0),
        width: selectedElement.width || 300,
        height: selectedElement.height || 200,
      });
      setTextContent(selectedElement.content || "");
      setFontSize(selectedElement.fontSize || "16px");
      setFontFamily(selectedElement.fontFamily || "Arial");
      setFontWeight(selectedElement.fontWeight || "normal");
      setColor(selectedElement.color || "#000000");
    }
  }, [selectedElement, setPosition]);

  const handleSave = () => {
    const newElement = {
      type: "text",
      content: textContent,
      slideIndex: cardIndex.activeSlide,
      x: Math.max(0, position.x),
      y: Math.max(0, position.y),
      fontSize,
      fontFamily,
      fontWeight,
      color,
    };

    if (typeof cardIndex.original === "number") {
      setElements((prev) =>
        prev.map((el, i) =>
          i === cardIndex.original ? { ...el, ...newElement } : el
        )
      );
    } else {
      setElements((prev) => [...prev, newElement]);
    }

    onHide();
  };

  return (
    <div
      className="flex flex-col w-full max-w-2xl editor-design"
      style={{ border: "3px solid #44AAFF" }}
    >
      <div
        className="relative p-2"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          cursor: isDragging ? "grabbing" : "grab",
        }}
        onMouseDown={startDragging}
      >
        <ReactQuill
          value={textContent}
          onChange={setTextContent}
          style={{ backgroundColor: "white", minHeight: "100px" }}
        />
        <div className="mt-2 flex gap-2">
          <select
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            className="px-2 py-1 border rounded"
          >
            <option value="12px">12px</option>
            <option value="16px">16px</option>
            <option value="20px">20px</option>
            <option value="24px">24px</option>
          </select>
          <select
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
            className="px-2 py-1 border rounded"
          >
            <option value="Arial">Arial</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
          </select>
          <select
            value={fontWeight}
            onChange={(e) => setFontWeight(e.target.value)}
            className="px-2 py-1 border rounded"
          >
            <option value="normal">Normal</option>
            <option value="bold">Bold</option>
          </select>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="px-2 py-1 border rounded"
          />
        </div>
        <div className="flex justify-center gap-2 py-2">
          <button
            onClick={onHide}
            className="px-4 py-2 text-red-500 hover:bg-red-50 rounded transition"
            style={{ color: "red" }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-[#061178] text-white rounded hover:bg-indigo-800 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextEditor;