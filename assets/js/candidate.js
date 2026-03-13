const candidates = [
  {
    id: 1,
    name: "Rohan Shrivastava",
    avatar: "https://i.pravatar.cc/150?img=11",
    designation: "Senior Full Stack Developer",
    company: "Innovexa Labs",
    department: "Engineering",
    createdDate: "2026-03-01",
    createdDay: "Sunday",
    skills: ["Full Stack Development", "React", "Node.js"],
    phone: "917358239861",
    status: "new",
    recommended: true,
    location: "Bengaluru",
    experience: "5 years",
    languages: ["English", "Hindi"],
    summary: "Strong full stack engineer with experience building scalable SaaS platforms and internal tooling.",
    education: "B.Tech in Computer Science - VTU",
    otherDetails: "Open to hybrid roles. Notice period: 30 days.",
    experienceData: [
      {
        title: "Senior Full Stack Developer",
        company: "Innovexa Labs",
        period: "2022 - Present",
        description: "Led frontend architecture, API integrations, and internal HR workflow tools for enterprise teams."
      },
      {
        title: "Software Engineer",
        company: "Pixel Forge",
        period: "2020 - 2022",
        description: "Worked on React dashboards, hiring workflow automation, and performance optimization."
      }
    ]
  },
  {
    id: 2,
    name: "Prakash Mokashi",
    avatar: "https://i.pravatar.cc/150?img=12",
    designation: "Team Lead",
    company: "GrowthPoint Systems",
    department: "Operations",
    createdDate: "2026-03-02",
    createdDay: "Monday",
    skills: ["Decision Making", "Leadership"],
    phone: "919876543210",
    status: "new",
    recommended: false,
    location: "Pune",
    experience: "7 years",
    languages: ["English", "Marathi", "Hindi"],
    summary: "Experienced people manager with strong team leadership and stakeholder coordination skills.",
    education: "MBA - Operations",
    otherDetails: "Immediately available. Interested in people management roles.",
    experienceData: [
      {
        title: "Team Lead",
        company: "GrowthPoint Systems",
        period: "2021 - Present",
        description: "Managed cross-functional delivery teams and handled hiring coordination."
      }
    ]
  },
  {
    id: 3,
    name: "Kedar Sanjay Say",
    avatar: "https://i.pravatar.cc/150?img=13",
    designation: "Marketing Executive",
    company: "GrowthHive Media",
    department: "Marketing",
    createdDate: "2026-03-03",
    createdDay: "Tuesday",
    skills: ["Marketing Management", "SEO", "Brand Strategy"],
    phone: "918765432109",
    status: "maybe",
    recommended: false,
    location: "Mumbai",
    experience: "4 years",
    languages: ["English", "Hindi"],
    summary: "Performance-focused marketing candidate with strong brand planning and SEO execution skills.",
    education: "BBA - Marketing",
    otherDetails: "Looking for growth-stage marketing teams.",
    experienceData: [
      {
        title: "Marketing Executive",
        company: "GrowthHive Media",
        period: "2022 - Present",
        description: "Handled brand strategy, campaign optimization, and SEO execution."
      }
    ]
  },
  {
    id: 4,
    name: "Anurag Kumar Tiwari",
    avatar: "https://i.pravatar.cc/150?img=14",
    designation: "Power BI Developer",
    company: "TechSoft Solutions",
    department: "Product",
    createdDate: "2026-03-04",
    createdDay: "Wednesday",
    skills: ["Power BI", "Python", "SQL"],
    phone: "917654321098",
    status: "shortlist",
    recommended: true,
    location: "Hyderabad",
    experience: "6 years",
    languages: ["English", "Hindi"],
    summary: "Analytics specialist with strong BI reporting, SQL modeling, and business dashboarding experience.",
    education: "B.Tech - Information Technology",
    otherDetails: "Available in 15 days. Strong stakeholder communication.",
    experienceData: [
      {
        title: "Power BI Developer",
        company: "TechSoft Solutions",
        period: "2021 - Present",
        description: "Built executive dashboards, HR reporting modules, and data pipelines."
      },
      {
        title: "BI Analyst",
        company: "DataArc",
        period: "2018 - 2021",
        description: "Created reporting solutions and automated KPI dashboards."
      }
    ]
  },
  {
    id: 5,
    name: "Pawan Kumar",
    avatar: "https://i.pravatar.cc/150?img=15",
    designation: "Embedded Systems Engineer",
    company: "Nova Embedded Labs",
    department: "Engineering",
    createdDate: "2026-03-05",
    createdDay: "Thursday",
    skills: ["USB/Modbus Protocol", "Embedded C", "Firmware"],
    phone: "916543210987",
    status: "new",
    recommended: false,
    location: "Chennai",
    experience: "5 years",
    languages: ["English", "Tamil"],
    summary: "Embedded engineer with hands-on firmware development and industrial communication protocol experience.",
    education: "B.E - Electronics",
    otherDetails: "Open to relocation.",
    experienceData: [
      {
        title: "Embedded Systems Engineer",
        company: "Nova Embedded Labs",
        period: "2020 - Present",
        description: "Developed firmware for industrial devices and handled integration testing."
      }
    ]
  },
  {
    id: 6,
    name: "K Lalu Prasad",
    avatar: "https://i.pravatar.cc/150?img=16",
    designation: "Frontend Developer",
    company: "BrightStack",
    department: "Design",
    createdDate: "2026-03-06",
    createdDay: "Friday",
    skills: ["Web Application", "JavaScript", "Vue.js"],
    phone: "915432109876",
    status: "maybe",
    recommended: false,
    location: "Kochi",
    experience: "3 years",
    languages: ["English", "Malayalam"],
    summary: "Frontend developer with product UI experience and a clean visual systems mindset.",
    education: "B.Sc - Computer Applications",
    otherDetails: "Prefers remote-first teams.",
    experienceData: [
      {
        title: "Frontend Developer",
        company: "BrightStack",
        period: "2022 - Present",
        description: "Worked on admin panels, user flows, and ATS-like enterprise dashboards."
      }
    ]
  }
];

