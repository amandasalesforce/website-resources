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
        if (preventHighlight) return; // Prevent immediate highlight override

        let scrollPosition = window.scrollY || document.documentElement.scrollTop;
        let activeSection = null;
        
        const isSticky = document.querySelector(".sticky-menuWrapper").classList.contains("sticky");

        sections.forEach((section) => {
            const rect = section.getBoundingClientRect();
            const offset = isSticky ? 250 : 0; // Adjust when sticky
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
                const isSticky = document.querySelector(".sticky-menuWrapper").classList.contains("sticky");
                const offset = isSticky ? 250 : 0; // Match the logic used for scroll detection

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
                }, 700); // Adjust delay as needed
            }
        });
    });

    window.addEventListener("scroll", function () {
        checkSticky();
        highlightMenu();
    });

    highlightMenu(); // Run once on page load in case user refreshes in the middle of the page
});