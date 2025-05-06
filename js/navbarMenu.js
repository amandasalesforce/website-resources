function initializeDropdowns() {
    const dropdownToggles = document.querySelectorAll(".dropdown-toggle");
    const dropdownMenus = document.querySelectorAll(".dropdown-menu");

    dropdownToggles.forEach((toggle, index) => {
        const menu = toggle.nextElementSibling;
        const arrow = menu?.querySelector(".dropdown-arrow");
        if (!menu || !arrow) return;

        function showDropdown() {
            toggle.classList.add("dropdown-active");
            menu.classList.add("visible");

            if (index === 1) {
                menu.classList.add("dropdown-second");
            } else {
                menu.classList.remove("dropdown-second");
            }

            const toggleRect = toggle.getBoundingClientRect();
            const menuRect = menu.getBoundingClientRect();
            const arrowPosition = ((toggleRect.left + toggleRect.width / 2) - menuRect.left) + "px";
            arrow.style.setProperty("--arrow-position", arrowPosition);
        }

        function hideDropdown() {
            toggle.classList.remove("dropdown-active");
            menu.classList.remove("visible");
        }

        toggle.addEventListener("mouseenter", showDropdown);
        menu.addEventListener("mouseenter", showDropdown);

        toggle.addEventListener("mouseleave", () => {
            setTimeout(() => {
                if (!toggle.matches(":hover") && !menu.matches(":hover")) hideDropdown();
            }, 200);
        });

        menu.addEventListener("mouseleave", () => {
            setTimeout(() => {
                if (!toggle.matches(":hover") && !menu.matches(":hover")) hideDropdown();
            }, 200);
        });
    });
}

// Run once on DOMContentLoaded
document.addEventListener("DOMContentLoaded", initializeDropdowns);

// Run again after LWR soft page loads (like redirects or SPA transitions)
document.addEventListener("load", initializeDropdowns);
window.addEventListener("pageshow", initializeDropdowns);

// Optionally expose for manual use
window.initializeDropdowns = initializeDropdowns;