const statusMeta = {
  new: { label: "Set Status", className: "", dot: "shortlist" },
  shortlist: { label: "Shortlist", className: "status-shortlist", dot: "shortlist" },
  maybe: { label: "Maybe", className: "status-maybe", dot: "maybe" },
  reject: { label: "Reject", className: "status-reject", dot: "reject" }
};

let currentPreviewIndex = 0;
let filteredIndexes = [];
let activeFilter = "all";
let searchQuery = "";
let addCandidateModal = null;

const visibleColumns = {
  designation: true,
  company: true,
  skills: true,
  phone: true
};

document.addEventListener("DOMContentLoaded", function () {
  const modalEl = document.getElementById("addCandidateModal");
  if (modalEl) {
    addCandidateModal = new bootstrap.Modal(modalEl);
  }

  setupEventListeners();
  renderAll();
});

function setupEventListeners() {
  const menuToggle = document.getElementById("menuToggle");
  const sidebar = document.getElementById("sidebar");
  const sidebarOverlay = document.getElementById("sidebarOverlay");
  const filterToggle = document.getElementById("filterToggle");
  const filterContent = document.getElementById("filterContent");
  const tableSearch = document.getElementById("tableSearch");
  const selectAll = document.getElementById("selectAll");
  const btnCustomize = document.getElementById("btnCustomize");
  const closeDrawerBtn = document.getElementById("closeDrawer");
  const cancelColumnsBtn = document.getElementById("cancelColumns");
  const drawerOverlay = document.getElementById("drawerOverlay");
  const applyColumnsBtn = document.getElementById("applyColumns");
  const closePreviewPanelBtn = document.getElementById("closePreviewPanel");
  const previewOverlay = document.getElementById("previewOverlay");
  const prevCandidateBtn = document.getElementById("prevCandidateBtn");
  const nextCandidateBtn = document.getElementById("nextCandidateBtn");
  const previewStatusBtn = document.getElementById("previewStatusBtn");
  const previewShortlistBtn = document.getElementById("previewShortlistBtn");
  const previewMaybeBtn = document.getElementById("previewMaybeBtn");
  const previewRejectBtn = document.getElementById("previewRejectBtn");
  const previewDeleteBtn = document.getElementById("previewDeleteBtn");
  const addCandidateForm = document.getElementById("addCandidateForm");
  const candidateDateInput = document.getElementById("candidateDateInput");
  const candidateDayInput = document.getElementById("candidateDayInput");

  if (menuToggle && sidebar && sidebarOverlay) {
    menuToggle.addEventListener("click", function () {
      sidebar.classList.toggle("show");
      sidebarOverlay.classList.toggle("show");
    });
  }

  if (sidebarOverlay && sidebar) {
    sidebarOverlay.addEventListener("click", function () {
      sidebar.classList.remove("show");
      sidebarOverlay.classList.remove("show");
    });
  }

  if (filterToggle && filterContent) {
    filterToggle.addEventListener("click", function () {
      filterContent.classList.toggle("show");
      const icon = this.querySelector("i");
      if (icon) {
        icon.classList.toggle("bi-chevron-up");
        icon.classList.toggle("bi-chevron-down");
      }
    });
  }

  document.querySelectorAll(".filter-tab").forEach(tab => {
    tab.addEventListener("click", function () {
      document.querySelectorAll(".filter-tab").forEach(t => t.classList.remove("active"));
      this.classList.add("active");
      activeFilter = this.dataset.filter;
      renderAll();
    });
  });

  if (tableSearch) {
    tableSearch.addEventListener("input", function () {
      searchQuery = this.value.trim().toLowerCase();
      renderAll();
    });
  }

  if (selectAll) {
    selectAll.addEventListener("change", function () {
      document.querySelectorAll(".row-checkbox").forEach(cb => {
        cb.checked = this.checked;
      });
    });
  }

  if (btnCustomize) btnCustomize.addEventListener("click", openDrawer);
  if (closeDrawerBtn) closeDrawerBtn.addEventListener("click", closeDrawer);
  if (cancelColumnsBtn) cancelColumnsBtn.addEventListener("click", closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener("click", closeDrawer);

  if (applyColumnsBtn) {
    applyColumnsBtn.addEventListener("click", function () {
      const colDesignation = document.getElementById("col-designation");
      const colCompany = document.getElementById("col-company");
      const colSkills = document.getElementById("col-skills");
      const colPhone = document.getElementById("col-phone");

      if (colDesignation) visibleColumns.designation = colDesignation.checked;
      if (colCompany) visibleColumns.company = colCompany.checked;
      if (colSkills) visibleColumns.skills = colSkills.checked;
      if (colPhone) visibleColumns.phone = colPhone.checked;

      applyColumnVisibility();
      applyColumnOrder();

      // Animated success feedback on the button
      const btn = document.getElementById("applyColumns");
      if (btn) {
        const origHTML = btn.innerHTML;
        btn.innerHTML = '<i class="bi bi-check-circle-fill"></i> Applied!';
        btn.style.background = 'linear-gradient(135deg,#10b981,#059669)';
        setTimeout(() => {
          btn.innerHTML = origHTML;
          btn.style.background = '';
          closeDrawer();
        }, 800);
      } else {
        closeDrawer();
      }
    });
  }

  if (closePreviewPanelBtn) closePreviewPanelBtn.addEventListener("click", closePreviewPanel);
  if (previewOverlay) previewOverlay.addEventListener("click", closePreviewPanel);

  if (prevCandidateBtn) prevCandidateBtn.addEventListener("click", showPrevCandidate);
  if (nextCandidateBtn) nextCandidateBtn.addEventListener("click", showNextCandidate);

  document.querySelectorAll(".preview-tab").forEach(tab => {
    tab.addEventListener("click", function () {
      document.querySelectorAll(".preview-tab").forEach(t => t.classList.remove("active"));
      document.querySelectorAll(".preview-tab-content").forEach(c => c.classList.remove("active"));
      this.classList.add("active");
      const target = document.getElementById(`tab-${this.dataset.tab}`);
      if (target) target.classList.add("active");
    });
  });

  if (previewStatusBtn) {
    previewStatusBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      const menu = this.nextElementSibling;
      document.querySelectorAll(".status-menu").forEach(m => {
        if (m !== menu) m.classList.remove("show");
      });
      if (menu) menu.classList.toggle("show");
    });
  }

  const previewStatusMenu = document.querySelector("#previewStatusBtn + .status-menu");
  if (previewStatusMenu) {
    previewStatusMenu.querySelectorAll(".status-item").forEach(item => {
      item.addEventListener("click", function () {
        updateCandidateStatus(candidates[currentPreviewIndex].id, this.dataset.status);
        this.parentElement.classList.remove("show");
      });
    });
  }

  if (previewShortlistBtn) {
    previewShortlistBtn.addEventListener("click", () => {
      updateCandidateStatus(candidates[currentPreviewIndex].id, "shortlist");
    });
  }

  if (previewMaybeBtn) {
    previewMaybeBtn.addEventListener("click", () => {
      updateCandidateStatus(candidates[currentPreviewIndex].id, "maybe");
    });
  }

  if (previewRejectBtn) {
    previewRejectBtn.addEventListener("click", () => {
      updateCandidateStatus(candidates[currentPreviewIndex].id, "reject");
    });
  }

  if (previewDeleteBtn) {
    previewDeleteBtn.addEventListener("click", function () {
      deleteCandidate(candidates[currentPreviewIndex].id);
    });
  }

  if (candidateDateInput && candidateDayInput) {
    candidateDateInput.addEventListener("change", function () {
      const selectedDate = new Date(this.value);

      if (!isNaN(selectedDate.getTime())) {
        candidateDayInput.value = selectedDate.toLocaleDateString("en-US", {
          weekday: "long"
        });
      } else {
        candidateDayInput.value = "";
      }
    });
  }

  if (addCandidateForm) {
    addCandidateForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("candidateNameInput").value.trim();
      const phone = document.getElementById("candidatePhoneInput").value.trim();
      const designation = document.getElementById("candidateDesignationInput").value.trim() || "Not mentioned";
      const company = document.getElementById("candidateCompanyInput").value.trim() || "Not mentioned";
      const department = document.getElementById("candidateDepartmentInput").value.trim() || "General";
      const location = document.getElementById("candidateLocationInput").value.trim() || "Not mentioned";
      const experience = document.getElementById("candidateExperienceInput").value.trim() || "Not mentioned";
      const createdDate = document.getElementById("candidateDateInput").value.trim() || "";
      const createdDay = document.getElementById("candidateDayInput").value.trim() || "";
      const skillsRaw = document.getElementById("candidateSkillsInput").value.trim();
      const skills = skillsRaw ? skillsRaw.split(",").map(s => s.trim()).filter(Boolean) : ["General"];

      candidates.unshift({
        id: Date.now(),
        name,
        avatar: `https://i.pravatar.cc/150?u=${Date.now()}`,
        designation,
        company,
        department,
        createdDate,
        createdDay,
        skills,
        phone,
        status: "new",
        recommended: false,
        location,
        experience,
        languages: ["English"],
        summary: `${designation} candidate added from ATS dashboard.`,
        education: "Not added yet",
        otherDetails: `Department: ${department}. Candidate profile created manually.`,
        experienceData: [
          {
            title: designation,
            company,
            period: createdDate || "Recently Added",
            description: "Candidate profile manually created from recruiter dashboard."
          }
        ]
      });

      this.reset();

      if (candidateDayInput) {
        candidateDayInput.value = "";
      }

      if (addCandidateModal) {
        addCandidateModal.hide();
      }

      renderAll();
    });
  }

  document.addEventListener("click", function (e) {
    if (!e.target.closest(".status-dropdown")) {
      document.querySelectorAll(".status-menu").forEach(menu => menu.classList.remove("show"));
    }

    if (!e.target.closest(".action-menu")) {
      document.querySelectorAll(".action-dropdown").forEach(menu => menu.classList.remove("show"));
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closePreviewPanel();
      closeDrawer();
    }
  });
}

