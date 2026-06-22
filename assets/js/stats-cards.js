document.addEventListener("DOMContentLoaded", () => {
    const viewMoreBtn = document.getElementById("viewMoreMetricsBtn");
    const expandedStatsWrapper = document.getElementById("expandedStatsWrapper");

    if (viewMoreBtn && expandedStatsWrapper) {
        viewMoreBtn.addEventListener("click", () => {
            // Toggle the expanded class for smooth CSS grid animation
            const isExpanded = expandedStatsWrapper.classList.toggle("expanded");
            viewMoreBtn.classList.toggle("expanded");

            // Update the button text
            const btnText = viewMoreBtn.querySelector("span");
            if (isExpanded) {
                btnText.textContent = "View Less Metrics";
            } else {
                btnText.textContent = "View More Metrics";
            }
        });
    }
});
