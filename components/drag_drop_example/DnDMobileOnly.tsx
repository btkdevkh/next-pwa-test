"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const DnDMobileOnly = () => {
  const [items, setItems] = useState([
    "KFC",
    "Burger King",
    "MacDonald",
    "Kebab",
    "Pizza",
  ]);
  const draggedItemRef = useRef<number | null>(null);
  const touchY = useRef<number | null>(null);
  const itemPositions = useRef<number[]>([]);

  useEffect(() => {
    // Prevent scrolling while dragging
    const handleTouchMove = (event: TouchEvent) => event.preventDefault();
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => document.removeEventListener("touchmove", handleTouchMove);
  }, []);

  const handleTouchStart = (index: number, event: React.TouchEvent) => {
    draggedItemRef.current = index;
    touchY.current = event.touches[0].clientY;
    itemPositions.current = items.map((_, i) => i); // Save positions
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    if (draggedItemRef.current === null || touchY.current === null) return;

    const moveY = event.touches[0].clientY;
    const deltaY = moveY - touchY.current;

    // Calculate new position based on delta
    let newIndex = draggedItemRef.current;
    if (deltaY > 30) newIndex = Math.min(newIndex + 1, items.length - 1);
    if (deltaY < -30) newIndex = Math.max(newIndex - 1, 0);

    if (newIndex !== draggedItemRef.current) {
      const updatedItems = [...items];
      const [draggedItem] = updatedItems.splice(draggedItemRef.current, 1);
      updatedItems.splice(newIndex, 0, draggedItem);
      setItems(updatedItems);
      draggedItemRef.current = newIndex;
      touchY.current = moveY;
    }
  };

  const handleTouchEnd = () => {
    draggedItemRef.current = null;
    touchY.current = null;
  };

  return (
    <>
      <AnimatePresence>
        {items.map((item, index) => (
          <motion.div
            key={index}
            className="p-4 bg-blue-200 mb-2 rounded-lg text-center shadow-md cursor-pointer relative"
            onTouchStart={(e) => handleTouchStart(index, e)}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            layout // Ensures smooth movement transition
            animate={{ top: draggedItemRef.current === index ? 10 : 0 }} // Keeps item from jumping
            whileDrag={{ scale: 1.05, opacity: 0.9 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {item}
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
};

export default DnDMobileOnly;
