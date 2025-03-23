// Skip animation flag - set to true to bypass intro animations for development
const skipAnimation = true;

const enableParallax = () => {
  const blockOne = document.getElementById("block-one");
  const blockTwo = document.getElementById("block-2");
  const video = document.querySelector("#block-2 video");

  // Return early if any required elements don't exist
  if (!blockOne || !blockTwo || !video) {
    console.warn("Parallax elements not found. Skipping parallax setup.");
    return;
  }

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

const setupTestimonials = () => {
  // Clear any existing animations first
  if (window.testimonialAnimationFrame) {
    cancelAnimationFrame(window.testimonialAnimationFrame);
  }

  // Delay starting animations if intro animation is playing
  const animationDelay = skipAnimation ? 0 : 6000; // Wait for intro animation to complete

  setTimeout(() => {
    const tracks = document.querySelectorAll(".testimonial-track");
    if (!tracks.length) return;

    const animations = []; // Store animation data for each track

    // Reset all tracks to initial state
    tracks.forEach((track) => {
      track.style.transform = "translate3d(0, 0, 0)";
    });

    tracks.forEach((track, index) => {
      // Clone cards for continuous scrolling if needed
      const originalCards = Array.from(track.querySelectorAll(".testimonial-card"));

      // Calculate the width precisely
      let trackWidth = 0;
      originalCards.forEach((card) => {
        const style = window.getComputedStyle(card);
        const width =
          card.offsetWidth + parseInt(style.marginLeft || 0) + parseInt(style.marginRight || 0);
        trackWidth += width;
      });

      // Add gap (24px between cards)
      trackWidth += originalCards.length * 24;

      // Create enough duplicates for smooth scrolling
      const viewportWidth = window.innerWidth;
      const requiredSets = Math.ceil((viewportWidth * 2) / trackWidth) + 1;

      // Only clone if we don't already have enough cards
      if (track.children.length < originalCards.length * requiredSets) {
        for (let i = 0; i < requiredSets - 1; i++) {
          originalCards.forEach((card) => {
            const clone = card.cloneNode(true);
            track.appendChild(clone);
          });
        }
      }

      // Alternate direction and vary speed slightly by track index
      const direction = index % 2 === 0 ? -1 : 1;
      const speed = 0.3 + index * 0.1; // Less variation in speed to prevent sync issues

      // Store precise values for animation
      animations.push({
        track,
        position: direction > 0 ? -trackWidth : 0, // Start position
        direction,
        speed,
        trackWidth,
        lastTimestamp: 0, // Track last timestamp for each animation separately
        initialPosition: direction > 0 ? -trackWidth : 0, // Store initial position for reset
      });

      // Set initial position
      track.style.transform = `translate3d(${animations[index].position}px, 0, 0)`;
    });

    // Main animation loop with more precise timing
    let lastTime = 0;
    const animate = (currentTime) => {
      if (!lastTime) lastTime = currentTime;
      const deltaTime = Math.min(currentTime - lastTime, 100); // Cap max delta to prevent jumps
      lastTime = currentTime;

      let needsUpdate = false;

      animations.forEach((animation) => {
        // Calculate movement based on consistent time delta
        const movement = animation.direction * animation.speed * (deltaTime * 0.05);
        animation.position += movement;

        // Reset position when needed for seamless loop
        if (animation.direction < 0 && animation.position <= -animation.trackWidth) {
          // For left-moving tracks, reset precisely
          animation.position = 0;
          needsUpdate = true;
        } else if (animation.direction > 0 && animation.position >= 0) {
          // For right-moving tracks, reset precisely
          animation.position = -animation.trackWidth;
          needsUpdate = true;
        }

        // Apply transform with hardware acceleration
        animation.track.style.transform = `translate3d(${
          Math.round(animation.position * 100) / 100
        }px, 0, 0)`;
      });

      // Store the animation frame reference for potential cancellation
      window.testimonialAnimationFrame = requestAnimationFrame(animate);
    };

    // Start the animation
    window.testimonialAnimationFrame = requestAnimationFrame(animate);

    // Add event listener to pause animations when tab is not visible
    document.addEventListener("visibilitychange", () => {
      if (document.hidden && window.testimonialAnimationFrame) {
        cancelAnimationFrame(window.testimonialAnimationFrame);
      } else if (!document.hidden) {
        // Reset animation when returning to tab
        lastTime = 0;
        window.testimonialAnimationFrame = requestAnimationFrame(animate);
      }
    });
  }, animationDelay);

  // Reset on window resize to prevent glitches from layout changes
  window.addEventListener(
    "resize",
    debounce(() => {
      setupTestimonials();
    }, 250)
  );
};

// Add debounce function if not already defined
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

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
  // enableParallax();
  animateCharactersAndImages();
  setupVideoControls();
  setupTestimonials();
  setupMasonryGrid(); // Add this new function call
};
main();
