

(function () {
    'use strict';

    const filterState = {
        keywordChips: [],
        keySkillsOnly: false,
        location: [],
        experience: { min: 0, max: 31 },
        salaryRange: null,
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
        { label: '0', val: 0 }, { label: '5', val: 5 }, { label: '10', val: 10 },
        { label: '15', val: 15 }, { label: '20', val: 20 }, { label: '25', val: 25 }, { label: '30+', val: 31 }
    ];

    function injectFilterHTML() {
        if (document.getElementById('ntcFilterDrawer')) return;

        // Overlay
        const overlay = document.createElement('div');
        overlay.id = 'ntcFilterOverlay';
        overlay.className = 'ntc-filter-overlay';
        document.body.appendChild(overlay);

        // Drawer
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
                        <span class="ntc-section-title">Keywords</span>
                        <i class="bi bi-chevron-down"></i>
                    </div>
                    <div class="ntc-section-content">
                        <div class="ntc-search-wrapper">
                            <i class="bi bi-search"></i>
                            <input type="text" class="ntc-filter-search" id="ntcKeywords" placeholder="Search skills, companies, or keywords">
                        </div>
                        <div id="keywordChips" class="ntc-local-chips"></div>
                        <label class="ntc-checkbox-label" style="margin-top: 12px; padding: 8px; border-radius: 6px; background: var(--tc-gray-100);">
                            <input type="checkbox" id="ntcSkillsOnly">
                            <span style="font-size: 13px; color: var(--tc-gray-600);">Search in key skills only</span>
                        </label>
                    </div>
                </div>

                <!-- Location -->
                <div class="ntc-filter-section">
                    <div class="ntc-section-header">
                        <span class="ntc-section-title">Location</span>
                        <i class="bi bi-chevron-down"></i>
                    </div>
                    <div class="ntc-section-content">
                        <div class="ntc-search-wrapper">
                            <i class="bi bi-geo-alt"></i>
                            <input type="text" class="ntc-filter-search list-filter" data-list="locationList" placeholder="Search city or region">
                        </div>
                        <div class="ntc-checkbox-list" id="locationList">
                            ${filterData.locations.map(loc => `
                                <div class="ntc-checkbox-item">
                                    <label class="ntc-checkbox-label">
                                        <input type="checkbox" name="location" value="${loc}">
                                        <span>${loc}</span>
                                    </label>
                                    <span class="ntc-count">${Math.floor(Math.random() * 500) + 50}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- Experience -->
                <div class="ntc-filter-section active">
                    <div class="ntc-section-header">
                        <span class="ntc-section-title">Experience</span>
                        <i class="bi bi-chevron-down"></i>
                    </div>
                    <div class="ntc-section-content">
                        <div class="ntc-experience-container">
                            <div class="ntc-exp-presets">
                                <button class="ntc-preset-btn" data-min="0" data-max="2">0-2 years</button>
                                <button class="ntc-preset-btn" data-min="3" data-max="5">3-5 years</button>
                                <button class="ntc-preset-btn" data-min="6" data-max="10">6-10 years</button>
                                <button class="ntc-preset-btn" data-min="10" data-max="31">10+ years</button>
                            </div>

                            <div class="ntc-slider-wrapper" id="expSlider">
                                <div class="ntc-slider-track"></div>
                                <div class="ntc-slider-range" id="expRange"></div>
                                <div class="ntc-slider-handle" id="expMinHandle" style="left: 0%;">
                                    <div class="ntc-slider-tooltip" id="minTooltip">0 yrs</div>
                                </div>
                                <div class="ntc-slider-handle" id="expMaxHandle" style="left: 100%;">
                                    <div class="ntc-slider-tooltip" id="maxTooltip">30+ yrs</div>
                                </div>
                                <div class="ntc-scale-labels">
                                    ${expScale.map(item => `<span data-val="${item.val}" style="left: ${(item.val / 31) * 100}%; transform: translateX(${item.val === 31 ? '-100%' : '-50%'})">${item.label}</span>`).join('')}
                                </div>
                            </div>

                            <div class="ntc-exp-dropdowns">
                                <div class="ntc-dropdown-group">
                                    <label class="ntc-dropdown-label">Minimum</label>
                                    <select class="ntc-exp-select" id="expMinSelect">
                                        ${Array.from({ length: 31 }, (_, i) => `<option value="${i}">${i} years</option>`).join('')}
                                    </select>
                                </div>
                                <span class="ntc-exp-to">to</span>
                                <div class="ntc-dropdown-group">
                                    <label class="ntc-dropdown-label">Maximum</label>
                                    <select class="ntc-exp-select" id="expMaxSelect">
                                        ${Array.from({ length: 30 }, (_, i) => `<option value="${i}">${i} years</option>`).join('')}
                                        <option value="31" selected>30+ years</option>
                                    </select>
                                </div>
                            </div>
                            
                          
                        </div>
                    </div>
                </div>

                <!-- Salary -->
                <div class="ntc-filter-section">
                    <div class="ntc-section-header">
                        <span class="ntc-section-title">Salary Range (LPA)</span>
                        <i class="bi bi-chevron-down"></i>
                    </div>
                    <div class="ntc-section-content">
                        <div class="ntc-salary-inputs">
                            <div class="ntc-salary-group">
                                <label class="ntc-salary-label">Minimum</label>
                                <input type="number" class="ntc-exp-select" id="salMin" placeholder="0" min="0">
                            </div>
                            <span class="ntc-salary-separator">—</span>
                            <div class="ntc-salary-group">
                                <label class="ntc-salary-label">Maximum</label>
                                <input type="number" class="ntc-exp-select" id="salMax" placeholder="50+" min="0">
                            </div>
                        </div>
                        <div id="salaryChipLocal" class="ntc-local-chips"></div>
                        <label class="ntc-checkbox-label" style="margin-top: 16px;">
                            <input type="checkbox" id="salNotMentioned">
                            <span style="font-size: 13px; color: var(--tc-gray-600);">Include candidates with undisclosed salary</span>
                        </label>
                    </div>
                </div>

                <!-- Department -->
                <div class="ntc-filter-section">
                    <div class="ntc-section-header">
                        <span class="ntc-section-title">Department</span>
                        <i class="bi bi-chevron-down"></i>
                    </div>
                    <div class="ntc-section-content">
                        <div class="ntc-search-wrapper">
                            <i class="bi bi-briefcase"></i>
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
                        <span class="ntc-section-title">Institute</span>
                        <i class="bi bi-chevron-down"></i>
                    </div>
                    <div class="ntc-section-content">
                        <div class="ntc-checkbox-list" style="max-height: 160px;">
                             ${filterData.institutes.slice(0, 5).map(inst => `
                                <div class="ntc-checkbox-item">
                                    <label class="ntc-checkbox-label">
                                        <input type="checkbox" name="institute" value="${inst}">
                                        <span>${inst}</span>
                                    </label>
                                </div>`).join('')}
                        </div>
                        <button class="ntc-see-more" id="seeMoreInstitutes">View all institutes</button>
                    </div>
                </div>
            </div>

            <div class="ntc-filter-footer">
                <button class="ntc-btn ntc-btn-secondary" id="ntcReset">Reset</button>
                <button class="ntc-btn ntc-btn-primary" id="ntcApply">Apply Filters</button>
            </div>
        `;
        document.body.appendChild(drawer);

        // Chips Container - Insert BEFORE your table container
        const tableContainer = document.querySelector('.candidate-table-container') || 
                              document.querySelector('.table-responsive') || 
                              document.querySelector('table')?.parentElement;
        
        if (tableContainer && !document.getElementById('ntcChipsContainer')) {
            const chipsWrapper = document.createElement('div');
            chipsWrapper.id = 'ntcChipsContainer';
            chipsWrapper.className = 'ntc-chips-container';
            tableContainer.parentNode.insertBefore(chipsWrapper, tableContainer);
        }

        // Institute Modal
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
                            <input type="text" class="ntc-filter-search list-filter" data-list="modalInstList" placeholder="Search institutes (e.g., IIT, NIT)">
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
                        <button class="ntc-btn ntc-btn-secondary" id="cancelInstituteModal" style="flex: 0 0 auto; padding: 10px 20px;">Cancel</button>
                        <button class="ntc-btn ntc-btn-primary" id="applyInstituteModal" style="flex: 0 0 auto; padding: 10px 24px;">Apply Selection</button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        }

        initEventListeners();
        setupSliderDragging();
    }

    function updateAppliedCount() {
        let count = 0;
        if (filterState.keywordChips.length > 0) count++;
        if (filterState.location.length > 0) count++;
        if (filterState.department.length > 0) count++;
        if (filterState.institute.length > 0) count++;
        if (filterState.salaryRange) count++;
        if (filterState.experience.min > 0 || filterState.experience.max < 31) count++;

        const countEl = document.getElementById('ntcAppliedCount');
        const badgeEl = document.getElementById('filterBadge');
        
        if (countEl) {
            countEl.innerText = `${count} filter${count !== 1 ? 's' : ''} applied`;
            countEl.style.color = count > 0 ? 'var(--tc-primary)' : 'var(--tc-gray-500)';
            countEl.style.fontWeight = count > 0 ? '700' : '500';
        }
        
        if (badgeEl) {
            badgeEl.innerText = count;
            badgeEl.style.display = count > 0 ? 'inline-block' : 'none';
        }
    }

    function updatePresetButtons() {
        document.querySelectorAll('.ntc-preset-btn').forEach(btn => {
            const btnMin = parseInt(btn.dataset.min);
            const btnMax = parseInt(btn.dataset.max);
            
            if (filterState.experience.min === btnMin && filterState.experience.max === btnMax) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
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

        document.getElementById('minTooltip').innerText = min + (min === 1 ? ' yr' : ' yrs');
        document.getElementById('maxTooltip').innerText = max > 30 ? '30+ yrs' : max + ' yrs';

        filterState.experience.min = min;
        filterState.experience.max = max;
        
        updatePresetButtons();
    }

    function setupSliderDragging() {
        const slider = document.getElementById('expSlider');
        const minHandle = document.getElementById('expMinHandle');
        const maxHandle = document.getElementById('expMaxHandle');
        
        if (!slider || !minHandle || !maxHandle) return;

        let isDragging = null;

        const onMove = (e) => {
            if (!isDragging) return;
            e.preventDefault();
            
            const rect = slider.getBoundingClientRect();
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

        const stopDrag = () => {
            if (isDragging) {
                isDragging = null;
                minHandle.classList.remove('dragging');
                maxHandle.classList.remove('dragging');
                renderGlobalChips();
                updateAppliedCount();
            }
        };

        minHandle.onmousedown = (e) => { e.preventDefault(); isDragging = 'min'; minHandle.classList.add('dragging'); };
        maxHandle.onmousedown = (e) => { e.preventDefault(); isDragging = 'max'; maxHandle.classList.add('dragging'); };

        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', stopDrag);

        minHandle.ontouchstart = (e) => { e.preventDefault(); isDragging = 'min'; minHandle.classList.add('dragging'); };
        maxHandle.ontouchstart = (e) => { e.preventDefault(); isDragging = 'max'; maxHandle.classList.add('dragging'); };
        window.addEventListener('touchmove', onMove, { passive: false });
        window.addEventListener('touchend', stopDrag);

        // Scale labels click to jump
        document.querySelectorAll('.ntc-scale-labels span').forEach(span => {
            span.onclick = () => {
                const val = parseInt(span.dataset.val);
                const currentMin = filterState.experience.min;
                const currentMax = filterState.experience.max;
                
                // Click near left side adjusts min, right side adjusts max
                if (Math.abs(val - currentMin) < Math.abs(val - currentMax)) {
                    document.getElementById('expMinSelect').value = Math.min(val, currentMax - 1);
                } else {
                    document.getElementById('expMaxSelect').value = Math.max(val, currentMin + 1);
                }
                syncSliderFromDropdowns();
                renderGlobalChips();
                updateAppliedCount();
            };
        });
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
                    <span>₹${filterState.salaryRange} LPA</span>
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
        let hasChips = false;

        filterState.keywordChips.forEach((key, i) => {
            hasChips = true;
            chipsHtml += `<div class="ntc-chip"><span><strong>Keyword:</strong> ${key}</span><span class="ntc-chip-close" data-type="keyword" data-index="${i}"><i class="bi bi-x"></i></span></div>`;
        });

        filterState.location.forEach(loc => {
            hasChips = true;
            chipsHtml += `<div class="ntc-chip"><span><strong>Location:</strong> ${loc}</span><span class="ntc-chip-close" data-type="location" data-value="${loc}"><i class="bi bi-x"></i></span></div>`;
        });

        if (filterState.salaryRange) {
            hasChips = true;
            chipsHtml += `<div class="ntc-chip"><span><strong>Salary:</strong> ₹${filterState.salaryRange} LPA</span><span class="ntc-chip-close" data-type="salary"><i class="bi bi-x"></i></span></div>`;
        }

        if (filterState.experience.min > 0 || filterState.experience.max < 31) {
            hasChips = true;
            const maxText = filterState.experience.max > 30 ? '30+' : filterState.experience.max;
            chipsHtml += `<div class="ntc-chip"><span><strong>Experience:</strong> ${filterState.experience.min} - ${maxText} yrs</span><span class="ntc-chip-close" data-type="experience"><i class="bi bi-x"></i></span></div>`;
        }

        filterState.department.forEach(dept => {
            hasChips = true;
            chipsHtml += `<div class="ntc-chip"><span><strong>Dept:</strong> ${dept}</span><span class="ntc-chip-close" data-type="department" data-value="${dept}"><i class="bi bi-x"></i></span></div>`;
        });

        filterState.institute.forEach(inst => {
            hasChips = true;
            chipsHtml += `<div class="ntc-chip"><span><strong>Institute:</strong> ${inst}</span><span class="ntc-chip-close" data-type="institute" data-value="${inst}"><i class="bi bi-x"></i></span></div>`;
        });

        if (hasChips) {
            chipsHtml += `<button class="ntc-clear-chips" onclick="window.resetAllFilters()"><i class="bi bi-trash3"></i> Clear all</button>`;
            container.classList.add('active');
            container.style.display = 'flex';
        } else {
            container.classList.remove('active');
            container.style.display = 'none';
        }

        container.innerHTML = chipsHtml;
        
        container.querySelectorAll('.ntc-chip-close').forEach(btn => {
            btn.onclick = () => {
                const type = btn.dataset.type;
                if (type === 'keyword') {
                    filterState.keywordChips.splice(btn.dataset.index, 1);
                    renderKeywordChips();
                } else if (type === 'location') {
                    const value = btn.dataset.value;
                    filterState.location = filterState.location.filter(v => v !== value);
                    document.querySelectorAll(`input[name="location"][value="${value}"]`).forEach(cb => cb.checked = false);
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
                } else if (type === 'department') {
                    const value = btn.dataset.value;
                    filterState.department = filterState.department.filter(v => v !== value);
                    document.querySelectorAll(`input[name="department"][value="${value}"]`).forEach(cb => cb.checked = false);
                } else if (type === 'institute') {
                    const value = btn.dataset.value;
                    filterState.institute = filterState.institute.filter(v => v !== value);
                    document.querySelectorAll(`input[name="institute"][value="${value}"]`).forEach(cb => cb.checked = false);
                }
                renderGlobalChips();
                updateAppliedCount();
            };
        });
    }

    window.resetAllFilters = function() {
        filterState.keywordChips = [];
        filterState.location = [];
        filterState.department = [];
        filterState.institute = [];
        filterState.salaryRange = null;
        filterState.experience = { min: 0, max: 31 };
        
        document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
        document.querySelectorAll('input[type="text"], input[type="number"]').forEach(i => i.value = '');
        document.getElementById('expMinSelect').value = "0";
        document.getElementById('expMaxSelect').value = "31";
        
        syncSliderFromDropdowns();
        renderKeywordChips();
        renderSalaryChip();
        renderGlobalChips();
        updateAppliedCount();
    };

    function initEventListeners() {
        const drawer = document.getElementById('ntcFilterDrawer');
        const overlay = document.getElementById('ntcFilterOverlay');

        // Open Filter Button
        const openBtn = document.getElementById('openMasterFilter');
        if (openBtn) {
            openBtn.onclick = (e) => {
                e.preventDefault();
                drawer.classList.add('open');
                overlay.classList.add('open');
                document.body.style.overflow = 'hidden';
            };
        }

        // Close Filter
        const close = () => { 
            drawer.classList.remove('open'); 
            overlay.classList.remove('open');
            document.body.style.overflow = '';
        };
        
        document.getElementById('ntcCloseDrawer').onclick = close;
        overlay.onclick = close;

        // Accordion Sections
        drawer.querySelectorAll('.ntc-section-header').forEach(h => {
            h.onclick = () => h.parentElement.classList.toggle('active');
        });

        // Keywords Input
        const kwInput = document.getElementById('ntcKeywords');
        if (kwInput) {
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
        }

        // Experience Presets
        document.querySelectorAll('.ntc-preset-btn').forEach(btn => {
            btn.onclick = () => {
                const min = parseInt(btn.dataset.min);
                const max = parseInt(btn.dataset.max);
                
                document.getElementById('expMinSelect').value = min;
                document.getElementById('expMaxSelect').value = max;
                syncSliderFromDropdowns();
                renderGlobalChips();
                updateAppliedCount();
            };
        });

        // Experience Dropdowns
        ['expMinSelect', 'expMaxSelect'].forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.onchange = () => {
                    syncSliderFromDropdowns();
                    renderGlobalChips();
                    updateAppliedCount();
                };
            }
        });

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

        const salMin = document.getElementById('salMin');
        const salMax = document.getElementById('salMax');
        
        if (salMin) salMin.onblur = handleSalary;
        if (salMax) salMax.onblur = handleSalary;

        // List Search Filters
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
        const seeMoreBtn = document.getElementById('seeMoreInstitutes');
        if (seeMoreBtn) {
            seeMoreBtn.onclick = () => {
                document.getElementById('ntcInstituteModal').classList.add('open');
            };
        }

        document.getElementById('closeInstituteModal').onclick = () => {
            document.getElementById('ntcInstituteModal').classList.remove('open');
        };

        document.getElementById('cancelInstituteModal').onclick = () => {
            document.getElementById('ntcInstituteModal').classList.remove('open');
        };

        document.getElementById('applyInstituteModal').onclick = () => {
            const checked = document.getElementById('modalInstList').querySelectorAll('input:checked');
            filterState.institute = Array.from(checked).map(cb => cb.value);

            drawer.querySelectorAll('input[name="institute"]').forEach(cb => {
                cb.checked = filterState.institute.includes(cb.value);
            });

            document.getElementById('ntcInstituteModal').classList.remove('open');
            updateAppliedCount();
            renderGlobalChips();
        };

        // Checkbox Changes
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
                    
                    const modalCb = document.querySelector(`#ntcInstituteModal input[name="${name}"][value="${value}"]`);
                    if (modalCb) modalCb.checked = e.target.checked;

                    updateAppliedCount();
                    renderGlobalChips();
                }
            }
        });

        // Footer Buttons
        document.getElementById('ntcApply').onclick = () => {
            handleSalary();
            close();
        };

        document.getElementById('ntcReset').onclick = () => {
            resetAllFilters();
        };

        document.getElementById('ntcClearAll').onclick = () => {
            resetAllFilters();
        };
    }

    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectFilterHTML);
    } else {
        injectFilterHTML();
    }

})();