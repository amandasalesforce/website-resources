document.addEventListener("DOMContentLoaded", function () {
    // Navbar Dropdown Menu
    const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

    dropdownToggles.forEach((toggle, index) => {
        const menu = toggle.nextElementSibling;
        if (!menu) return;

        const arrow = menu.querySelector(".dropdown-arrow");
        if (!arrow) return;

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

    // Sticky Menu on Scroll
    const menu = document.querySelector(".sticky-menuWrapper");
    if (!menu) return;

    const offset = menu.offsetTop;
    window.addEventListener("scroll", function () {
        if (window.scrollY >= offset) {
            menu.classList.add("sticky");
        } else {
            menu.classList.remove("sticky");
        }
    });
});
