"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export const InfiniteMovingCards = ({
  items,
  speed = 2,
  className
}) => {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);
  const [direction, setDirection] = useState(-1); // -1 for left, 1 for right
  let position = 0;
  let animationFrame;

  useEffect(() => {
    startAnimation();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const startAnimation = () => {
    const animate = () => {
      if (!containerRef.current || !scrollerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      const scrollerWidth = scrollerRef.current.scrollWidth;

      position += direction * speed;

      // Reverse direction when the last card reaches the left edge
      if (position <= -(scrollerWidth - containerWidth)) {
        position = -(scrollerWidth - containerWidth); // Ensure it stops exactly at the edge
        setDirection(1); // Move right
      }
      // Reverse direction when the first card reaches the right edge
      else if (position >= 0) {
        position = 0; // Ensure it stops exactly at the edge
        setDirection(-1); // Move left
      }

      scrollerRef.current.style.transform = `translateX(${position}px)`;
      animationFrame = requestAnimationFrame(animate);
    };

    animate();
  };

  return (
    <div ref={containerRef} className={cn("overflow-hidden relative", className)}>
      <ul ref={scrollerRef} className="flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4">
        {items.map((item, idx) => (
          <li key={idx} className="w-[350px] max-w-full shrink-0 rounded-2xl border border-zinc-200 bg-gray-200 p-6">
            <blockquote>
              <span className="text-sm font-normal text-neutral-800 dark:text-gray-100">
                {item.quote}
              </span>
              <div className="mt-6 flex flex-row items-center">
                <span className="text-sm font-normal text-neutral-500 dark:text-gray-400">
                  {item.name}
                </span>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
