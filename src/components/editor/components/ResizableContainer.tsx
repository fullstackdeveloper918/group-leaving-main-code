import React, { useRef, ReactNode, useState, useEffect } from "react";
import { Position } from "../types/editor";

interface ResizableContainerProps {
  children: ReactNode;
  position: Position;
  setPosition: (position: Position) => void;
  isDragging: boolean;
  startDragging: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const ResizableContainer: React.FC<ResizableContainerProps> = ({
  children,
  position,
  setPosition,
  isDragging,
  startDragging,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // 🆕 Track if moved at least once
  const [hasMoved, setHasMoved] = useState(false);

  useEffect(() => {
    if (position.x !== 0 || position.y !== 0) {
      setHasMoved(true);
    }
  }, [position.x, position.y]);

  const handleResize = (
    e: React.MouseEvent,
    direction: "top-left" | "top-right" | "bottom-left" | "bottom-right"
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = containerRef.current?.offsetWidth || 0;
    const startHeight = containerRef.current?.offsetHeight || 0;
    const startLeft = position.x;
    const startTop = position.y;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      moveEvent.preventDefault();

      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;

      let newWidth = startWidth;
      let newHeight = startHeight;
      let newLeft = startLeft;
      let newTop = startTop;

      if (direction === "top-left" || direction === "bottom-left") {
        newWidth = Math.max(200, startWidth - dx);
        newLeft = startLeft + (startWidth - newWidth);
      } else {
        newWidth = Math.max(200, startWidth + dx);
      }

      if (direction === "top-left" || direction === "top-right") {
        newHeight = Math.max(100, startHeight - dy);
        newTop = startTop + (startHeight - newHeight);
      } else {
        newHeight = Math.max(100, startHeight + dy);
      }

      setPosition({
        x: newLeft,
        y: newTop,
        width: newWidth,
        height: newHeight,
      });

      setHasMoved(true); // set moved during resizing too
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      ref={containerRef}
      className={`relative ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
      style={{
        width: position.width,
        height: position.height,
        // transform: `translate(${position.x}px, ${position.y}px)`,
        transition: !hasMoved ? "none" : "transform 0.1s ease",
        // border: "3px solid #44AAFF",
      }}
      onMouseDown={(e) => {
        startDragging(e);
        setHasMoved(true); // when dragging starts, mark as moved
      }}               
    >
      {/* Resize handles */}
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

export default ResizableContainer;
