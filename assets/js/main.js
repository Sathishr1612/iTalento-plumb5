
const departments = [
    {
        id: 1,
        name: 'Engineering',
        icon: 'bi-code-slash',
        iconClass: 'engineering',
        totalJobs: 8,
        totalCandidates: 64,
        shortlisted: 18,
        progress: 75
    },
    {
        id: 2,
        name: 'Design',
        icon: 'bi-palette',
        iconClass: 'design',
        totalJobs: 4,
        totalCandidates: 32,
        shortlisted: 12,
        progress: 60
    },
    {
        id: 3,
        name: 'Marketing',
        icon: 'bi-megaphone',
        iconClass: 'marketing',
        totalJobs: 5,
        totalCandidates: 28,
        shortlisted: 8,
        progress: 45
    },
    {
        id: 4,
        name: 'Sales',
        icon: 'bi-graph-up-arrow',
        iconClass: 'sales',
        totalJobs: 6,
        totalCandidates: 42,
        shortlisted: 15,
        progress: 80
    },
    {
        id: 5,
        name: 'Human Resources',
        icon: 'bi-people',
        iconClass: 'hr',
        totalJobs: 2,
        totalCandidates: 16,
        shortlisted: 5,
        progress: 40
    },
    {
        id: 6,
        name: 'Product',
        icon: 'bi-box-seam',
        iconClass: 'product',
        totalJobs: 3,
        totalCandidates: 24,
        shortlisted: 9,
        progress: 55
    },
    {
        id: 7,
        name: 'Finance',
        icon: 'bi-cash-stack',
        iconClass: 'finance',
        totalJobs: 2,
        totalCandidates: 14,
        shortlisted: 4,
        progress: 35
    },
    {
        id: 8,
        name: 'Customer Success',
        icon: 'bi-headset',
        iconClass: 'support',
        totalJobs: 4,
        totalCandidates: 22,
        shortlisted: 7,
        progress: 50
    }
];

const aiRecommendations = [
    {
        id: 1,
        name: 'RANJITH',
        role: 'Full Stack Developer',
        match: '95%',
        avatar: 'https://i.pravatar.cc/150?img=1'
    },
    {
        id: 2,
        name: 'MANOJ',
        role: 'Product Designer',
        match: '92%',
        avatar: ''
    },
    {
        id: 3,
        name: 'SUBASH',
        role: 'Data Analyst',
        match: '89%',
        avatar: ''
    }
];

const interviewReminders = [
    {
        id: 1,
        time: '10:00',
        ampm: 'AM',
        candidate: 'Maria Garcia',
        role: 'UX Designer'
    },
    {
        id: 2,
        time: '2:30',
        ampm: 'PM',
        candidate: 'John Davis',
        role: 'Senior Developer'
    },
    {
        id: 3,
        time: '4:00',
        ampm: 'PM',
        candidate: 'Lisa Wang',
        role: 'Product Manager'
    }
];

const activities = [
    {
        id: 1,
        text: '<strong>Alex Thompson</strong> was shortlisted for <strong>Senior Frontend</strong>',
        time: '10 min ago',
        type: 'default'
    },
    {
        id: 2,
        text: '<strong>Priya Sharma</strong> was hired as <strong>Backend Engineer</strong>',
        time: '2 hours ago',
        type: 'hired'
    },
    {
        id: 3,
        text: 'New job posted: <strong>Senior Product Manager</strong>',
        time: '4 hours ago',
        type: 'default'
    },
    {
        id: 4,
        text: '<strong>Robert Lee</strong> application was rejected',
        time: 'Yesterday',
        type: 'rejected'
    }
];

// ============================================
// RENDER FUNCTIONS
// ============================================

