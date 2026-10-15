import React from 'react';
import { RAK_LIST } from '../data/initialData';

export default function Dashboard({ documents, onNavigateToDocs, onOpenUpload }) {
  const totalCount = documents.length;
  const verifiedCount = documents.filter((d) => d.status.includes('Terverifikasi') || d.status.includes('Selesai')).length;
  const pendingPhysicalCount = documents.filter((d) => d.status.includes('Menunggu')).length;
  const borrowedCount = documents.filter((d) => d.status.includes('Dipinjam')).length;

  const recentDocs = [...documents].reverse().slice(0, 5);

  return (
    <div>
      {/* Hero Banner */}
      <div className="dash-hero-banner">
        <div className="dash-hero-text">
          <h1>Pusat Pengarsipan PB Warehouse</h1>
          <p>
            Kelola pencarian, penyimpanan fisik, dan verifikasi dokumen Permintaan Barang (PB) antar departemen operasional PT Besmindo Materi Sewatama secara terpusat, cepat, dan akurat.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="button"
            className="btn-hero-action"
            onClick={onNavigateToDocs}
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <span>Cari Dokumen PB</span>
          </button>
          <button
            type="button"
            className="btn-hero-action"
            style={{ background: '#0284c7', color: '#ffffff' }}
            onClick={onOpenUpload}
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            <span>Upload Arsip Baru</span>
          </button>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div>
            <div className="metric-label">Total Dokumen PB</div>
            <div className="metric-value">{totalCount}</div>
            <div className="metric-desc" style={{ color: '#0284c7' }}>
              <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              Tercatat di Database
            </div>
          </div>
          <div className="metric-icon-box metric-blue">
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          </div>
        </div>

        <div className="metric-card">
          <div>
            <div className="metric-label">Terverifikasi & Arsip Fisik</div>
            <div className="metric-value">{verifiedCount}</div>
            <div className="metric-desc" style={{ color: '#059669' }}>
              <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              Lengkap di Rak Gudang
            </div>
          </div>
          <div className="metric-icon-box metric-green">
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
        </div>

        <div className="metric-card">
          <div>
            <div className="metric-label">Menunggu Arsip Fisik</div>
            <div className="metric-value">{pendingPhysicalCount}</div>
            <div className="metric-desc" style={{ color: '#d97706' }}>
              <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              Menunggu Berkas Asli
            </div>
          </div>
          <div className="metric-icon-box metric-amber">
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
        </div>

        <div className="metric-card">
          <div>
            <div className="metric-label">Dokumen Dipinjam</div>
            <div className="metric-value">{borrowedCount}</div>
            <div className="metric-desc" style={{ color: '#dc2626' }}>
              <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              Audit / Peminjaman Internal
            </div>
          </div>
          <div className="metric-icon-box metric-red">
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
            </svg>
          </div>
        </div>
      </div>

      {/* 2-Columns Grid Panel */}
      <div className="dash-columns-2">
        {/* Left: Storage Rack Monitoring */}
        <div className="card-widget">
          <div className="widget-header">
            <h3 className="widget-title">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
              </svg>
              Status Kapasitas Rak Arsip Gudang
            </h3>
            <span className="widget-link" onClick={onNavigateToDocs}>Kelola Dokumen &rarr;</span>
          </div>

          <div className="rack-grid">
            {RAK_LIST.map((rak) => (
              <div key={rak.kode} className="rack-card">
                <div className="rack-card-title">
                  <span>{rak.kode}</span>
                  <span style={{ color: 'var(--bms-blue-600)' }}>{rak.kapasitas}</span>
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                  {rak.nama}
                </div>
                <div className="rack-progress-bar">
                  <div
                    className="rack-progress-fill"
                    style={{ width: rak.kapasitas }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '8px', fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20" style={{ color: '#0284c7' }}>
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
            </svg>
            <span>Setiap dokumen PB yang diunggah harus diberi label kode box dan disimpan ke rak fisik yang sesuai.</span>
          </div>
        </div>

        {/* Right: Recent Upload & Activity Feed */}
        <div className="card-widget">
          <div className="widget-header">
            <h3 className="widget-title">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Dokumen PB Masuk Terkini
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {recentDocs.map((doc) => (
              <div
                key={doc.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  paddingBottom: '12px',
                  borderBottom: '1px solid var(--border-subtle)'
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: '#eff6ff',
                    color: '#0284c7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '0.82rem', color: '#0369a1' }}>
                      {doc.nomorPb}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-light)' }}>
                      {doc.uploadedAt}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-main)', fontWeight: 600, marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {doc.namaPemohon} &bull; {doc.bagian}
                  </div>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '4px', alignItems: 'center' }}>
                    <span className="rak-location-badge">{doc.lokasiRak} - {doc.nomorBox}</span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{doc.dokumen}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
