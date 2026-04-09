// ========================================
// iTalento — Users Page JS
// ========================================

document.addEventListener('DOMContentLoaded', () => {

    // -------  Sidebar toggle  -------
    const menuToggle = document.getElementById('menuToggle');
    const sidebar    = document.getElementById('sidebar');
    const overlay    = document.getElementById('sidebarOverlay');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('show');
            overlay.classList.toggle('show');
        });
    }

    if (overlay) {
        overlay.addEventListener('click', () => {
            sidebar.classList.remove('show');
            overlay.classList.remove('show');
        });
    }

    // -------  Profile dropdown  -------
    const profileBtn  = document.getElementById('profileDropdown');
    const profileMenu = document.getElementById('profileMenu');

    if (profileBtn && profileMenu) {
        profileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            profileMenu.classList.toggle('show');
        });

        document.addEventListener('click', () => {
            profileMenu.classList.remove('show');
        });
    }

    // -------  Filter tabs  -------
    const filterTabs = document.querySelectorAll('#userFilterTabs .filter-tab');
    const rows       = document.querySelectorAll('#usersTableBody .user-card');

    function updateCounts() {
        const all       = rows.length;
        let active      = 0, inactive = 0, admin = 0, hr = 0, recruiter = 0;

        rows.forEach(row => {
            const status = row.dataset.status;
            const role   = row.dataset.role;
            if (status === 'active')   active++;
            if (status === 'inactive') inactive++;
            if (role === 'admin')      admin++;
            if (role === 'hr')         hr++;
            if (role === 'recruiter')  recruiter++;
        });

        const el = id => document.getElementById(id);
        if (el('countAll'))       el('countAll').textContent       = all;
        if (el('countAdmin'))     el('countAdmin').textContent     = admin;
        if (el('countHR'))        el('countHR').textContent        = hr;
        if (el('countRecruiter')) el('countRecruiter').textContent = recruiter;
    }
    updateCounts();

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filter = tab.dataset.filter;
            let visibleCount = 0;

            rows.forEach(row => {
                let show = false;
                if (filter === 'all') {
                    show = true;
                } else if (filter === 'active' || filter === 'inactive') {
                    show = row.dataset.status === filter;
                } else {
                    show = row.dataset.role === filter;
                }

                row.style.display = show ? 'flex' : 'none';
                if (show) visibleCount++;
            });

            // Update info text
            const info = document.getElementById('userTableInfo');
            if (info) {
                info.innerHTML = `Showing <strong>${visibleCount}</strong> of <strong>${rows.length}</strong> users`;
            }

            const paginationInfo = document.getElementById('userPaginationInfo');
            if (paginationInfo) {
                paginationInfo.textContent = `Showing ${visibleCount} users`;
            }
        });
    });

    // -------  Table search  -------
    const searchInput = document.getElementById('userTableSearch');
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const query = searchInput.value.toLowerCase().trim();
            let visibleCount = 0;

            rows.forEach(row => {
                const name  = row.querySelector('.user-card-name')?.textContent.toLowerCase() || '';
                const email = row.querySelector('.user-card-email')?.textContent.toLowerCase() || '';
                const role  = row.querySelector('.role-badge')?.textContent.toLowerCase() || '';

                const match = name.includes(query) || email.includes(query) || role.includes(query);
                row.style.display = match ? 'flex' : 'none';
                if (match) visibleCount++;
            });

            const info = document.getElementById('userTableInfo');
            if (info) {
                info.innerHTML = `Showing <strong>${visibleCount}</strong> of <strong>${rows.length}</strong> users`;
            }

            // Reset filter tabs to "All Users"
            filterTabs.forEach(t => t.classList.remove('active'));
            filterTabs[0]?.classList.add('active');
        });
    }

    // -------  Edit / Delete action buttons  -------
    document.querySelectorAll('.dropdown-item:not(.delete-item)').forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (btn.textContent.includes('Edit')) {
                const card  = btn.closest('.user-card');
                const name  = card.querySelector('.user-card-name')?.textContent || '';
                alert(`Edit user: ${name}`);
            }
        });
    });

    document.querySelectorAll('.delete-item').forEach(btn => {
        btn.addEventListener('click', () => {
            const card  = btn.closest('.user-card');
            const name  = card.querySelector('.user-card-name')?.textContent || '';
            if (confirm(`Are you sure you want to delete ${name}?`)) {
                card.remove();
                updateCounts();
                // Re-run active filter
                const activeTab = document.querySelector('#userFilterTabs .filter-tab.active');
                if (activeTab) activeTab.click();
            }
        });
    });

    // -------  Add User form submit  -------
    const addUserForm = document.getElementById('addUserForm');
    if (addUserForm) {
        addUserForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email    = document.getElementById('userEmailInput').value.trim();
            const role     = document.getElementById('userRoleSelect').value;

            if (!email || !role) return;

            const initials = email.substring(0, 2).toUpperCase();
            const colors   = ['#2d8a86','#3b82f6','#8b5cf6','#f59e0b','#ec4899','#10b981'];
            const color    = colors[Math.floor(Math.random() * colors.length)];
            const roleLower = role.toLowerCase();
            const roleClass = `${roleLower}`;

            const card = document.createElement('div');
            card.className = 'user-card';
            card.dataset.role   = roleLower;
            card.dataset.status = 'active';
            card.innerHTML = `
                <div class="card-top">
                    <div class="user-card-avatar" style="background: ${color};">${initials}</div>
                    <div class="user-info-wrap">
                        <span class="user-card-name">${email.split('@')[0].replace(/[^a-zA-Z]/g,' ').replace(/\b\w/g,l=>l.toUpperCase())}</span>
                        <span class="user-card-email">${email}</span>
                    </div>
                </div>
                <div class="card-bottom">
                    <span class="role-badge ${roleClass}">${role}</span>
                    <div class="dropdown user-dropdown">
                        <button class="dot-btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="bi bi-three-dots-vertical"></i>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li><a class="dropdown-item" href="#"><i class="bi bi-pencil"></i> Edit User</a></li>
                            <li><a class="dropdown-item delete-item" href="#"><i class="bi bi-trash"></i> Delete User</a></li>
                        </ul>
                    </div>
                </div>
            `;

            document.getElementById('usersTableBody').appendChild(card);

            // Reset form & close modal
            addUserForm.reset();
            const modal = bootstrap.Modal.getInstance(document.getElementById('addUserModal'));
            if (modal) modal.hide();

            // Refresh counts (optional, logic above handles dynamic update if uncommented)
            location.reload(); 
        });
    }
});






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