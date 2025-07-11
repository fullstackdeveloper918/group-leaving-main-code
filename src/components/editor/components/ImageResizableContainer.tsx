import React, { useRef, ReactNode } from "react";
import { Position } from "../types/editor";

interface ResizableContainerProps {
  children: ReactNode;
  position: Position;
  width: number;
  height: number;
  onResize?: (newWidth: number, newHeight: number) => void;
  setPosition: (position: Position) => void;
  isDragging: boolean;
  startDragging: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const ImageResizableContainer: React.FC<ResizableContainerProps> = ({
  children,
  position,
  width,
  height,
  setPosition,
  isDragging,
  startDragging,
  onResize,
}) => {
  const containerRef = useRef<any>(null);

  const handleResize = (
    e: React.MouseEvent,
    direction:
      | "top-left"
      | "top-right"
      | "bottom-left"
      | "bottom-right"
      | "left"
      | "right"
      | "top"
      | "bottom"
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = width;
    const startHeight = height;

    const onMouseMove = (moveEvent: MouseEvent) => {
      moveEvent.preventDefault();
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;

      let newWidth = startWidth;
      let newHeight = startHeight;

      if (direction.includes("right")) {
        newWidth = Math.max(50, startWidth + dx);
      }
      if (direction.includes("left")) {
        newWidth = Math.max(50, startWidth - dx);
      }

      if (direction.includes("bottom")) {
        newHeight = Math.max(50, startHeight + dy);
      }
      if (direction.includes("top")) {
        newHeight = Math.max(50, startHeight - dy);
      }

      // Call onResize with the new dimensions
      if (onResize) {
        onResize(newWidth, newHeight);
      }
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
      // ref={containerRef}
      className="relative"
      style={{
        width,
        height,
        // transform: `translate(${position.x}px, ${position.y}px)`,
        cursor: isDragging ? "grabbing" : "grab",
        border: "3px solid #44AAFF",
      }}
      onMouseDown={startDragging}
    >
      <div
        className="absolute top-0 left-0 w-4 h-4 bg-blue-400 rounded-full cursor-nwse-resize z-10"
        style={{ transform: "translate(-50%, -50%)" }}
        onMouseDown={(e) => handleResize(e, "top-left")}
      />
      <div
        className="absolute top-0 right-0 w-4 h-4 bg-blue-400 rounded-full cursor-nesw-resize z-10"
        style={{ transform: "translate(50%, -50%)" }}
        onMouseDown={(e) => handleResize(e, "top-right")}
      />
      <div
        className="absolute bottom-0 left-0 w-4 h-4 bg-blue-400 rounded-full cursor-nesw-resize z-10"
        style={{ transform: "translate(-50%, 50%)" }}
        onMouseDown={(e) => handleResize(e, "bottom-left")}
      />
      <div
        className="absolute bottom-0 right-0 w-4 h-4 bg-blue-400 rounded-full cursor-nwse-resize z-10"
        style={{ transform: "translate(50%, 50%)" }}
        onMouseDown={(e) => handleResize(e, "bottom-right")}
      />
      <div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-blue-400 rounded cursor-n-resize z-10"
        style={{ transform: "translate(-50%, -50%)" }}
        onMouseDown={(e) => handleResize(e, "top")}
      />
      <div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-blue-400 rounded cursor-s-resize z-10"
        style={{ transform: "translate(-50%, 50%)" }}
        onMouseDown={(e) => handleResize(e, "bottom")}
      />
      <div
        className="absolute top-1/2 left-0 transform -translate-y-1/2 h-6 w-2 bg-blue-400 rounded cursor-w-resize z-10"
        style={{ transform: "translate(-50%, -50%)" }}
        onMouseDown={(e) => handleResize(e, "left")}
      />
      <div
        className="absolute top-1/2 right-0 transform -translate-y-1/2 h-6 w-2 bg-blue-400 rounded cursor-e-resize z-10"
        style={{ transform: "translate(50%, -50%)" }}
        onMouseDown={(e) => handleResize(e, "right")}
      />
      {children}
    </div>
  );
};

export default ImageResizableContainer;
