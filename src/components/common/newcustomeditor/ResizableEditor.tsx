import React, { useRef, useEffect } from "react";
import { Position } from "../../editor/types/editor";

type ResizeDirection =
  | "left"
  | "right"
  | "top"
  | "bottom"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

interface ResizableContainerProps {
  position?: Position;
  setPosition?: React.Dispatch<React.SetStateAction<Position>>;
  children: React.ReactNode;
  isDragging: boolean;
  startDragging: (
    e: React.MouseEvent<HTMLDivElement> | React.PointerEvent<HTMLDivElement>
  ) => void;
  onResize?: (width: number, height: number) => void;
  width: number;
  height: number;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  bounds?: { width: number; height: number };
}

const ResizableEditor: React.FC<ResizableContainerProps> = ({
  children,
  isDragging,
  startDragging,
  onResize,
  width,
  height,
  position,
  setPosition,
  minWidth = 50,
  minHeight = 50,
  maxWidth,
  maxHeight,
  bounds,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const activePointerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      activePointerRef.current = null;
    };
  }, []);

  const clamp = (value: number, min?: number, max?: number) => {
    if (typeof min === "number" && value < min) return min;
    if (typeof max === "number" && value > max) return max;
    return value;
  };

  const beginResize = (e: React.PointerEvent, dir: ResizeDirection) => {
    e.stopPropagation();
    e.preventDefault();

    const pointerId = e.pointerId;
    activePointerRef.current = pointerId;
    (e.target as Element).setPointerCapture?.(pointerId);

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = width;
    const startHeight = height;
    const startLeft = position?.x ?? 0;
    const startTop = position?.y ?? 0;

    const prevUserSelect = document.body.style.userSelect;
    const prevPointerEvents = containerRef.current?.style.pointerEvents;
    document.body.style.userSelect = "none";
    if (containerRef.current) containerRef.current.style.pointerEvents = "none";

    const onPointerMove = (moveEvent: PointerEvent) => {
      if (moveEvent.pointerId !== activePointerRef.current) return;
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;

      let newWidth = startWidth;
      let newHeight = startHeight;
      let newX = startLeft;
      let newY = startTop;

      if (dir.includes("right")) newWidth = startWidth + dx;
      if (dir.includes("left")) {
        newWidth = startWidth - dx;
        newX = startLeft + dx;
      }

      if (dir.includes("bottom")) newHeight = startHeight + dy;
      if (dir.includes("top")) {
        newHeight = startHeight - dy;
        newY = startTop + dy;
      }

      newWidth = clamp(newWidth, minWidth, maxWidth);
      newHeight = clamp(newHeight, minHeight, maxHeight);

      if (bounds) {
        if (newX < 0) {
          const overflow = -newX;
          newX = 0;
          newWidth = Math.max(minWidth, newWidth - overflow);
        }
        if (newY < 0) {
          const overflow = -newY;
          newY = 0;
          newHeight = Math.max(minHeight, newHeight - overflow);
        }
        if (newX + newWidth > bounds.width) {
          newWidth = Math.max(minWidth, bounds.width - newX);
        }
        if (newY + newHeight > bounds.height) {
          newHeight = Math.max(minHeight, bounds.height - newY);
        }
      }

      if (setPosition && position) {
        setPosition((prev) => ({
          ...(prev ?? { x: startLeft, y: startTop, width: startWidth, height: startHeight }),
          x: newX,
          y: newY,
          width: newWidth,
          height: newHeight,
        }));
      } else {
        onResize?.(newWidth, newHeight);
      }
    };

    const onPointerUp = (upEvent: PointerEvent) => {
      if (upEvent.pointerId === activePointerRef.current) {
        activePointerRef.current = null;
        document.removeEventListener("pointermove", onPointerMove);
        document.removeEventListener("pointerup", onPointerUp);
        document.body.style.userSelect = prevUserSelect;
        if (containerRef.current) containerRef.current.style.pointerEvents = prevPointerEvents ?? "";
        try {
          (e.target as Element).releasePointerCapture?.(pointerId);
        } catch {}
      }
    };

    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerup", onPointerUp);
  };

  const Handle = (props: {
    className: string;
    direction: ResizeDirection;
    ariaLabel?: string;
    style?: React.CSSProperties;
  }) => (
    <div
      role="separator"
      aria-label={props.ariaLabel ?? `resize-${props.direction}`}
      className={props.className}
      onPointerDown={(e) => beginResize(e, props.direction)}
      style={{
        ...props.style,
        background: "transparent",
        zIndex: 50,
      }}
    />
  );

  const inlineStyles: React.CSSProperties = {
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
    position: "relative",
    cursor: isDragging ? "grabbing" : "grab",
    border: "2px solid #44AAFF",
    userSelect: "none",
    boxSizing: "border-box",
  };

  return (
    <div ref={containerRef} style={inlineStyles} onPointerDown={startDragging}>
      {/* Edge handles */}
      <Handle direction="left" className="absolute top-1/2 left-0 -translate-y-1/2"
        style={{ width: 12, height: 36, marginLeft: -6, cursor: "w-resize" }} />
      <Handle direction="right" className="absolute top-1/2 right-0 -translate-y-1/2"
        style={{ width: 12, height: 36, marginRight: -6, cursor: "e-resize" }} />
      <Handle direction="top" className="absolute top-0 left-1/2 -translate-x-1/2"
        style={{ width: 36, height: 12, marginTop: -6, cursor: "n-resize" }} />
      <Handle direction="bottom" className="absolute bottom-0 left-1/2 -translate-x-1/2"
        style={{ width: 36, height: 12, marginBottom: -6, cursor: "s-resize" }} />

      <Handle direction="top-left" className="absolute top-0 left-0"
        style={{ width: 12, height: 12, marginLeft: -6, marginTop: -6, cursor: "nwse-resize" }} />
      <Handle direction="top-right" className="absolute top-0 right-0"
        style={{ width: 12, height: 12, marginRight: -6, marginTop: -6, cursor: "nesw-resize" }} />
      <Handle direction="bottom-left" className="absolute bottom-0 left-0"
        style={{ width: 12, height: 12, marginLeft: -6, marginBottom: -6, cursor: "nesw-resize" }} />
      <Handle direction="bottom-right" className="absolute bottom-0 right-0"
        style={{ width: 12, height: 12, marginRight: -6, marginBottom: -6, cursor: "nwse-resize" }} />

      <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>{children}</div>
    </div>
  );
};

export default ResizableEditor;
