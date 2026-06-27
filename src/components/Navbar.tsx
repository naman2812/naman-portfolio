"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Education", href: "#education" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects-showcase" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      // Offset by 100px so it doesn't get hidden under the navbar itself
      const top = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: "smooth" });
      
      // Add a soft, animated glow to the targeted element
      element.classList.add("!border-primary/30", "!bg-primary/[0.03]", "scale-[1.02]", "shadow-[0_0_40px_rgba(59,130,246,0.15)]", "transition-all", "duration-1000");
      setTimeout(() => {
        element.classList.remove("!border-primary/30", "!bg-primary/[0.03]", "scale-[1.02]", "shadow-[0_0_40px_rgba(59,130,246,0.15)]");
      }, 1500);

    } else if (href === "#home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 inset-x-0 z-[100] transition-all duration-500 flex justify-center pointer-events-none",
        scrolled ? "py-4" : "py-6 md:py-8"
      )}
    >
      <div
        className={cn(
          "flex flex-wrap items-center justify-center gap-1 md:gap-4 px-4 md:px-6 py-2.5 rounded-full transition-all duration-500 border pointer-events-auto",
          scrolled
            ? "bg-neutral-950/80 backdrop-blur-xl border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.8)]"
            : "bg-black/20 backdrop-blur-md border-white/5 shadow-xl"
        )}
      >
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            onClick={(e) => handleClick(e, item.href)}
            className="text-xs md:text-sm font-mono text-neutral-400 hover:text-primary transition-colors px-2 md:px-3 py-1 cursor-pointer"
            data-cursor-hide="true"
          >
            {item.name}
          </a>
        ))}
      </div>
    </nav>
  );
}
