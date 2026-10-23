import React from 'react';
import besmindoLogo from '../assets/besmindo-logo.jpg';

export default function Sidebar({ currentView, setCurrentView, currentUser, onPromptLogout, onLogout, onOpenUpload, onUpdateUserName, docCount }) {
  const handleLogoutClick = onPromptLogout || onLogout;

  const handleEditName = () => {
    if (onUpdateUserName) {
      const newName = prompt('Ganti nama profil Anda (misal: Dayat atau nama Anda sendiri):', currentUser?.name || '');
      if (newName && newName.trim()) {
        onUpdateUserName(newName.trim());
      }
    }
  };

  return (
    <aside className="app-sidebar">
      <div
        className="sidebar-header"
        onClick={() => setCurrentView('dashboard')}
        style={{ cursor: 'pointer', transition: 'background 0.2s' }}
        title="Kembali ke Dashboard Ringkasan"
      >
        <div
          className="sidebar-logo"
          style={{
            overflow: 'hidden',
            padding: '2px',
            background: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <img
            src={besmindoLogo}
            alt="Logo BMS"
            style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '4px' }}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
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
          onClick={handleLogoutClick}
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
          <div
            className="sidebar-user-info"
            onClick={handleEditName}
            style={{ cursor: 'pointer', overflow: 'hidden' }}
            title="Klik untuk ubah nama profil Anda"
          >
            <div className="sidebar-user-name" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {currentUser?.name || 'Pegawai'}
              </span>
              <svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ opacity: 0.6, flexShrink: 0 }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
              </svg>
            </div>
            <div className="sidebar-user-role">{currentUser?.role || 'Staff Warehouse'}</div>
          </div>
          <button
            type="button"
            className="btn-sidebar-logout"
            onClick={handleLogoutClick}
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
