"use client";

const starters = {
  gyoza: {
    title: "Vegetable Gyoza",
    desc: "Pan-fried dumplings filled with seasonal vegetables and aromatic herbs"
  },
  baoBuns: {
    title: "Mushroom Bao Buns",
    desc: "Steamed fluffy buns filled with braised shiitake mushrooms and pickled vegetables"
  }, 
  tempura: {
    title: "Vegetable Tempura",
    desc: "Light and crispy seasonal vegetables served with a delicate dipping sauce"
  }, 
  edamame: {
    title: "Edamame",
    desc: "Freshly steamed edamame seasoned with salt and sesame seeds"
  },
  seaweedSalad: {
    title: "Seaweed Salad",
    desc: "Wakame seaweed coated in a flavorful, savory dressing."
  }
}

const entrees = {
  tofuCurry: {
    title: "House Special Tofu Curry",
    desc: "Stir-fried tofu coated in a spicy curry. Served with choice of white or brown rice."
  },
  ramen: {
    title: "Mushroom Ramen",
    desc: "Rich vegetable broth and freshly-made ramen noodles topped with wood ear mushrooms, bamboo shoot, impossible egg, scallions."
  },
  padThai: {
    title: "Vegetable Pad Thai",
    desc: "Sweet, savory, and sour noodles with tofu and stir-fried vegetables. Served with crushed peanuts and bean sprouts."
  },
  friedRice: {
    title: "Vegetable Fried Rice",
    desc: "Fried rice with stir-fried carrots, onions, scallion, and tomato"
  },
  redCurry: {
    title: "Thai Red Curry",
    desc: "Spicy red curry filled with freshly cooked vegetables. Served with choice of white or brown rice."
  }
}

const addMenuItems = (items, section) => {

  for (const item in items) {
    console.log(item)

    const title = document.createElement("h5")
    title.innerText = items[item]['title']

    const desc = document.createElement("h6")
    desc.innerText = items[item]['desc']

    // add classes
    title.classList.add('item-title', 'urbanist-bold')
    desc.classList.add('item-subtitle', 'mb-6')

    section.appendChild(title)
    section.appendChild(desc)

  }
}

window.onload = () => {
  const starterDiv = document.getElementById("starters")
  const entreesDiv = document.getElementById("entrees")
  addMenuItems(starters, starterDiv)
  addMenuItems(entrees, entreesDiv)
}

/* 
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { consoleOrigin } from "firebase-tools/lib/api";

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
};*/

const navbar = document.getElementById("navbar");

let lastScrollTop = 0;
addEventListener("scroll", () => {
    // Current scroll position
    const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

    // Calculate opacity as a value between 0 and 1
    const maxScroll = 100; // Maximum scroll value for full opacity
    const amount = Math.min(scrollTop / maxScroll, 1); // Clamp value between 0 and 1

    console.log(amount)
    // Apply the calculated opacity
    navbar.style.opacity = amount;

    lastScrollTop = scrollTop;
});
