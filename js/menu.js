const navbar = document.getElementById("navbar");

let lastScrollTop = 0;
addEventListener("scroll", () => {
    // Current scroll position
    const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

    // Calculate opacity as a value between 0 and 1
    const maxScroll = 100; // Maximum scroll value for full opacity
    const amount = Math.min(scrollTop / maxScroll, 1); // Clamp value between 0 and 1

    // Apply the calculated opacity
    navbar.style.opacity = amount;

    lastScrollTop = scrollTop;
});