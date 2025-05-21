import { useState, useEffect } from "react";
import { Position } from "../types/editor";

export const useEditorPosition = (initialX: number = 0, initialY: number = 0) => {
  const SLIDE_WIDTH = 500;
  const SLIDE_HEIGHT = 650;

  const [position, setPosition] = useState<any>({
    x: initialX,
    y: initialY,
    width: 400,
    height: 300,
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
      const newX = Math.min(Math.max(e.clientX - dragOffset.x, 0), SLIDE_WIDTH - position.width);
      const newY = Math.min(Math.max(e.clientY - dragOffset.y, 0), SLIDE_HEIGHT - position.height);

      setPosition((prev: any) => ({
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
  }, [isDragging, dragOffset, position.width, position.height]);

  // Center editor initially
  useEffect(() => {
    const centerEditor = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      setPosition((prev: any) => ({
        ...prev,
        x: Math.min(Math.max((windowWidth - prev.width) / 2, 0), SLIDE_WIDTH - prev.width),
        y: Math.min(Math.max((windowHeight - prev.height) / 3, 0), SLIDE_HEIGHT - prev.height),
      }));
    };

    centerEditor();
    window.addEventListener("resize", centerEditor);

    return () => {
      window.removeEventListener("resize", centerEditor);
    };
  }, []);

  return { position, setPosition, isDragging, startDragging };
};