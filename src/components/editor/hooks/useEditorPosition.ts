import { useState, useEffect } from "react";
import { Position } from "../types/editor";

interface UseEditorPositionProps {
  initialX?: number;
  initialY?: number;
  slideWidth?: number;
  slideHeight?: number;
  editorWidth?: number;
  editorHeight?: number;
}

export const useEditorPosition = ({
  initialX = 0,
  initialY = 0,
  slideWidth = 500,
  slideHeight = 650,
  editorWidth = 400,
  editorHeight = 300,
}: UseEditorPositionProps) => {
  const [position, setPosition] = useState<Position>({
    x: Math.max(0, Math.min(initialX, slideWidth - editorWidth)),
    y: Math.max(0, Math.min(initialY, slideHeight - editorHeight)),
    width: editorWidth,
    height: editorHeight,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Start dragging on mouse down
  const startDragging = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      (e.target as HTMLElement).contentEditable === "true" ||
      (e.target as HTMLElement).tagName === "BUTTON" ||
      (e.target as HTMLElement).tagName === "INPUT" ||
      (e.target as HTMLElement).closest("button") ||
      (e.target as HTMLElement).closest("input")
    ) {
      return;
    }

    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  // Handle dragging logic
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate new x and y, ensuring they stay within slide boundaries
      const newX = Math.max(0, Math.min(e.clientX - dragOffset.x, slideWidth - position.width));
      const newY = Math.max(0, Math.min(e.clientY - dragOffset.y, slideHeight - position.height));

      setPosition((prev) => ({
        ...prev,
        x: newX,
        y: newY,
      }));
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset, slideWidth, slideHeight, position.width, position.height]);

  return { position, setPosition, isDragging, startDragging };
};