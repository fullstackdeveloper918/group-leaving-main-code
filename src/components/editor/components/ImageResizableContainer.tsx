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
  const containerRef = useRef<HTMLDivElement>(null);

  const handleResize = (
    e: React.MouseEvent,
    direction: "top-left" | "top-right" | "bottom-left" | "bottom-right"
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = containerRef.current?.offsetWidth || 200;
    const startHeight = containerRef.current?.offsetHeight || 200;
    const startLeft = position.x;
    const startTop = position.y;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;

      let delta = Math.max(dx, dy);
      if (direction.includes("left") || direction.includes("top")) {
        delta = -Math.min(dx, dy);
      }

      const newSize = Math.max(100, startWidth + delta);

      let newLeft = startLeft;
      let newTop = startTop;

      if (direction.includes("left")) {
        newLeft = startLeft + (startWidth - newSize);
      }

      if (direction.includes("top")) {
        newTop = startTop + (startHeight - newSize);
      }

      const updatedPosition: Position = {
        x: newLeft,
        y: newTop,
        width: newSize,
        height: newSize,
      };

      setPosition(updatedPosition);
      onResize?.(newSize, newSize);
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
        transform: `translate(${position.x}px, ${position.y}px)`,
        cursor: isDragging ? "grabbing" : "grab",
         border: "3px solid #44AAFF",
      }}
      onMouseDown={startDragging}
    >
      {/* Resizers */}
      <div
        className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-blue-400 cursor-nwse-resize"
        onMouseDown={(e) => handleResize(e, "top-left")}
      />
      <div
        className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-blue-400 cursor-nesw-resize"
        onMouseDown={(e) => handleResize(e, "top-right")}
      />
      <div
        className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-blue-400 cursor-nesw-resize"
        onMouseDown={(e) => handleResize(e, "bottom-left")}
      />
      <div
        className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-blue-400 cursor-nwse-resize"
        onMouseDown={(e) => handleResize(e, "bottom-right")}
      />
      {children}
    </div>
  );
};

export default ImageResizableContainer;