function openDrawer() {
  const drawer = document.getElementById("customizeDrawer");
  const overlay = document.getElementById("drawerOverlay");
  if (drawer) drawer.classList.add("show");
  if (overlay) overlay.classList.add("show");
}

function closeDrawer() {
  const drawer = document.getElementById("customizeDrawer");
  const overlay = document.getElementById("drawerOverlay");
  if (drawer) drawer.classList.remove("show");
  if (overlay) overlay.classList.remove("show");
}

function renderAll() {
  filteredIndexes = getFilteredIndexes();
  renderCounts();
  renderTable();
  renderMobileCards();
  updateMetaInfo();
  applyColumnVisibility();
}

function getFilteredIndexes() {
  return candidates
    .map((candidate, index) => ({ candidate, index }))
    .filter(({ candidate }) => {
      const matchesFilter = activeFilter === "all" ? true : candidate.status === activeFilter;
      const haystack = [
        candidate.name,
        candidate.designation,
        candidate.company,
        candidate.department || "",
        candidate.location,
        candidate.experience,
        candidate.phone,
        candidate.createdDate || "",
        candidate.createdDay || "",
        ...(candidate.skills || [])
      ].join(" ").toLowerCase();

      const matchesSearch = !searchQuery || haystack.includes(searchQuery);
      return matchesFilter && matchesSearch;
    })
    .map(item => item.index);
}

