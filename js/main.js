const hideMidoriOnload = () => {
  console.log("JS Loaded");

  const bg = document.getElementById("midori-background");
  document.getElementById("post-transition").style.color = "black";
  document.getElementById("post-transition").style.display = "none";
  document.getElementById("post-transition").style.opacity = "0";
  console.log(document.getElementById("post-transition"));
  if (bg) {
    // Trigger the transition after a slight delay to ensure the DOM is ready
    setTimeout(() => {
      bg.style.opacity = "0";
      document.getElementById("midori-background-2").style.opacity = "0";
      const postTransition = document.getElementById("post-transition");
      postTransition.style.display = "block";
      setTimeout(() => {
        bg.style.display = "none";
        document.getElementById("midori-background-2").style.display = "none";
        postTransition.style.opacity = "1";
        document.getElementById("precursor").style.display = "none";
        postTransition.style.pointerEvents = "auto"; // Enable interaction
        Array.from(document.getElementsByClassName("shiftUp")).forEach(
          (elem) => {
            elem.style.transform = "translateY(5px)";
            console.log(elem.style);
          }
        );
      }, 2500);
      console.log("Background height expanded");
    }, 4500); // Delay to ensure the transition applies
    setTimeout(() => {
      console.log("All processes have completed");
    }, 8000);
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
const sourcesGreenTransition = () => {
  document.getElementById("sources").addEventListener("mouseenter", (event) => {
    const greenDot = document.getElementById("greendot");
    const sourcesElement = document.getElementById("sources");

    // Get the mouse X position relative to the "sources" element
    const sourcesRect = sourcesElement.getBoundingClientRect();
    const relativeX = event.clientX - sourcesRect.left; // Adjust X coordinate
    const relativeY = event.clientY - sourcesRect.top; // Adjust X coordinate
    console.log(sourcesRect);
    // Position the green dot horizontally within "sources"
    greenDot.style.left = `${relativeX}px`;
    greenDot.style.top = `${relativeY}px`;

    // Scale it by 20
    greenDot.style.transform = "scale(20)";

    console.log(greenDot);
  });
  document.getElementById("sources").addEventListener("mouseleave", (event) => {
    const greenDot = document.getElementById("greendot");
    const sourcesElement = document.getElementById("sources");

    const sourcesRect = sourcesElement.getBoundingClientRect(); // get pos of mouse relative to sources box
    const relativeX = event.clientX - sourcesRect.left;
    const relativeY = event.clientY - sourcesRect.top;
    console.log(sourcesRect);
    greenDot.style.left = `${relativeX}px`;
    greenDot.style.top = `${relativeY}px`;

    greenDot.style.transform = "scale(.01)";

    console.log(greenDot);
  });
};

const main = () => {
  drawHorizontalLine();
  hideMidoriOnload();
  sourcesGreenTransition();
};
main();
