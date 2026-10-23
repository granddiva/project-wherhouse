import React, { useEffect } from 'react';

export default function LogoutModal({ isOpen, onClose, onConfirm, currentUser }) {
  // Tutup dengan tombol Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop-blur" onClick={onClose}>
      <div
        className="modal-container"
        style={{ maxWidth: '440px', textAlign: 'center', position: 'relative' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tombol Tutup X */}
        <button
          type="button"
          className="btn-modal-close"
          onClick={onClose}
          title="Tutup"
          style={{ position: 'absolute', top: '16px', right: '16px' }}
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div style={{ padding: '32px 24px 24px' }}>
          {/* Ikon Logout */}
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
              margin: '0 auto 16px',
              boxShadow: '0 0 0 8px #fef2f2'
            }}
          >
            <svg width="30" height="30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </div>

          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
            Konfirmasi Keluar / Logout
          </h3>

          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '18px', lineHeight: 1.5 }}>
            Apakah Anda yakin ingin mengakhiri sesi dan keluar dari akun{' '}
            <strong style={{ color: 'var(--bms-blue-700)' }}>
              {currentUser?.name || 'Petugas'}
            </strong>{' '}
            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
              ({currentUser?.role || 'Staff Warehouse'})
            </span>
            ?
          </p>

          <div
            style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '10px 14px',
              fontSize: '0.8rem',
              color: '#64748b',
              marginBottom: '24px',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '8px'
            }}
          >
            <span style={{ fontSize: '1rem', lineHeight: 1 }}>💡</span>
            <span>
              Semua perubahan data dokumen yang telah disimpan akan tetap tersimpan aman di sistem. Anda dapat masuk kembali kapan saja.
            </span>
          </div>

          {/* Tombol Aksi */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
              style={{ minWidth: '100px', fontWeight: 600 }}
            >
              Batal
            </button>
            <button
              type="button"
              className="btn-primary"
              style={{
                background: '#dc2626',
                borderColor: '#dc2626',
                minWidth: '130px',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
              onClick={onConfirm}
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span>Ya, Keluar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}