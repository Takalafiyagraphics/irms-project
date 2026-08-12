
// ============================================
// IRMS - Incident Response Management System
// Main Application JavaScript
// ============================================

// ============================================
// DATA STORE (localStorage)
// ============================================
const DataStore = {
    init() {
        if (!localStorage.getItem('irms_initialized')) {
            this.seedData();
            localStorage.setItem('irms_initialized', 'true');
        }
    },

    seedData() {
        const sampleIncidents = [
            {
                id: 'INC-001',
                title: 'Unauthorized Login Attempt',
                type: 'Unauthorized Access',
                description: 'Multiple failed login attempts detected on admin portal from IP 192.168.1.45. Account lockout triggered after 5 attempts.',
                severity: 'High',
                status: 'Investigating',
                dateDetected: '2026-08-10',
                timeDetected: '09:15',
                affectedSystem: 'Admin Portal Server',
                affectedDepartment: 'IT Operations',
                sourceOfDetection: 'SIEM Alert',
                reporterName: 'Ahmed Bello',
                reporterEmail: 'ahmed.bello@company.com',
                assignedAnalyst: 'John Doe',
                lastUpdated: '2026-08-11 14:30',
                investigation: {
                    summary: 'Investigating brute force attack pattern on admin portal.',
                    findings: 'Attack originated from external IP range. Used common password list.',
                    iocs: 'IP: 192.168.1.45, User-Agent: Mozilla/5.0 (Custom)',
                    suspiciousIPs: '192.168.1.45, 203.0.113.12',
                    suspiciousDomains: 'malicious-login.example.com',
                    fileHashes: '',
                    affectedDevices: 'Admin Portal Server (WEB-01)',
                    notes: 'Recommended: Implement MFA, IP whitelist for admin access.'
                },
                responseActions: [
                    { action: 'Block IP Address', performedBy: 'John Doe', dateTime: '2026-08-10 09:20', description: 'Blocked IP 192.168.1.45 at firewall level', status: 'Completed' },
                    { action: 'Disable User Account', performedBy: 'John Doe', dateTime: '2026-08-10 09:25', description: 'Temporarily disabled admin account pending investigation', status: 'Completed' }
                ],
                timeline: [
                    { time: '09:15 AM', event: 'Suspicious login detected', type: 'detection' },
                    { time: '09:18 AM', event: 'SIEM alert triggered', type: 'alert' },
                    { time: '09:20 AM', event: 'Incident reported by SOC Analyst', type: 'report' },
                    { time: '09:30 AM', event: 'John Doe assigned as lead analyst', type: 'assign' },
                    { time: '09:45 AM', event: 'Affected IP blocked at firewall', type: 'action' },
                    { time: '10:00 AM', event: 'Investigation started', type: 'investigate' }
                ],
                workflowStage: 1
            },
            {
                id: 'INC-002',
                title: 'Ransomware Detection on Workstation',
                type: 'Ransomware',
                description: 'Ransomware (WannaCry variant) detected on workstation WS-042. Files encrypted with .wncry extension. Machine isolated immediately.',
                severity: 'Critical',
                status: 'Contained',
                dateDetected: '2026-08-09',
                timeDetected: '14:30',
                affectedSystem: 'Workstation WS-042',
                affectedDepartment: 'Finance',
                sourceOfDetection: 'EDR Alert',
                reporterName: 'Sarah Johnson',
                reporterEmail: 'sarah.j@company.com',
                assignedAnalyst: 'Michael Chen',
                lastUpdated: '2026-08-10 08:15',
                investigation: {
                    summary: 'Ransomware outbreak contained. Analyzing infection vector.',
                    findings: 'Phishing email with malicious attachment was the entry point.',
                    iocs: 'File: invoice_august.pdf.exe, Registry: HKLM\\Software\\WannaCry',
                    suspiciousIPs: '185.220.101.33',
                    suspiciousDomains: 'secure-invoice-download.xyz',
                    fileHashes: 'a1b2c3d4e5f6789012345678901234567890abcd',
                    affectedDevices: 'WS-042, Shared Drive FIN-01',
                    notes: 'User clicked phishing link. Backup restoration in progress.'
                },
                responseActions: [
                    { action: 'Isolate Device', performedBy: 'Michael Chen', dateTime: '2026-08-09 14:35', description: 'Network isolation applied to WS-042', status: 'Completed' },
                    { action: 'Block Domain', performedBy: 'Michael Chen', dateTime: '2026-08-09 14:40', description: 'Blocked secure-invoice-download.xyz', status: 'Completed' },
                    { action: 'Restore Backup', performedBy: 'System Admin', dateTime: '2026-08-10 08:00', description: 'Restoring files from backup server', status: 'In Progress' }
                ],
                timeline: [
                    { time: '14:30 PM', event: 'EDR detected ransomware activity', type: 'detection' },
                    { time: '14:32 PM', event: 'Critical alert raised', type: 'alert' },
                    { time: '14:35 PM', event: 'Workstation isolated from network', type: 'action' },
                    { time: '14:40 PM', event: 'Michael Chen assigned', type: 'assign' },
                    { time: '15:00 PM', event: 'Investigation commenced', type: 'investigate' },
                    { time: '16:00 PM', event: 'Threat contained, backup initiated', type: 'contain' }
                ],
                workflowStage: 2
            },
            {
                id: 'INC-003',
                title: 'Phishing Campaign Targeting Employees',
                type: 'Phishing',
                description: 'Mass phishing email campaign targeting all employees. Emails impersonate IT support requesting password reset.',
                severity: 'Medium',
                status: 'Resolved',
                dateDetected: '2026-08-05',
                timeDetected: '11:00',
                affectedSystem: 'Email Gateway',
                affectedDepartment: 'All Departments',
                sourceOfDetection: 'User Report',
                reporterName: 'Fatima Yusuf',
                reporterEmail: 'fatima.y@company.com',
                assignedAnalyst: 'Lisa Wang',
                lastUpdated: '2026-08-07 16:00',
                investigation: {
                    summary: 'Phishing campaign successfully mitigated.',
                    findings: '12 employees reported receiving emails. No credentials compromised.',
                    iocs: 'Sender: it-support@company-support-mail.com',
                    suspiciousIPs: '198.51.100.22',
                    suspiciousDomains: 'company-support-mail.com',
                    fileHashes: '',
                    affectedDevices: 'Email Gateway',
                    notes: 'All reported emails quarantined. Staff awareness email sent.'
                },
                responseActions: [
                    { action: 'Block Domain', performedBy: 'Lisa Wang', dateTime: '2026-08-05 11:15', description: 'Blocked phishing domain at email gateway', status: 'Completed' },
                    { action: 'Reset Password', performedBy: 'Lisa Wang', dateTime: '2026-08-05 11:30', description: 'Forced password reset for 3 users who clicked link', status: 'Completed' },
                    { action: 'Monitor Network', performedBy: 'Lisa Wang', dateTime: '2026-08-05 12:00', description: 'Monitoring for any suspicious activity', status: 'Completed' }
                ],
                timeline: [
                    { time: '11:00 AM', event: 'Phishing emails reported by employees', type: 'detection' },
                    { time: '11:10 AM', event: 'Incident created and assigned to Lisa', type: 'assign' },
                    { time: '11:15 AM', event: 'Phishing domain blocked', type: 'action' },
                    { time: '11:30 AM', event: 'Password resets initiated', type: 'action' },
                    { time: '14:00 PM', event: 'Investigation completed', type: 'investigate' },
                    { time: '16:00 PM', event: 'Incident resolved', type: 'resolve' }
                ],
                workflowStage: 5
            },
            {
                id: 'INC-004',
                title: 'Suspicious Network Traffic from DMZ',
                type: 'Network Attack',
                description: 'Unusual outbound traffic detected from DMZ server to unknown external IP. Potential data exfiltration attempt.',
                severity: 'High',
                status: 'Contained',
                dateDetected: '2026-08-08',
                timeDetected: '03:45',
                affectedSystem: 'DMZ Web Server',
                affectedDepartment: 'IT Operations',
                sourceOfDetection: 'IDS Alert',
                reporterName: 'Network Monitor',
                reporterEmail: 'netmon@company.com',
                assignedAnalyst: 'David Okafor',
                lastUpdated: '2026-08-09 10:00',
                investigation: {
                    summary: 'Potential data exfiltration contained. Forensic analysis ongoing.',
                    findings: 'Compromised web application used as pivot. 2GB data transferred.',
                    iocs: 'External IP: 45.142.212.89, Port: 443 (HTTPS tunnel)',
                    suspiciousIPs: '45.142.212.89',
                    suspiciousDomains: '',
                    fileHashes: '',
                    affectedDevices: 'DMZ-WEB-03',
                    notes: 'Server rebuilt from clean image. Application vulnerability patched.'
                },
                responseActions: [
                    { action: 'Block IP Address', performedBy: 'David Okafor', dateTime: '2026-08-08 03:50', description: 'Blocked 45.142.212.89 at perimeter firewall', status: 'Completed' },
                    { action: 'Isolate Device', performedBy: 'David Okafor', dateTime: '2026-08-08 04:00', description: 'DMZ-WEB-03 isolated from network', status: 'Completed' },
                    { action: 'Patch System', performedBy: 'System Admin', dateTime: '2026-08-09 09:00', description: 'Applied security patch for CVE-2026-1234', status: 'Completed' }
                ],
                timeline: [
                    { time: '03:45 AM', event: 'IDS alert: unusual outbound traffic', type: 'detection' },
                    { time: '03:50 AM', event: 'External IP blocked', type: 'action' },
                    { time: '04:00 AM', event: 'DMZ server isolated', type: 'action' },
                    { time: '08:00 AM', event: 'David Okafor assigned', type: 'assign' },
                    { time: '09:00 AM', event: 'System patched and rebuilt', type: 'action' },
                    { time: '10:00 AM', event: 'Investigation ongoing', type: 'investigate' }
                ],
                workflowStage: 2
            },
            {
                id: 'INC-005',
                title: 'Insider Threat - Data Access Anomaly',
                type: 'Insider Threat',
                description: 'Employee in Finance accessed 500+ customer records outside normal working hours. Pattern indicates potential data theft.',
                severity: 'Critical',
                status: 'Investigating',
                dateDetected: '2026-08-11',
                timeDetected: '22:30',
                affectedSystem: 'Customer Database',
                affectedDepartment: 'Finance',
                sourceOfDetection: 'DLP Alert',
                reporterName: 'DLP System',
                reporterEmail: 'dlp@company.com',
                assignedAnalyst: 'Amara Nwosu',
                lastUpdated: '2026-08-12 09:00',
                investigation: {
                    summary: 'Investigating potential insider data theft. HR and Legal notified.',
                    findings: 'Employee account used to export customer data to USB.',
                    iocs: 'User: finance.user03, USB Device: SanDisk Cruzer',
                    suspiciousIPs: '',
                    suspiciousDomains: '',
                    fileHashes: '',
                    affectedDevices: 'WS-FIN-07',
                    notes: 'Employee suspended pending investigation. Forensic image acquired.'
                },
                responseActions: [
                    { action: 'Disable User Account', performedBy: 'Amara Nwosu', dateTime: '2026-08-11 22:35', description: 'Suspended finance.user03 account', status: 'Completed' },
                    { action: 'Isolate Device', performedBy: 'Amara Nwosu', dateTime: '2026-08-11 22:40', description: 'WS-FIN-07 isolated and imaged', status: 'Completed' }
                ],
                timeline: [
                    { time: '22:30 PM', event: 'DLP alert: mass data access', type: 'detection' },
                    { time: '22:32 PM', event: 'Critical incident created', type: 'alert' },
                    { time: '22:35 PM', event: 'User account suspended', type: 'action' },
                    { time: '22:40 PM', event: 'Workstation isolated', type: 'action' },
                    { time: '09:00 AM', event: 'Amara Nwosu assigned as lead', type: 'assign' },
                    { time: '09:30 AM', event: 'Investigation in progress', type: 'investigate' }
                ],
                workflowStage: 1
            },
            {
                id: 'INC-006',
                title: 'Malware Infection via USB Drive',
                type: 'Malware',
                description: 'Trojan malware detected on workstation after USB drive insertion. Antivirus quarantined 3 files.',
                severity: 'Medium',
                status: 'Eradicated',
                dateDetected: '2026-08-07',
                timeDetected: '10:15',
                affectedSystem: 'Workstation WS-IT-12',
                affectedDepartment: 'IT Support',
                sourceOfDetection: 'Antivirus',
                reporterName: 'Windows Defender',
                reporterEmail: 'av@company.com',
                assignedAnalyst: 'Robert Kim',
                lastUpdated: '2026-08-08 14:00',
                investigation: {
                    summary: 'Malware successfully removed. USB policy review recommended.',
                    findings: 'Trojan.Dropper variant. No lateral movement detected.',
                    iocs: 'File: salary_update_2026.exe, Registry: HKCU\\Run\\SystemUpdate',
                    suspiciousIPs: '',
                    suspiciousDomains: '',
                    fileHashes: 'e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4',
                    affectedDevices: 'WS-IT-12',
                    notes: 'Full system scan completed. USB ports disabled via GPO.'
                },
                responseActions: [
                    { action: 'Remove Malware', performedBy: 'Robert Kim', dateTime: '2026-08-07 10:20', description: 'Antivirus removed 3 infected files', status: 'Completed' },
                    { action: 'Isolate Device', performedBy: 'Robert Kim', dateTime: '2026-08-07 10:25', description: 'Device isolated pending full scan', status: 'Completed' },
                    { action: 'Patch System', performedBy: 'Robert Kim', dateTime: '2026-08-08 14:00', description: 'Updated antivirus definitions', status: 'Completed' }
                ],
                timeline: [
                    { time: '10:15 AM', event: 'Antivirus detected Trojan', type: 'detection' },
                    { time: '10:18 AM', event: 'Files quarantined automatically', type: 'action' },
                    { time: '10:20 AM', event: 'Incident reported', type: 'report' },
                    { time: '10:30 AM', event: 'Robert Kim assigned', type: 'assign' },
                    { time: '11:00 AM', event: 'Full system scan initiated', type: 'investigate' },
                    { time: '14:00 PM', event: 'Malware eradicated, system clean', type: 'eradicate' }
                ],
                workflowStage: 3
            },
            {
                id: 'INC-007',
                title: 'DDoS Attack on Public Website',
                type: 'Denial of Service',
                description: 'Website experiencing 50,000+ requests/second from botnet. Service degraded but not fully down.',
                severity: 'High',
                status: 'Recovering',
                dateDetected: '2026-08-06',
                timeDetected: '16:00',
                affectedSystem: 'Public Website',
                affectedDepartment: 'Marketing',
                sourceOfDetection: 'Monitoring Alert',
                reporterName: 'Uptime Monitor',
                reporterEmail: 'uptime@company.com',
                assignedAnalyst: 'Emily Zhang',
                lastUpdated: '2026-08-07 11:00',
                investigation: {
                    summary: 'DDoS attack mitigated. Service restoration in progress.',
                    findings: 'Layer 7 HTTP flood attack. Botnet of 15,000+ compromised IoT devices.',
                    iocs: 'Attack signature: HTTP GET flood, User-Agent rotation',
                    suspiciousIPs: 'Multiple (15,000+ sources)',
                    suspiciousDomains: '',
                    fileHashes: '',
                    affectedDevices: 'Web Load Balancer, CDN',
                    notes: 'Cloudflare DDoS protection activated. Rate limiting implemented.'
                },
                responseActions: [
                    { action: 'Block IP Address', performedBy: 'Emily Zhang', dateTime: '2026-08-06 16:10', description: 'Activated cloud DDoS mitigation', status: 'Completed' },
                    { action: 'Monitor Network', performedBy: 'Emily Zhang', dateTime: '2026-08-06 16:15', description: 'Monitoring traffic patterns', status: 'Completed' },
                    { action: 'Restore Backup', performedBy: 'Emily Zhang', dateTime: '2026-08-07 10:00', description: 'Restoring normal traffic routing', status: 'In Progress' }
                ],
                timeline: [
                    { time: '16:00 PM', event: 'DDoS attack detected', type: 'detection' },
                    { time: '16:05 PM', event: 'Service degradation alert', type: 'alert' },
                    { time: '16:10 PM', event: 'DDoS mitigation activated', type: 'action' },
                    { time: '16:30 PM', event: 'Emily Zhang assigned', type: 'assign' },
                    { time: '17:00 PM', event: 'Attack volume decreasing', type: 'contain' },
                    { time: '10:00 AM', event: 'Service recovery in progress', type: 'recover' }
                ],
                workflowStage: 4
            },
            {
                id: 'INC-008',
                title: 'Data Breach - Customer Database',
                type: 'Data Breach',
                description: 'Unauthorized access to customer database discovered. 10,000+ customer records potentially accessed.',
                severity: 'Critical',
                status: 'Open',
                dateDetected: '2026-08-12',
                timeDetected: '08:00',
                affectedSystem: 'Customer Database Server',
                affectedDepartment: 'Customer Service',
                sourceOfDetection: 'Database Audit',
                reporterName: 'Database Admin',
                reporterEmail: 'dba@company.com',
                assignedAnalyst: 'Unassigned',
                lastUpdated: '2026-08-12 08:30',
                investigation: { summary: '', findings: '', iocs: '', suspiciousIPs: '', suspiciousDomains: '', fileHashes: '', affectedDevices: '', notes: '' },
                responseActions: [],
                timeline: [
                    { time: '08:00 AM', event: 'Database audit revealed unauthorized access', type: 'detection' },
                    { time: '08:15 AM', event: 'Critical incident created', type: 'alert' },
                    { time: '08:30 AM', event: 'Awaiting analyst assignment', type: 'assign' }
                ],
                workflowStage: 0
            }
        ];

        const sampleTeam = [
            { id: 1, name: 'John Doe', role: 'SOC Analyst', email: 'john.doe@company.com', status: 'Active', assignedIncidents: 1 },
            { id: 2, name: 'Michael Chen', role: 'Incident Response Manager', email: 'michael.chen@company.com', status: 'Active', assignedIncidents: 1 },
            { id: 3, name: 'Lisa Wang', role: 'SOC Analyst', email: 'lisa.wang@company.com', status: 'Active', assignedIncidents: 1 },
            { id: 4, name: 'David Okafor', role: 'Security Administrator', email: 'david.okafor@company.com', status: 'Active', assignedIncidents: 1 },
            { id: 5, name: 'Amara Nwosu', role: 'Incident Response Manager', email: 'amara.nwosu@company.com', status: 'Active', assignedIncidents: 1 },
            { id: 6, name: 'Robert Kim', role: 'Network Administrator', email: 'robert.kim@company.com', status: 'Active', assignedIncidents: 1 },
            { id: 7, name: 'Emily Zhang', role: 'System Administrator', email: 'emily.zhang@company.com', status: 'Active', assignedIncidents: 1 },
            { id: 8, name: 'Sarah Johnson', role: 'SOC Analyst', email: 'sarah.johnson@company.com', status: 'Away', assignedIncidents: 0 }
        ];

        const notifications = [
            { id: 1, title: 'Critical Incident', message: 'INC-005 requires immediate attention - Insider threat detected.', type: 'critical', time: '2 hours ago', read: false },
            { id: 2, title: 'Incident Assigned', message: 'INC-004 has been assigned to David Okafor.', type: 'info', time: '5 hours ago', read: false },
            { id: 3, title: 'Incident Resolved', message: 'INC-003 has been resolved by Lisa Wang.', type: 'success', time: '1 day ago', read: true },
            { id: 4, title: 'New Incident', message: 'INC-008 Data Breach reported and awaiting assignment.', type: 'warning', time: '30 minutes ago', read: false }
        ];

        localStorage.setItem('irms_incidents', JSON.stringify(sampleIncidents));
        localStorage.setItem('irms_team', JSON.stringify(sampleTeam));
        localStorage.setItem('irms_notifications', JSON.stringify(notifications));
        localStorage.setItem('irms_user', JSON.stringify({ name: 'Admin User', email: 'admin@irms.local', role: 'Security Administrator' }));
        localStorage.setItem('irms_next_id', '9');
    },

    getIncidents() { return JSON.parse(localStorage.getItem('irms_incidents') || '[]'); },
    saveIncidents(incidents) { localStorage.setItem('irms_incidents', JSON.stringify(incidents)); },
    getIncident(id) { return this.getIncidents().find(i => i.id === id); },
    addIncident(incident) { const incidents = this.getIncidents(); incidents.unshift(incident); this.saveIncidents(incidents); },
    updateIncident(id, updates) {
        const incidents = this.getIncidents();
        const index = incidents.findIndex(i => i.id === id);
        if (index !== -1) { incidents[index] = { ...incidents[index], ...updates, lastUpdated: new Date().toISOString().slice(0, 16).replace('T', ' ') }; this.saveIncidents(incidents); return incidents[index]; }
        return null;
    },
    deleteIncident(id) { this.saveIncidents(this.getIncidents().filter(i => i.id !== id)); },
    getTeam() { return JSON.parse(localStorage.getItem('irms_team') || '[]'); },
    saveTeam(team) { localStorage.setItem('irms_team', JSON.stringify(team)); },
    getNotifications() { return JSON.parse(localStorage.getItem('irms_notifications') || '[]'); },
    saveNotifications(notifications) { localStorage.setItem('irms_notifications', JSON.stringify(notifications)); },
    addNotification(notification) { const n = this.getNotifications(); n.unshift(notification); this.saveNotifications(n); },
    getNextId() { let nextId = parseInt(localStorage.getItem('irms_next_id') || '1'); localStorage.setItem('irms_next_id', (nextId + 1).toString()); return nextId; },
    getUser() { return JSON.parse(localStorage.getItem('irms_user') || '{}'); }
};

