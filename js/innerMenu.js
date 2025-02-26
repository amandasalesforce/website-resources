document.addEventListener("DOMContentLoaded", function () {
    const menu = document.querySelector(".sticky-menuWrapper");
    const sections = document.querySelectorAll("div[id^='Section_']");
    const menuButtons = document.querySelectorAll(".sticky-menuWrapper a");

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

    function highlightMenu() {
        let scrollPosition = window.scrollY || document.documentElement.scrollTop;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 150; // Adjust for sticky menu height
            const sectionBottom = sectionTop + section.offsetHeight;
            const targetButton = document.querySelector(`.sticky-menuWrapper a[href="#${section.id}"]`);

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                menuButtons.forEach((btn) => btn.classList.remove("active"));
                if (targetButton) {
                    targetButton.classList.add("active");
                }
            }
        });
    }

    window.addEventListener("scroll", function () {
        checkSticky();
        highlightMenu();
    });
});
