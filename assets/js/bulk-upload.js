/* ============================================================
   BULK UPLOAD - EXCEL & PDF
   iTalento ATS - Dashboard
   ============================================================ */


function handleOverlayClick(e, overlayId) {
    if (e.target.id === overlayId) {
        if (overlayId === 'excelModalOverlay') closeExcelModal();
        else closePdfModal();
    }
}

function handleDragOver(e, zoneId) {
    e.preventDefault();
    const zone = document.getElementById(zoneId);
    zone.classList.add('drag-over');
    const overlayId = zoneId === 'excelDropZone' ? 'excelDragOverlay' : 'pdfDragOverlay';
    document.getElementById(overlayId).classList.add('visible');
}

function handleDragLeave(zoneId) {
    const zone = document.getElementById(zoneId);
    zone.classList.remove('drag-over');
    const overlayId = zoneId === 'excelDropZone' ? 'excelDragOverlay' : 'pdfDragOverlay';
    document.getElementById(overlayId).classList.remove('visible');
}

function formatBytes(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
}

// ─────────────────────────────────────────────────────────────
//  EXCEL UPLOAD
// ─────────────────────────────────────────────────────────────

let excelFile = null;

const ITALENTO_FIELDS = [
    'Select', 'First Name', 'Last Name', 'Email', 'Phone',
    'Job Title', 'Department', 'Skills', 'Experience (Years)',
    'Current Company', 'Location', 'Salary Expectation',
    'Notice Period', 'LinkedIn URL', 'Source', 'Notes'
];

// Simulated file columns (in real app, parsed from XLSX)
const MOCK_FILE_COLUMNS = [
    { col: 'first_name',   match: 'First Name' },
    { col: 'last_name',    match: 'Last Name' },
    { col: 'email',        match: 'Email' },
    { col: 'phone',        match: 'Phone' },
    { col: 'position',     match: 'Job Title' },
    { col: 'department',   match: 'Department' },
    { col: 'skills',       match: 'Skills' },
    { col: 'experience',   match: 'Experience (Years)' },
    { col: 'company',      match: 'Current Company' },
    { col: 'city',         match: 'Location' },
    { col: 'expected_ctc', match: 'Salary Expectation' },
    { col: 'notice',       match: 'Notice Period' },
];