function renderCounts() {
  const countAll = document.getElementById("countAll");
  const countShortlist = document.getElementById("countShortlist");
  const countMaybe = document.getElementById("countMaybe");
  const countReject = document.getElementById("countReject");
  const sidebarCandidateCount = document.getElementById("sidebarCandidateCount");

  if (countAll) countAll.textContent = candidates.length;
  if (countShortlist) countShortlist.textContent = candidates.filter(c => c.status === "shortlist").length;
  if (countMaybe) countMaybe.textContent = candidates.filter(c => c.status === "maybe").length;
  if (countReject) countReject.textContent = candidates.filter(c => c.status === "reject").length;
  if (sidebarCandidateCount) sidebarCandidateCount.textContent = candidates.length;
}

function updateMetaInfo() {
  const visibleCount = filteredIndexes.length;
  const tableInfo = document.getElementById("tableInfo");
  const paginationInfo = document.getElementById("paginationInfo");

  if (tableInfo) {
    tableInfo.innerHTML = `Showing <strong>${visibleCount}</strong> of <strong>${candidates.length}</strong> responses`;
  }

  if (paginationInfo) {
    paginationInfo.textContent = `Showing ${visibleCount} result${visibleCount === 1 ? "" : "s"}`;
  }
}

function getStatusButtonHTML(status) {
  const meta = statusMeta[status] || statusMeta.new;
  return `
    <span class="status-content ${meta.className}">
      <span class="status-dot ${meta.dot}"></span>
      <span>${meta.label}</span>
    </span>
    <i class="bi bi-chevron-down"></i>
  `;
}

function getSkillsHTML(skills = []) {
  const visibleSkills = skills.slice(0, 2);
  const remaining = skills.length - visibleSkills.length;

  return `
    <div class="skills-wrap">
      ${visibleSkills.map(skill => `<span class="skill-pill">${skill}</span>`).join("")}
      ${remaining > 0 ? `<span class="skill-pill more">+${remaining}</span>` : ""}
    </div>
  `;
}

function renderTable() {
  const tbody = document.getElementById("candidateTableBody");
  if (!tbody) return;

  tbody.innerHTML = "";

  filteredIndexes.forEach(index => {
    const candidate = candidates[index];
    const row = document.createElement("tr");

    row.innerHTML = `
      <td class="col-checkbox sticky-col sticky-checkbox">
        <input type="checkbox" class="custom-checkbox row-checkbox">
      </td>

      <td class="col-avatar sticky-col sticky-avatar">
        <div class="avatar-cell">
          <img src="${candidate.avatar}" alt="${candidate.name}" class="candidate-avatar" onclick="openPreviewPanel(${index})">
        </div>
      </td>

      <td class="col-name sticky-col sticky-name" data-column="name">
        <div class="candidate-name-cell">
          <div class="candidate-info">
            <div class="candidate-name-row">
              <span class="candidate-name" onclick="openPreviewPanel(${index})">${candidate.name}</span>
              ${candidate.recommended ? '<span class="badge-recommended">Recommended</span>' : ""}
            </div>
            <div class="candidate-meta">${candidate.location} • ${candidate.experience}</div>
          </div>

          <button class="preview-trigger" onclick="openPreviewPanel(${index})" title="Preview Candidate">
            <i class="bi bi-eye"></i>
          </button>
        </div>
      </td>

      <td class="col-designation" data-column="designation">
        <div class="cell-primary">${candidate.designation}</div>
      </td>

      <td class="col-company" data-column="company">
        <div class="cell-primary">${candidate.company}</div>
      </td>

      <td class="col-skills" data-column="skills">
        ${getSkillsHTML(candidate.skills)}
      </td>

      <td class="col-phone" data-column="phone">
        <div class="phone-cell">
          <button class="btn-phone" onclick="togglePhoneInline(this, '${candidate.phone}')">
            <i class="bi bi-eye"></i>
            <span>Show contact details</span>
          </button>
          <div class="phone-inline">
            <i class="bi bi-telephone-fill"></i>
            <span>${candidate.phone}</span>
          </div>
        </div>
      </td>

      <td class="col-status" data-column="status">
        <div class="status-dropdown">
          <button class="btn-status" onclick="toggleStatusMenu(this)">
            ${getStatusButtonHTML(candidate.status)}
          </button>
          <div class="status-menu">
            <div class="status-item" onclick="updateCandidateStatus(${candidate.id}, 'shortlist')">
              <span class="status-dot shortlist"></span>
              Shortlist
            </div>
            <div class="status-item" onclick="updateCandidateStatus(${candidate.id}, 'maybe')">
              <span class="status-dot maybe"></span>
              Maybe
            </div>
            <div class="status-item" onclick="updateCandidateStatus(${candidate.id}, 'reject')">
              <span class="status-dot reject"></span>
              Reject
            </div>
          </div>
        </div>
      </td>

      <td class="col-actions">
        <div class="action-menu">
          <button class="btn-action-menu" onclick="toggleActionMenu(this)">
            <i class="bi bi-three-dots"></i>
          </button>
          <div class="action-dropdown">
            <div class="action-item">
              <i class="bi bi-envelope"></i>
              Email
            </div>
            <div class="action-item">
              <i class="bi bi-forward"></i>
              Forward
            </div>
            <div class="action-item delete" onclick="deleteCandidate(${candidate.id})">
              <i class="bi bi-trash3"></i>
              Delete
            </div>
          </div>
        </div>
      </td>
    `;

    tbody.appendChild(row);
  });
}

