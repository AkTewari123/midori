// Skip animation flag - set to true to bypass intro animations for development
const skipAnimation = false;

const enableParallax = () => {
  const blockOne = document.getElementById("block-one");
  const blockTwo = document.getElementById("block-2");
  const video = document.querySelector("#block-2 video");

  window.addEventListener("scroll", () => {
    let scrollY = window.scrollY;
    let blockOneHeight = blockOne.offsetHeight;

    // Move blockTwo upwards as user scrolls
    if (scrollY < blockOneHeight) {
      blockTwo.style.transform = `translateY(-${scrollY * 0.8}px)`;
    } else {
      blockTwo.style.transform = `translateY(-${blockOneHeight}px)`;
    }

    // Slight parallax effect for video inside blockTwo
    video.style.transform = `translateY(${scrollY * 0.05}px)`;
  });
};

const animateCharactersAndImages = () => {
  const timeout = skipAnimation ? 0 : 7000;
  // const contentTitle = new SplitType("#midori-h1", { types: "chars" });
  const contentTitleTwo = new SplitType("#midori-h1-2", { types: "chars" });
  // const contentText = new SplitType("#culinary-journey", { types: "chars" });
  const images = document.querySelectorAll(".rotate-onload");
  const rightText = document.getElementById("right-text");
  const word = rightText.textContent.trim(); // Get the word "Right"
  // Animate characters using a js lib
  setTimeout(() => {
    setTimeout(() => {
      console.log(document.getElementById("midori-h1").classList);
      document.getElementById("midori-h1").style.transform = "rotateX(0deg)";
      document.getElementById("midori-h1").style.color = "black";

      console.log(document.getElementById("midori-h1"));
    }, 2000);
    const theText = document.getElementById("the-text");
    theText.classList.add("active");

    // Flip each character of "Right" one after another
    rightText.innerHTML = "";
    word.split("").forEach((char, index) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.classList.add("flip-character");
      rightText.appendChild(span);

      // Delay each flip animation
      setTimeout(() => {
        span.classList.add("active");
      }, index * 150); // 150ms delay per character
    });
    document.getElementById("bowl").style.transform =
      "translateY(5px) scale(1)";
    // Rotate "Way" in Y direction
    document.getElementById("way-text").classList.add("active");
    document.getElementById("the-text").classList.add("active");
    images.forEach((img) => {
      img.classList.add("rotated");
    });
    gsap.from(contentTitleTwo.chars, {
      opacity: 0,
      y: 100,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.05,
    });
    console.log("Characters animated");
  }, timeout);
};

const hideMidoriOnload = () => {
  console.log("JS Loaded");

  const bg = document.getElementById("midori-background");
  document.getElementById("post-transition").style.color = "black";
  document.getElementById("post-transition").style.display = "none";
  document.getElementById("post-transition").style.opacity = "0";
  console.log(document.getElementById("post-transition"));

  // Skip animation if set to true
  if (skipAnimation) {
    // Immediately show the post-transition content
    bg.style.display = "none";
    document.getElementById("midori-background-2").style.display = "none";
    const postTransition = document.getElementById("post-transition");
    postTransition.style.display = "block";
    postTransition.style.opacity = "1";
    document.getElementById("precursor").style.display = "none";
    postTransition.style.pointerEvents = "auto";
    Array.from(document.getElementsByClassName("shiftDown")).forEach((elem) => {
      elem.style.transform = "translateY(5px)";
      console.log(elem.style);
    });
    return;
  }

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
        Array.from(document.getElementsByClassName("shiftDown")).forEach(
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
  if (skipAnimation) return; // Skip if animations are disabled

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

const menuGreenTransition = () => {
  document.getElementById("menu").addEventListener("mouseenter", (event) => {
    const greenDot = document.getElementById("greendot");
    const menuElement = document.getElementById("menu");

    // Get the mouse X position relative to the "menu" element
    const menuRect = menuElement.getBoundingClientRect();
    const relativeX = event.clientX - menuRect.left; // Adjust X coordinate
    const relativeY = event.clientY - menuRect.top; // Adjust X coordinate
    console.log(menuRect);
    // Position the green dot horizontally within "menu"
    greenDot.style.left = `${relativeX}px`;
    greenDot.style.top = `${relativeY}px`;

    // Scale it by 20
    greenDot.style.transform = "scale(20)";

    console.log(greenDot);
  });
  document.getElementById("menu").addEventListener("mouseleave", (event) => {
    const greenDot = document.getElementById("greendot");
    const menuElement = document.getElementById("menu");

    const menuRect = menuElement.getBoundingClientRect(); // get pos of mouse relative to menu box
    const relativeX = event.clientX - menuRect.left;
    const relativeY = event.clientY - menuRect.top;
    console.log(menuRect);
    greenDot.style.left = `${relativeX}px`;
    greenDot.style.top = `${relativeY}px`;

    greenDot.style.transform = "scale(.01)";

    console.log(greenDot);
  });
};
const setupVideoControls = () => {
  const video = document.getElementById("hero-video");
  const playPauseBtn = document.getElementById("play-pause-btn");
  video.play();

  if (!video || !playPauseBtn) return;

  // Remove muted attribute to allow sound control
  video.muted = false;

  // Update button state based on video state
  const updateButtonState = () => {
    if (video.paused) {
      playPauseBtn.classList.remove("video-playing");
    } else {
      playPauseBtn.classList.add("video-playing");
    }
  };

  // Initial state
  updateButtonState();

  // Toggle play/pause on button click
  playPauseBtn.addEventListener("click", () => {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
    updateButtonState();
  });

  // Update button when video state changes
  video.addEventListener("play", updateButtonState);
  video.addEventListener("pause", updateButtonState);
};

const main = () => {
  drawHorizontalLine();
  hideMidoriOnload();
  menuGreenTransition();
  // enableParallax();
  animateCharactersAndImages();
  setupVideoControls();
};
main();