// ============================================
// AUTH
// ============================================
const Auth = {
    isLoggedIn() { return localStorage.getItem('irms_logged_in') === 'true'; },
    login(username, password) { if (username === 'admin' && password === 'admin123') { localStorage.setItem('irms_logged_in', 'true'); return true; } return false; },
    logout() { localStorage.removeItem('irms_logged_in'); window.location.href = 'index.html'; },
    checkAuth() { if (!this.isLoggedIn() && !window.location.href.includes('index.html')) { window.location.href = 'index.html'; } }
};

// ============================================
// UI HELPERS
// ============================================
const UI = {
    toast(message, type = 'info', duration = 4000) {
        const container = document.querySelector('.toast-container') || (() => { const c = document.createElement('div'); c.className = 'toast-container'; document.body.appendChild(c); return c; })();
        const icons = { success: '✓', error: '✕', warning: '⚠', info: 'ℹ' };
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `<span class="toast-icon">${icons[type]}</span><div class="toast-content"><h4>${type.charAt(0).toUpperCase() + type.slice(1)}</h4><p>${message}</p></div><button class="toast-close" onclick="this.parentElement.remove()">&times;</button>`;
        container.appendChild(toast);
        setTimeout(() => toast.remove(), duration);
    },
    confirm(message, callback) { if (confirm(message)) callback(); },
    getSeverityClass(severity) { const map = { 'Low': 'badge-severity-low', 'Medium': 'badge-severity-medium', 'High': 'badge-severity-high', 'Critical': 'badge-severity-critical' }; return map[severity] || 'badge-severity-low'; },
    getStatusClass(status) { const map = { 'Open': 'badge-status-open', 'Investigating': 'badge-status-investigating', 'Contained': 'badge-status-contained', 'Eradicated': 'badge-status-eradicated', 'Recovering': 'badge-status-recovering', 'Resolved': 'badge-status-resolved', 'Closed': 'badge-status-closed' }; return map[status] || 'badge-status-open'; },
    generateIncidentId() { return `INC-${String(DataStore.getNextId()).padStart(3, '0')}`; }
};

