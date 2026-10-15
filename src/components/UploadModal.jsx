import React, { useState, useEffect } from 'react';
import { BAGIAN_LIST, STATUS_LIST, RAK_LIST } from '../data/initialData';

export default function UploadModal({ isOpen, onClose, onSave, editingDoc, currentUser, showToast }) {
  const [nomorPb, setNomorPb] = useState('');
  const [tanggalPb, setTanggalPb] = useState('');
  const [bagian, setBagian] = useState(BAGIAN_LIST[0]);
  const [namaPemohon, setNamaPemohon] = useState('');
  const [nipPemohon, setNipPemohon] = useState('');
  const [keterangan, setKeterangan] = useState('');
  const [lokasiRak, setLokasiRak] = useState('Rak A');
  const [nomorBox, setNomorBox] = useState('Box 01');
  const [status, setStatus] = useState('Terverifikasi & Diarsipkan');
  const [fileName, setFileName] = useState('');
  const [items, setItems] = useState([
    { nama: '', partNumber: '', jumlah: 1, satuan: 'Pcs', hargaSatuan: 0, spesifikasi: '' }
  ]);

  useEffect(() => {
    if (editingDoc) {
      setNomorPb(editingDoc.nomorPb || '');
      setTanggalPb(editingDoc.tanggalPb || '');
      setBagian(editingDoc.bagian || BAGIAN_LIST[0]);
      setNamaPemohon(editingDoc.namaPemohon || '');
      setNipPemohon(editingDoc.nipPemohon || '');
      setKeterangan(editingDoc.keterangan || '');
      setLokasiRak(editingDoc.lokasiRak || 'Rak A');
      setNomorBox(editingDoc.nomorBox || 'Box 01');
      setStatus(editingDoc.status || 'Terverifikasi & Diarsipkan');
      setFileName(editingDoc.dokumen || '');
      setItems(editingDoc.items && editingDoc.items.length > 0 ? editingDoc.items : [
        { nama: '', partNumber: '', jumlah: 1, satuan: 'Pcs', hargaSatuan: 0, spesifikasi: '' }
      ]);
    } else {
      // Auto-generate PB number for new upload
      const year = new Date().getFullYear();
      const month = String(new Date().getMonth() + 1).padStart(2, '0');
      const randomId = String(Math.floor(100 + Math.random() * 900));
      setNomorPb(`PB/BMS-WH/${year}/${month}/${randomId}`);
      setTanggalPb(new Date().toISOString().split('T')[0]);
      setBagian(BAGIAN_LIST[0]);
      setNamaPemohon('');
      setNipPemohon('');
      setKeterangan('');
      setLokasiRak('Rak A');
      setNomorBox('Box 01');
      setStatus('Terverifikasi & Diarsipkan');
      setFileName('');
      setItems([
        { nama: '', partNumber: '', jumlah: 1, satuan: 'Pcs', hargaSatuan: 0, spesifikasi: '' }
      ]);
    }
  }, [editingDoc, isOpen]);

  if (!isOpen) return null;

  // Handle Items Repeater
  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const handleAddItem = () => {
    setItems([...items, { nama: '', partNumber: '', jumlah: 1, satuan: 'Pcs', hargaSatuan: 0, spesifikasi: '' }]);
  };

  const handleRemoveItem = (index) => {
    if (items.length <= 1) {
      showToast('Minimal harus ada 1 barang dalam daftar permohonan', 'warning');
      return;
    }
    setItems(items.filter((_, i) => i !== index));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nomorPb.trim() || !tanggalPb || !namaPemohon.trim()) {
      showToast('Harap lengkapi semua kolom yang bertanda bintang (*)', 'danger');
      return;
    }

    const payload = {
      id: editingDoc ? editingDoc.id : `pb-bms-${Date.now()}`,
      nomorPb: nomorPb.trim(),
      tanggalPb,
      bagian,
      namaPemohon: namaPemohon.trim(),
      nipPemohon: nipPemohon.trim() || '-',
      keterangan: keterangan.trim() || 'Pengadaan material operasional warehouse.',
      lokasiRak,
      nomorBox,
      status,
      dokumen: fileName || (editingDoc ? editingDoc.dokumen : `Scan_${nomorPb.replace(/[\/]/g, '_')}.pdf`),
      dokumenSize: editingDoc ? editingDoc.dokumenSize : '1.5 MB',
      uploadedAt: editingDoc ? editingDoc.uploadedAt : new Date().toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' }),
      uploadedBy: editingDoc ? editingDoc.uploadedBy : `${currentUser?.name || 'Petugas'} (${currentUser?.role || 'Warehouse'})`,
      items: items.filter((it) => it.nama.trim().length > 0)
    };

    onSave(payload, Boolean(editingDoc));
    onClose();
  };

  return (
    <div className="modal-backdrop-blur">
      <div className="modal-container modal-wide">
        <div className="modal-header-bar">
          <div className="modal-header-title">
            <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--bms-blue-600)' }}>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            <h3>{editingDoc ? `Edit Data PB (${editingDoc.nomorPb})` : 'Upload & Arsipkan Dokumen PB Baru'}</h3>
          </div>
          <button type="button" className="btn-modal-close" onClick={onClose}>&times;</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body-scroll">
            
            {/* Row 1: Nomor PB & Tanggal */}
            <div className="form-2col">
              <div className="form-group-item">
                <label className="form-label-txt">
                  Nomor PB <span className="required-star">*</span>
                </label>
                <input
                  type="text"
                  className="form-ctrl"
                  value={nomorPb}
                  onChange={(e) => setNomorPb(e.target.value)}
                  style={{ fontFamily: 'monospace', fontWeight: 700 }}
                  required
                />
              </div>

              <div className="form-group-item">
                <label className="form-label-txt">
                  Tanggal PB <span className="required-star">*</span>
                </label>
                <input
                  type="date"
                  className="form-ctrl"
                  value={tanggalPb}
                  onChange={(e) => setTanggalPb(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Row 2: Bagian & Status */}
            <div className="form-2col">
              <div className="form-group-item">
                <label className="form-label-txt">
                  Bagian / Departemen <span className="required-star">*</span>
                </label>
                <select
                  className="form-ctrl"
                  value={bagian}
                  onChange={(e) => setBagian(e.target.value)}
                  required
                >
                  {BAGIAN_LIST.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              <div className="form-group-item">
                <label className="form-label-txt">Status Pengarsipan</label>
                <select
                  className="form-ctrl"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  {STATUS_LIST.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 3: Nama Pemohon & NIP */}
            <div className="form-2col">
              <div className="form-group-item">
                <label className="form-label-txt">
                  Nama Pemohon <span className="required-star">*</span>
                </label>
                <input
                  type="text"
                  className="form-ctrl"
                  placeholder="Contoh: Dedi Suhendar, S.T."
                  value={namaPemohon}
                  onChange={(e) => setNamaPemohon(e.target.value)}
                  required
                />
              </div>

              <div className="form-group-item">
                <label className="form-label-txt">NIP / ID Karyawan</label>
                <input
                  type="text"
                  className="form-ctrl"
                  placeholder="Contoh: BMS-NDT-0082"
                  value={nipPemohon}
                  onChange={(e) => setNipPemohon(e.target.value)}
                />
              </div>
            </div>

            {/* Row 4: Lokasi Penyimpanan Fisik (Rak & Box) */}
            <div className="form-2col">
              <div className="form-group-item">
                <label className="form-label-txt">Lokasi Rak Gudang</label>
                <select
                  className="form-ctrl"
                  value={lokasiRak}
                  onChange={(e) => setLokasiRak(e.target.value)}
                >
                  {RAK_LIST.map((r) => (
                    <option key={r.kode} value={r.kode}>{r.nama}</option>
                  ))}
                </select>
              </div>

              <div className="form-group-item">
                <label className="form-label-txt">Nomor Box / Ordner Arsip</label>
                <input
                  type="text"
                  className="form-ctrl"
                  placeholder="Contoh: Box 05"
                  value={nomorBox}
                  onChange={(e) => setNomorBox(e.target.value)}
                />
              </div>
            </div>

            {/* Row 5: Keterangan */}
            <div className="form-group-item">
              <label className="form-label-txt">Keterangan / Keperluan Barang</label>
              <textarea
                className="form-ctrl"
                rows="2"
                placeholder="Rincian keperluan pengadaan atau penggunaan barang..."
                value={keterangan}
                onChange={(e) => setKeterangan(e.target.value)}
              ></textarea>
            </div>

            {/* Row 6: Upload Berkas Dokumen (PDF Scan) */}
            <div className="form-group-item">
              <label className="form-label-txt">Lampiran File Scan Dokumen PB (PDF / Gambar)</label>
              <div
                className="file-dropzone"
                onClick={() => document.getElementById('modal-file-picker').click()}
              >
                <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ margin: '0 auto 8px', color: 'var(--bms-blue-600)' }}>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                </svg>
                <p style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  {fileName ? `File Terpilih: ${fileName}` : 'Klik untuk memilih atau drag & drop file scan PB di sini'}
                </p>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                  Mendukung berkas scan PDF, JPG, PNG (Maksimal 15MB)
                </span>
                <input
                  id="modal-file-picker"
                  type="file"
                  style={{ display: 'none' }}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                />
              </div>
            </div>

            {/* Row 7: Rincian Barang Diminta (Repeater) */}
            <div>
              <div className="items-table-header">
                <h4>Rincian Material / Barang yang Diminta:</h4>
                <button
                  type="button"
                  className="btn-add-item-row"
                  onClick={handleAddItem}
                >
                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                  </svg>
                  <span>+ Tambah Baris Barang</span>
                </button>
              </div>

              <table className="repeater-table">
                <thead>
                  <tr>
                    <th>Nama Barang</th>
                    <th style={{ width: '130px' }}>Part Number / Spek</th>
                    <th style={{ width: '70px', textAlign: 'center' }}>Jumlah</th>
                    <th style={{ width: '90px' }}>Satuan</th>
                    <th style={{ width: '38px', textAlign: 'center' }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((it, idx) => (
                    <tr key={idx}>
                      <td>
                        <input
                          type="text"
                          className="input-repeater"
                          placeholder="Nama barang..."
                          value={it.nama}
                          onChange={(e) => handleItemChange(idx, 'nama', e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="input-repeater"
                          placeholder="Part Number..."
                          value={it.partNumber}
                          onChange={(e) => handleItemChange(idx, 'partNumber', e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          min="1"
                          className="input-repeater"
                          style={{ textAlign: 'center' }}
                          value={it.jumlah}
                          onChange={(e) => handleItemChange(idx, 'jumlah', parseInt(e.target.value, 10) || 1)}
                        />
                      </td>
                      <td>
                        <select
                          className="input-repeater"
                          value={it.satuan}
                          onChange={(e) => handleItemChange(idx, 'satuan', e.target.value)}
                        >
                          <option value="Pcs">Pcs</option>
                          <option value="Unit">Unit</option>
                          <option value="Set">Set</option>
                          <option value="Roll">Roll</option>
                          <option value="Drum">Drum</option>
                          <option value="Pail">Pail</option>
                          <option value="Can">Can</option>
                          <option value="Pack">Pack</option>
                          <option value="Pasang">Pasang</option>
                        </select>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <button
                          type="button"
                          className="btn-remove-row"
                          onClick={() => handleRemoveItem(idx)}
                          title="Hapus baris"
                        >
                          <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>

          <div className="modal-footer-bar">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Batal
            </button>
            <button type="submit" className="btn-primary">
              {editingDoc ? 'Simpan Perubahan' : 'Simpan & Arsipkan Dokumen'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
