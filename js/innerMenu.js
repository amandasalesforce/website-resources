document.addEventListener("DOMContentLoaded", function () {
    const menu = document.querySelector(".sticky-menuWrapper");
    const header = document.querySelector(".site-header"); // Select your website header

    if (!menu) {
        console.warn("Sticky menu not found on this page. Skipping script.");
        return;
    }

    const placeholder = document.createElement("div");
    placeholder.style.width = menu.offsetWidth + "px"; 
    placeholder.style.height = menu.offsetHeight + "px"; 

    function checkSticky() {
        const scrollOffset = window.scrollY || window.pageYOffset;

        if (scrollOffset >= menu.offsetTop + 800) {
            if (!menu.classList.contains("sticky")) {
                menu.classList.add("sticky");
                menu.parentNode.insertBefore(placeholder, menu);
            }
            if (header) {
                header.classList.add("scrolled"); // Add shadow class when scrolling
            }
        } else {
            if (menu.classList.contains("sticky")) {
                menu.classList.remove("sticky");
                if (placeholder.parentNode) {
                    placeholder.parentNode.removeChild(placeholder);
                }
            }
            if (header) {
                header.classList.remove("scrolled"); // Remove shadow when scrolled back up
            }
        }
    }

    window.addEventListener("scroll", checkSticky);
});
