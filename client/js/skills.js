document.addEventListener("DOMContentLoaded", function () {

    const bars = document.querySelectorAll(".progress-bar");

    bars.forEach(bar => {

        const target = parseInt(bar.getAttribute("data-percent"));
        let width = 0;

        const interval = setInterval(() => {

            if (width >= target) {
                clearInterval(interval);
            } else {
                width++;
                bar.style.width = width + "%";
            }

        }, 17); // speed control

    });

});