// ============================================
// SIDEBAR & NAVIGATION
// ============================================
function initSidebar() {
    const sidebarHTML = `<aside class="sidebar" id="sidebar">
        <div class="sidebar-header">
            <span class="logo-icon">🛡️</span>
            <div><h2>IRMS</h2><span>Incident Response</span></div>
        </div>
        <nav class="sidebar-nav">
            <div class="nav-section">
                <div class="nav-section-title">Main</div>
                <a href="dashboard.html" class="nav-item" data-page="dashboard"><span class="nav-icon">📊</span> Dashboard</a>
                <a href="incidents.html" class="nav-item" data-page="incidents"><span class="nav-icon">📋</span> Incidents <span class="nav-badge" id="open-count">0</span></a>
                <a href="report-incident.html" class="nav-item" data-page="report"><span class="nav-icon">➕</span> Report Incident</a>
            </div>
            <div class="nav-section">
                <div class="nav-section-title">Operations</div>
                <a href="investigation.html" class="nav-item" data-page="investigation"><span class="nav-icon">🔍</span> Investigation</a>
                <a href="response-actions.html" class="nav-item" data-page="response"><span class="nav-icon">⚡</span> Response Actions</a>
                <a href="timeline.html" class="nav-item" data-page="timeline"><span class="nav-icon">📅</span> Timeline</a>
            </div>
            <div class="nav-section">
                <div class="nav-section-title">Management</div>
                <a href="reports.html" class="nav-item" data-page="reports"><span class="nav-icon">📈</span> Reports</a>
                <a href="team.html" class="nav-item" data-page="team"><span class="nav-icon">👥</span> Team</a>
                <a href="settings.html" class="nav-item" data-page="settings"><span class="nav-icon">⚙️</span> Settings</a>
            </div>
        </nav>
        <div class="sidebar-footer">
            <div class="user-profile">
                <div class="user-avatar">A</div>
                <div class="user-info"><h4 id="user-name">Admin</h4><p id="user-role">Security Admin</p></div>
            </div>
            <button class="nav-item" onclick="Auth.logout()" style="margin-top:12px;color:var(--accent-red)"><span class="nav-icon">🚪</span> Logout</button>
        </div>
    </aside>`;

    const topHeaderHTML = `<header class="top-header">
        <div class="header-left">
            <button class="menu-toggle" id="menuToggle">☰</button>
            <div><h1 class="page-title" id="pageTitle">Dashboard</h1><div class="breadcrumb" id="breadcrumb"><a href="dashboard.html">Home</a><span>/</span><span>Dashboard</span></div></div>
        </div>
        <div class="header-right">
            <button class="header-btn" id="notificationBtn" onclick="toggleNotifications()"><span>🔔</span><span class="notification-count" id="notif-count">0</span></button>
            <div class="notification-panel" id="notificationPanel">
                <div class="notification-panel-header"><h4>Notifications</h4><button class="btn btn-sm btn-secondary" onclick="markAllRead()">Mark All Read</button></div>
                <div id="notificationList"></div>
            </div>
        </div>
    </header>`;

    const container = document.querySelector('.app-container');
    if (container) { const temp = document.createElement('div'); temp.innerHTML = sidebarHTML; container.insertBefore(temp.firstElementChild, container.firstChild); }
    const mainContent = document.querySelector('.main-content');
    if (mainContent) { const temp = document.createElement('div'); temp.innerHTML = topHeaderHTML; mainContent.insertBefore(temp.firstElementChild, mainContent.firstChild); }

    const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'dashboard';
    document.querySelectorAll('.nav-item').forEach(item => { const page = item.getAttribute('data-page'); if (page && currentPage.includes(page)) item.classList.add('active'); });

    const menuToggle = document.getElementById('menuToggle');
    if (menuToggle) menuToggle.addEventListener('click', () => document.getElementById('sidebar').classList.toggle('active'));

    updateNotificationCount();
    const user = DataStore.getUser();
    const userNameEl = document.getElementById('user-name');
    const userRoleEl = document.getElementById('user-role');
    const userAvatar = document.querySelector('.user-avatar');
    if (userNameEl) userNameEl.textContent = user.name || 'Admin';
    if (userRoleEl) userRoleEl.textContent = user.role || 'Security Admin';
    if (userAvatar) userAvatar.textContent = (user.name || 'Admin').charAt(0);
}

