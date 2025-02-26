document.addEventListener("DOMContentLoaded", function () {
    const menu = document.querySelector(".sticky-menuWrapper");
    const sections = document.querySelectorAll("div[id^='Section_']");
    const menuLinks = document.querySelectorAll(".sticky-menuWrapper a");

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
        } else {
            if (menu.classList.contains("sticky")) {
                menu.classList.remove("sticky");
                if (placeholder.parentNode) {
                    placeholder.parentNode.removeChild(placeholder);
                }
            }
        }
    }

    function highlightMenu() {
        let scrollPosition = window.scrollY || document.documentElement.scrollTop;
        let foundActive = false;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 150;
            const sectionBottom = sectionTop + section.offsetHeight;
            const targetLink = document.querySelector(`.sticky-menuWrapper a[href="#${section.id}"]`);

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                if (targetLink) {
                    const button = targetLink.querySelector(".sticky-menuButton");
                    if (button) {
                        button.classList.add("active");
                        foundActive = true;
                    }
                }
            }
        });

        // Remove active class from all buttons except the one that should be active
        menuLinks.forEach((link) => {
            const button = link.querySelector(".sticky-menuButton");
            if (button && !foundActive) {
                button.classList.remove("active");
            }
        });
    }

    window.addEventListener("scroll", function () {
        checkSticky();
        highlightMenu();
    });
});
