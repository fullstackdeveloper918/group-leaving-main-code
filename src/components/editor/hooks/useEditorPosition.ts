import { useState, useEffect } from "react";
import { Position } from "../types/editor";

export const useEditorPosition = () => {
  const [position, setPosition] = useState<Position>({
    x: 0,
    y: 0,
    width: 400,
    height: 300,
  });

  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Start dragging on mouse down
  const startDragging = (e: React.MouseEvent<HTMLDivElement>) => {
    // Don't drag if clicked on certain elements
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
      setPosition((prev) => ({
        ...prev,
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
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
  }, [isDragging, dragOffset]);

  // Center editor initially
  useEffect(() => {
    const centerEditor = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // setPosition((prev) => ({
      //   ...prev,
      //   x: (windowWidth - prev.width) / 2,
      //   y: (windowHeight - prev.height) / 3,
      // }));
    };

    centerEditor();
    window.addEventListener("resize", centerEditor);

    return () => {
      window.removeEventListener("resize", centerEditor);
    };
  }, []);

  return { position, setPosition, isDragging, startDragging };
};
