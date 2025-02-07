"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DragDropMobileDesktop() {
  const [items, setItems] = useState(["Item 1", "Item 2", "Item 3", "Item 4"]);
  const draggedItemRef = useRef<number | null>(null);
  const startY = useRef<number | null>(null);
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
    startY.current = isTouch.current
      ? (event as React.TouchEvent).touches[0].clientY
      : (event as React.MouseEvent).clientY;
    isDragging.current = true;
  };

  const moveDrag = (event: React.TouchEvent | React.MouseEvent) => {
    if (
      !isDragging.current ||
      draggedItemRef.current === null ||
      startY.current === null
    )
      return;

    const currentY = isTouch.current
      ? (event as React.TouchEvent).touches[0].clientY
      : (event as React.MouseEvent).clientY;
    const deltaY = currentY - startY.current;

    let newIndex = draggedItemRef.current;
    if (deltaY > 30) newIndex = Math.min(newIndex + 1, items.length - 1);
    if (deltaY < -30) newIndex = Math.max(newIndex - 1, 0);

    if (newIndex !== draggedItemRef.current) {
      const updatedItems = [...items];
      const [draggedItem] = updatedItems.splice(draggedItemRef.current, 1);
      updatedItems.splice(newIndex, 0, draggedItem);
      setItems(updatedItems);
      draggedItemRef.current = newIndex;
      startY.current = currentY;
    }
  };

  const endDrag = () => {
    isDragging.current = false;
    draggedItemRef.current = null;
    startY.current = null;
  };

  return (
    <div className="p-4 max-w-sm mx-auto w-full">
      <AnimatePresence>
        {items.map((item, index) => (
          <motion.div
            key={item} // Use item content as key to avoid breaking animation
            className="p-4 bg-slate-700 mb-2 rounded-lg text-center shadow-md cursor-pointer relative"
            onTouchStart={(e) => startDrag(index, e)}
            onTouchMove={moveDrag}
            onTouchEnd={endDrag}
            onMouseDown={(e) => startDrag(index, e)}
            onMouseMove={moveDrag}
            onMouseUp={endDrag}
            layout // ✅ Enables smooth animation when reordering
            whileTap={{ scale: 1.05 }} // ✅ Slight scale-up on press
            transition={{ type: "spring", stiffness: 500, damping: 30 }} // ✅ Smooth bounce effect
          >
            {item}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
