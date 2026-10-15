import React from 'react';

export default function Navbar({ currentView, onOpenUpload, onToggleMobileSidebar, currentUser, onPromptLogout }) {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const todayStr = new Date().toLocaleDateString('id-ID', options);

  const getBreadcrumbTitle = () => {
    switch (currentView) {
      case 'dashboard': return 'Dashboard Ringkasan';
      case 'documents': return 'Data Dokumen PB';
      case 'racks': return 'Manajemen Lokasi Rak & Arsip';
      default: return 'Sistem Warehouse';
    }
  };

  const getPageHeading = () => {
    switch (currentView) {
      case 'dashboard': return 'Dashboard Warehouse & Pengarsipan PB';
      case 'documents': return 'Daftar Dokumen Permintaan Barang (PB)';
      case 'racks': return 'Tata Letak Rak & Box Arsip Fisik';
      default: return 'Warehouse PT Besmindo Materi Sewatama';
    }
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          type="button"
          className="btn-secondary"
          style={{ display: 'none', padding: '6px 10px' }}
          id="btn-mobile-toggle"
          onClick={onToggleMobileSidebar}
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>

        <div>
          <div className="topbar-breadcrumb">
            <span>SIP-PB</span>
            <span>/</span>
            <span>Warehouse</span>
            <span>/</span>
            <span className="active-crumb">{getBreadcrumbTitle()}</span>
          </div>
          <h1 className="topbar-heading">{getPageHeading()}</h1>
        </div>
      </div>

      <div className="topbar-right">
        {/* Date & Shift Badge */}
        <div className="warehouse-shift-badge">
          <span className="pulse-dot"></span>
          <span>{todayStr}</span>
        </div>

        {/* Upload Action Button */}
        <button
          type="button"
          className="btn-topbar-upload"
          onClick={onOpenUpload}
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
          </svg>
          <span>Upload PB</span>
        </button>

        {/* Dedicated Navbar Logout Button */}
        <button
          type="button"
          className="btn-secondary"
          onClick={onPromptLogout}
          title="Keluar dari Akun"
          style={{
            borderColor: '#fca5a5',
            color: '#dc2626',
            background: '#fef2f2',
            padding: '8px 14px',
            fontSize: '0.82rem',
            fontWeight: 700
          }}
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
          </svg>
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}