function openExcelModal() {
    document.getElementById('excelModalOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
    resetExcelModal();
}

function closeExcelModal() {
    document.getElementById('excelModalOverlay').classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(resetExcelModal, 400);
}

function resetExcelModal() {
    excelFile = null;
    document.getElementById('excelFileInput').value = '';
    const zone = document.getElementById('excelDropZone');
    const existingInfo = zone.querySelector('.selected-file-info');
    if (existingInfo) existingInfo.remove();
    zone.querySelector('.upload-zone-content').style.display = '';

    document.getElementById('excelNextBtn').disabled = true;
    showExcelStep(1);

    // Reset steps
    ['excelStep1Ind', 'excelStep2Ind', 'excelStep3Ind'].forEach((id, i) => {
        const el = document.getElementById(id);
        el.classList.remove('active', 'completed');
        if (i === 0) el.classList.add('active');
    });
    ['excelStepLine', 'excelStepLine2'].forEach(id => {
        document.getElementById(id).classList.remove('active');
    });

    // Reset step 3
    document.getElementById('excelProcessingView').style.display = '';
    document.getElementById('excelSuccessView').style.display = 'none';
    document.getElementById('excelProgressBar').style.width = '0%';
    document.getElementById('excelProgressText').textContent = '0%';
}

function showExcelStep(n) {
    document.getElementById('excelStep1').style.display = n === 1 ? '' : 'none';
    document.getElementById('excelStep2').style.display = n === 2 ? '' : 'none';
    document.getElementById('excelStep3').style.display = n === 3 ? '' : 'none';
}

function handleExcelDrop(e) {
    e.preventDefault();
    handleDragLeave('excelDropZone');
    const file = e.dataTransfer.files[0];
    if (file) handleExcelFile(file);
}

function handleExcelFile(file) {
    if (!file) return;
    const ext = file.name.split('.').pop().toLowerCase();
    if (!['xlsx', 'xls'].includes(ext)) {
        showToast('Only .xlsx or .xls files are allowed.', 'error');
        return;
    }
    excelFile = file;
    const zone = document.getElementById('excelDropZone');
    zone.querySelector('.upload-zone-content').style.display = 'none';
    const existing = zone.querySelector('.selected-file-info');
    if (existing) existing.remove();

    const info = document.createElement('div');
    info.className = 'selected-file-info';
    info.innerHTML = `
        <div class="selected-file-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9l6 6M15 9l-6 6"/>
            </svg>
        </div>
        <div style="flex:1;min-width:0;">
            <div class="selected-file-name">${file.name}</div>
            <div class="selected-file-size">${formatBytes(file.size)}</div>
        </div>
        <button class="selected-file-remove" onclick="removeExcelFile()" title="Remove file">✕</button>
    `;
    zone.appendChild(info);
    document.getElementById('excelNextBtn').disabled = false;
}

function removeExcelFile() {
    excelFile = null;
    document.getElementById('excelFileInput').value = '';
    const zone = document.getElementById('excelDropZone');
    const info = zone.querySelector('.selected-file-info');
    if (info) info.remove();
    zone.querySelector('.upload-zone-content').style.display = '';
    document.getElementById('excelNextBtn').disabled = true;
}

function excelGoToStep2() {
    if (!excelFile) return;
    showExcelStep(2);
    // Update step indicator
    document.getElementById('excelStep1Ind').classList.remove('active');
    document.getElementById('excelStep1Ind').classList.add('completed');
    document.getElementById('excelStepLine').classList.add('active');
    document.getElementById('excelStep2Ind').classList.add('active');
    buildMappingTable();
}

function excelGoToStep1() {
    showExcelStep(1);
    document.getElementById('excelStep1Ind').classList.add('active');
    document.getElementById('excelStep1Ind').classList.remove('completed');
    document.getElementById('excelStepLine').classList.remove('active');
    document.getElementById('excelStep2Ind').classList.remove('active');
}

function buildMappingTable() {
    const tbody = document.getElementById('mappingTableBody');
    tbody.innerHTML = '';
    MOCK_FILE_COLUMNS.forEach((col, i) => {
        const tr = document.createElement('tr');
        const optionsHtml = ITALENTO_FIELDS.map(f =>
            `<option value="${f}" ${f === col.match ? 'selected' : ''}>${f}</option>`
        ).join('');
        const isAutoMatched = col.match !== 'Select';
        tr.innerHTML = `
            <td>
                <div class="mapping-field-name">
                    ${col.col}
                    ${isAutoMatched ? '<span class="mapping-field-badge">Auto</span>' : ''}
                </div>
            </td>
            <td>
                <select class="field-select">${optionsHtml}</select>
            </td>
            <td class="text-center">
                <input type="checkbox" class="import-checkbox col-import-check" ${isAutoMatched ? 'checked' : ''}>
            </td>
        `;
        tbody.appendChild(tr);
    });
    // Update master checkbox
    document.getElementById('selectAllCols').checked = false;
    document.getElementById('selectAllCols').indeterminate = true;
}

function toggleAllCols(master) {
    document.querySelectorAll('.col-import-check').forEach(cb => {
        cb.checked = master.checked;
    });
}

function excelGoToStep3() {
    showExcelStep(3);
    document.getElementById('excelStep2Ind').classList.remove('active');
    document.getElementById('excelStep2Ind').classList.add('completed');
    document.getElementById('excelStepLine2').classList.add('active');
    document.getElementById('excelStep3Ind').classList.add('active');
    runExcelImport();
}

function runExcelImport() {
    const bar = document.getElementById('excelProgressBar');
    const label = document.getElementById('excelProgressText');
    let pct = 0;
    const interval = setInterval(() => {
        pct += Math.floor(Math.random() * 10) + 4;
        if (pct >= 100) {
            pct = 100;
            clearInterval(interval);
            bar.style.width = '100%';
            label.textContent = '100%';
            setTimeout(showExcelSuccess, 600);
        } else {
            bar.style.width = pct + '%';
            label.textContent = pct + '%';
        }
    }, 200);
}

function showExcelSuccess() {
    document.getElementById('excelProcessingView').style.display = 'none';
    document.getElementById('excelSuccessView').style.display = '';
    const checkedCount = document.querySelectorAll('.col-import-check:checked').length;
    document.getElementById('excelSuccessMsg').textContent =
        `Successfully imported candidates from "${excelFile ? excelFile.name : 'file'}" with ${checkedCount} field(s) mapped.`;
    showToast('Excel import completed successfully!', 'success');
}

// ─────────────────────────────────────────────────────────────
//  PDF UPLOAD
// ─────────────────────────────────────────────────────────────

let pdfFiles = [];
const MAX_PDF_FILES = 10;

function openPdfModal() {
    document.getElementById('pdfModalOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closePdfModal() {
    document.getElementById('pdfModalOverlay').classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(resetPdfModal, 400);
}

function resetPdfModal() {
    pdfFiles = [];
    document.getElementById('pdfFileInput').value = '';
    document.getElementById('pdfFileList').innerHTML = '';
    document.getElementById('pdfEmptyState').style.display = '';
    document.getElementById('pdfFileCount').textContent = '0 / 10 files';
    document.getElementById('pdfSubmitBtn').disabled = true;
    document.getElementById('pdfImportProgress').style.display = 'none';
    document.getElementById('pdfProgressBar').style.width = '0%';
    document.getElementById('pdfProgressText').textContent = '0%';
    document.getElementById('pdfSourceInput').value = '';
}

function handlePdfDrop(e) {
    e.preventDefault();
    handleDragLeave('pdfDropZone');
    handlePdfFiles(e.dataTransfer.files);
}

function handlePdfFiles(fileList) {
    const newFiles = Array.from(fileList).filter(f => f.name.toLowerCase().endsWith('.pdf'));
    const nonPdf = Array.from(fileList).length - newFiles.length;
    if (nonPdf > 0) showToast(`${nonPdf} non-PDF file(s) were ignored.`, 'error');

    const combined = [...pdfFiles, ...newFiles];
    if (combined.length > MAX_PDF_FILES) {
        showToast(`Maximum ${MAX_PDF_FILES} PDF files allowed. Extra files ignored.`, 'error');
        pdfFiles = combined.slice(0, MAX_PDF_FILES);
    } else {
        pdfFiles = combined;
    }
    renderPdfList();
}

function renderPdfList() {
    const list = document.getElementById('pdfFileList');
    const empty = document.getElementById('pdfEmptyState');
    const countEl = document.getElementById('pdfFileCount');
    const submitBtn = document.getElementById('pdfSubmitBtn');

    list.innerHTML = '';
    if (pdfFiles.length === 0) {
        empty.style.display = '';
        countEl.textContent = '0 / 10 files';
        submitBtn.disabled = true;
        return;
    }

    empty.style.display = 'none';
    countEl.textContent = `${pdfFiles.length} / ${MAX_PDF_FILES} files`;
    submitBtn.disabled = false;

    pdfFiles.forEach((file, idx) => {
        const row = document.createElement('div');
        row.className = 'pdf-file-row';
        row.id = `pdfRow_${idx}`;
        row.innerHTML = `
            <span class="pdf-row-num">${idx + 1}</span>
            <div class="pdf-row-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                </svg>
            </div>
            <span class="pdf-row-name" title="${file.name}">${file.name}</span>
            <span class="pdf-row-size">${formatBytes(file.size)}</span>
            <button class="pdf-row-remove" onclick="removePdfFile(${idx})" title="Remove">✕</button>
        `;
        list.appendChild(row);
    });
}

function removePdfFile(idx) {
    const row = document.getElementById(`pdfRow_${idx}`);
    if (row) {
        row.style.opacity = '0';
        row.style.transform = 'translateX(20px)';
        row.style.transition = 'all 0.25s';
        setTimeout(() => {
            pdfFiles.splice(idx, 1);
            renderPdfList();
        }, 250);
    }
}

function submitPdfImport() {
    if (pdfFiles.length === 0) return;
    const submitBtn = document.getElementById('pdfSubmitBtn');
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation:spin 1s linear infinite"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg> Importing...`;

    const progressWrap = document.getElementById('pdfImportProgress');
    progressWrap.style.display = 'flex';
    const bar = document.getElementById('pdfProgressBar');
    const label = document.getElementById('pdfProgressText');
    let pct = 0;

    const interval = setInterval(() => {
        pct += Math.floor(Math.random() * 12) + 5;
        if (pct >= 100) {
            pct = 100;
            clearInterval(interval);
            bar.style.width = '100%';
            label.textContent = '100%';
            setTimeout(() => {
                showToast(`${pdfFiles.length} PDF resume(s) imported successfully!`, 'success');
                closePdfModal();
            }, 700);
        } else {
            bar.style.width = pct + '%';
            label.textContent = pct + '%';
        }
    }, 180);
}

// ─────────────────────────────────────────────────────────────
//  TOAST NOTIFICATION
// ─────────────────────────────────────────────────────────────

let toastTimeout;
function showToast(message, type = 'success') {
    let toast = document.getElementById('bulkUploadToast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'bulkUploadToast';
        toast.style.cssText = `
            position: fixed;
            bottom: 28px;
            right: 28px;
            z-index: 9999;
            padding: 14px 20px;
            border-radius: 14px;
            font-family: 'Inter', sans-serif;
            font-size: 14px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 10px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.18);
            transform: translateY(20px);
            opacity: 0;
            transition: all 0.35s cubic-bezier(0.34,1.56,0.64,1);
            max-width: 340px;
            pointer-events: none;
        `;
        document.body.appendChild(toast);
    }

    const icons = {
        success: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`,
        error: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`
    };

    const colors = {
        success: { bg: '#f0fdf4', color: '#166534', border: '#bbf7d0' },
        error:   { bg: '#fef2f2', color: '#991b1b', border: '#fecaca' }
    };

    const c = colors[type] || colors.success;
    toast.style.background = c.bg;
    toast.style.color = c.color;
    toast.style.border = `1px solid ${c.border}`;
    toast.innerHTML = `${icons[type] || icons.success} ${message}`;

    clearTimeout(toastTimeout);
    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    });

    toastTimeout = setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
    }, 4000);
}

// ─────────────────────────────────────────────────────────────
//  SOURCE RADIO TOGGLE (Excel)
// ─────────────────────────────────────────────────────────────

document.addEventListener('change', function(e) {
    if (e.target.name === 'excelSource') {
        const sourceInput = document.getElementById('excelSourceInput');
        if (e.target.value === 'manual') {
            sourceInput.style.display = '';
            sourceInput.focus();
        } else {
            sourceInput.style.display = 'none';
        }
    }
});

// Keyboard accessibility - close modals on ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        if (document.getElementById('excelModalOverlay').classList.contains('open')) closeExcelModal();
        if (document.getElementById('pdfModalOverlay').classList.contains('open')) closePdfModal();
    }
});


