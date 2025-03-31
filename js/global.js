const overlay = document.getElementById("white-nav-overlay");
const menuGreenTransition = () => {
  document
    .getElementById("menu-link-nav")
    .addEventListener("mouseenter", (event) => {
      const greenDot = document.getElementById("greendot");
      const menuElement = document.getElementById("menu-link-nav");

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
  document
    .getElementById("menu-link-nav")
    .addEventListener("mouseleave", (event) => {
      const greenDot = document.getElementById("greendot");
      const menuElement = document.getElementById("menu-link-nav");

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
const main = () => {
  const container = document.getElementById("sources-container");

  const sourcesOpen1 = document.getElementById("sources-trigger-open");
  const sourcesOpen2 = document.getElementById("sources-trigger-open-2");
  const sourcesClose = document.getElementById("sources-trigger-close");
  const toggleViewer = document.getElementById("toggle-viewer");

  sourcesOpen1.addEventListener("click", function () {
    container.style.clipPath = "circle(135% at 0% 25%)";
    console.log("Here");
  });

  sourcesClose.addEventListener("click", function () {
    container.style.clipPath = "circle(0% at 0% 25%)";
    document.getElementById("post-transition").style.display = "block";
  });

  toggleViewer.onclick = () => {
    overlay.style.clipPath = "inset(0 0 0 0)";
  };

  document.getElementById("white-nav-close").onclick = () => {
    overlay.style.clipPath = "inset(0 0 100% 0)";
  };
  sourcesOpen2.addEventListener("click", function () {
    console.log("hereajf;dsjfk;las");
    container.style.clipPath = "circle(135% at 0% 25%)";
  });
  menuGreenTransition();
  window.addEventListener("beforeunload", () => {
    sessionStorage.clear();
  });
};

document.addEventListener("DOMContentLoaded", main);