function renderDepartments() {
    const deptGrid = document.getElementById('deptGrid');
    deptGrid.innerHTML = departments.map(dept => `
                <div class="dept-card" onclick="navigateToDepartment(${dept.id})">
                    <div class="dept-header">
                        <div class="dept-icon ${dept.iconClass}">
                            <i class="bi ${dept.icon}"></i>
                        </div>
                        <div class="dept-info">
                            <div class="dept-name">${dept.name}</div>
                            <div class="dept-meta">${dept.totalJobs} open positions</div>
                        </div>
                    </div>
                    <div class="dept-stats">
                        <div class="dept-stat">
                            <div class="dept-stat-value">${dept.totalCandidates}</div>
                            <div class="dept-stat-label">Candidates</div>
                        </div>
                        <div class="dept-stat">
                            <div class="dept-stat-value">${dept.shortlisted}</div>
                            <div class="dept-stat-label">Shortlisted</div>
                        </div>
                        <div class="dept-stat">
                            <div class="dept-stat-value">${Math.round((dept.shortlisted / dept.totalCandidates) * 100)}%</div>
                            <div class="dept-stat-label">Rate</div>
                        </div>
                    </div>
                    <div class="dept-progress">
                        <div class="progress-header">
                            <span class="progress-label">Hiring Progress</span>
                            <span class="progress-value">${dept.progress}%</span>
                        </div>
                        <div class="progress-bar-custom">
                            <div class="progress-fill" style="width: ${dept.progress}%"></div>
                        </div>
                    </div>
                </div>
`).join('');
}
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function () {

        // Remove active from all nav links
        document.querySelectorAll('.nav-link')
            .forEach(l => l.classList.remove('active'));

        // Add active to clicked one
        this.classList.add('active');

    });
});

function renderRecommendations() {
    const container = document.getElementById('recommendationsList');
    container.innerHTML = aiRecommendations.map(rec => `
                <div class="recommendation-item">
                    <img src="${rec.avatar}" alt="${rec.name}" class="rec-avatar">
                    <div class="rec-info">
                        <div class="rec-name">${rec.name}</div>
                        <div class="rec-role">${rec.role}</div>
                    </div>
                    <span class="rec-match">${rec.match}</span>
                </div>
            `).join('');
}

function renderInterviewReminders() {
    const container = document.getElementById('interviewReminders');
    container.innerHTML = interviewReminders.map(reminder => `
                <div class="reminder-item">
                    <div class="reminder-time">
                        <span class="reminder-hour">${reminder.time}</span>
                        <span class="reminder-ampm">${reminder.ampm}</span>
                    </div>
                    <div class="reminder-content">
                        <h5>${reminder.candidate}</h5>
                        <p>${reminder.role}</p>
                    </div>
                </div>
            `).join('');
}

function renderActivityTimeline() {
    const container = document.getElementById('activityTimeline');
    container.innerHTML = activities.map(activity => `
                <div class="timeline-item">
                    <div class="timeline-dot ${activity.type}"></div>
                    <div class="timeline-content">
                        <div class="timeline-text">${activity.text}</div>
                        <div class="timeline-time">${activity.time}</div>
                    </div>
                </div>
            `).join('');
}

// ============================================
// CHART INITIALIZATION
// ============================================

function initPipelineChart() {
    const ctx = document.getElementById('pipelineChart').getContext('2d');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['New', 'Shortlisted', 'Interview', 'Hired', 'Rejected'],
            datasets: [{
                label: 'Candidates',
                data: [156, 42, 18, 12, 28],
                backgroundColor: [
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(139, 92, 246, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(239, 68, 68, 0.8)'
                ],
                borderColor: [
                    'rgb(59, 130, 246)',
                    'rgb(139, 92, 246)',
                    'rgb(245, 158, 11)',
                    'rgb(16, 185, 129)',
                    'rgb(239, 68, 68)'
                ],
                borderWidth: 2,
                borderRadius: 10,
                borderSkipped: false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: '#1F3B4D',
                    padding: 14,
                    cornerRadius: 10,
                    titleFont: {
                        family: 'Inter',
                        size: 13,
                        weight: '600'
                    },
                    bodyFont: {
                        family: 'Inter',
                        size: 13
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0,0,0,0.04)',
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            family: 'Inter',
                            size: 12
                        },
                        color: '#6B7280',
                        padding: 10
                    }
                },
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            family: 'Inter',
                            size: 12,
                            weight: '500'
                        },
                        color: '#1F3B4D'
                    }
                }
            },
            animation: {
                duration: 1200,
                easing: 'easeOutQuart'
            }
        }
    });
}

// ============================================
// EVENT HANDLERS
// ============================================

