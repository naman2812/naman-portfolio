"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MousePointer2 } from "lucide-react";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isHoveringTile, setIsHoveringTile] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [cursorLabel, setCursorLabel] = useState<string | null>(null);
  const [cursorColor, setCursorColor] = useState<string>("text-primary");
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if user is on a touch device or mobile width
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;
    if (isTouchDevice) {
      setIsHidden(true);
      return; // Do not apply custom cursor logic on mobile
    }

    document.body.style.cursor = "none";
    const style = document.createElement("style");
    style.innerHTML = `* { cursor: none !important; }`;
    document.head.appendChild(style);

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // 1. Magnetic Snap (Hide cursor)
      if (target.closest("[data-cursor-hide='true']")) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      // 2. Cursor Tooltips
      const labelElement = target.closest("[data-cursor-label]");
      if (labelElement) {
        setCursorLabel(labelElement.getAttribute("data-cursor-label"));
      } else {
        setCursorLabel(null);
      }

      // 3. Color Morphing
      const colorElement = target.closest("[data-cursor-color]");
      if (colorElement) {
        setCursorColor(colorElement.getAttribute("data-cursor-color") || "text-primary");
      } else {
        setCursorColor("text-primary");
      }

      const isTile = !!target.closest(".group");
      const isInteractive = !!(
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button")
      );

      setIsHoveringTile(isTile && !isInteractive);
      setIsHovering(isInteractive);
    };

    // 4. Click Ripple Effect
    const handleClick = (e: MouseEvent) => {
      const newRipple = { id: Date.now(), x: e.clientX, y: e.clientY };
      setRipples((prev) => [...prev, newRipple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 600);
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("click", handleClick);
      
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
      document.body.style.cursor = "auto";
    };
  }, []);

  // Map text color class to border color class for ripples
  const rippleColor = cursorColor.replace('text-', 'border-');

  return (
    <>
      {/* Ripples */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className={`fixed pointer-events-none z-[9998] border-2 rounded-full ${rippleColor}`}
          initial={{ top: ripple.y - 10, left: ripple.x - 10, width: 20, height: 20, opacity: 0.8 }}
          animate={{ top: ripple.y - 40, left: ripple.x - 40, width: 80, height: 80, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      ))}

      {/* Main Cursor with Blend Mode */}
      <motion.div
        className={`fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference transition-colors duration-300 ${cursorColor}`}
        style={{ originX: 0.1, originY: 0.1 }}
        animate={{
          x: mousePosition.x - 2,
          y: mousePosition.y - 2,
          scale: isHidden ? 0 : isHovering ? 1.4 : isHoveringTile ? 1.15 : 1,
          rotate: isHovering ? -15 : isHoveringTile ? -5 : 0,
          opacity: isHidden ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25, mass: 0.5 }}
      >
        <MousePointer2 
          size={28} 
          className="fill-current stroke-[1.5px]" 
          style={{ filter: 'drop-shadow(0 0 8px currentColor)' }}
        />

        {/* Tooltip Label */}
        <AnimatePresence>
          {cursorLabel && !isHidden && (
            <motion.div
              initial={{ opacity: 0, x: 10, y: 10 }}
              animate={{ opacity: 1, x: 20, y: 20 }}
              exit={{ opacity: 0, x: 10, y: 10 }}
              className="absolute left-full top-full mt-2 ml-2 whitespace-nowrap bg-white text-black text-xs font-bold font-mono px-2 py-1 rounded shadow-xl mix-blend-normal"
            >
              {cursorLabel}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
