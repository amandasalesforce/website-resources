document.addEventListener("DOMContentLoaded", function () {
    const menu = document.querySelector(".sticky-menuWrapper");

    if (!menu) {
        console.warn("Sticky menu not found on this page. Skipping script.");
        return;
    }

    const placeholder = document.createElement("div"); // Create a placeholder
    placeholder.style.width = menu.offsetWidth + "px"; 
    placeholder.style.height = menu.offsetHeight + "px"; // Match menu height

    function checkSticky() {
        const scrollOffset = window.scrollY || window.pageYOffset;

        if (scrollOffset >= menu.offsetTop + 800) { // Adjusted scroll position
            if (!menu.classList.contains("sticky")) {
                menu.classList.add("sticky");
                menu.parentNode.insertBefore(placeholder, menu); // Add placeholder
            }
        } else {
            if (menu.classList.contains("sticky")) {
                menu.classList.remove("sticky");
                if (placeholder.parentNode) {
                    placeholder.parentNode.removeChild(placeholder); // Remove placeholder
                }
            }
        }
    }

    window.addEventListener("scroll", checkSticky);
});
