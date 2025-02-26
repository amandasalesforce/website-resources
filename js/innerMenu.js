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

        if (scrollOffset >= menu.offsetTop + 700) {
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
        let activeSection = null;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 150;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                activeSection = section.id;
            }
        });

        if (activeSection) {
            menuLinks.forEach((link) => {
                const button = link.querySelector(".sticky-menuButton");
                if (button) {
                    if (link.getAttribute("href") === `#${activeSection}`) {
                        button.classList.add("active");
                    } else {
                        button.classList.remove("active");
                    }
                }
            });
        }
    }

    window.addEventListener("scroll", function () {
        checkSticky();
        highlightMenu();
    });

    // Run highlightMenu on load in case user refreshes in the middle of the page
    highlightMenu();
});
