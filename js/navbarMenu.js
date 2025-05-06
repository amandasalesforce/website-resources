function initializeDropdowns() {
    const dropdownToggles = document.querySelectorAll(".dropdown-toggle");
    const dropdownMenus = document.querySelectorAll(".dropdown-menu");

    dropdownToggles.forEach((toggle, index) => {
        const menu = toggle.nextElementSibling; // The corresponding dropdown menu
        const arrow = menu?.querySelector(".dropdown-arrow"); // The dropdown arrow inside the menu

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

        toggle.addEventListener("mouseleave", function () {
            setTimeout(() => {
                if (!toggle.matches(":hover") && !menu.matches(":hover")) {
                    hideDropdown();
                }
            }, 200);
        });

        menu.addEventListener("mouseleave", function () {
            setTimeout(() => {
                if (!toggle.matches(":hover") && !menu.matches(":hover")) {
                    hideDropdown();
                }
            }, 200);
        });
    });
}

// Call once on initial page load
document.addEventListener("DOMContentLoaded", initializeDropdowns);

// Optionally expose globally if you need to call it again later
window.initializeDropdowns = initializeDropdowns;
