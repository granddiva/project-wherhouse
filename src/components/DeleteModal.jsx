import React from 'react';

export default function DeleteModal({ doc, isOpen, onClose, onConfirmDelete }) {
  if (!isOpen || !doc) return null;

  return (
    <div className="modal-backdrop-blur">
      <div className="modal-container" style={{ maxWidth: '440px', textAlign: 'center' }}>
        <div style={{ padding: '30px 24px 24px' }}>
          
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#fee2e2',
              color: '#dc2626',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}
          >
            <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
          </div>

          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
            Hapus Data Dokumen PB?
          </h3>

          <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: 1.5 }}>
            Apakah Anda yakin ingin menghapus arsip dokumen:
            <br />
            <strong style={{ color: 'var(--bms-blue-700)', fontFamily: 'monospace' }}>{doc.nomorPb}</strong>
            <br />
            Pemohon: <strong>{doc.namaPemohon}</strong> ({doc.bagian})
          </p>

          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '10px 14px', fontSize: '0.78rem', color: '#b91c1c', marginBottom: '22px', textAlign: 'left' }}>
            <strong>Peringatan:</strong> Berkas dokumen fisik di <strong>{doc.lokasiRak} - {doc.nomorBox}</strong> harus dikoordinasikan secara manual jika data sistem ini dihapus.
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
            >
              Batal
            </button>
            <button
              type="button"
              className="btn-primary"
              style={{ background: '#dc2626', borderColor: '#dc2626' }}
              onClick={() => onConfirmDelete(doc.id)}
            >
              Ya, Hapus Data
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
