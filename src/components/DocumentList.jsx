import React, { useState, useMemo } from 'react';
import { BAGIAN_LIST } from '../data/initialData';

export default function DocumentList({
  documents,
  onOpenUpload,
  onOpenDetail,
  onOpenDownload,
  onOpenEdit,
  onOpenDelete,
  onResetFiltersNotification
}) {
  // Search & Filter State
  const [searchNomor, setSearchNomor] = useState('');
  const [filterTanggal, setFilterTanggal] = useState('');
  const [filterBagian, setFilterBagian] = useState('semua');
  const [filterStatus, setFilterStatus] = useState('semua');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Filter Logic
  const filteredDocs = useMemo(() => {
    return documents.filter((item) => {
      // 1. Pencarian berdasarkan Nomor PB (juga mencari nama pemohon / rincian barang)
      if (searchNomor.trim()) {
        const query = searchNomor.toLowerCase().trim();
        const matchNomor = item.nomorPb.toLowerCase().includes(query);
        const matchPemohon = item.namaPemohon.toLowerCase().includes(query);
        const matchKet = (item.keterangan || '').toLowerCase().includes(query);
        const matchItem = item.items?.some((it) => it.nama.toLowerCase().includes(query));
        if (!matchNomor && !matchPemohon && !matchKet && !matchItem) return false;
      }

      // 2. Filter Tanggal PB
      if (filterTanggal) {
        if (item.tanggalPb !== filterTanggal) return false;
      }

      // 3. Filter Bagian
      if (filterBagian !== 'semua') {
        if (item.bagian !== filterBagian) return false;
      }

      // 4. Filter Status
      if (filterStatus !== 'semua') {
        if (item.status !== filterStatus) return false;
      }

      return true;
    });
  }, [documents, searchNomor, filterTanggal, filterBagian, filterStatus]);

  // Reset Filters Handler
  const handleResetFilters = () => {
    setSearchNomor('');
    setFilterTanggal('');
    setFilterBagian('semua');
    setFilterStatus('semua');
    setCurrentPage(1);
    if (onResetFiltersNotification) {
      onResetFiltersNotification();
    }
  };

  // Helper for Status Pill Class
  const getStatusClass = (status) => {
    if (status.includes('Terverifikasi')) return 'pill-verified';
    if (status.includes('Menunggu')) return 'pill-pending';
    if (status.includes('Dipinjam')) return 'pill-borrowed';
    if (status.includes('Selesai')) return 'pill-done';
    return 'pill-pending';
  };

  // Format Indo Date
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

  // Pagination calculation
  const totalItems = filteredDocs.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage) || 1;
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalItems);
  const currentRows = filteredDocs.slice(startIndex, endIndex);

  return (
    <div>
      {/* Header Row */}
      <div className="section-header-box">
        <div className="section-header-text">
          <h2>Data Dokumen Permintaan Barang (PB)</h2>
          <p>Daftar arsip dokumen pengadaan material & suku cadang warehouse PT Besmindo Materi Sewatama.</p>
        </div>

        <div className="section-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={handleResetFilters}
            title="Reset semua filter pencarian"
          >
            <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Reset Filter</span>
          </button>

          <button
            type="button"
            className="btn-primary"
            onClick={onOpenUpload}
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            <span>+ Upload Dokumen PB</span>
          </button>
        </div>
      </div>

      {/* Quick Status Filter Pills */}
      <div className="status-pill-row">
        <button
          type="button"
          className={`status-pill-btn ${filterStatus === 'semua' ? 'active' : ''}`}
          onClick={() => { setFilterStatus('semua'); setCurrentPage(1); }}
        >
          <span>Semua Status</span>
          <span className="status-pill-count">{documents.length}</span>
        </button>

        <button
          type="button"
          className={`status-pill-btn ${filterStatus === 'Terverifikasi & Diarsipkan' ? 'active' : ''}`}
          onClick={() => { setFilterStatus('Terverifikasi & Diarsipkan'); setCurrentPage(1); }}
        >
          <span>Terverifikasi & Diarsipkan</span>
          <span className="status-pill-count">
            {documents.filter((d) => d.status === 'Terverifikasi & Diarsipkan').length}
          </span>
        </button>

        <button
          type="button"
          className={`status-pill-btn ${filterStatus === 'Menunggu Arsip Fisik' ? 'active' : ''}`}
          onClick={() => { setFilterStatus('Menunggu Arsip Fisik'); setCurrentPage(1); }}
        >
          <span>Menunggu Arsip Fisik</span>
          <span className="status-pill-count">
            {documents.filter((d) => d.status === 'Menunggu Arsip Fisik').length}
          </span>
        </button>

        <button
          type="button"
          className={`status-pill-btn ${filterStatus === 'Dokumen Dipinjam' ? 'active' : ''}`}
          onClick={() => { setFilterStatus('Dokumen Dipinjam'); setCurrentPage(1); }}
        >
          <span>Dokumen Dipinjam</span>
          <span className="status-pill-count">
            {documents.filter((d) => d.status === 'Dokumen Dipinjam').length}
          </span>
        </button>

        <button
          type="button"
          className={`status-pill-btn ${filterStatus === 'Selesai Pengadaan' ? 'active' : ''}`}
          onClick={() => { setFilterStatus('Selesai Pengadaan'); setCurrentPage(1); }}
        >
          <span>Selesai Pengadaan</span>
          <span className="status-pill-count">
            {documents.filter((d) => d.status === 'Selesai Pengadaan').length}
          </span>
        </button>
      </div>

      {/* Filter & Search Panel */}
      <div className="filter-panel">
        <div className="filter-grid">
          {/* Fitur 5: Pencarian Berdasarkan Nomor PB */}
          <div className="filter-item">
            <label className="filter-label-title" htmlFor="input-search-nomor">
              Pencarian Nomor PB / Pemohon
            </label>
            <div className="search-field-box">
              <svg className="search-field-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                id="input-search-nomor"
                type="text"
                className="search-field-input"
                placeholder="Contoh: PB/BMS-WH/2026/09/001 atau nama pemohon..."
                value={searchNomor}
                onChange={(e) => {
                  setSearchNomor(e.target.value);
                  setCurrentPage(1);
                }}
              />
              {searchNomor && (
                <button
                  type="button"
                  className="btn-clear-search"
                  onClick={() => setSearchNomor('')}
                  title="Hapus kata kunci"
                >
                  &times;
                </button>
              )}
            </div>
          </div>

          {/* Fitur 6: Filter Berdasarkan Tanggal */}
          <div className="filter-item">
            <label className="filter-label-title" htmlFor="input-filter-tanggal">
              Filter Tanggal PB
            </label>
            <input
              id="input-filter-tanggal"
              type="date"
              className="filter-input-ctrl"
              value={filterTanggal}
              onChange={(e) => {
                setFilterTanggal(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          {/* Fitur 6: Filter Berdasarkan Bagian */}
          <div className="filter-item">
            <label className="filter-label-title" htmlFor="select-filter-bagian">
              Filter Bagian / Departemen
            </label>
            <select
              id="select-filter-bagian"
              className="filter-input-ctrl"
              value={filterBagian}
              onChange={(e) => {
                setFilterBagian(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="semua">Semua Bagian</option>
              {BAGIAN_LIST.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Reset Action */}
          <div className="filter-item">
            <button
              type="button"
              className="btn-filter-reset"
              onClick={handleResetFilters}
            >
              <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Table Wrapper */}
      <div className="table-wrapper-card">
        {currentRows.length === 0 ? (
          <div style={{ padding: '60px 20px', textAlign: 'center' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: '#f1f5f9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                color: '#94a3b8'
              }}
            >
              <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '6px' }}>Dokumen Tidak Ditemukan</h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', maxWidth: '420px', margin: '0 auto 16px' }}>
              Tidak ada dokumen PB yang sesuai dengan nomor PB, tanggal, atau bagian yang Anda pilih.
            </p>
            <button type="button" className="btn-secondary" onClick={handleResetFilters}>
              Reset Semua Filter
            </button>
          </div>
        ) : (
          <div className="table-scroll-container">
            <table className="bms-table">
              <thead>
                <tr>
                  <th className="cell-no">No</th>
                  <th>Nomor PB</th>
                  <th>Tanggal PB</th>
                  <th>Bagian</th>
                  <th>Nama Pemohon</th>
                  <th>Keterangan / Keperluan</th>
                  <th>Lokasi Rak Fisik</th>
                  <th>Status Dokumen</th>
                  <th>Dokumen</th>
                  <th style={{ textAlign: 'center' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {currentRows.map((doc, idx) => {
                  const rowNumber = startIndex + idx + 1;
                  const initials = doc.namaPemohon
                    ? doc.namaPemohon.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase()
                    : 'PB';

                  return (
                    <tr key={doc.id}>
                      <td className="cell-no">{rowNumber}</td>
                      <td>
                        <span
                          className="nomor-pb-tag"
                          onClick={() => onOpenDetail(doc)}
                          title="Klik untuk melihat detail lengkap"
                        >
                          <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          {doc.nomorPb}
                        </span>
                      </td>
                      <td style={{ whiteSpace: 'nowrap', fontWeight: 600, color: 'var(--text-muted)' }}>
                        {formatDateIndo(doc.tanggalPb)}
                      </td>
                      <td>
                        <span className="bagian-badge">
                          <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          {doc.bagian}
                        </span>
                      </td>
                      <td>
                        <div className="pemohon-cell-box">
                          <div className="pemohon-avatar">{initials}</div>
                          <div className="pemohon-info">
                            <span className="pemohon-nama-txt">{doc.namaPemohon}</span>
                            <span className="pemohon-nip-txt">NIP: {doc.nipPemohon || '-'}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div
                          style={{
                            maxWidth: '240px',
                            lineHeight: 1.4,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}
                          title={doc.keterangan}
                        >
                          {doc.keterangan}
                        </div>
                      </td>
                      <td>
                        <span className="rak-location-badge">
                          <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                          </svg>
                          {doc.lokasiRak} - {doc.nomorBox}
                        </span>
                      </td>
                      <td>
                        <span className={`status-pill ${getStatusClass(doc.status)}`}>
                          {doc.status}
                        </span>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn-doc-link"
                          onClick={() => onOpenDownload(doc)}
                          title={`Download / Cetak Dokumen: ${doc.dokumen}`}
                        >
                          <svg width="14" height="14" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                          </svg>
                          <span>{doc.dokumen}</span>
                        </button>
                      </td>
                      <td>
                        <div className="table-action-group">
                          {/* Fitur 7: Detail Dokumen */}
                          <button
                            type="button"
                            className="btn-icon-action btn-action-detail"
                            onClick={() => onOpenDetail(doc)}
                            title="Lihat Detail Dokumen PB"
                          >
                            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>

                          {/* Fitur 8: Download Dokumen */}
                          <button
                            type="button"
                            className="btn-icon-action btn-action-download"
                            onClick={() => onOpenDownload(doc)}
                            title="Download & Cetak Dokumen PB"
                          >
                            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                          </button>

                          {/* Fitur 9: Edit Data PB */}
                          <button
                            type="button"
                            className="btn-icon-action btn-action-edit"
                            onClick={() => onOpenEdit(doc)}
                            title="Edit Data PB"
                          >
                            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>

                          {/* Fitur 10: Hapus Data PB */}
                          <button
                            type="button"
                            className="btn-icon-action btn-action-delete"
                            onClick={() => onOpenDelete(doc)}
                            title="Hapus Data PB"
                          >
                            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Bar */}
        {totalItems > 0 && (
          <div className="table-pagination-bar">
            <div className="pagination-text">
              Menampilkan <strong>{startIndex + 1} - {endIndex}</strong> dari <strong>{totalItems}</strong> arsip dokumen PB
              <label style={{ marginLeft: '14px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <span>Baris:</span>
                <select
                  value={rowsPerPage}
                  onChange={(e) => {
                    setRowsPerPage(parseInt(e.target.value, 10));
                    setCurrentPage(1);
                  }}
                  style={{
                    padding: '3px 8px',
                    borderRadius: '4px',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.8rem'
                  }}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                </select>
              </label>
            </div>

            <div className="pagination-pages">
              <button
                type="button"
                className="btn-page-nav"
                disabled={safeCurrentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              >
                &larr; Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                <button
                  key={pg}
                  type="button"
                  className={`btn-page-nav ${pg === safeCurrentPage ? 'active' : ''}`}
                  onClick={() => setCurrentPage(pg)}
                >
                  {pg}
                </button>
              ))}

              <button
                type="button"
                className="btn-page-nav"
                disabled={safeCurrentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              >
                Next &rarr;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
