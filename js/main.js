const hideMidoriOnload = () => {
  console.log("JS Loaded");

  const bg = document.getElementById("midori-background");

  if (bg) {
    // Trigger the transition after a slight delay to ensure the DOM is ready
    setTimeout(() => {
      document.getElementById("white-line").display = "none";
      document.getElementById("midori-header").display = "none";
      document.getElementById("preparing").display = "none";
      Array.from(document.getElementsByClassName("onloadimages")).forEach(
        (img) => {
          console.log("changing images...");
          img.style.transform = "scale(0)";
        }
      );
      bg.style.height = "0vh"; // Shrink to 0 height

      console.log("Background height expanded");
    }, 4500); // Delay to ensure the transition applies
  } else {
    console.error("Background element not found");
  }

  // Initialize Barba.js transitions (optional, for page transitions)
  barba.init({
    transitions: [
      {
        name: "expand-background",
        leave({ current }) {
          // Collapse the background on leave
          if (bg) {
            bg.style.height = "0vh";
          }
          return new Promise((resolve) => {
            bg.addEventListener("transitionend", resolve, { once: true });
          });
        },
        beforeEnter() {
          console.log("Page transition detected");
          if (bg) {
            bg.style.height = "0vh"; // Expand on transition
          }
        },
      },
    ],
  });
};

const drawHorizontalLine = () => {
  console.log("Line Animation JS Loaded");

  const whiteLine = document.getElementById("white-line");

  if (whiteLine) {
    // Trigger the transition after a slight delay to ensure the DOM is ready
    setTimeout(() => {
      whiteLine.style.width = "100%"; // Expand to full width
      console.log("White line expanded");
    }, 100); // Small delay to ensure the transition applies
  } else {
    console.error("White line element not found");
  }
};
const main = () => {
  drawHorizontalLine();
  hideMidoriOnload();
};
main();
