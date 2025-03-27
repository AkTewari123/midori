const navbar = document.getElementById("navbar");

let lastScrollTop = 0;
addEventListener("scroll", () => {
    // Current scroll position
    const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

    // check scroll direction
    const distance = scrollTop - lastScrollTop;
    const currentTop = parseInt(
        getComputedStyle(navbar).opacity.split("%")
    );

    // Clamp value between 0 and 100
    let amount = Math.max(
        Math.min(window.pageYOffset, 100), 0
    );

    console.log(window.pageYOffset, currentTop, Math.abs(distance));

    navbar.style.opacity = `${amount}%`;

    lastScrollTop = scrollTop;
});