function toggleNotifications() { const panel = document.getElementById('notificationPanel'); panel.classList.toggle('active'); if (panel.classList.contains('active')) renderNotifications(); }
function renderNotifications() {
    const list = document.getElementById('notificationList');
    const notifications = DataStore.getNotifications();
    if (!list) return;
    if (notifications.length === 0) { list.innerHTML = '<div style="padding:20px;text-align:center;color:var(--text-muted)">No notifications</div>'; return; }
    list.innerHTML = notifications.map(n => `<div class="notification-item ${n.read ? '' : 'unread'}" onclick="markNotificationRead(${n.id})" style="${n.read ? '' : 'border-left:3px solid var(--accent-cyan)'};padding:12px 20px;border-bottom:1px solid var(--border-color);display:flex;gap:12px;cursor:pointer;" onmouseover="this.style.background='var(--bg-hover)'" onmouseout="this.style.background=''"><div class="notification-item-icon ${n.type}" style="width:36px;height:36px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;background:${n.type === 'critical' ? 'rgba(239,68,68,0.15)' : n.type === 'warning' ? 'rgba(234,179,8,0.15)' : n.type === 'success' ? 'rgba(16,185,129,0.15)' : 'rgba(6,182,212,0.15)'};color:${n.type === 'critical' ? 'var(--accent-red)' : n.type === 'warning' ? 'var(--accent-yellow)' : n.type === 'success' ? 'var(--accent-green)' : 'var(--accent-cyan)'}">${n.type === 'critical' ? '🔴' : n.type === 'warning' ? '⚠️' : n.type === 'success' ? '✅' : 'ℹ️'}</div><div class="notification-item-content"><h5 style="font-size:13px;font-weight:600;color:var(--text-primary);margin-bottom:2px">${n.title}</h5><p style="font-size:12px;color:var(--text-secondary)">${n.message}</p></div><span class="notification-item-time" style="font-size:11px;color:var(--text-muted);white-space:nowrap">${n.time}</span></div>`).join('');
}
function updateNotificationCount() { const notifications = DataStore.getNotifications(); const unread = notifications.filter(n => !n.read).length; const countEl = document.getElementById('notif-count'); if (countEl) { countEl.textContent = unread; countEl.style.display = unread > 0 ? 'block' : 'none'; } }
function markNotificationRead(id) { const notifications = DataStore.getNotifications(); const n = notifications.find(x => x.id === id); if (n) { n.read = true; DataStore.saveNotifications(notifications); renderNotifications(); updateNotificationCount(); } }
function markAllRead() { const notifications = DataStore.getNotifications(); notifications.forEach(n => n.read = true); DataStore.saveNotifications(notifications); renderNotifications(); updateNotificationCount(); }