function renderMobileCards() {
  const container = document.getElementById("mobileCards");
  if (!container) return;

  container.innerHTML = "";

  filteredIndexes.forEach(index => {
    const candidate = candidates[index];
    const card = document.createElement("div");
    card.className = "candidate-card";

    card.innerHTML = `
      <div class="card-header-mobile">
        <div class="card-candidate-info">
          <img src="${candidate.avatar}" alt="${candidate.name}" class="card-avatar" onclick="openPreviewPanel(${index})">

          <div class="card-name-section">
            <div class="card-name-top">
              <h3 onclick="openPreviewPanel(${index})">${candidate.name}</h3>
              ${candidate.recommended ? '<span class="badge-recommended">Recommended</span>' : ""}
            </div>
            <p class="card-designation">${candidate.designation}</p>
          </div>
        </div>

        <div class="action-menu">
          <button class="btn-action-menu" onclick="toggleActionMenu(this)">
            <i class="bi bi-three-dots"></i>
          </button>
          <div class="action-dropdown">
            <div class="action-item">
              <i class="bi bi-envelope"></i>
              Email
            </div>
            <div class="action-item">
              <i class="bi bi-forward"></i>
              Forward
            </div>
            <div class="action-item delete" onclick="deleteCandidate(${candidate.id})">
              <i class="bi bi-trash3"></i>
              Delete
            </div>
          </div>
        </div>
      </div>

      <div class="card-body-mobile">
        ${visibleColumns.company ? `
          <div class="card-row">
            <span class="card-label">Company</span>
            <span class="card-value">${candidate.company}</span>
          </div>` : ""}

        ${visibleColumns.skills ? `
          <div class="card-row">
            <span class="card-label">Skills</span>
            <div class="card-skills">
              ${candidate.skills.slice(0, 3).map(skill => `<span class="skill-pill">${skill}</span>`).join("")}
            </div>
          </div>` : ""}
      </div>

      <div class="card-footer-mobile">
        ${visibleColumns.phone ? `
          <div class="card-phone-area">
            <button class="btn-phone" onclick="togglePhoneInline(this, '${candidate.phone}')">
              <i class="bi bi-eye"></i>
              <span>Show contact details</span>
            </button>
            <div class="phone-inline">
              <i class="bi bi-telephone-fill"></i>
              <span>${candidate.phone}</span>
            </div>
          </div>` : ""}

        <div class="card-status-wrap">
          <div class="status-dropdown">
            <button class="btn-status" onclick="toggleStatusMenu(this)">
              ${getStatusButtonHTML(candidate.status)}
            </button>
            <div class="status-menu">
              <div class="status-item" onclick="updateCandidateStatus(${candidate.id}, 'shortlist')">
                <span class="status-dot shortlist"></span>
                Shortlist
              </div>
              <div class="status-item" onclick="updateCandidateStatus(${candidate.id}, 'maybe')">
                <span class="status-dot maybe"></span>
                Maybe
              </div>
              <div class="status-item" onclick="updateCandidateStatus(${candidate.id}, 'reject')">
                <span class="status-dot reject"></span>
                Reject
              </div>
            </div>
          </div>
        </div>

        <button class="btn-phone" onclick="openPreviewPanel(${index})">
          <i class="bi bi-eye"></i>
          View Profile
        </button>
      </div>
    `;

    container.appendChild(card);
  });
}

function applyColumnVisibility() {
  document.querySelectorAll('[data-column="designation"]').forEach(el => {
    el.classList.toggle("hide-col", !visibleColumns.designation);
  });
  document.querySelectorAll('[data-column="company"]').forEach(el => {
    el.classList.toggle("hide-col", !visibleColumns.company);
  });
  document.querySelectorAll('[data-column="skills"]').forEach(el => {
    el.classList.toggle("hide-col", !visibleColumns.skills);
  });
  document.querySelectorAll('[data-column="phone"]').forEach(el => {
    el.classList.toggle("hide-col", !visibleColumns.phone);
  });
}

function togglePhoneInline(btn, phone) {
  const parent = btn.closest(".phone-cell, .card-phone-area");
  if (!parent) return;

  const phoneBlock = parent.querySelector(".phone-inline");
  const label = btn.querySelector("span");
  const icon = btn.querySelector("i");
  const isOpen = phoneBlock.classList.contains("show");

  document.querySelectorAll(".phone-inline.show").forEach(el => {
    if (el !== phoneBlock) {
      el.classList.remove("show");
      const blockParent = el.closest(".phone-cell, .card-phone-area");
      if (blockParent) {
        const blockBtn = blockParent.querySelector(".btn-phone");
        if (blockBtn) {
          const blockSpan = blockBtn.querySelector("span");
          const blockIcon = blockBtn.querySelector("i");
          if (blockSpan) blockSpan.textContent = "Show contact details";
          if (blockIcon) blockIcon.className = "bi bi-eye";
        }
      }
    }
  });

  if (isOpen) {
    phoneBlock.classList.remove("show");
    if (label) label.textContent = "Show contact details";
    if (icon) icon.className = "bi bi-eye";
  } else {
    phoneBlock.classList.add("show");
    const phoneSpan = phoneBlock.querySelector("span");
    if (phoneSpan) phoneSpan.textContent = phone;
    if (label) label.textContent = "Hide contact details";
    if (icon) icon.className = "bi bi-eye-slash";
  }
}

function toggleStatusMenu(btn) {
  const menu = btn.nextElementSibling;
  if (!menu) return;

  const isOpen = menu.classList.contains("show");
  document.querySelectorAll(".status-menu").forEach(m => m.classList.remove("show"));
  if (!isOpen) menu.classList.add("show");
}

