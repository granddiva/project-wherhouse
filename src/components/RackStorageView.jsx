import React, { useState } from 'react';
import { RAK_LIST } from '../data/initialData';

export default function RackStorageView({ documents, onOpenDetail }) {
  const [selectedRak, setSelectedRak] = useState('Semua');

  const filteredDocs = selectedRak === 'Semua'
    ? documents
    : documents.filter((d) => d.lokasiRak === selectedRak);

  return (
    <div>
      <div className="section-header-box">
        <div className="section-header-text">
          <h2>Tata Letak Lokasi Rak & Box Arsip Fisik</h2>
          <p>Pemetaan penyimpanan map & ordner dokumen PB di ruang arsip warehouse PT Besmindo Materi Sewatama.</p>
        </div>

        <div className="section-actions">
          <button
            type="button"
            className={`btn-secondary ${selectedRak === 'Semua' ? 'active' : ''}`}
            onClick={() => setSelectedRak('Semua')}
          >
            Semua Rak
          </button>
          {RAK_LIST.map((r) => (
            <button
              key={r.kode}
              type="button"
              className={`btn-secondary ${selectedRak === r.kode ? 'active' : ''}`}
              style={selectedRak === r.kode ? { background: '#0284c7', color: '#ffffff', borderColor: '#0284c7' } : {}}
              onClick={() => setSelectedRak(r.kode)}
            >
              {r.kode}
            </button>
          ))}
        </div>
      </div>

      {/* Rack Overview Cards */}
      <div className="rack-grid" style={{ marginBottom: '26px' }}>
        {RAK_LIST.map((rak) => {
          const docsInRak = documents.filter((d) => d.lokasiRak === rak.kode);
          return (
            <div
              key={rak.kode}
              className="rack-card"
              style={{
                cursor: 'pointer',
                borderColor: selectedRak === rak.kode ? 'var(--bms-blue-600)' : 'var(--border-subtle)',
                background: selectedRak === rak.kode ? '#f0f9ff' : '#ffffff'
              }}
              onClick={() => setSelectedRak(rak.kode)}
            >
              <div className="rack-card-title">
                <span style={{ fontSize: '0.95rem' }}>{rak.kode}</span>
                <span style={{ color: 'var(--bms-blue-600)', fontSize: '0.85rem' }}>{docsInRak.length} Dokumen</span>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                {rak.nama}
              </div>
              <div className="rack-progress-bar">
                <div className="rack-progress-fill" style={{ width: rak.kapasitas }}></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Documents in Selected Rack */}
      <div className="table-wrapper-card">
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800 }}>
            Daftar Berkas Fisik: {selectedRak === 'Semua' ? 'Seluruh Rak' : selectedRak} ({filteredDocs.length} Dokumen)
          </h3>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Klik pada baris untuk melihat detail & berkas digital
          </span>
        </div>

        <div className="table-scroll-container">
          <table className="bms-table">
            <thead>
              <tr>
                <th style={{ width: '130px' }}>Lokasi Rak & Box</th>
                <th>Nomor PB</th>
                <th>Tanggal</th>
                <th>Bagian</th>
                <th>Nama Pemohon</th>
                <th>Status Berkas</th>
                <th style={{ textAlign: 'center' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocs.map((doc) => (
                <tr key={doc.id}>
                  <td>
                    <span className="rak-location-badge">
                      {doc.lokasiRak} &bull; {doc.nomorBox}
                    </span>
                  </td>
                  <td>
                    <span
                      className="nomor-pb-tag"
                      onClick={() => onOpenDetail(doc)}
                    >
                      {doc.nomorPb}
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-muted)' }}>{doc.tanggalPb}</td>
                  <td><strong>{doc.bagian}</strong></td>
                  <td>{doc.namaPemohon}</td>
                  <td>
                    <span className="status-pill pill-verified">{doc.status}</span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      type="button"
                      className="btn-icon-action btn-action-detail"
                      onClick={() => onOpenDetail(doc)}
                      title="Lihat Detail Dokumen"
                    >
                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
