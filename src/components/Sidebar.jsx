import React from 'react';

export default function Sidebar({ currentView, setCurrentView, currentUser, onPromptLogout, onOpenUpload, docCount }) {
  return (
    <aside className="app-sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          BMS
        </div>
        <div className="sidebar-brand">
          <h2>SIP-PB WH</h2>
          <p>PT BESMINDO MATERI SEWATAMA</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-category">Navigasi Utama</div>

        <button
          type="button"
          className={`nav-link ${currentView === 'dashboard' ? 'active' : ''}`}
          onClick={() => setCurrentView('dashboard')}
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
          </svg>
          <span>Dashboard</span>
        </button>

        <button
          type="button"
          className={`nav-link ${currentView === 'documents' ? 'active' : ''}`}
          onClick={() => setCurrentView('documents')}
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          <span>Data Dokumen PB</span>
          <span className="nav-badge">{docCount}</span>
        </button>

        <button
          type="button"
          className="nav-link"
          onClick={onOpenUpload}
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
          </svg>
          <span>Upload Dokumen PB</span>
        </button>

        <div className="nav-category">Manajemen Warehouse</div>

        <button
          type="button"
          className={`nav-link ${currentView === 'racks' ? 'active' : ''}`}
          onClick={() => setCurrentView('racks')}
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
          </svg>
          <span>Lokasi Rak & Box Arsip</span>
        </button>

        <div className="nav-category">Sesi Akun</div>

        <button
          type="button"
          className="nav-link"
          style={{ color: '#f87171' }}
          onClick={onPromptLogout}
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
          </svg>
          <span>Keluar / Logout</span>
        </button>
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user-card">
          <div className="sidebar-user-avatar">
            {currentUser?.avatar || 'US'}
          </div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">{currentUser?.name || 'Pegawai'}</div>
            <div className="sidebar-user-role">{currentUser?.role || 'Staff Warehouse'}</div>
          </div>
          <button
            type="button"
            className="btn-sidebar-logout"
            onClick={onPromptLogout}
            title="Keluar / Logout dari Sistem"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
}
