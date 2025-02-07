"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DragDropMobileDesktop() {
  const [items, setItems] = useState([
    "Kfc",
    "Kebab",
    "Burger King",
    "Mac Donald",
  ]);
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

    // Infos :
    // clientY → Position verticale (haut/bas).
    // clientX → Position horizontale (gauche/droite).
    // On n'utilise pas ici le clientX (pas besoins)
  };

  const moveDrag = (event: React.TouchEvent | React.MouseEvent) => {
    if (
      !isDragging.current ||
      draggedItemRef.current === null ||
      startY.current === null
    ) {
      return;
    }

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

    // Infos :
    // deltaY permet de savoir si la souris (ou le doigt)
    // se déplace vers le haut ou vers le bas.
  };

  const endDrag = () => {
    isDragging.current = false;
    draggedItemRef.current = null;
    startY.current = null;
  };

  return (
    <div className="w-full">
      <AnimatePresence>
        {items.map((item, index) => (
          <motion.div
            key={item} // Use item content as key to avoid breaking animation
            className={`p-4 mb-2 rounded-lg text-center shadow-md cursor-pointer relative transition-colors
              ${
                draggedItemRef.current === index
                  ? "bg-blue-700 text-white"
                  : "bg-slate-800"
              }`}
            style={{ userSelect: "none" }} // Désactive la sélection uniquement ici
            onTouchStart={(e) => startDrag(index, e)}
            onTouchMove={moveDrag}
            onTouchEnd={endDrag}
            onMouseDown={(e) => startDrag(index, e)}
            onMouseMove={moveDrag}
            onMouseUp={endDrag}
            layout // Enables smooth animation when reordering
            whileTap={{ scale: 1 }} // Slight scale-up on press
            transition={{ type: "spring", stiffness: 500, damping: 15 }} // Smooth bounce effect
          >
            {item}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
