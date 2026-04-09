/**
 * Naukri Talent Cloud Style Filter System - Updated
 */

(function () {
    'use strict';

    // --- Configuration & Initial State ---
    const filterState = {
        keywordChips: [],
        keySkillsOnly: false,
        location: [],
        experience: { min: 0, max: 31 },
        salaryRange: null, // Stores {min, max} or string representation
        notMentionedSalary: false,
        department: [],
        institute: [],
        noticePeriod: [],
        relocate: []
    };

    const filterData = {
        locations: ['Bangalore', 'Mumbai', 'Delhi NCR', 'Pune', 'Hyderabad', 'Chennai', 'Remote', 'Overseas'],
        departments: ['Engineering', 'Product', 'Design', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations'],
        institutes: ['IIT Bombay', 'IIT Delhi', 'IIM Ahmedabad', 'IIM Bangalore', 'BITS Pilani', 'NIT Trichy', 'Anna University', 'VTU', 'DU', 'Mumbai University', 'Christ University', 'SRM University'],
        noticePeriods: ['Immediate (0-15 days)', '1 Month', '2 Months', '3 Months', 'More than 3 months']
    };

    const expScale = [
        { label: '0', val: 0 }, { label: '6', val: 6 }, { label: '12', val: 12 },
        { label: '18', val: 18 }, { label: '24', val: 24 }, { label: '30+', val: 31 }
    ];

    // --- DOM Injection ---
    function injectFilterHTML() {
        if (document.getElementById('ntcFilterDrawer')) return;

        const overlay = document.createElement('div');
        overlay.id = 'ntcFilterOverlay';
        overlay.className = 'ntc-filter-overlay';
        document.body.appendChild(overlay);

        const drawer = document.createElement('div');
        drawer.id = 'ntcFilterDrawer';
        drawer.className = 'ntc-filter-drawer';

        drawer.innerHTML = `
            <div class="ntc-filter-header">
                <div class="ntc-filter-header-left">
                    <h2>Filters</h2>
                    <p id="ntcAppliedCount">0 filters applied</p>
                </div>
                <div class="ntc-filter-header-right">
                    <button class="ntc-clear-all-btn" id="ntcClearAll">Clear all</button>
                    <button class="ntc-close-drawer" id="ntcCloseDrawer"><i class="bi bi-x-lg"></i></button>
                </div>
            </div>

            <div class="ntc-filter-body">
                <!-- Keywords -->
                <div class="ntc-filter-section active">
                    <div class="ntc-section-header">
                        <span class="ntc-section-title">KEYWORDS</span>
                        <i class="bi bi-chevron-down"></i>
                    </div>
                    <div class="ntc-section-content">
                        <div class="ntc-search-wrapper">
                            <i class="bi bi-search"></i>
                            <input type="text" class="ntc-filter-search" id="ntcKeywords" placeholder="Search keywords in profile">
                        </div>
                        <div id="keywordChips" class="ntc-local-chips"></div>
                        <label class="ntc-checkbox-label" style="margin-top: 10px;">
                            <input type="checkbox" id="ntcSkillsOnly">
                            <span>Search in key skills only</span>
                        </label>
                    </div>
                </div>

                <!-- Location -->
                <div class="ntc-filter-section">
                    <div class="ntc-section-header">
                        <span class="ntc-section-title">LOCATION</span>
                        <i class="bi bi-chevron-down"></i>
                    </div>
                    <div class="ntc-section-content">
                        <div class="ntc-search-wrapper">
                            <i class="bi bi-search"></i>
                            <input type="text" class="ntc-filter-search list-filter" data-list="locationList" placeholder="Search location">
                        </div>
                        <div class="ntc-checkbox-list" id="locationList">
                            ${filterData.locations.map(loc => `
                                <div class="ntc-checkbox-item">
                                    <label class="ntc-checkbox-label">
                                        <input type="checkbox" name="location" value="${loc}">
                                        <span>${loc}</span>
                                    </label>
                                    <span class="ntc-count">${Math.floor(Math.random() * 100)}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- Experience -->
                <div class="ntc-filter-section active">
                    <div class="ntc-section-header">
                        <span class="ntc-section-title">EXPERIENCE</span>
                        <i class="bi bi-chevron-down"></i>
                    </div>
                    <div class="ntc-section-content">
                        <div class="ntc-experience-container">
                            <div class="ntc-slider-wrapper" id="expSlider">
                                <div class="ntc-slider-track"></div>
                                <div class="ntc-slider-range" id="expRange"></div>
                                <div class="ntc-slider-handle" id="expMinHandle" style="left: 0%;"></div>
                                <div class="ntc-slider-handle" id="expMaxHandle" style="left: 100%;"></div>
                                <div class="ntc-scale-labels">
                                    ${expScale.map(item => `<span style="left: ${(item.val / 31) * 100}%; transform: translateX(${item.val === 31 ? '-100%' : '-50%'})">${item.label}</span>`).join('')}
                                </div>
                            </div>
                            <div class="ntc-exp-dropdowns">
                                <div class="ntc-dropdown-group">
                                    <select class="ntc-exp-select" id="expMinSelect">
                                        ${Array.from({ length: 31 }, (_, i) => `<option value="${i}">${i} years</option>`).join('')}
                                    </select>
                                </div>
                                <span class="ntc-exp-to">to</span>
                                <div class="ntc-dropdown-group">
                                    <select class="ntc-exp-select" id="expMaxSelect">
                                        ${Array.from({ length: 30 }, (_, i) => `<option value="${i}">${i} years</option>`).join('')}
                                        <option value="31" selected>30+ years</option>
                                    </select>
                                </div>
                                <button class="ntc-confirm-btn" id="expConfirm"><i class="bi bi-arrow-right"></i></button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Salary -->
                <div class="ntc-filter-section">
                    <div class="ntc-section-header">
                        <span class="ntc-section-title">SALARY</span>
                        <i class="bi bi-chevron-down"></i>
                    </div>
                    <div class="ntc-section-content">
                        <div class="ntc-salary-inputs">
                            <input type="text" class="ntc-exp-select" id="salMin" placeholder="Min salary">
                            <button class="ntc-confirm-btn" id="salApply" style="background: transparent; color: #6b7280; width: 22px;"><i class="bi bi-arrow-right-left"></i></button>
                            <input type="text" class="ntc-exp-select" id="salMax" placeholder="Max salary">
                        </div>
                        <div id="salaryChipLocal" class="ntc-local-chips"></div>
                        <label class="ntc-checkbox-label" style="margin-top: 15px;">
                            <input type="checkbox" id="salNotMentioned">
                            <span>Candidates with salary not mentioned</span>
                        </label>
                    </div>
                </div>

                <!-- Department -->
                <div class="ntc-filter-section">
                    <div class="ntc-section-header">
                        <span class="ntc-section-title">DEPARTMENT</span>
                        <i class="bi bi-chevron-down"></i>
                    </div>
                    <div class="ntc-section-content">
                        <div class="ntc-search-wrapper">
                            <i class="bi bi-search"></i>
                            <input type="text" class="ntc-filter-search list-filter" data-list="deptList" placeholder="Search department">
                        </div>
                        <div class="ntc-checkbox-list" id="deptList">
                             ${filterData.departments.map(dept => `
                                <div class="ntc-checkbox-item">
                                    <label class="ntc-checkbox-label">
                                        <input type="checkbox" name="department" value="${dept}">
                                        <span>${dept}</span>
                                    </label>
                                </div>`).join('')}
                        </div>
                    </div>
                </div>

                <!-- Institute -->
                <div class="ntc-filter-section">
                    <div class="ntc-section-header">
                        <span class="ntc-section-title">INSTITUTE</span>
                        <i class="bi bi-chevron-down"></i>
                    </div>
                    <div class="ntc-section-content">
                        <div class="ntc-checkbox-list">
                             ${filterData.institutes.slice(0, 5).map(inst => `
                                <div class="ntc-checkbox-item">
                                    <label class="ntc-checkbox-label">
                                        <input type="checkbox" name="institute" value="${inst}">
                                        <span>${inst}</span>
                                    </label>
                                </div>`).join('')}
                        </div>
                        <a href="javascript:void(0)" class="ntc-see-more" id="seeMoreInstitutes">See more</a>
                    </div>
                </div>
            </div>

            <div class="ntc-filter-footer">
                <button class="ntc-btn ntc-btn-secondary" id="ntcReset">Reset</button>
                <button class="ntc-btn ntc-btn-primary" id="ntcApply">Apply Filters</button>
            </div>
        `;
        document.body.appendChild(drawer);

        const tableContainer = document.querySelector('.candidate-table-container');
        if (tableContainer && !document.getElementById('ntcChipsContainer')) {
            const chipsWrapper = document.createElement('div');
            chipsWrapper.id = 'ntcChipsContainer';
            chipsWrapper.className = 'ntc-chips-container';
            tableContainer.parentNode.insertBefore(chipsWrapper, tableContainer);
        }

        // Institute Popup Modal
        if (!document.getElementById('ntcInstituteModal')) {
            const modal = document.createElement('div');
            modal.id = 'ntcInstituteModal';
            modal.className = 'ntc-modal-overlay';
            modal.innerHTML = `
                <div class="ntc-modal">
                    <div class="ntc-modal-header">
                        <h3>Select Institutes</h3>
                        <button class="ntc-close-drawer" id="closeInstituteModal"><i class="bi bi-x-lg"></i></button>
                    </div>
                    <div class="ntc-modal-body">
                        <div class="ntc-search-wrapper">
                            <i class="bi bi-search"></i>
                            <input type="text" class="ntc-filter-search list-filter" data-list="modalInstList" placeholder="Search institutes">
                        </div>
                        <div class="ntc-modal-2-col" id="modalInstList">
                            ${filterData.institutes.map(inst => `
                                <label class="ntc-checkbox-label">
                                    <input type="checkbox" name="institute" value="${inst}">
                                    <span>${inst}</span>
                                </label>`).join('')}
                        </div>
                    </div>
                    <div class="ntc-modal-footer">
                        <button class="ntc-btn ntc-btn-primary" id="applyInstituteModal">Apply</button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        }

        initEventListeners();
    }

    // --- Logic ---
    function updateAppliedCount() {
        let count = 0;
        if (filterState.keywordChips.length > 0) count++;
        if (filterState.department.length > 0) count++;
        if (filterState.institute.length > 0) count++;
        if (filterState.salaryRange) count++;
        if (filterState.experience.min > 0 || filterState.experience.max < 31) count++;

        const countEl = document.getElementById('ntcAppliedCount');
        if (countEl) countEl.innerText = `${count} filter${count !== 1 ? 's' : ''} applied`;
    }

    function renderKeywordChips() {
        const container = document.getElementById('keywordChips');
        if (!container) return;
        container.innerHTML = filterState.keywordChips.map((key, i) => `
            <div class="ntc-local-chip">
                <span>${key}</span>
                <i class="bi bi-x ntc-remove-keyword" data-index="${i}"></i>
            </div>
        `).join('');
        container.querySelectorAll('.ntc-remove-keyword').forEach(btn => {
            btn.onclick = () => {
                filterState.keywordChips.splice(btn.dataset.index, 1);
                renderKeywordChips();
                renderGlobalChips();
                updateAppliedCount();
            };
        });
    }

    function renderSalaryChip() {
        const container = document.getElementById('salaryChipLocal');
        if (!container) return;
        if (filterState.salaryRange) {
            container.innerHTML = `
                <div class="ntc-local-chip">
                    <span>${filterState.salaryRange}</span>
                    <i class="bi bi-x" id="ntcRemoveSalary"></i>
                </div>`;
            document.getElementById('ntcRemoveSalary').onclick = () => {
                filterState.salaryRange = null;
                document.getElementById('salMin').value = '';
                document.getElementById('salMax').value = '';
                renderSalaryChip();
                renderGlobalChips();
                updateAppliedCount();
            };
        } else {
            container.innerHTML = '';
        }
    }

    function renderGlobalChips() {
        const container = document.getElementById('ntcChipsContainer');
        if (!container) return;
        let chipsHtml = '';

        filterState.keywordChips.forEach((key, i) => {
            chipsHtml += `<div class="ntc-chip"><span><strong>Keyword:</strong> ${key}</span><span class="ntc-chip-close" data-type="keyword" data-index="${i}"><i class="bi bi-x"></i></span></div>`;
        });

        if (filterState.salaryRange) {
            chipsHtml += `<div class="ntc-chip"><span><strong>Salary:</strong> ${filterState.salaryRange}</span><span class="ntc-chip-close" data-type="salary"><i class="bi bi-x"></i></span></div>`;
        }

        if (filterState.experience.min > 0 || filterState.experience.max < 31) {
            const maxText = filterState.experience.max > 30 ? '30+' : filterState.experience.max;
            chipsHtml += `<div class="ntc-chip"><span><strong>Exp:</strong> ${filterState.experience.min} - ${maxText} yrs</span><span class="ntc-chip-close" data-type="experience"><i class="bi bi-x"></i></span></div>`;
        }

        filterState.institute.forEach(val => {
            chipsHtml += `<div class="ntc-chip"><span><strong>Institute:</strong> ${val}</span><span class="ntc-chip-close" data-type="institute" data-value="${val}"><i class="bi bi-x"></i></span></div>`;
        });

        container.innerHTML = chipsHtml;
        container.querySelectorAll('.ntc-chip-close').forEach(btn => {
            btn.onclick = () => {
                const type = btn.dataset.type;
                if (type === 'keyword') {
                    filterState.keywordChips.splice(btn.dataset.index, 1);
                    renderKeywordChips();
                } else if (type === 'salary') {
                    filterState.salaryRange = null;
                    document.getElementById('salMin').value = '';
                    document.getElementById('salMax').value = '';
                    renderSalaryChip();
                } else if (type === 'experience') {
                    filterState.experience = { min: 0, max: 31 };
                    document.getElementById('expMinSelect').value = "0";
                    document.getElementById('expMaxSelect').value = "31";
                    syncSliderFromDropdowns();
                } else if (type === 'institute') {
                    const value = btn.dataset.value;
                    filterState.institute = filterState.institute.filter(v => v !== value);
                    // Sync drawer and modal checkboxes
                    document.querySelectorAll(`.ntc-filter-drawer input[name="institute"][value="${value}"], #ntcInstituteModal input[name="institute"][value="${value}"]`).forEach(cb => cb.checked = false);
                }
                renderGlobalChips();
                updateAppliedCount();
            };
        });
    }

    function syncSliderFromDropdowns() {
        const min = parseInt(document.getElementById('expMinSelect').value);
        const max = parseInt(document.getElementById('expMaxSelect').value);

        const minPercent = (min / 31) * 100;
        const maxPercent = (max / 31) * 100;

        document.getElementById('expMinHandle').style.left = minPercent + '%';
        document.getElementById('expMaxHandle').style.left = maxPercent + '%';
        document.getElementById('expRange').style.left = minPercent + '%';
        document.getElementById('expRange').style.width = (maxPercent - minPercent) + '%';

        filterState.experience.min = min;
        filterState.experience.max = max;
    }

    function setupSliderDragging() {
        const sliderH = document.getElementById('expSlider');
        const minH = document.getElementById('expMinHandle');
        const maxH = document.getElementById('expMaxHandle');
        if (!sliderH || !minH || !maxH) return;

        let isDragging = null;

        const onMove = (e) => {
            if (!isDragging) return;
            const rect = sliderH.getBoundingClientRect();
            const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
            let percent = ((clientX - rect.left) / rect.width) * 100;
            percent = Math.max(0, Math.min(100, percent));

            const value = Math.round((percent / 100) * 31);

            if (isDragging === 'min') {
                const curMax = parseInt(document.getElementById('expMaxSelect').value);
                if (value < curMax) {
                    document.getElementById('expMinSelect').value = value;
                    syncSliderFromDropdowns();
                }
            } else {
                const curMin = parseInt(document.getElementById('expMinSelect').value);
                if (value > curMin) {
                    document.getElementById('expMaxSelect').value = value;
                    syncSliderFromDropdowns();
                }
            }
        };

        const stopDrag = () => { isDragging = null; };

        minH.onmousedown = (e) => { e.preventDefault(); isDragging = 'min'; };
        maxH.onmousedown = (e) => { e.preventDefault(); isDragging = 'max'; };

        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', stopDrag);

        minH.ontouchstart = () => { isDragging = 'min'; };
        maxH.ontouchstart = () => { isDragging = 'max'; };
        window.addEventListener('touchmove', onMove);
        window.addEventListener('touchend', stopDrag);
    }

    function initEventListeners() {
        const drawer = document.getElementById('ntcFilterDrawer');
        const overlay = document.getElementById('ntcFilterOverlay');

        document.getElementById('openMasterFilter').onclick = (e) => {
            e.preventDefault();
            drawer.classList.add('open');
            overlay.classList.add('open');
        };

        const close = () => { drawer.classList.remove('open'); overlay.classList.remove('open'); };
        document.getElementById('ntcCloseDrawer').onclick = close;
        overlay.onclick = close;

        drawer.querySelectorAll('.ntc-section-header').forEach(h => h.onclick = () => h.parentElement.classList.toggle('active'));

        // Keywords
        const kwInput = document.getElementById('ntcKeywords');
        kwInput.onkeydown = (e) => {
            if (e.key === 'Enter') {
                const val = kwInput.value.trim();
                if (val && !filterState.keywordChips.includes(val)) {
                    filterState.keywordChips.push(val);
                    kwInput.value = '';
                    renderKeywordChips();
                    renderGlobalChips();
                    updateAppliedCount();
                }
            }
        };

        // Salary
        const handleSalary = () => {
            const min = document.getElementById('salMin').value.trim();
            const max = document.getElementById('salMax').value.trim();
            if (min || max) {
                filterState.salaryRange = `${min || '0'} - ${max || 'Any'}`;
                renderSalaryChip();
                renderGlobalChips();
                updateAppliedCount();
            }
        };
        document.getElementById('salApply').onclick = handleSalary;

        // Experience dropdowns
        ['expMinSelect', 'expMaxSelect'].forEach(id => {
            document.getElementById(id).onchange = syncSliderFromDropdowns;
        });
        document.getElementById('expConfirm').onclick = () => {
            renderGlobalChips();
            updateAppliedCount();
        };

        // List Filters (Search in lists)
        drawer.querySelectorAll('.list-filter').forEach(search => {
            search.addEventListener('input', function () {
                const listId = this.dataset.list;
                const query = this.value.toLowerCase();
                const list = document.getElementById(listId);
                if (list) {
                    list.querySelectorAll('.ntc-checkbox-item, .ntc-checkbox-label').forEach(item => {
                        const text = item.innerText.toLowerCase();
                        item.style.display = text.includes(query) ? '' : 'none';
                    });
                }
            });
        });

        // Institute Modal
        document.getElementById('seeMoreInstitutes').onclick = () => {
            document.getElementById('ntcInstituteModal').classList.add('open');
        };

        document.getElementById('closeInstituteModal').onclick = () => {
            document.getElementById('ntcInstituteModal').classList.remove('open');
        };

        document.getElementById('applyInstituteModal').onclick = () => {
            // Find all checked in modal
            const checked = document.getElementById('modalInstList').querySelectorAll('input:checked');
            filterState.institute = Array.from(checked).map(cb => cb.value);

            // Sync drawer checkboxes
            drawer.querySelectorAll('input[name="institute"]').forEach(cb => {
                cb.checked = filterState.institute.includes(cb.value);
            });

            document.getElementById('ntcInstituteModal').classList.remove('open');
            updateAppliedCount();
            renderGlobalChips();
        };

        // General Checkbox Handling (Drawer)
        drawer.addEventListener('change', function (e) {
            if (e.target.type === 'checkbox' && e.target.name) {
                const name = e.target.name;
                const value = e.target.value;

                if (filterState[name]) {
                    if (e.target.checked) {
                        if (!filterState[name].includes(value)) filterState[name].push(value);
                    } else {
                        filterState[name] = filterState[name].filter(v => v !== value);
                    }
                    // Sync modal if it exists
                    const modalCb = document.querySelector(`#ntcInstituteModal input[name="${name}"][value="${value}"]`);
                    if (modalCb) modalCb.checked = e.target.checked;

                    updateAppliedCount();
                    renderGlobalChips();
                }
            }
        });

        setupSliderDragging();

        document.getElementById('ntcApply').onclick = () => {
            handleSalary();
            close();
        };

        document.getElementById('ntcReset').onclick = () => {
            filterState.keywordChips = [];
            filterState.salaryRange = null;
            filterState.experience = { min: 0, max: 31 };
            document.querySelectorAll('input').forEach(i => i.value = '');
            document.getElementById('expMinSelect').value = "0";
            document.getElementById('expMaxSelect').value = "31";
            syncSliderFromDropdowns();
            renderKeywordChips();
            renderSalaryChip();
            renderGlobalChips();
            updateAppliedCount();
        };
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', injectFilterHTML);
    else injectFilterHTML();

})();
