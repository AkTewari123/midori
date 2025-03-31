const container = document.getElementById("sources-container");
const overlay = document.getElementById("white-nav-overlay");

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
};

main();
