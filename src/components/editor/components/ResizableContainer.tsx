import React, { useRef, ReactNode } from "react";
import { Position } from "../types/editor";

interface ResizableContainerProps {
  children: ReactNode;
  isDragging: boolean;
  startDragging: (e: React.MouseEvent<HTMLDivElement>) => void;
  onResize?: (width: number, height: number) => void;
  width: number; // ✅ NEW
  height: number; // ✅ NEW
}



const ImageResizableContainer: React.FC<ResizableContainerProps> = ({
  children,
  isDragging,
  startDragging,
  onResize,
  width,   // ✅ NEW
  height,  // ✅ NEW
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
    // const startLeft = position.x;
    // const startTop = position.y;

    const onMouseMove = (moveEvent: any) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;

      let newWidth = startWidth;
      let newHeight = startHeight;
      // let newLeft = startLeft;
      // let newTop = startTop;

      if (direction.includes("right")) {
        newWidth = Math.max(50, startWidth + dx);
      }
      if (direction.includes("left")) {
        newWidth = Math.max(50, startWidth - dx);
        // newLeft = startLeft + dx;
      }

      if (direction.includes("bottom")) {
        newHeight = Math.max(50, startHeight + dy);
      }
      if (direction.includes("top")) {
        newHeight = Math.max(50, startHeight - dy);
        // newTop = startTop + dy;
      }

      // setPosition({
      //   x: newLeft,
      //   y: newTop,
      //   width: newWidth,
      //   height: newHeight,
      // });

      onResize?.(newWidth, newHeight);
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
        // transform: `translate(${position.x}px, ${position.y}px)`,
        cursor: isDragging ? "grabbing" : "grab",
        border: "3px solid #44AAFF",
      }}
      onMouseDown={startDragging}
    >
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
      <div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-1 cursor-n-resize"
        onMouseDown={(e) => handleResize(e, "top")}
      />
      <div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-1 cursor-s-resize"
        onMouseDown={(e) => handleResize(e, "bottom")}
      />
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

export default ImageResizableContainer;