document.addEventListener("DOMContentLoaded", function () {
    const menu = document.querySelector(".sticky-menuWrapper");
    const sections = document.querySelectorAll("div[id^='Section_']");
    const menuLinks = document.querySelectorAll(".sticky-menuWrapper a");

    if (!menu) {
        console.warn("Sticky menu not found on this page. Skipping script.");
        return;
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
                        console.log(`✅ Active button: ${button.innerText}`);
                    } else {
                        button.classList.remove("active");
                    }
                }
            });
        }
    }

    window.addEventListener("scroll", highlightMenu);
    highlightMenu(); // Run once on page load
});
