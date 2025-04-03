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
      // Position the green dot horizontally within "menu"
      greenDot.style.left = `${relativeX}px`;
      greenDot.style.top = `${relativeY}px`;
      // Scale it by 20
      greenDot.style.transform = "scale(20)";
    });
  document
    .getElementById("menu-link-nav")
    .addEventListener("mouseleave", (event) => {
      const greenDot = document.getElementById("greendot");
      const menuElement = document.getElementById("menu-link-nav");

      const menuRect = menuElement.getBoundingClientRect(); // get pos of mouse relative to menu box
      const relativeX = event.clientX - menuRect.left;
      const relativeY = event.clientY - menuRect.top;
      greenDot.style.left = `${relativeX}px`;
      greenDot.style.top = `${relativeY}px`;

      greenDot.style.transform = "scale(.01)";
    });
};
const main = () => {
  const toggleViewer = document.getElementById("toggle-viewer");

  toggleViewer.onclick = () => {
    overlay.style.clipPath = "inset(0 0 0 0)";
  };

  document.getElementById("white-nav-close").onclick = () => {
    overlay.style.clipPath = "inset(0 0 100% 0)";
  };
  menuGreenTransition();
  window.addEventListener("beforeunload", () => {
    sessionStorage.clear();
  });
};

document.addEventListener("DOMContentLoaded", main);
