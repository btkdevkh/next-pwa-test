"use client";

import { useState, useRef, useEffect } from "react";
import { Category } from "@/models/Category";
import { motion, AnimatePresence } from "framer-motion";

type DragDropHorizontalProps = {
  data: Category[];
};

const DragDropHorizontal = ({ data }: DragDropHorizontalProps) => {
  const [items, setItems] = useState(data);
  const draggedItemRef = useRef<number | null>(null);
  const startX = useRef<number | null>(null);
  const isTouch = useRef<boolean>(false);
  const isDragging = useRef<boolean>(false);

  useEffect(() => {
    const handleTouchMove = (event: TouchEvent) => event.preventDefault();
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => document.removeEventListener("touchmove", handleTouchMove);
  }, []);

  const startDrag = (
    index: number,
    event: React.TouchEvent | React.MouseEvent
  ) => {
    isTouch.current = "touches" in event;
    draggedItemRef.current = index;
    startX.current = isTouch.current
      ? (event as React.TouchEvent).touches[0].clientX
      : (event as React.MouseEvent).clientX;
    isDragging.current = true;
  };

  const moveDrag = (event: React.TouchEvent | React.MouseEvent) => {
    if (
      !isDragging.current ||
      draggedItemRef.current === null ||
      startX.current === null
    ) {
      return;
    }

    const currentX = isTouch.current
      ? (event as React.TouchEvent).touches[0].clientX
      : (event as React.MouseEvent).clientX;

    const deltaX = currentX - startX.current;

    let newIndex = draggedItemRef.current;
    if (deltaX > 20) newIndex = Math.min(newIndex + 1, items.length - 1);
    if (deltaX < -20) newIndex = Math.max(newIndex - 1, 0);

    if (newIndex !== draggedItemRef.current) {
      const updatedItems = [...items];
      const [draggedItem] = updatedItems.splice(draggedItemRef.current, 1);
      updatedItems.splice(newIndex, 0, draggedItem);
      setItems(updatedItems);
      draggedItemRef.current = newIndex;
      startX.current = currentX;
    }
  };

  const endDrag = () => {
    isDragging.current = false;
    draggedItemRef.current = null;
    startX.current = null;
  };

  return (
    <AnimatePresence>
      <div className="grid grid-cols-3 gap-1 w-full overflow-hidden">
        {items.map((item, index) => (
          <div key={item.id} className="text-center w-full">
            {item.data.map((datum) => (
              <motion.div
                key={datum.id}
                className={`p-3 mb-2 text-center shadow-md cursor-pointer relative transition-colors
              ${
                draggedItemRef.current === index
                  ? "bg-slate-700 text-white"
                  : "bg-slate-800"
              }`}
                // style={{ userSelect: "none" }}
                onTouchStart={(e) => startDrag(index, e)}
                onTouchMove={moveDrag}
                onTouchEnd={endDrag}
                onMouseDown={(e) => startDrag(index, e)}
                onMouseMove={moveDrag}
                onMouseUp={endDrag}
                onMouseLeave={endDrag}
                layout
                whileTap={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 50,
                }}
              >
                {datum.text}
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </AnimatePresence>
  );
};

export default DragDropHorizontal;