function toggleActionMenu(btn) {
  const menu = btn.nextElementSibling;
  if (!menu) return;

  const isOpen = menu.classList.contains("show");
  document.querySelectorAll(".action-dropdown").forEach(m => m.classList.remove("show"));
  if (!isOpen) menu.classList.add("show");
}

function updateCandidateStatus(candidateId, status) {
  const candidate = candidates.find(c => c.id === candidateId);
  if (!candidate) return;

  candidate.status = status;
  renderAll();

  const openCandidate = candidates[currentPreviewIndex];
  const previewPanel = document.getElementById("candidatePreviewPanel");

  if (openCandidate && openCandidate.id === candidateId && previewPanel && previewPanel.classList.contains("show")) {
    populatePreview(candidate);
  }

  document.querySelectorAll(".status-menu").forEach(m => m.classList.remove("show"));
}

function deleteCandidate(candidateId) {
  const index = candidates.findIndex(c => c.id === candidateId);
  if (index === -1) return;

  const shouldDelete = confirm("Delete this candidate?");
  if (!shouldDelete) return;

  const previewPanel = document.getElementById("candidatePreviewPanel");
  const wasPreviewOpen = previewPanel && previewPanel.classList.contains("show");
  const deletingCurrent = wasPreviewOpen && candidates[currentPreviewIndex] && candidates[currentPreviewIndex].id === candidateId;

  candidates.splice(index, 1);
  renderAll();

  if (candidates.length === 0) {
    closePreviewPanel();
    return;
  }

  if (deletingCurrent) {
    currentPreviewIndex = Math.min(index, candidates.length - 1);
    populatePreview(candidates[currentPreviewIndex]);
  } else if (wasPreviewOpen) {
    const currentCandidateId = candidates[currentPreviewIndex]?.id;
    const newIndex = candidates.findIndex(c => c.id === currentCandidateId);
    currentPreviewIndex = newIndex >= 0 ? newIndex : 0;
    populatePreview(candidates[currentPreviewIndex]);
  }
}