function navigateToDepartment(deptId) {
    const dept = departments.find(d => d.id === deptId);
    alert(`Navigating to ${dept.name} department page...`);
    // Backend integration: window.location.href = `/departments/${deptId}`;
}

// Mobile menu toggle
document.getElementById('menuToggle').addEventListener('click', function () {
    document.getElementById('sidebar').classList.toggle('show');
    document.getElementById('sidebarOverlay').classList.toggle('show');
});

// Sidebar overlay click
document.getElementById('sidebarOverlay').addEventListener('click', function () {
    document.getElementById('sidebar').classList.remove('show');
    document.getElementById('sidebarOverlay').classList.remove('show');
});

// Filter toggle
document.getElementById('filterToggle').addEventListener('click', function () {
    const content = document.getElementById('filterContent');
    const icon = this.querySelector('i');
    content.classList.toggle('show');
    icon.classList.toggle('bi-chevron-down');
    icon.classList.toggle('bi-chevron-up');
});

// Filter chips
document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', function () {
        document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
        this.classList.add('active');
    });
});

// Button handlers
// document.getElementById('postJobBtn').addEventListener('click', function () {
//     alert('Opening job posting form...');
// });

document.getElementById('notificationBtn').addEventListener('click', function () {
    alert('Opening notifications...');
});

// document.getElementById('profileDropdown').addEventListener('click', function () {
//     alert('Opening profile menu...');
// });

document.getElementById('searchMobileToggle').addEventListener('click', function () {
    alert('Opening mobile search...');
});

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function () {
    // renderDepartments();
    renderRecommendations();
    renderInterviewReminders();
    renderActivityTimeline();
    initPipelineChart();
});


document.addEventListener("DOMContentLoaded", function () {

    // Dashboard page functions
    if (document.getElementById("pipelineChart")) {
        initPipelineChart();
    }

    if (document.getElementById("recommendationsList")) {
        renderRecommendations();
    }

    if (document.getElementById("interviewReminders")) {
        renderInterviewReminders();
    }

    if (document.getElementById("activityTimeline")) {
        renderActivityTimeline();
    }

    // Departments page
    if (document.getElementById("deptGrid")) {
        renderDepartments();
    }

});



//  ADD BUTTON JS ============

        const departmentModal = document.getElementById('departmentModal');
        const addDepartmentBtn = document.getElementById('addDepartmentBtn');
        const closeDepartmentModal = document.getElementById('closeDepartmentModal');
        const cancelDepartmentModal = document.getElementById('cancelDepartmentModal');
        const departmentDate = document.getElementById('departmentDate');
        const departmentDay = document.getElementById('departmentDay');
        const departmentForm = document.getElementById('departmentForm');

        function openDepartmentPopup() {
            departmentModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }

        function closeDepartmentPopup() {
            departmentModal.classList.remove('show');
            document.body.style.overflow = '';
        }

        if (addDepartmentBtn) {
            addDepartmentBtn.addEventListener('click', openDepartmentPopup);
        }

        if (closeDepartmentModal) {
            closeDepartmentModal.addEventListener('click', closeDepartmentPopup);
        }

        if (cancelDepartmentModal) {
            cancelDepartmentModal.addEventListener('click', closeDepartmentPopup);
        }

        if (departmentModal) {
            departmentModal.addEventListener('click', function (e) {
                if (e.target === departmentModal) {
                    closeDepartmentPopup();
                }
            });
        }

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && departmentModal.classList.contains('show')) {
                closeDepartmentPopup();
            }
        });

        if (departmentDate && departmentDay) {
            departmentDate.addEventListener('change', function () {
                const selectedDate = new Date(this.value);
                if (!isNaN(selectedDate.getTime())) {
                    departmentDay.value = selectedDate.toLocaleDateString('en-US', {
                        weekday: 'long'
                    });
                } else {
                    departmentDay.value = '';
                }
            });
        }

        if (departmentForm) {
            departmentForm.addEventListener('submit', function (e) {
                e.preventDefault();
                alert('Department saved successfully');
                this.reset();
                departmentDay.value = '';
                closeDepartmentPopup();
            });
        }
        
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