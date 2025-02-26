document.addEventListener("DOMContentLoaded", function () {
    const menu = document.querySelector(".sticky-menuWrapper");

    // ✅ Prevents error if `.sticky-menuWrapper` is missing
    if (!menu) {
        console.warn("Sticky menu not found on this page. Skipping script.");
        return;
    }

    const offset = menu.offsetTop; // Get initial position

    window.addEventListener("scroll", function () {
        if (window.scrollY >= offset) {
            menu.classList.add("sticky");
        } else {
            menu.classList.remove("sticky");
        }
    });
});
