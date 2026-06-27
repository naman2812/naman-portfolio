"use client";

import { motion, useAnimate } from "framer-motion";
import { useEffect, useState } from "react";
import { 
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, 
  SiPostgresql, SiPython, SiOpenai 
} from "react-icons/si";

const icons = [SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiPostgresql, SiPython, SiOpenai];
const brandColors = ["#61DAFB", "#ffffff", "#3178C6", "#06B6D4", "#339933", "#4169E1", "#3776AB", "#ffffff"];

export default function IconRevealText({ text }: { text: string }) {
  const [scope, animate] = useAnimate();
  const [hasAnimatedIn, setHasAnimatedIn] = useState(false);
  const words = text.split(" ");
  const letters = text.split("").filter(c => c !== " ");
  
  useEffect(() => {
    let isCancelled = false;
    
    const runAnimation = async () => {
      // 1. Animate icons in from above
      animate(".icon-svg", 
        { opacity: [0, 1], scale: [0.2, 1], y: [-50, 0], rotate: [-45, 0] },
        { duration: 0.8, delay: (el, i) => i * 0.05, type: "spring", bounce: 0.5 }
      );
      
      // 2. Wait a moment
      await new Promise(r => setTimeout(r, 2300));
      if (isCancelled) return;
      
      // 3. Animate icons out
      animate(".icon-svg", 
        { opacity: 0, scale: 0.5, rotate: 90 },
        { duration: 0.5, delay: (el, i) => i * 0.05, ease: "easeIn" }
      );
      
      // 4. Start letters in slightly after icons start going out
      await new Promise(r => setTimeout(r, 200));
      if (isCancelled) return;
      
      await animate(".actual-letter",
        { opacity: 1, scale: 1 },
        { duration: 0.5, delay: (el, i) => i * 0.05, type: "spring", stiffness: 200 }
      );
      
      if (!isCancelled) {
        setHasAnimatedIn(true);
      }
    };
    
    runAnimation();
    
    return () => { isCancelled = true; };
  }, [animate]);

  // Random auto-flips every 4 seconds
  useEffect(() => {
    if (!hasAnimatedIn) return;
    
    const interval = setInterval(() => {
      const randomIdx = Math.floor(Math.random() * letters.length);
      const iconTarget = scope.current.querySelectorAll('.icon-svg')[randomIdx];
      const letterTarget = scope.current.querySelectorAll('.actual-letter')[randomIdx];
      
      if (!iconTarget || !letterTarget) return;
      
      // Flip to icon
      animate(letterTarget, { opacity: 0, scale: 0.5 }, { duration: 0.2 });
      animate(iconTarget, { opacity: 1, scale: 1.3, rotate: 5 }, { duration: 0.3, type: "spring" });
      
      // Flip back after 1.5s
      setTimeout(() => {
        animate(iconTarget, { opacity: 0, scale: 0.5, rotate: 90 }, { duration: 0.2 });
        animate(letterTarget, { opacity: 1, scale: 1 }, { duration: 0.3, type: "spring" });
      }, 1500);
      
    }, 4000);
    
    return () => clearInterval(interval);
  }, [hasAnimatedIn, animate, letters.length, scope]);

  return (
    <div ref={scope} className="flex flex-wrap justify-center gap-4 md:gap-8 my-2">
      {words.map((word, wIdx) => {
        const letterOffset = words.slice(0, wIdx).join("").length;
        
        return (
          <div key={wIdx} className="flex gap-1 sm:gap-2">
            {word.split("").map((char, cIdx) => {
              const globalIdx = letterOffset + cIdx;
              const Icon = icons[globalIdx % icons.length];
              const color = brandColors[globalIdx % brandColors.length];
              
              return (
                <div 
                  key={cIdx} 
                  className="relative w-10 h-12 sm:w-12 sm:h-16 md:w-[60px] md:h-[60px] flex items-center justify-center cursor-pointer group"
                  onMouseEnter={() => {
                    if (!hasAnimatedIn) return;
                    const iconTarget = scope.current.querySelectorAll('.icon-svg')[globalIdx];
                    const letterTarget = scope.current.querySelectorAll('.actual-letter')[globalIdx];
                    animate(letterTarget, { opacity: 0, scale: 0.5 }, { duration: 0.2 });
                    animate(iconTarget, { opacity: 1, scale: 1.3, rotate: 5 }, { duration: 0.3, type: "spring" });
                  }}
                  onMouseLeave={() => {
                    if (!hasAnimatedIn) return;
                    const iconTarget = scope.current.querySelectorAll('.icon-svg')[globalIdx];
                    const letterTarget = scope.current.querySelectorAll('.actual-letter')[globalIdx];
                    animate(iconTarget, { opacity: 0, scale: 0.5, rotate: 90 }, { duration: 0.2 });
                    animate(letterTarget, { opacity: 1, scale: 1 }, { duration: 0.3, type: "spring" });
                  }}
                >
                  <motion.div
                    className="icon-svg absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
                    initial={{ opacity: 0, scale: 0.2, rotate: -45, y: -50 }}
                    style={{ color, filter: `drop-shadow(0 0 8px ${color}66)` }}
                  >
                    <Icon className="w-8 h-8 md:w-10 md:h-10" style={{ fill: 'currentColor' }} />
                  </motion.div>
                  
                  <motion.div
                    className="actual-letter absolute inset-0 flex items-center justify-center font-bold text-4xl sm:text-5xl md:text-[3rem] text-white z-20 pointer-events-none drop-shadow-lg"
                    initial={{ opacity: 0, scale: 0.5 }}
                  >
                    {char}
                  </motion.div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
