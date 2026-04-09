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




/* ================================
   SIDEBAR TOGGLE & PERSISTENCE
   ================================ */
const menuToggle = document.getElementById('menuToggle');
const sidebarEl = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');

if (menuToggle && sidebarEl) {
    menuToggle.addEventListener('click', () => {
        if (window.innerWidth < 992) {
            // Mobile: Toggle slide-in and overlay
            sidebarEl.classList.toggle('show');
            if (sidebarOverlay) sidebarOverlay.classList.toggle('show');
        } else {
            // Desktop: Toggle collapsed state
            const isCollapsed = document.documentElement.classList.toggle('sidebar-collapsed');
            
            // Toggle the local class on the sidebar element
            sidebarEl.classList.toggle('collapsed', isCollapsed);
            
            // Save the state
            localStorage.setItem('sidebar-state', isCollapsed ? 'collapsed' : 'expanded');
        }
    });

    // Sync the sidebar element class on initial load for JS consistency
    if (document.documentElement.classList.contains('sidebar-collapsed')) {
        sidebarEl.classList.add('collapsed');
    }
}

// Overlay click to close on mobile
if (sidebarOverlay && sidebarEl) {
    sidebarOverlay.addEventListener('click', () => {
        sidebarEl.classList.remove('show');
        sidebarOverlay.classList.remove('show');
    });
}