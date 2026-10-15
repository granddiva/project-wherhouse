import React from 'react';

export default function DownloadModal({ doc, isOpen, onClose, showToast }) {
  if (!isOpen || !doc) return null;

  const handleSimulatedDownload = () => {
    // Creates a simulated download trigger
    const element = document.createElement('a');
    const file = new Blob([
      `PT BESMINDO MATERI SEWATAMA - ARSIP DOKUMEN PERMINTAAN BARANG\n` +
      `Nomor PB: ${doc.nomorPb}\n` +
      `Tanggal: ${doc.tanggalPb}\n` +
      `Bagian: ${doc.bagian}\n` +
      `Pemohon: ${doc.namaPemohon} (${doc.nipPemohon})\n` +
      `Lokasi Arsip: ${doc.lokasiRak} - ${doc.nomorBox}\n` +
      `Status: ${doc.status}\n\n` +
      `Rincian Barang:\n` +
      (doc.items || []).map((it, i) => `${i + 1}. ${it.nama} [${it.partNumber || '-'}] - ${it.jumlah} ${it.satuan}`).join('\n')
    ], { type: 'text/plain' });

    element.href = URL.createObjectURL(file);
    element.download = doc.dokumen || `${doc.nomorPb.replace(/[\/]/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    showToast(`Dokumen ${doc.dokumen} berhasil diunduh ke komputer Anda`, 'success');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-backdrop-blur">
      <div className="modal-container modal-wide">
        <div className="modal-header-bar">
          <div className="modal-header-title">
            <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#059669' }}>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
            </svg>
            <h3>Download & Cetak Dokumen PB Resmi</h3>
          </div>
          <button type="button" className="btn-modal-close" onClick={onClose}>&times;</button>
        </div>

        <div className="modal-body-scroll" style={{ background: '#e2e8f0', padding: '24px' }}>
          
          {/* Printable Official Document Sheet */}
          <div className="official-doc-sheet" id="printable-doc">
            
            {/* Header Kop Surat */}
            <div className="official-kop">
              <div className="official-kop-logo">BMS</div>
              <div className="official-kop-text">
                <h2>PT. BESMINDO MATERI SEWATAMA</h2>
                <p style={{ fontWeight: 'bold' }}>OILFIELD EQUIPMENT FABRICATION, MACHINING & TUBULAR INSPECTION</p>
                <p>Warehouse & Yard Facility: Jl. Sebanga Km 2, Mandau, Duri - Riau | Telp: (0765) 598-123</p>
                <p style={{ fontSize: '0.72rem', color: '#475569' }}>Sistem Informasi Pengarsipan Dokumen Gudang (SIP-PB Version 2.0)</p>
              </div>
            </div>

            {/* Title & Document Badge */}
            <div style={{ textAlign: 'center', marginBottom: '22px' }}>
              <h3 style={{ fontSize: '1.2rem', textDecoration: 'underline', fontWeight: 'bold' }}>
                SURAT PERMINTAAN BARANG (PB)
              </h3>
              <p style={{ fontFamily: 'monospace', fontWeight: 'bold', fontSize: '0.95rem', marginTop: '4px' }}>
                Nomor: {doc.nomorPb}
              </p>
            </div>

            {/* Document Info Table */}
            <table style={{ width: '100%', fontSize: '0.88rem', marginBottom: '20px', borderCollapse: 'collapse' }}>
              <tbody>
                <tr>
                  <td style={{ width: '180px', padding: '4px 0' }}><strong>Tanggal Pengajuan</strong></td>
                  <td style={{ width: '20px' }}>:</td>
                  <td>{doc.tanggalPb}</td>
                  <td style={{ width: '140px', padding: '4px 0' }}><strong>Lokasi Rak Arsip</strong></td>
                  <td style={{ width: '20px' }}>:</td>
                  <td><strong>{doc.lokasiRak} - {doc.nomorBox}</strong></td>
                </tr>
                <tr>
                  <td style={{ padding: '4px 0' }}><strong>Bagian / Unit Pemohon</strong></td>
                  <td>:</td>
                  <td>{doc.bagian}</td>
                  <td style={{ padding: '4px 0' }}><strong>Status Dokumen</strong></td>
                  <td>:</td>
                  <td><span className="official-stamp-verified">{doc.status}</span></td>
                </tr>
                <tr>
                  <td style={{ padding: '4px 0' }}><strong>Nama Pemohon</strong></td>
                  <td>:</td>
                  <td>{doc.namaPemohon} (NIP: {doc.nipPemohon || '-'})</td>
                  <td style={{ padding: '4px 0' }}><strong>Berkas Digital</strong></td>
                  <td>:</td>
                  <td>{doc.dokumen}</td>
                </tr>
                <tr>
                  <td style={{ padding: '4px 0', verticalAlign: 'top' }}><strong>Keperluan Pengadaan</strong></td>
                  <td style={{ verticalAlign: 'top' }}>:</td>
                  <td colSpan="4">{doc.keterangan || '-'}</td>
                </tr>
              </tbody>
            </table>

            {/* Items Table */}
            <p style={{ fontSize: '0.88rem', fontWeight: 'bold', marginBottom: '8px' }}>
              Daftar Spesifikasi & Kebutuhan Material:
            </p>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem', marginBottom: '30px' }}>
              <thead>
                <tr style={{ background: '#f1f5f9', textAlign: 'center' }}>
                  <th style={{ border: '1px solid #000', padding: '7px 8px', width: '40px' }}>No</th>
                  <th style={{ border: '1px solid #000', padding: '7px 8px', textAlign: 'left' }}>Uraian Material / Barang</th>
                  <th style={{ border: '1px solid #000', padding: '7px 8px', width: '140px' }}>Part Number / Kode</th>
                  <th style={{ border: '1px solid #000', padding: '7px 8px', width: '60px' }}>Jumlah</th>
                  <th style={{ border: '1px solid #000', padding: '7px 8px', width: '70px' }}>Satuan</th>
                  <th style={{ border: '1px solid #000', padding: '7px 8px', textAlign: 'left' }}>Spesifikasi / Catatan</th>
                </tr>
              </thead>
              <tbody>
                {doc.items && doc.items.length > 0 ? (
                  doc.items.map((it, idx) => (
                    <tr key={idx}>
                      <td style={{ border: '1px solid #000', padding: '6px 8px', textAlign: 'center' }}>{idx + 1}</td>
                      <td style={{ border: '1px solid #000', padding: '6px 8px', fontWeight: 'bold' }}>{it.nama}</td>
                      <td style={{ border: '1px solid #000', padding: '6px 8px', textAlign: 'center', fontFamily: 'monospace' }}>{it.partNumber || '-'}</td>
                      <td style={{ border: '1px solid #000', padding: '6px 8px', textAlign: 'center', fontWeight: 'bold' }}>{it.jumlah}</td>
                      <td style={{ border: '1px solid #000', padding: '6px 8px', textAlign: 'center' }}>{it.satuan}</td>
                      <td style={{ border: '1px solid #000', padding: '6px 8px' }}>{it.spesifikasi || '-'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={{ border: '1px solid #000', padding: '10px', textAlign: 'center' }}>
                      Tidak ada item
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Signature Blocks */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', textAlign: 'center', fontSize: '0.84rem', marginTop: '20px' }}>
              <div>
                <p>Diajukan Oleh,</p>
                <div style={{ height: '60px' }}></div>
                <p><strong>({doc.namaPemohon})</strong></p>
                <p style={{ fontSize: '0.74rem', color: '#64748b' }}>Pemohon / Dept Terkait</p>
              </div>

              <div>
                <p>Diperiksa & Diarsipkan,</p>
                <div style={{ height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ border: '1px dashed #0284c7', color: '#0284c7', padding: '3px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold' }}>
                    WAREHOUSE DEPT VERIFIED
                  </span>
                </div>
                <p><strong>(Budi Hendrawan)</strong></p>
                <p style={{ fontSize: '0.74rem', color: '#64748b' }}>Admin Warehouse</p>
              </div>

              <div>
                <p>Mengetahui / Menyetujui,</p>
                <div style={{ height: '60px' }}></div>
                <p><strong>(Ir. Hendra Gunawan)</strong></p>
                <p style={{ fontSize: '0.74rem', color: '#64748b' }}>Warehouse Manager</p>
              </div>
            </div>

          </div>
        </div>

        <div className="modal-footer-bar">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Tutup
          </button>
          
          <button
            type="button"
            className="btn-secondary"
            onClick={handlePrint}
          >
            <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
            </svg>
            <span>Cetak Dokumen Fisik</span>
          </button>

          <button
            type="button"
            className="btn-primary"
            onClick={handleSimulatedDownload}
          >
            <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
            </svg>
            <span>Download Dokumen ({doc.dokumen})</span>
          </button>
        </div>
      </div>
    </div>
  );
}