function openPreviewPanel(index) {
  const panel = document.getElementById("candidatePreviewPanel");
  const overlay = document.getElementById("previewOverlay");
  if (!panel || !overlay || !candidates[index]) return;

  currentPreviewIndex = index;
  populatePreview(candidates[index]);
  panel.classList.add("show");
  overlay.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closePreviewPanel() {
  const panel = document.getElementById("candidatePreviewPanel");
  const overlay = document.getElementById("previewOverlay");

  if (panel) panel.classList.remove("show");
  if (overlay) overlay.classList.remove("show");
  document.body.style.overflow = "";
  document.querySelectorAll(".status-menu").forEach(menu => menu.classList.remove("show"));
}

function showPrevCandidate() {
  if (!candidates.length) return;
  currentPreviewIndex = (currentPreviewIndex - 1 + candidates.length) % candidates.length;
  populatePreview(candidates[currentPreviewIndex]);
}

function showNextCandidate() {
  if (!candidates.length) return;
  currentPreviewIndex = (currentPreviewIndex + 1) % candidates.length;
  populatePreview(candidates[currentPreviewIndex]);
}

function populatePreview(candidate) {
  const previewAvatar = document.getElementById("previewAvatar");
  const previewName = document.getElementById("previewName");
  const previewSummaryLine = document.getElementById("previewSummaryLine");
  const previewPhone = document.getElementById("previewPhone");
  const previewRecommendedBadge = document.getElementById("previewRecommendedBadge");
  const previewStatusBtn = document.getElementById("previewStatusBtn");

  if (previewAvatar) {
    previewAvatar.src = candidate.avatar;
    previewAvatar.alt = candidate.name;
  }

  if (previewName) previewName.textContent = candidate.name;
  if (previewSummaryLine) {
    previewSummaryLine.textContent =
      `${candidate.designation} at ${candidate.company} • ${candidate.location} • ${candidate.experience}`;
  }
  if (previewPhone) previewPhone.textContent = candidate.phone;

  if (previewRecommendedBadge) {
    previewRecommendedBadge.style.display = candidate.recommended ? "inline-flex" : "none";
  }

  if (previewStatusBtn) {
    previewStatusBtn.innerHTML = getStatusButtonHTML(candidate.status);
  }

  const tabSummaryRole = document.getElementById("tabSummaryRole");
  const tabSummaryCompany = document.getElementById("tabSummaryCompany");
  const tabSummaryText = document.getElementById("tabSummaryText");
  const tabExperience = document.getElementById("tabExperience");
  const tabEducation = document.getElementById("tabEducation");
  const tabSkills = document.getElementById("tabSkills");
  const tabLanguages = document.getElementById("tabLanguages");
  const tabOther = document.getElementById("tabOther");
  const resumePaper = document.getElementById("resumePaper");

  if (tabSummaryRole) tabSummaryRole.textContent = candidate.designation;
  if (tabSummaryCompany) tabSummaryCompany.textContent = candidate.company;
  if (tabSummaryText) tabSummaryText.textContent = candidate.summary;

  if (tabExperience) {
    tabExperience.innerHTML = (candidate.experienceData || []).map(item => `
      <div class="timeline-item">
        <div class="timeline-title">${item.title}</div>
        <div class="timeline-subtitle">${item.company} • ${item.period}</div>
        <div class="timeline-desc">${item.description}</div>
      </div>
    `).join("");
  }

  if (tabEducation) {
    tabEducation.innerHTML = `
      <div class="info-item">
        <div class="info-item-label">Highest Qualification</div>
        <div class="info-item-value">${candidate.education || "Not provided"}</div>
      </div>
    `;
  }

  if (tabSkills) {
    tabSkills.innerHTML = (candidate.skills || []).map(skill =>
      `<span class="skill-pill">${skill}</span>`
    ).join("");
  }

  if (tabLanguages) {
    tabLanguages.innerHTML = (candidate.languages || []).map(lang => `
      <div class="info-item">
        <div class="info-item-label">Language</div>
        <div class="info-item-value">${lang}</div>
      </div>
    `).join("");
  }

  if (tabOther) {
    tabOther.innerHTML = `
      <div class="info-item">
        <div class="info-item-label">Location</div>
        <div class="info-item-value">${candidate.location}</div>
      </div>
      <div class="info-item">
        <div class="info-item-label">Experience</div>
        <div class="info-item-value">${candidate.experience}</div>
      </div>
      <div class="info-item">
        <div class="info-item-label">Department</div>
        <div class="info-item-value">${candidate.department || "Not provided"}</div>
      </div>
      <div class="info-item">
        <div class="info-item-label">Created Date</div>
        <div class="info-item-value">${candidate.createdDate || "Not provided"}</div>
      </div>
      <div class="info-item">
        <div class="info-item-label">Day</div>
        <div class="info-item-value">${candidate.createdDay || "Not provided"}</div>
      </div>
      <div class="info-item">
        <div class="info-item-label">Notes</div>
        <div class="info-item-value">${candidate.otherDetails || "Not provided"}</div>
      </div>
    `;
  }

  if (resumePaper) {
    resumePaper.innerHTML = `
      <h4>${candidate.name}</h4>
      <p><strong>${candidate.designation}</strong> • ${candidate.company}</p>
      <p>${candidate.summary}</p>
      <p><strong>Department:</strong> ${candidate.department || "Not provided"}</p>
      <p><strong>Skills:</strong> ${(candidate.skills || []).join(", ")}</p>
      <p><strong>Experience:</strong> ${candidate.experience}</p>
      <p><strong>Education:</strong> ${candidate.education}</p>
      <p><strong>Created Date:</strong> ${candidate.createdDate || "Not provided"}</p>
      <p><strong>Day:</strong> ${candidate.createdDay || "Not provided"}</p>
      <p><strong>Other Details:</strong> ${candidate.otherDetails}</p>
    `;
  }

  renderSimilarCandidates(candidate);

  document.querySelectorAll(".preview-tab").forEach(tab => tab.classList.remove("active"));
  document.querySelectorAll(".preview-tab-content").forEach(content => content.classList.remove("active"));

  const summaryTab = document.querySelector('.preview-tab[data-tab="summary"]');
  const summaryContent = document.getElementById("tab-summary");

  if (summaryTab) summaryTab.classList.add("active");
  if (summaryContent) summaryContent.classList.add("active");
}

function renderSimilarCandidates(currentCandidate) {
  const container = document.getElementById("similarCandidatesContainer");
  if (!container) return;

  const similar = candidates
    .map((candidate, index) => ({ candidate, index }))
    .filter(item => item.candidate.id !== currentCandidate.id)
    .slice(0, 3);

  container.innerHTML = similar.map(item => `
    <div class="similar-candidate-card" onclick="openPreviewPanel(${item.index})">
      <img src="${item.candidate.avatar}" alt="${item.candidate.name}" class="similar-avatar">
      <div class="similar-meta">
        <div class="similar-name">${item.candidate.name}</div>
        <div class="similar-sub">${item.candidate.experience} • ${item.candidate.location} • ${item.candidate.designation}</div>
        <div class="similar-skills">
          ${item.candidate.skills.slice(0, 3).map(skill => `<span class="skill-pill">${skill}</span>`).join("")}
        </div>
      </div>
    </div>
  `).join("");
}

window.openPreviewPanel = openPreviewPanel;
window.togglePhoneInline = togglePhoneInline;
window.toggleStatusMenu = toggleStatusMenu;
window.toggleActionMenu = toggleActionMenu;
window.updateCandidateStatus = updateCandidateStatus;
window.deleteCandidate = deleteCandidate;


const openMasterFilter = document.getElementById("openMasterFilter");
const closeMasterFilter = document.getElementById("closeMasterFilter");
const masterFilterDrawer = document.getElementById("masterFilterDrawer");
const masterFilterOverlay = document.getElementById("masterFilterOverlay");
const applyMasterFilters = document.getElementById("applyMasterFilters");
const resetMasterFilters = document.getElementById("resetMasterFilters");
const addFilterRule = document.getElementById("addFilterRule");
const filterColumnSelect = document.getElementById("filterColumnSelect");
const filterValueInput = document.getElementById("filterValueInput");

function openMasterFilterDrawer() {
  if (masterFilterDrawer) masterFilterDrawer.classList.add("show");
  if (masterFilterOverlay) masterFilterOverlay.classList.add("show");
}

function closeMasterFilterDrawer() {
  if (masterFilterDrawer) masterFilterDrawer.classList.remove("show");
  if (masterFilterOverlay) masterFilterOverlay.classList.remove("show");
}

if (openMasterFilter) openMasterFilter.addEventListener("click", openMasterFilterDrawer);
if (closeMasterFilter) closeMasterFilter.addEventListener("click", closeMasterFilterDrawer);
if (masterFilterOverlay) masterFilterOverlay.addEventListener("click", closeMasterFilterDrawer);

if (addFilterRule) {
  addFilterRule.addEventListener("click", function () {
    const column = filterColumnSelect ? filterColumnSelect.value.trim() : "";
    const columnLabel = filterColumnSelect ? filterColumnSelect.options[filterColumnSelect.selectedIndex].text : "";
    const value = filterValueInput ? filterValueInput.value.trim() : "";

    if (!column || !value) {
      alert("Please select a column and enter a value.");
      return;
    }

    masterFilterRules.push({
      column,
      label: columnLabel,
      value
    });

    if (filterColumnSelect) filterColumnSelect.value = "";
    if (filterValueInput) filterValueInput.value = "";

    renderMasterFilterRules();
  });
}

if (resetMasterFilters) {
  resetMasterFilters.addEventListener("click", function () {
    masterFilterRules = [];
    if (filterColumnSelect) filterColumnSelect.value = "";
    if (filterValueInput) filterValueInput.value = "";
    renderMasterFilterRules();
    renderAll();
  });
}

if (applyMasterFilters) {
  applyMasterFilters.addEventListener("click", function () {
    renderAll();
    closeMasterFilterDrawer();
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

/* ============================================================
   COLUMN DRAG & DROP ENGINE
   ============================================================ */

let columnDragSrc = null;

function initColumnDnD() {
  const list = document.getElementById("columnDndList");
  if (!list) return;

  function getDraggables() {
    return [...list.querySelectorAll(".column-item[draggable='true']")];
  }

  function clearDropStates() {
    list.querySelectorAll(".column-item").forEach(el => {
      el.classList.remove("drag-over", "drag-drop-above", "drag-drop-below");
    });
  }

  function getInsertPosition(target, clientY) {
    const rect = target.getBoundingClientRect();
    const midY = rect.top + rect.height / 2;
    return clientY < midY ? "above" : "below";
  }

  getDraggables().forEach(item => {

    item.addEventListener("dragstart", function (e) {
      columnDragSrc = this;
      this.classList.add("dragging");
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", this.dataset.col);

      // Custom ghost: slightly transparent clone
      const ghost = this.cloneNode(true);
      ghost.style.cssText = `
        position: absolute; top: -999px; left: -999px;
        width: ${this.offsetWidth}px;
        opacity: 0.92;
        border-radius: 14px;
        box-shadow: 0 20px 50px rgba(15,23,42,0.22);
        pointer-events: none;
        background: #fff;
        border: 2px solid var(--primary-teal);
        padding: 13px 14px;
        display: flex; align-items: center; gap: 12px;
      `;
      document.body.appendChild(ghost);
      e.dataTransfer.setDragImage(ghost, ghost.offsetWidth / 2, ghost.offsetHeight / 2);
      setTimeout(() => ghost.remove(), 0);
    });

    item.addEventListener("dragend", function () {
      this.classList.remove("dragging");
      clearDropStates();
      columnDragSrc = null;
    });

    item.addEventListener("dragover", function (e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      if (!columnDragSrc || this === columnDragSrc) return;

      clearDropStates();
      const pos = getInsertPosition(this, e.clientY);
      this.classList.add(pos === "above" ? "drag-drop-above" : "drag-drop-below");
    });

    item.addEventListener("dragleave", function (e) {
      // Only clear if leaving to outside the item
      if (!this.contains(e.relatedTarget)) {
        this.classList.remove("drag-over", "drag-drop-above", "drag-drop-below");
      }
    });

    item.addEventListener("drop", function (e) {
      e.preventDefault();
      if (!columnDragSrc || this === columnDragSrc) {
        clearDropStates();
        return;
      }

      const pos = getInsertPosition(this, e.clientY);

      if (pos === "above") {
        list.insertBefore(columnDragSrc, this);
      } else {
        list.insertBefore(columnDragSrc, this.nextSibling);
      }

      clearDropStates();

      // Animate the dropped item
      columnDragSrc.style.transition = "box-shadow 0.3s ease";
      columnDragSrc.style.boxShadow = "0 12px 32px rgba(45,138,134,0.22)";
      setTimeout(() => {
        if (columnDragSrc) {
          columnDragSrc.style.boxShadow = "";
        }
      }, 400);
    });
  });
}

/* ============================================================
   APPLY COLUMN ORDER — syncs the DnD list order to the table
   ============================================================ */

function applyColumnOrder() {
  const list = document.getElementById("columnDndList");
  if (!list) return;

  // Gather ordered column keys from the drawer DOM
  const orderedCols = [...list.querySelectorAll(".column-item")].map(el => el.dataset.col);

  const thead = document.querySelector(".candidate-table thead tr");
  const tbody = document.getElementById("candidateTableBody");
  if (!thead) return;

  // Map data-column attr → th element
  // Fixed columns (checkbox, avatar, name, actions) stay in place — only reorder the data columns
  const dataColMap = {};
  thead.querySelectorAll("th[data-column]").forEach(th => {
    dataColMap[th.dataset.column] = th;
  });

  // Reorder th elements in thead according to orderedCols
  // We'll insert them right after the sticky-name th (fixed left columns keep their position)
  const stickyName = thead.querySelector(".sticky-name");
  const actionsCol = thead.querySelector(".col-actions");
  if (!stickyName || !actionsCol) return;

  orderedCols.forEach(col => {
    if (dataColMap[col]) {
      // Insert before actions column
      thead.insertBefore(dataColMap[col], actionsCol);
    }
  });

  // Reorder td cells in every body row to match new th order
  if (tbody) {
    const thOrder = [...thead.querySelectorAll("th")].map(th => th.className);

    tbody.querySelectorAll("tr").forEach(row => {
      const cells = [...row.querySelectorAll("td")];

      // Build a map from class → td
      const cellMap = {};
      cells.forEach(td => {
        const keys = td.className.split(" ").filter(c => c.startsWith("col-"));
        if (keys.length) cellMap[keys[0]] = td;
      });

      // Rebuild row in th order
      [...thead.querySelectorAll("th")].forEach(th => {
        const key = [...th.classList].find(c => c.startsWith("col-"));
        if (key && cellMap[key]) {
          row.appendChild(cellMap[key]);
        }
      });
    });
  }
}

/* Init DnD on DOM ready */
document.addEventListener("DOMContentLoaded", function () {
  initColumnDnD();
});