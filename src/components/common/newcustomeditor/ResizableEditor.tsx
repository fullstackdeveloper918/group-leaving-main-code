import React, { useRef, ReactNode } from "react";
import { Position } from "../../editor/types/editor";

interface ResizableContainerProps {
  position?: Position;
  setPosition?: React.Dispatch<React.SetStateAction<Position>>;
  children: ReactNode;
  isDragging: boolean;
  startDragging: (e: React.MouseEvent<HTMLDivElement>) => void;
  onResize?: (width: number, height: number) => void;
  width: number;
  height: number;
}

const ResizableEditor: React.FC<ResizableContainerProps> = ({
  children,
  isDragging,
  startDragging,
  onResize,
  width,
  height,
}) => {
  const containerRef = useRef<any>(null);

  const handleResize = (e: React.MouseEvent, direction: "left" | "right") => {
    e.preventDefault();
    e.stopPropagation();

    const startX = e.clientX;
    const startWidth = width;

    const onMouseMove = (moveEvent: any) => {
      const dx = moveEvent.clientX - startX;
      let newWidth = startWidth;

      if (direction === "right") {
        newWidth = Math.max(50, startWidth + dx);
      }
      if (direction === "left") {
        newWidth = Math.max(50, startWidth - dx);
      }

      onResize?.(newWidth, height);
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{
        width,
        height,
        cursor: isDragging ? "move" : "move",
        border: "3px solid #44AAFF",
      }}
      onMouseDown={startDragging}
    >
      <div
        className="absolute top-1/2 left-0 transform -translate-y-1/2 h-3 w-1 cursor-w-resize"
        onMouseDown={(e) => handleResize(e, "left")}
      />
      <div
        className="absolute top-1/2 right-0 transform -translate-y-1/2 h-3 w-1 cursor-e-resize"
        onMouseDown={(e) => handleResize(e, "right")}
      />
      {children}
    </div>
  );
};

export default ResizableEditor;
