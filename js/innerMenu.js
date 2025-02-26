document.addEventListener("DOMContentLoaded", function () {
    const menu = document.querySelector(".sticky-menuWrapper");

    if (!menu) {
        console.warn("Sticky menu not found on this page. Skipping script.");
        return;
    }

    function checkSticky() {
        const menuTop = menu.getBoundingClientRect().top; // Get position relative to viewport
        const scrollOffset = window.scrollY || window.pageYOffset; // Get scroll position

        if (scrollOffset >= menu.offsetTop) {
            menu.classList.add("sticky");
        } else {
            menu.classList.remove("sticky");
        }
    }

    window.addEventListener("scroll", checkSticky);
});
