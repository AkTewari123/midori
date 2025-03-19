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

const animateCharacters = () => {
  if (skipAnimation) return; // Skip if animations are disabled

  const contentTitle = new SplitType("#midori-h1", { types: "chars" });
  const contentText = new SplitType("#culinary-journey", { types: "chars" });
  // Animate characters using a js lib
  setTimeout(() => {
    gsap.from(contentTitle.chars, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.05,
    });

    gsap.from(contentText.chars, {
      opacity: 0,
      y: 20,
      duration: 0.3,
      ease: "power2.out",
      stagger: 0.01, // Gap between each character lifting up
      delay: 0.3,
    });
    console.log("Characters animated");
  }, 7000);
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
        Array.from(document.getElementsByClassName("shiftDown")).forEach((elem) => {
          elem.style.transform = "translateY(5px)";
          console.log(elem.style);
        });
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

const setupTestimonials = () => {
  const tracks = document.querySelectorAll(".testimonial-track");
  const animations = []; // Store animation data for each track

  tracks.forEach((track, index) => {
    // Clone cards for continuous scrolling
    const originalCards = Array.from(track.querySelectorAll(".testimonial-card"));
    const trackWidth = originalCards.reduce((width, card) => width + card.offsetWidth + 24, 0); // 24px is the gap

    // Create enough duplicates to fill viewport multiple times
    const requiredSets = Math.ceil((window.innerWidth * 3) / trackWidth) + 1;

    for (let i = 0; i < requiredSets; i++) {
      originalCards.forEach((card) => {
        const clone = card.cloneNode(true);
        track.appendChild(clone);
      });
    }

    // Set up animation data (direction and speed varies by track)
    const direction = index % 2 === 0 ? -1 : 1; // Alternate direction
    const speed = 0.5 + index * 0.15; // Vary speed slightly by track

    // Measure the width of a complete set for looping calculation
    const fullSetWidth = trackWidth;

    // Set initial position - for right moving tracks, start from negative position
    let initialPosition = 0;
    if (direction === 1) {
      initialPosition = -fullSetWidth;
      track.style.transform = `translate3d(${initialPosition}px, 0, 0)`;
    }

    animations.push({
      track,
      position: initialPosition,
      direction,
      speed,
      fullSetWidth,
    });
  });

  // Main animation loop using requestAnimationFrame for smooth motion
  let lastTime = 0;
  const animate = (currentTime) => {
    if (!lastTime) lastTime = currentTime;
    const deltaTime = currentTime - lastTime;
    lastTime = currentTime;

    animations.forEach((animation) => {
      // Calculate new position
      animation.position += animation.direction * animation.speed * (deltaTime * 0.05);

      // Create seamless loop based on direction
      if (animation.direction < 0) {
        // For left-moving tracks (negative direction)
        if (animation.position <= -animation.fullSetWidth) {
          animation.position += animation.fullSetWidth;
        }
      } else {
        // For right-moving tracks (positive direction)
        if (animation.position >= 0) {
          animation.position -= animation.fullSetWidth;
        }
      }

      // Apply transform with hardware acceleration
      animation.track.style.transform = `translate3d(${animation.position}px, 0, 0)`;
    });

    requestAnimationFrame(animate);
  };

  // Start the animation
  requestAnimationFrame(animate);
};

const setupMasonryGrid = () => {
  // Get all necessary elements
  const grid = document.querySelector(".dishes-grid");
  const items = Array.from(document.querySelectorAll(".dish-item"));

  // Configuration
  const gap = 20; // Gap between items in pixels

  // Function to get current column count based on viewport width
  const getColumnCount = () => {
    const viewportWidth = window.innerWidth;
    if (viewportWidth <= 600) return 1;
    if (viewportWidth <= 900) return 2;
    if (viewportWidth <= 1200) return 3;
    return 4;
  };

  // Function to layout the masonry grid
  const layoutMasonry = () => {
    if (!grid || items.length === 0) return;

    // Get current column count based on viewport width
    const columnCount = getColumnCount();

    // Calculate column width (accounting for gaps)
    const gridWidth = grid.clientWidth;
    const columnWidth = (gridWidth - gap * (columnCount - 1)) / columnCount;

    // Initialize arrays to track column heights
    const columnHeights = Array(columnCount).fill(0);

    // Position each item
    items.forEach((item) => {
      // Find the shortest column
      const shortestColumn = columnHeights.indexOf(Math.min(...columnHeights));

      // Calculate position
      const x = shortestColumn * (columnWidth + gap);
      const y = columnHeights[shortestColumn];

      // Set item position and width
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      item.style.width = `${columnWidth}px`;

      // Get the image inside the item
      const img = item.querySelector("img");

      // Set the height of the card to maintain aspect ratio if possible
      if (img.complete && img.naturalHeight > 0) {
        const aspectRatio = img.naturalHeight / img.naturalWidth;
        const cardHeight =
          item.querySelector(".dish-card").offsetHeight || columnWidth * aspectRatio;

        // Update column height
        columnHeights[shortestColumn] += cardHeight + gap;
      } else {
        // For images that haven't loaded yet, use a default height
        columnHeights[shortestColumn] += item.offsetHeight + gap;

        // Add load event to recalculate once image loads
        img.onload = () => {
          layoutMasonry();
        };
      }
    });

    // Set the grid container height to the tallest column
    grid.style.height = `${Math.max(...columnHeights)}px`;
  };

  // Debounce function to limit layout recalculations
  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // Initialize the layout
  layoutMasonry();

  // Recalculate on window resize with debounce
  window.addEventListener("resize", debounce(layoutMasonry, 100));

  // Recalculate when all images are loaded
  window.addEventListener("load", layoutMasonry);

  // Add MutationObserver to detect changes in the DOM
  const observer = new MutationObserver(debounce(layoutMasonry, 100));
  observer.observe(grid, { childList: true, subtree: true, attributes: true });

  // Recalculate periodically in the first few seconds to handle any edge cases
  const recalcIntervals = [100, 500, 1000, 2000];
  recalcIntervals.forEach((interval) => {
    setTimeout(layoutMasonry, interval);
  });
};

const main = () => {
  drawHorizontalLine();
  hideMidoriOnload();
  menuGreenTransition();
  enableParallax();
  animateCharacters();
  setupVideoControls();
  setupTestimonials();
  setupMasonryGrid(); // Add this new function call
};
main();
