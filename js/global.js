const container = document.getElementById("sources-container");
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
  document
    .getElementById("sources-trigger-open")
    .addEventListener("click", function () {
      container.style.clipPath = "circle(135% at 0% 25%)";
      setTimeout(() => {
        document.getElementById("post-transition").style.display = "none";
      }, 10);
    });

  document
    .getElementById("sources-trigger-close")
    .addEventListener("click", function () {
      container.style.clipPath = "circle(0% at 0% 25%)";
      document.getElementById("post-transition").style.display = "block";
    });

  Array.from(document.getElementsByClassName("nav-hoveritem")).forEach(
    (item) => {
      item.onclick = () => {
        localStorage.setItem("payload", item.innerText);
      };
    }
  );
  document.getElementById("toggle-viewer").onclick = () => {
    overlay.style.clipPath = "inset(0 0 0 0)"; // Expand from top
  };
  document.getElementById("white-nav-close").onclick = () => {
    overlay.style.clipPath = "inset(0 0 100% 0)"; // Expand from top
  };
  menuGreenTransition();
};

main();
