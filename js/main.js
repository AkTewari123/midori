// Skip animation flag - set to true to bypass intro animations for development
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
const dissambleStartingIcon = () => {
  setTimeout(() => {
    document.getElementById("starter-icon").style.opacity = "0";
    document.getElementById("starter-icon").style.transform =
      "translateY(-10px)";
  }, 1000);
};
const startingAnimation = () => {
  console.log("JS Loaded");

  // const bg = document.getElementById("midori-background");
  document.getElementById("post-transition").style.color = "black";
  document.getElementById("post-transition").style.display = "none";
  document.getElementById("post-transition").style.opacity = "0";
  dissambleStartingIcon();
  // Skip animation if set to true
  if (skipAnimation) {
    // Immediately show the post-transition content
    bg.style.display = "none";
    document.getElementById("midori-background-2").style.display = "none";
    const postTransition = document.getElementById("post-transition");
    postTransition.style.display = "block";
    postTransition.style.opacity = "1";
    document.getElementById("precursor").style.display = "none";

    // postTransition.style.pointerEvents = "auto";
    return;
  } else {
    const startingImages = Array.from(
      document.getElementsByClassName("onload-images")
    );
    console.log(startingImages);
    for (let i = 0; i < startingImages.length; i++) {
      setTimeout(() => {
        startingImages[i].style.animation =
          "scaleUp 2s ease-in-out .1s forwards";
        console.log(startingImages[i].style.transform);
      }, i * 1000 + 3000);
    }
    setTimeout(() => {
      const postTransition = document.getElementById("post-transition");
      postTransition.style.display = "block";
      postTransition.style.opacity = "1";
    }, 7000);
  }
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
  startingAnimation();
  // enableParallax();

  // Replace the old video control setup with the new hero animations
  // setupVideoControls();
  initHeroAnimations();

  setupTestimonials();

  // Delay the masonry setup based on animation state
  if (skipAnimation) {
    // If animations are skipped, initialize immediately
    setupMasonryGrid();
  } else {
    // If animations are playing, wait for them to complete
    // This needs to match or exceed the total animation duration (around 5.5s + 500ms safety margin)
    setTimeout(() => {
      setupMasonryGrid();
      // Call again after a brief delay to account for any rendering delays
      setTimeout(setupMasonryGrid, 1000);
    }, 6000);
  }
};
main();
