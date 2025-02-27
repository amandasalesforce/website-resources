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
        const scrollOffset = window.scrollY || document.documentElement.scrollTop;

        if (scrollOffset >= menu.offsetTop + 700) { // Adjusted trigger position
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
            const sectionTop = section.offsetTop - 150; // Adjust for sticky menu height
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                activeSection = section.id;
            }
        });

        // Remove active class from all buttons first
        menuLinks.forEach((link) => {
            const button = link.querySelector(".sticky-menuButton");
            if (button) {
                button.classList.remove("active");
            }
        });

        // Apply active class to the correct button
        if (activeSection) {
            const activeLink = document.querySelector(`.sticky-menuWrapper a[href="#${activeSection}"]`);
            if (activeLink) {
                const activeButton = activeLink.querySelector(".sticky-menuButton");
                if (activeButton) {
                    activeButton.classList.add("active");
                    console.log(`✅ Active Button: ${activeButton.innerText}`);
                }
            }
        }
    }

    window.addEventListener("scroll", function () {
        checkSticky();
        highlightMenu();
    });

    highlightMenu(); // Run once on page load in case user refreshes in the middle of the page
});
