const sliders = document.querySelectorAll(".thumbnail-slider");

sliders.forEach(slider => {

    const images = slider.querySelectorAll(".thumb");
    let index = 0;

    images[0].classList.add("active");

    setInterval(() => {

        images[index].classList.remove("active");

        index++;
        if (index >= images.length) index = 0;

        images[index].classList.add("active");

    }, 3000);

});
// =============================
// CARD CLICK NAVIGATION
// =============================

document.addEventListener("DOMContentLoaded", function () {

    const cards = document.querySelectorAll(".card");
    const buttons = document.querySelectorAll(".view-btn");

    // Target pages (change names if needed)
        const pages = [
        "certificates.html",
        "hackathons.html",
        "milestones.html"
    ];

    // Make entire card clickable
    cards.forEach((card, index) => {
        card.style.cursor = "pointer";

        card.addEventListener("click", function () {
            window.location.href = pages[index];
        });
    });

    // Make View All button clickable without triggering card twice
    buttons.forEach((btn, index) => {
        btn.addEventListener("click", function (e) {
            e.stopPropagation(); 
            window.location.href = pages[index];
        });
    });

});