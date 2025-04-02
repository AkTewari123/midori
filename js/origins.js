const track = document.getElementById("image-track");
const getCenterImage = () => {
  const track = document.getElementById("image-track");
  const images = track.getElementsByClassName("image");
  const screenCenter = window.innerWidth / 2;
  let closestImage = null;
  let minDistance = Infinity;

  for (const image of images) {
    const rect = image.getBoundingClientRect();
    const imageCenter = rect.left + rect.width / 2;
    const distance = Math.abs(screenCenter - imageCenter);

    if (distance < minDistance) {
      minDistance = distance;
      closestImage = image;
    }
  }

  return closestImage;
};
const getCenteredImageIndex = () => {
  const track = document.getElementById("image-track");
  const images = Array.from(track.children); // Convert HTMLCollection to array
  const screenCenter = window.innerWidth / 2;
  let closestImageIndex = -1;
  let minDistance = Infinity;

  images.forEach((image, index) => {
    const rect = image.getBoundingClientRect();
    const imageCenter = rect.left + rect.width / 2;
    const distance = Math.abs(screenCenter - imageCenter);

    if (distance < minDistance) {
      minDistance = distance;
      closestImageIndex = index;
    }
  });

  return closestImageIndex;
};

// Example usage: Log the index of the centered image when the track moves
const updateCenteredImage = () => {
  const originDescription = Array.from(
    document.getElementsByClassName("origin-description")
  );
  let prevIndex = sessionStorage.getItem("track-pos");
  let centeredIndex = getCenteredImageIndex() + 1;
  if (centeredIndex !== -1) {
    console.log(`Centered Image Index: ${centeredIndex}`);
    document.getElementById("centered-image-idx").innerText = centeredIndex;
    sessionStorage.setItem("track-pos", centeredIndex);
  }
  // You are travelling left
  if (prevIndex > centeredIndex) {
    centeredIndex--;
    prevIndex--;
    console.log(originDescription[centeredIndex].innerText);
    // originDescription[prevIndex].style.opacity = 0;
    originDescription[prevIndex].style.clipPath = "inset(0 100% 0 0)";
    setTimeout(() => {
      originDescription[centeredIndex].style.clipPath = "inset(0)";
    }, 10);
    // originDescription[prevIndex].style.opacity = 1;
    // You are travelling right
  } else if (prevIndex < centeredIndex) {
    centeredIndex--;
    prevIndex--;

    console.log(originDescription[centeredIndex].innerText);
    // originDescription[prevIndex].style.opacity = 0;
    originDescription[prevIndex].style.clipPath = "inset(0 0 0 100%)";
    setTimeout(() => {
      originDescription[centeredIndex].style.clipPath = "inset(0)";
    }, 10);
  }
};
const handleOnDown = (e) => {
  // alert("mouse clicked");
  track.dataset.mouseDownAt = e.clientX;
};

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
};
const handleOnMove = (e) => {
  // const imageOne = document.querySelector("#image-one");
  if (track.dataset.mouseDownAt === "0") return;
  // console.log(imageOne.getClientBoundingClientRect());
  const mouseDelta = (parseFloat(track.dataset.mouseDownAt) - e.clientX) / 3,
    maxDelta = window.innerWidth / 2;

  const percentage = (mouseDelta / maxDelta) * -100,
    nextPercentageUnconstrained =
      parseFloat(track.dataset.prevPercentage) + percentage,
    nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

  track.dataset.percentage = nextPercentage;

  track.animate(
    {
      transform: `translateX(${nextPercentage}%)`,
    },
    { duration: 1200, fill: "forwards" }
  );

  for (const image of track.getElementsByClassName("image")) {
    image.animate(
      {
        objectPosition: `${100 + nextPercentage}% center`,
      },
      { duration: 1200, fill: "forwards" }
    );
  }
};

/* -- Had to add extra lines for touch events -- */
/* -- Use addEventListener for all events -- */
window.addEventListener("mousedown", handleOnDown);
window.addEventListener("touchstart", (e) => handleOnDown(e.touches[0]));

window.addEventListener("mouseup", handleOnUp);
window.addEventListener("touchend", (e) => handleOnUp(e.touches[0]));

window.addEventListener("mousemove", (e) => {
  handleOnMove(e);
  updateCenteredImage();
});
window.addEventListener("touchmove", (e) => {
  handleOnMove(e.touches[0]);
  updateCenteredImage();
});

/* Initialize track position */
sessionStorage.setItem("track-pos", 1);

/* Ensure DOM is loaded before applying styles */
window.addEventListener("DOMContentLoaded", () => {
  Array.from(document.getElementsByClassName("origin-description")).forEach(
    (elem, idx) => {
      if (idx !== 0) {
        elem.style.clipPath = "inset(0 100% 0 0)";
      }
    }
  );

  setInterval(() => {
    updateCenteredImage();
  }, 100);
});
