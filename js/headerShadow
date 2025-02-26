document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector(".lwc-4g1q55crn48.header"); // Adjust this selector to match your header

    if (!header) {
        console.warn("Site header not found. Skipping box shadow script.");
        return;
    }

    function applyHeaderShadow() {
        if (window.scrollY > 10) {
            header.classList.add("scrolled"); // Add shadow when scrolled
        } else {
            header.classList.remove("scrolled"); // Remove shadow when at the top
        }
    }

    window.addEventListener("scroll", applyHeaderShadow);
});
