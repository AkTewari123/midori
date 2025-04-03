function createResponsiveAnimatedLines() {
  // Get the paragraph element
  const paragraph = document.getElementById("menu-description");
  const originalText = paragraph.innerText;

  // Store original text for reference
  paragraph.setAttribute("data-original-text", originalText);

  // Initial split and animation
  splitAndAnimateLines();

  // Add resize listener with debounce
  let resizeTimeout;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function () {
      splitAndAnimateLines(false); // false means don't animate on resize
    }, 25); // Debounce resize events
  });

  function splitAndAnimateLines(animate = true) {
    // Get original text
    const text = paragraph.getAttribute("data-original-text");

    // Create a temporary element to measure text
    const temp = document.createElement("span");
    temp.style.visibility = "hidden";
    temp.style.position = "absolute";
    temp.style.whiteSpace = "nowrap";
    temp.style.font = window.getComputedStyle(paragraph).font;
    temp.style.fontSize = window.getComputedStyle(paragraph).fontSize;
    document.body.appendChild(temp);

    // Get paragraph width
    const paragraphWidth = paragraph.clientWidth;

    // Split text into words
    const words = text.split(" ");
    const lines = [];
    let currentLine = "";

    // Measure each word and create lines
    for (let i = 0; i < words.length; i++) {
      const testLine = currentLine + (currentLine ? " " : "") + words[i];
      temp.textContent = testLine;
      console.log(temp.clientWidth);
      if (temp.clientWidth > paragraphWidth) {
        // This word would cause line wrap
        lines.push(currentLine);
        currentLine = words[i];
        console.log(lines);
      } else {
        currentLine = testLine;
      }
    }

    // Add the last line
    if (currentLine) {
      lines.push(currentLine);
    }

    // Clean up
    document.body.removeChild(temp);

    // Clear the paragraph
    paragraph.innerHTML = "";

    // Create a wrapper for the animation
    paragraph.style.overflow = "hidden";

    // Create and append line elements with animation
    lines.forEach((line, index) => {
      const lineElement = document.createElement("div");
      lineElement.textContent = line;

      if (animate) {
        // Apply animation only if animate is true
        lineElement.style.opacity = "0";
        lineElement.style.transform = "translateY(20px)";
        lineElement.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      } else {
        // No animation on resize
        lineElement.style.opacity = "1";
        lineElement.style.transform = "translateY(0)";
      }

      paragraph.appendChild(lineElement);

      if (animate) {
        // Stagger the animations by 0.1s per line
        setTimeout(() => {
          lineElement.style.opacity = "1";
          lineElement.style.transform = "translateY(0)";
        }, index * 100); // 100ms = 0.1s
      }
    });

    return lines;
  }
}

// Initialize the responsive animated lines
createResponsiveAnimatedLines();
document.getElementById("our-menu").style.transform = "translateY(-10px)";
document.getElementById("our-menu").style.opacity = 1;
const chow_mein = document.getElementById("chow-mein");
const avocado_roll = document.getElementById("avocado-roll");
setTimeout(() => {
  avocado_roll.style.transition = "all 1s cubic-bezier(0, 0.8, 0.2, 1)";
  avocado_roll.style.clipPath = "inset(0)";
  avocado_roll.style.transform = "scale(1)";
  chow_mein.style.transition = "all 1s cubic-bezier(0, 0.8, 0.2, 1)";
  chow_mein.style.clipPath = "inset(0)";
  chow_mein.style.transform = "scale(1)";
}, 10);
document.addEventListener("DOMContentLoaded", function () {
  const menuItems = document.querySelectorAll(".menu-item");

  menuItems.forEach((menuItem) => {
    // Select all children except the tooltip text
    const children = menuItem.querySelectorAll(
      "h2, p, span:not(.group-hover\\:opacity-100)"
    );

    // Apply initial styles for each child element
    children.forEach((child, index) => {
      child.classList.add(
        "opacity-0",
        "translate-y-4",
        "transition-all",
        "duration-500"
      );
      child.style.transitionDelay = `${index * 100}ms`; // Add delay for staggered effect
    });

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            children.forEach((child) => {
              child.classList.add("opacity-100", "translate-y-0");
              child.classList.remove("opacity-0", "translate-y-4");
            });
            observer.unobserve(entry.target); // Stop observing once animated
          }
        });
      },
      {
        root: null,
        threshold: 0.2, // Trigger when 20% of the menu-item is visible
      }
    );

    observer.observe(menuItem);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Target all elements with class 'menu-display'
  const menuDisplays = Array.from(
    document.getElementsByClassName("menu-display")
  );
  // Configure Intersection Observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log(entry);
          entry.target.classList.add("visible"); // Trigger animation
          observer.unobserve(entry.target); // Stop observing after animation
        }
      });
    },
    {
      threshold: 0.1, // Trigger when 10% of the element is visible
    }
  );

  // Observe each 'menu-display' element
  menuDisplays.forEach((el) => observer.observe(el));
  const captions = Array.from(document.getElementsByClassName("image-caption"));
  // Configure Intersection Observer
  const observertwo = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log(entry);
          entry.target.classList.add("visible"); // Trigger animation
          observertwo.unobserve(entry.target); // Stop observing after animation
        }
      });
    },
    {
      threshold: 0.1, // Trigger when 10% of the element is visible
    }
  );

  // Observe each 'menu-display' element
  captions.forEach((el) => observertwo.observe(el));
});
