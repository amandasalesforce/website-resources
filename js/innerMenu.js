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

    let preventHighlight = false; // Added flag
    let isSticky = false; // Track if menu is sticky

    function checkSticky() {
        const scrollOffset = window.scrollY || document.documentElement.scrollTop;
        const stickyThreshold = 700;

        if (scrollOffset >= stickyThreshold) { 
            if (!menu.classList.contains("sticky")) {
                menu.classList.add("sticky");
                menu.parentNode.insertBefore(placeholder, menu);
                isSticky = true;
            }
        } else {
            if (menu.classList.contains("sticky")) {
                menu.classList.remove("sticky");
                if (placeholder.parentNode) {
                    placeholder.parentNode.removeChild(placeholder);
                }
                isSticky = false;
            }
        }
        highlightMenu(); // Ensure section highlighting runs regardless of sticky state
    }

    function highlightMenu() {
        if (preventHighlight) return; // Prevent immediate highlight override

        let scrollPosition = window.scrollY || document.documentElement.scrollTop;
        let activeSection = null;

        sections.forEach((section) => {
            const rect = section.getBoundingClientRect();
            const offset = isSticky ? 270 : 20; // Adjust activation offset dynamically
            const sectionTop = rect.top + window.scrollY - offset; 
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
                }
            }
        }
    }

    menuLinks.forEach((link) => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offset = isSticky ? 270 : 20; // Match the updated logic used for scroll detection

                const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });

                // Prevent immediate override by temporarily disabling highlightMenu
                preventHighlight = true;

                // Wait for scroll animation to finish, then apply the same logic used in scrolling
                setTimeout(() => {
                    preventHighlight = false;
                    highlightMenu(); // Re-run the highlight logic used during scrolling
                    window.dispatchEvent(new Event("scroll"));
                }, 700); // Adjust delay as needed
            }
        });
    });

    window.addEventListener("scroll", function () {
        checkSticky(); // Ensure sticky menu logic runs first
        highlightMenu(); // Ensure section highlighting always runs
    });

    highlightMenu(); // Run once on page load in case user refreshes in the middle of the page
});