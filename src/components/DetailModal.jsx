import React from 'react';

export default function DetailModal({ doc, isOpen, onClose, onOpenDownload, onOpenEdit }) {
  if (!isOpen || !doc) return null;

  const formatDateIndo = (dateStr) => {
    if (!dateStr) return '-';
    try {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'];
        return `${parseInt(parts[2], 10)} ${monthNames[parseInt(parts[1], 10) - 1]} ${parts[0]}`;
      }
      return dateStr;
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="modal-backdrop-blur">
      <div className="modal-container modal-wide">
        <div className="modal-header-bar">
          <div className="modal-header-title">
            <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--bms-blue-600)' }}>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <h3>Detail Arsip Dokumen Permintaan Barang (PB)</h3>
          </div>
          <button type="button" className="btn-modal-close" onClick={onClose}>&times;</button>
        </div>

        <div className="modal-body-scroll">
          {/* Metadata Card */}
          <div style={{ background: '#f8fafc', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '20px', marginBottom: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', fontSize: '0.85rem' }}>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase' }}>
                  Nomor PB
                </span>
                <span style={{ fontFamily: 'monospace', fontWeight: 800, color: 'var(--bms-blue-700)', fontSize: '0.98rem' }}>
                  {doc.nomorPb}
                </span>
              </div>

              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase' }}>
                  Tanggal Pengajuan PB
                </span>
                <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>
                  {formatDateIndo(doc.tanggalPb)}
                </span>
              </div>

              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase' }}>
                  Bagian / Departemen
                </span>
                <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>
                  {doc.bagian}
                </span>
              </div>

              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase' }}>
                  Nama Pemohon & NIP
                </span>
                <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>
                  {doc.namaPemohon} ({doc.nipPemohon || '-'})
                </span>
              </div>

              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase' }}>
                  Lokasi Fisik Arsip
                </span>
                <span className="rak-location-badge" style={{ marginTop: '4px' }}>
                  {doc.lokasiRak} &bull; {doc.nomorBox}
                </span>
              </div>

              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase' }}>
                  Status Pengarsipan
                </span>
                <span style={{ fontWeight: 700, color: '#059669' }}>
                  {doc.status}
                </span>
              </div>
            </div>

            <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px dashed var(--border-subtle)', fontSize: '0.84rem' }}>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '2px' }}>
                Keterangan / Keperluan:
              </span>
              <p style={{ color: 'var(--text-main)' }}>{doc.keterangan || '-'}</p>
            </div>

            {doc.catatanArsip && (
              <div style={{ marginTop: '10px', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '6px', padding: '10px 14px', fontSize: '0.8rem', color: '#1e40af' }}>
                <strong>Catatan Petugas Warehouse:</strong> {doc.catatanArsip}
              </div>
            )}
          </div>

          {/* Table Items */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-main)' }}>
                Rincian Barang yang Diminta ({doc.items ? doc.items.length : 0} Item)
              </h4>
            </div>

            <table className="bms-table" style={{ border: '1px solid var(--border-subtle)', borderRadius: '8px' }}>
              <thead>
                <tr>
                  <th style={{ width: '40px', textAlign: 'center' }}>No</th>
                  <th>Nama Barang</th>
                  <th style={{ width: '150px' }}>Part Number</th>
                  <th style={{ width: '70px', textAlign: 'center' }}>Jumlah</th>
                  <th style={{ width: '80px', textAlign: 'center' }}>Satuan</th>
                  <th>Spesifikasi / Catatan</th>
                </tr>
              </thead>
              <tbody>
                {doc.items && doc.items.length > 0 ? (
                  doc.items.map((it, idx) => (
                    <tr key={idx}>
                      <td style={{ textAlign: 'center' }}>{idx + 1}</td>
                      <td style={{ fontWeight: 700 }}>{it.nama}</td>
                      <td style={{ fontFamily: 'monospace', color: 'var(--text-muted)' }}>{it.partNumber || '-'}</td>
                      <td style={{ textAlign: 'center', fontWeight: 700 }}>{it.jumlah}</td>
                      <td style={{ textAlign: 'center' }}>{it.satuan}</td>
                      <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{it.spesifikasi || '-'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', color: 'var(--text-light)', padding: '16px' }}>
                      Tidak ada rincian barang tercatat
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Digital File Attachment Info */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f8fafc', padding: '14px 18px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20" style={{ color: '#ef4444' }}>
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"/>
              </svg>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.84rem' }}>{doc.dokumen}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  Ukuran: {doc.dokumenSize} &bull; Diunggah oleh: {doc.uploadedBy} ({doc.uploadedAt})
                </div>
              </div>
            </div>

            <button
              type="button"
              className="btn-primary"
              style={{ padding: '8px 14px', fontSize: '0.8rem' }}
              onClick={() => {
                onClose();
                onOpenDownload(doc);
              }}
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
              </svg>
              <span>Download & Cetak</span>
            </button>
          </div>
        </div>

        <div className="modal-footer-bar">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Tutup
          </button>
          <button
            type="button"
            className="btn-primary"
            onClick={() => {
              onClose();
              onOpenEdit(doc);
            }}
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
            <span>Edit Data PB Ini</span>
          </button>
        </div>
      </div>
    </div>
  );
}