document.addEventListener('click', (e) => { const panel = document.getElementById('notificationPanel'); const btn = document.getElementById('notificationBtn'); if (panel && btn && !panel.contains(e.target) && !btn.contains(e.target)) panel.classList.remove('active'); });

// ============================================
// CHARTS (Canvas-based)
// ============================================
const Charts = {
    drawBarChart(canvasId, labels, data, colors) {
        const canvas = document.getElementById(canvasId); if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const width = canvas.width = canvas.offsetWidth; const height = canvas.height = canvas.offsetHeight;
        const padding = 40; const chartWidth = width - padding * 2; const chartHeight = height - padding * 2;
        const maxVal = Math.max(...data, 1); const barWidth = chartWidth / data.length * 0.6; const spacing = chartWidth / data.length;
        ctx.clearRect(0, 0, width, height);
        data.forEach((val, i) => {
            const barHeight = (val / maxVal) * chartHeight;
            const x = padding + i * spacing + (spacing - barWidth) / 2;
            const y = height - padding - barHeight;
            const gradient = ctx.createLinearGradient(0, y, 0, height - padding);
            gradient.addColorStop(0, colors[i] || '#06b6d4'); gradient.addColorStop(1, (colors[i] || '#06b6d4') + '40');
            ctx.fillStyle = gradient;
            ctx.beginPath(); ctx.moveTo(x, y + 4); ctx.lineTo(x, y); ctx.quadraticCurveTo(x, y, x + 4, y); ctx.lineTo(x + barWidth - 4, y); ctx.quadraticCurveTo(x + barWidth, y, x + barWidth, y + 4); ctx.lineTo(x + barWidth, y + barHeight); ctx.lineTo(x, y + barHeight); ctx.closePath(); ctx.fill();
            ctx.fillStyle = '#e2e8f0'; ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'center'; ctx.fillText(val, x + barWidth / 2, y - 8);
            ctx.fillStyle = '#94a3b8'; ctx.font = '11px sans-serif'; ctx.fillText(labels[i], x + barWidth / 2, height - padding + 18);
        });
    },
    drawDoughnutChart(canvasId, labels, data, colors) {
        const canvas = document.getElementById(canvasId); if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const width = canvas.width = canvas.offsetWidth; const height = canvas.height = canvas.offsetHeight;
        const centerX = width / 2; const centerY = height / 2; const radius = Math.min(width, height) / 2 - 30; const total = data.reduce((a, b) => a + b, 0);
        ctx.clearRect(0, 0, width, height);
        let startAngle = -Math.PI / 2;
        data.forEach((val, i) => {
            const sliceAngle = (val / total) * 2 * Math.PI; const endAngle = startAngle + sliceAngle;
            ctx.beginPath(); ctx.moveTo(centerX, centerY); ctx.arc(centerX, centerY, radius, startAngle, endAngle); ctx.closePath(); ctx.fillStyle = colors[i]; ctx.fill();
            const midAngle = startAngle + sliceAngle / 2; const labelRadius = radius + 20;
            ctx.fillStyle = '#94a3b8'; ctx.font = '11px sans-serif'; ctx.textAlign = 'center'; ctx.fillText(`${labels[i]}: ${val}`, centerX + Math.cos(midAngle) * labelRadius, centerY + Math.sin(midAngle) * labelRadius);
            startAngle = endAngle;
        });
        ctx.beginPath(); ctx.arc(centerX, centerY, radius * 0.5, 0, 2 * Math.PI); ctx.fillStyle = '#111827'; ctx.fill();
        ctx.fillStyle = '#e2e8f0'; ctx.font = 'bold 18px sans-serif'; ctx.textAlign = 'center'; ctx.fillText(total, centerX, centerY - 5);
        ctx.fillStyle = '#64748b'; ctx.font = '11px sans-serif'; ctx.fillText('Total', centerX, centerY + 12);
    },
    drawLineChart(canvasId, labels, data, color) {
        const canvas = document.getElementById(canvasId); if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const width = canvas.width = canvas.offsetWidth; const height = canvas.height = canvas.offsetHeight;
        const padding = 40; const chartWidth = width - padding * 2; const chartHeight = height - padding * 2; const maxVal = Math.max(...data, 1);
        ctx.clearRect(0, 0, width, height);
        ctx.strokeStyle = '#1e293b'; ctx.lineWidth = 1;
        for (let i = 0; i <= 4; i++) { const y = padding + (chartHeight / 4) * i; ctx.beginPath(); ctx.moveTo(padding, y); ctx.lineTo(width - padding, y); ctx.stroke(); }
        ctx.strokeStyle = color; ctx.lineWidth = 3; ctx.beginPath();
        data.forEach((val, i) => { const x = padding + (i / (data.length - 1)) * chartWidth; const y = padding + chartHeight - (val / maxVal) * chartHeight; if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); });
        ctx.stroke();
        ctx.fillStyle = color + '20'; ctx.beginPath();
        data.forEach((val, i) => { const x = padding + (i / (data.length - 1)) * chartWidth; const y = padding + chartHeight - (val / maxVal) * chartHeight; if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); });
        ctx.lineTo(width - padding, height - padding); ctx.lineTo(padding, height - padding); ctx.closePath(); ctx.fill();
        data.forEach((val, i) => { const x = padding + (i / (data.length - 1)) * chartWidth; const y = padding + chartHeight - (val / maxVal) * chartHeight; ctx.beginPath(); ctx.arc(x, y, 5, 0, 2 * Math.PI); ctx.fillStyle = color; ctx.fill(); ctx.strokeStyle = '#111827'; ctx.lineWidth = 2; ctx.stroke(); ctx.fillStyle = '#e2e8f0'; ctx.font = 'bold 11px sans-serif'; ctx.textAlign = 'center'; ctx.fillText(val, x, y - 10); });
        ctx.fillStyle = '#94a3b8'; ctx.font = '10px sans-serif'; labels.forEach((label, i) => { const x = padding + (i / (labels.length - 1)) * chartWidth; ctx.textAlign = 'center'; ctx.fillText(label, x, height - padding + 18); });
    }
};

