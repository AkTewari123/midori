const container = document.getElementById("sources-container");
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
};

main();
