// Sticky Menu on Scroll
document.addEventListener("DOMContentLoaded", function () {
    const menu = document.querySelector(".sticky-menuWrapper");
    const offset = menu.offsetTop; // Get initial position

    window.addEventListener("scroll", function () {
        if (window.scrollY >= offset) {
            menu.classList.add("sticky");
        } else {
            menu.classList.remove("sticky");
        }
    });
});
