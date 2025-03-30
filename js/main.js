// Skip animation flag - set to true to bypass intro animations for development
// Transitioning prop is for when you go to index.html from another page in the website
// const skipAnimation = localStorage.getItem("pageTransition") === "home";
const skipAnimation = false;

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

  const tracks = document.querySelectorAll(".testimonial-track");
  if (!tracks.length) return;

  const animations = []; // Store animation data for each track

  // Reset all tracks to initial state
  tracks.forEach((track) => {
    track.style.transform = "translate3d(0, 0, 0)";
  });

  tracks.forEach((track, index) => {
    // Clone cards for continuous scrolling if needed
    const originalCards = Array.from(
      track.querySelectorAll(".testimonial-card")
    );

    // Calculate the width precisely
    let trackWidth = 0;
    originalCards.forEach((card) => {
      const style = window.getComputedStyle(card);
      const width =
        card.offsetWidth +
        parseInt(style.marginLeft || 0) +
        parseInt(style.marginRight || 0);
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
      const movement =
        animation.direction * animation.speed * (deltaTime * 0.05);
      animation.position += movement;

      // Reset position when needed for seamless loop
      if (
        animation.direction < 0 &&
        animation.position <= -animation.trackWidth
      ) {
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

  // window.addEventListener(
  //   "resize",
  //   debounce(() => {
  //     setupTestimonials();
  //   }, 250)
  // );
};

// Add debounce function if not already defined
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}
const startingAnimation = () => {
  document.getElementById("post-transition").style.display = "none";
  document.getElementById("precursor").style.display = "block";
  // Transition delay 2000ms
  document.getElementById("starter-icon").style.transform = "translateY(-10px)";
  document.getElementById("starter-icon").style.opacity = "0";
  // Starts after starter-icon dissassembles
  setTimeout(() => {
    // Split text into characters using SplitType
    const midoriSplit = new SplitType("#midori-header", { types: "chars" });
    const foodSavingSplit = new SplitType("#food-saving", { types: "chars" });

    gsap.to(midoriSplit.chars, {
      y: -10, // Move up by 50px
      opacity: 0, // Fade out
      stagger: 0.05, // Stagger animation for each character
      duration: 0.6,
      ease: "power2.inOut",
    });

    gsap.to(foodSavingSplit.chars, {
      y: -10,
      opacity: 0,
      stagger: 0.05,
      duration: 0.6,
      ease: "power2.inOut",
      delay: 0.3, // Slight delay for a sequential effect
    });
  }, 2000);
  // Does it after 2000ms + 1000ms
  setTimeout(() => {
    document.querySelector("nav").style.opacity = "1";
  }, 3000);
  // document.getElementById("loader").style.display = "none";
  const startingImages = Array.from(
    document.getElementsByClassName("onload-images")
  );
  for (let i = 0; i < startingImages.length; i++) {
    const img = startingImages[i];
    setTimeout(() => {
      img.style.clipPath = "inset(0)";
      img.style.transform = "scale(2)";
      img.style.transition = "all 1s cubic-bezier(0, 0.8, 0.2, 1)";
    }, i * 500 + 4000);
  }
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const finSection = document.getElementById("fin-section");
  finSection.style.width = `${viewportWidth * 0.4}px`;
  finSection.style.height = `${viewportHeight * 0.4}px`;
  setTimeout(() => {
    finSection.style.transition = "all 1s cubic-bezier(0, 0.8, 0.2, 1)";
    finSection.style.clipPath = "inset(0)";
  }, 500 * 6 + 4000);

  setTimeout(() => {
    finSection.style.transition = "all 1s cubic-bezier(0, 0.8, 0.2, 1)";

    // Set width and height to match the viewport
    finSection.style.width = `100%`;
    finSection.style.height = `100%`;
    setTimeout(() => {
      // const loader = document.getElementById("loader");
      // loader.style.opacity = 0;
      // loader.style.transform = "translateY(50px";
      // loader.style.display = "flex";
      // loader.style.width = "50%";
      // loader.style.alignItems = "center";
      // loader.style.transition = "all .4s ease-out";
      // Delay the opacity change slightly to allow the transition to apply
      // setTimeout(() => {
      //   loader.style.opacity = 1;
      // }, 5);
    }, 1000);
    setTimeout(() => {
      document.getElementById("post-transition").style.display = "block";
      for (let i = 0; i < startingImages.length; i++) {
        startingImages[i].style.display = "none";
      }
      const loaderHeaders = Array.from(
        document.getElementsByClassName("loader-header")
      );
      loaderHeaders.forEach((header) => header.classList.add("active"));
      document.getElementById("white-gradient").style.opacity = 1;
    }, 2000);
  }, 8000);
};
const setupMasonryGrid = () => {
  // Get all necessary elements
  const grid = document.querySelector(".dishes-grid");
  const items = Array.from(document.querySelectorAll(".dish-item"));

  // Exit early if elements don't exist
  if (!grid || items.length === 0) {
    console.warn("Masonry grid elements not found");
    return;
  }

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

    // Check if grid is actually visible and has width
    if (grid.offsetParent === null || grid.clientWidth === 0) {
      console.log("Grid not visible or has zero width, delaying layout");
      return;
    }

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
      let itemHeight = item.offsetHeight;
      if (itemHeight <= 0) {
        // Fallback if height not available
        itemHeight = columnWidth * 0.8; // Default aspect ratio
      }

      // Update column height
      columnHeights[shortestColumn] += itemHeight + gap;

      // Add load event to recalculate once image loads if needed
      if (!img.complete || img.naturalHeight === 0) {
        img.onload = () => {
          setTimeout(layoutMasonry, 50);
        };
      }
    });

    // Set the grid container height to the tallest column
    const maxHeight = Math.max(...columnHeights);
    if (maxHeight > 0) {
      grid.style.height = `${maxHeight}px`;
    }

    console.log("Masonry layout updated, height:", maxHeight);
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

  // Schedule multiple layout recalculations to ensure proper display
  const recalcIntervals = [100, 500, 1000, 2000, 3000];
  recalcIntervals.forEach((interval) => {
    setTimeout(layoutMasonry, interval);
  });
};

// Add this new function for hero animations
const initHeroAnimations = () => {
  const timeout = skipAnimation ? 0 : 7000;

  setTimeout(() => {
    // Activate all animation elements
    const textElements = document.querySelectorAll(".hero-text-reveal");
    const descElement = document.querySelector(".hero-desc-reveal");
    const buttonsElement = document.querySelector(".hero-buttons-reveal");
    const videoContainer = document.querySelector(".hero-video-container");
    const statsElement = document.querySelector(".hero-stats-reveal");
    const borderElement = document.querySelector(".hero-border");

    // Activate all elements with appropriate timing
    if (textElements) {
      textElements.forEach((el) => el.classList.add("active"));
    }

    if (descElement) descElement.classList.add("active");
    if (buttonsElement) buttonsElement.classList.add("active");
    if (videoContainer) videoContainer.classList.add("active");
    if (statsElement) statsElement.classList.add("active");
    if (borderElement) borderElement.classList.add("active");

    // Enhanced video controls setup
    setupEnhancedVideoControls();
  }, timeout);
};

// Enhanced video controls with better UX
const setupEnhancedVideoControls = () => {
  const video = document.getElementById("hero-video");
  const playPauseBtn = document.getElementById("play-pause-btn");

  if (!video || !playPauseBtn) return;

  // Add hover event to show controls more prominently
  const videoContainer = document.querySelector(".hero-video-container");
  if (videoContainer) {
    videoContainer.addEventListener("mouseenter", () => {
      playPauseBtn.style.opacity = "1";
    });

    videoContainer.addEventListener("mouseleave", () => {
      if (!video.paused) {
        // Only fade if video is playing
        playPauseBtn.style.opacity = "0.7";
      }
    });
  }

  // Update button state based on video state
  const updateButtonState = () => {
    if (video.paused) {
      playPauseBtn.classList.remove("video-playing");
      if (playPauseBtn) playPauseBtn.style.opacity = "1";
    } else {
      playPauseBtn.classList.add("video-playing");
      if (playPauseBtn) playPauseBtn.style.opacity = "0.7";
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
  // hideMidoriOnload();
  menuGreenTransition();

  setupTestimonials();
  if (!skipAnimation) {
    startingAnimation();
  } else {
    document.getElementById("post-transition").style.display = "block";
    document.getElementById("fin-section").style.display = "block";
    document.getElementById("main-nav").style.opacity = 1;
    document.getElementById("fin-section").style.height = "100vh";
    document.getElementById("fin-section").style.width = "100%";
    document.getElementById("fin-section").style.clipPath = "inset(0)";
    document.getElementById("starter-animation-container").style.display =
      "none";
    setTimeout(() => {
      document.getElementById("white-gradient").style.display = "block";
      document.getElementById("white-gradient").style.opacity = "1";
      // document.getElementById("loader").style.display = "block";
      setupVideoControls();
    }, 2000);
  }
  // If animations are playing, wait for them to complete
  // This needs to match or exceed the total animation duration (around 5.5s + 500ms safety margin)
  setTimeout(
    () => {
      setupMasonryGrid();
      // Call again after a brief delay to account for any rendering delays
      enableParallax();
    },
    skipAnimation ? 0 : 11000
  );
};
main();