// ============================================
// STATISTICS
// ============================================
function getStats() {
    const incidents = DataStore.getIncidents();
    return {
        total: incidents.length,
        open: incidents.filter(i => i.status === 'Open').length,
        investigating: incidents.filter(i => i.status === 'Investigating').length,
        critical: incidents.filter(i => i.severity === 'Critical').length,
        resolved: incidents.filter(i => i.status === 'Resolved' || i.status === 'Closed').length,
        contained: incidents.filter(i => i.status === 'Contained').length,
        avgResponseTime: '2h 15m'
    };
}

function updateStatsDisplay() {
    const stats = getStats();
    const els = { 'stat-total': stats.total, 'stat-open': stats.open, 'stat-investigating': stats.investigating, 'stat-critical': stats.critical, 'stat-resolved': stats.resolved, 'stat-avg-time': stats.avgResponseTime };
    Object.entries(els).forEach(([id, val]) => { const el = document.getElementById(id); if (el) el.textContent = val; });
    const openCount = document.getElementById('open-count');
    if (openCount) openCount.textContent = stats.open + stats.investigating;
}

// ============================================
// EXPORT
// ============================================
function exportToCSV(data, filename) {
    if (!data || data.length === 0) { UI.toast('No data to export', 'warning'); return; }
    const headers = Object.keys(data[0]);
    const csvContent = [headers.join(','), ...data.map(row => headers.map(h => { const val = row[h]; if (typeof val === 'string' && val.includes(',')) return `"${val}"`; return val !== undefined && val !== null ? val : ''; }).join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = filename; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
    UI.toast('CSV exported successfully!', 'success');
}

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    DataStore.init();
    if (!window.location.href.includes('index.html')) {
        Auth.checkAuth();
        initSidebar();
    }
});
