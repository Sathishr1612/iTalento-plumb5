document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll(".settings-nav-btn");
    const panes = document.querySelectorAll(".settings-pane");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            // Remove active classes from all tabs and panes
            tabs.forEach(t => t.classList.remove("active"));
            panes.forEach(p => p.classList.remove("active"));

            // Add active class to clicked tab
            tab.classList.add("active");
            
            // Add active class to target pane based on data-target attribute
            const targetId = tab.getAttribute("data-target");
            const targetPane = document.getElementById(targetId);
            if (targetPane) {
                targetPane.classList.add("active");
            }
        });
    });
});



      
/* ============================================
        profile dropdown
     ============================================ */

        const profileDropdownWrap = document.getElementById("profileDropdownWrap");
const profileDropdown = document.getElementById("profileDropdown");

if (profileDropdown && profileDropdownWrap) {
  profileDropdown.addEventListener("click", function (e) {
    e.stopPropagation();
    profileDropdownWrap.classList.toggle("open");
  });

  document.addEventListener("click", function (e) {
    if (!profileDropdownWrap.contains(e.target)) {
      profileDropdownWrap.classList.remove("open");
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      profileDropdownWrap.classList.remove("open");
    }
  });
}