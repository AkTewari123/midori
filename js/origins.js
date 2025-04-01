const track = document.getElementById("image-track");

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
      transform: `translate(${nextPercentage}%, -20%)`,
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

window.onmousedown = (e) => handleOnDown(e);

window.ontouchstart = (e) => handleOnDown(e.touches[0]);

window.onmouseup = (e) => handleOnUp(e);

window.ontouchend = (e) => handleOnUp(e.touches[0]);

window.onmousemove = (e) => handleOnMove(e);

window.ontouchmove = (e) => handleOnMove(e.touches[0]);
let scrollPosition = 0;

// Add event listener for scroll
// window.addEventListener("scroll", () => {
//   // Get the current scroll position
//   const newScrollPosition = window.scrollY;

//   // Calculate how much to translate based on scroll
//   // You can adjust the division factor to control the speed of translation
//   const translateY = -newScrollPosition; // Divide by 2 to make it move at half the scroll speed

//   // Apply the translation to the element
//   track.style.transform = `translateY(${translateY}px)`;

//   // Update the scroll position
//   scrollPosition = newScrollPosition;
// });
