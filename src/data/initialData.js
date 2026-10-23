// Initial Mock Data untuk Warehouse PT Besmindo Materi Sewatama
// Sistem Informasi Pengarsipan dan Pencarian Dokumen Permintaan Barang (PB)

export const DEFAULT_USERS = [
  {
    id: "usr-1",
    username: "admin",
    password: "admin123",
    name: "Admin Warehouse",
    role: "Admin Warehouse",
    nip: "BMS-WH-0012",
    avatar: "AW"
  },
  {
    id: "usr-2",
    username: "petugas",
    password: "petugas123",
    name: "Staff Warehouse",
    role: "Staff Warehouse",
    nip: "BMS-WH-0045",
    avatar: "SW"
  }
];

export const BAGIAN_LIST = [
  "Workshop Machining & Threading",
  "NDT & Tubular Inspection",
  "Warehouse & Logistik",
  "HSE & K3L",
  "Maintenance & Utility",
  "Operasional Lapangan",
  "Quality Assurance / QC"
];

export const STATUS_LIST = [
  "Terverifikasi & Diarsipkan",
  "Menunggu Arsip Fisik",
  "Dokumen Dipinjam",
  "Selesai Pengadaan"
];

export const RAK_LIST = [
  { kode: "Rak A", nama: "Rak A - Arsip Machining & Workshop", kapasitas: "85%" },
  { kode: "Rak B", nama: "Rak B - Arsip NDT & Inspeksi", kapasitas: "62%" },
  { kode: "Rak C", nama: "Rak C - Arsip Logistik & HSE", kapasitas: "74%" },
  { kode: "Rak D", nama: "Rak D - Arsip Maintenance & Umum", kapasitas: "45%" }
];

export const INITIAL_PB_DOCS = [
  {
    id: "pb-bms-001",
    nomorPb: "PB/BMS-WH/2026/09/001",
    tanggalPb: "2026-09-21",
    bagian: "Workshop Machining & Threading",
    namaPemohon: "Agus Pratama",
    nipPemohon: "BMS-MCH-0104",
    keterangan: "Pengadaan Carbide Inserts Sandvik Coromant & coolant soluble oil 1 drum untuk mesin bubut CNC lathe.",
    status: "Terverifikasi & Diarsipkan",
    lokasiRak: "Rak A",
    nomorBox: "Box 03",
    dokumen: "Scan_PB_BMS_WH_001.pdf",
    dokumenSize: "1.9 MB",
    uploadedAt: "2026-09-21 10:15",
    uploadedBy: "Budi Hendrawan (Admin)",
    items: [
      { nama: "Carbide Insert Sandvik WNMG 080408-PM", partNumber: "SNV-WNMG-0804", jumlah: 20, satuan: "Pcs", hargaSatuan: 145000, spesifikasi: "Grade 4325 untuk turning casing pipe" },
      { nama: "Cutting Coolant Semi-Synthetic Soluble", partNumber: "CCL-DRUM-200L", jumlah: 1, satuan: "Drum", hargaSatuan: 3850000, spesifikasi: "Drum 200 Liter anti-karat" }
    ],
    catatanArsip: "Dokumen fisik tersimpan rapi dalam ordner biru Box 03 Rak A. Disertai nota tanda terima workshop."
  },
  {
    id: "pb-bms-002",
    nomorPb: "PB/BMS-NDT/2026/09/002",
    tanggalPb: "2026-09-22",
    bagian: "NDT & Tubular Inspection",
    namaPemohon: "Dedi Suhendar, S.T.",
    nipPemohon: "BMS-NDT-0082",
    keterangan: "Permintaan aerosol magnetic particle inspection Magnaflux 7HF & white contrast paint WCP-2 untuk inspeksi sambungan drill pipe rig.",
    status: "Terverifikasi & Diarsipkan",
    lokasiRak: "Rak B",
    nomorBox: "Box 08",
    dokumen: "Scan_PB_BMS_NDT_002.pdf",
    dokumenSize: "2.4 MB",
    uploadedAt: "2026-09-22 13:40",
    uploadedBy: "Siti Rahmawati (Petugas)",
    items: [
      { nama: "Magnaflux 7HF Black Magnetic Ink Spray", partNumber: "MGX-7HF-400ML", jumlah: 12, satuan: "Can", hargaSatuan: 285000, spesifikasi: "Kaleng spray 400ml aerosol" },
      { nama: "Magnaflux WCP-2 White Contrast Paint", partNumber: "MGX-WCP2-400ML", jumlah: 8, satuan: "Can", hargaSatuan: 260000, spesifikasi: "Fast drying white paint 400ml" },
      { nama: "UV Blacklight Bulb 100W Replacement", partNumber: "BLB-100W-UV", jumlah: 2, satuan: "Unit", hargaSatuan: 650000, spesifikasi: "Untuk lampu inspeksi fluorescent NDT" }
    ],
    catatanArsip: "Arsip fisik lengkap tanda tangan Manager Mutu NDT dan bukti kalibrasi alat."
  },
  {
    id: "pb-bms-003",
    nomorPb: "PB/BMS-HSE/2026/09/003",
    tanggalPb: "2026-09-23",
    bagian: "HSE & K3L",
    namaPemohon: "Fajar Nugroho, S.K.M.",
    nipPemohon: "BMS-HSE-0056",
    keterangan: "Pengadaan APD pengganti: safety helmet V-Gard MSA, full body harness double lanyard, dan safety glasses anti-fog.",
    status: "Menunggu Arsip Fisik",
    lokasiRak: "Rak C",
    nomorBox: "Box 02",
    dokumen: "PB_HSE_K3L_PengadaanAPD.pdf",
    dokumenSize: "1.1 MB",
    uploadedAt: "2026-09-23 09:20",
    uploadedBy: "Budi Hendrawan (Admin)",
    items: [
      { nama: "Safety Helmet MSA V-Gard White Staz-On", partNumber: "MSA-VG-WHT", jumlah: 15, satuan: "Unit", hargaSatuan: 220000, spesifikasi: "Standar ANSI Z89.1 Type 1" },
      { nama: "Full Body Harness Double Lanyard Shock Absorber", partNumber: "KAR-FBH-DL", jumlah: 6, satuan: "Set", hargaSatuan: 890000, spesifikasi: "Karam PN 56 Double Big Hook" },
      { nama: "Safety Glasses 3M Virtua Anti-Fog Clear", partNumber: "3M-VRT-11228", jumlah: 30, satuan: "Pcs", hargaSatuan: 45000, spesifikasi: "Lensa bening perlindungan UV" }
    ],
    catatanArsip: "Dokumen digital telah diunggah. Menunggu berkas fisik asli dikirim dari departemen HSE."
  },
  {
    id: "pb-bms-004",
    nomorPb: "PB/BMS-LOG/2026/09/004",
    tanggalPb: "2026-09-24",
    bagian: "Warehouse & Logistik",
    namaPemohon: "Rudi Hartono",
    nipPemohon: "BMS-LOG-0031",
    keterangan: "Pengadaan strapping band baja 3/4 inch, klem seng, dan stretch film heavy duty untuk packing pengiriman material tubular ke rig yard.",
    status: "Terverifikasi & Diarsipkan",
    lokasiRak: "Rak C",
    nomorBox: "Box 05",
    dokumen: "Scan_PB_Logistik_Packing_0924.pdf",
    dokumenSize: "2.1 MB",
    uploadedAt: "2026-09-24 11:05",
    uploadedBy: "Siti Rahmawati (Petugas)",
    items: [
      { nama: "Steel Strapping Band 3/4 inch x 0.031", partNumber: "STB-34-STEEL", jumlah: 3, satuan: "Roll", hargaSatuan: 1350000, spesifikasi: "Heavy duty roll @ 45 kg" },
      { nama: "Klem Strapping Seng 3/4 inch", partNumber: "KLM-34-ZINC", jumlah: 5, satuan: "Pack", hargaSatuan: 180000, spesifikasi: "Isi 500 pcs per pack" },
      { nama: "Plastic Stretch Film Roll 50cm x 300m", partNumber: "STF-5030-CLR", jumlah: 10, satuan: "Roll", hargaSatuan: 115000, spesifikasi: "Ketebalan 20 micron bening" }
    ],
    catatanArsip: "Disimpan di Rak C Box 05. Telah diperiksa fisik barang masuk warehouse."
  },
  {
    id: "pb-bms-005",
    nomorPb: "PB/BMS-MTN/2026/09/005",
    tanggalPb: "2026-09-25",
    bagian: "Maintenance & Utility",
    namaPemohon: "Imran Rosyadi",
    nipPemohon: "BMS-MTN-0074",
    keterangan: "Penggantian bearing SKF spherical roller & grease Shell Gadus S2 V220 untuk overhead crane bay 2 kapasitas 20 Ton.",
    status: "Dokumen Dipinjam",
    lokasiRak: "Rak D",
    nomorBox: "Box 09",
    dokumen: "PB_Maintenance_Crane_Bay2.pdf",
    dokumenSize: "3.2 MB",
    uploadedAt: "2026-09-25 14:15",
    uploadedBy: "Budi Hendrawan (Admin)",
    items: [
      { nama: "SKF Spherical Roller Bearing 22216 EK", partNumber: "SKF-22216-EK", jumlah: 2, satuan: "Unit", hargaSatuan: 2450000, spesifikasi: "Tapered bore include adapter sleeve" },
      { nama: "Shell Gadus S2 V220 2 Grease EP", partNumber: "SHL-GDS-18KG", jumlah: 1, satuan: "Pail", hargaSatuan: 1650000, spesifikasi: "Pail 18 Kg gemuk tekanan tinggi" }
    ],
    catatanArsip: "Dokumen fisik asli sedang dipinjam oleh Bagian Keuangan (Ibu Linda) pada 27 Sep 2026 untuk keperluan audit internal."
  },
  {
    id: "pb-bms-006",
    nomorPb: "PB/BMS-OPS/2026/09/006",
    tanggalPb: "2026-09-26",
    bagian: "Operasional Lapangan",
    namaPemohon: "Bambang Triyono",
    nipPemohon: "BMS-OPS-0023",
    keterangan: "Permintaan thread compound (kopling dope) Bestolife 2000 & thread protector pipa casing 9-5/8 inch 50 pasang.",
    status: "Terverifikasi & Diarsipkan",
    lokasiRak: "Rak A",
    nomorBox: "Box 12",
    dokumen: "Scan_PB_BMS_OPS_DopeThread.pdf",
    dokumenSize: "1.7 MB",
    uploadedAt: "2026-09-26 15:30",
    uploadedBy: "Siti Rahmawati (Petugas)",
    items: [
      { nama: "Bestolife 2000 Non-Metallic Thread Compound", partNumber: "BST-2000-5GAL", jumlah: 2, satuan: "Pail", hargaSatuan: 3400000, spesifikasi: "Pail 5 Gallon untuk casing & tubing" },
      { nama: "Thread Protector Composite 9-5/8 inch Pin & Box", partNumber: "PRT-958-COMP", jumlah: 50, satuan: "Pasang", hargaSatuan: 85000, spesifikasi: "Heavy duty steel-composite casing protector" }
    ],
    catatanArsip: "Tersimpan di Rak A Box 12. Validasi dokumen lengkap dengan signature client PT Pertamina Hulu Rokan."
  },
  {
    id: "pb-bms-007",
    nomorPb: "PB/BMS-QA/2026/09/007",
    tanggalPb: "2026-09-27",
    bagian: "Quality Assurance / QC",
    namaPemohon: "Maya Indriyani, S.T.",
    nipPemohon: "BMS-QA-0019",
    keterangan: "Pengadaan calibration standard block IIW Type 1 & digital ultrasonic thickness gauge probe dual element 5MHz.",
    status: "Selesai Pengadaan",
    lokasiRak: "Rak B",
    nomorBox: "Box 04",
    dokumen: "Scan_PB_QA_Calibration_Block.pdf",
    dokumenSize: "2.8 MB",
    uploadedAt: "2026-09-27 10:45",
    uploadedBy: "Budi Hendrawan (Admin)",
    items: [
      { nama: "Calibration Test Block IIW Type 1 Carbon Steel", partNumber: "BLK-IIW-V1-CS", jumlah: 1, satuan: "Set", hargaSatuan: 4750000, spesifikasi: "Standar ISO 2400 include box kayu & sertifikat" },
      { nama: "Ultrasonic Transducer Probe Dual Element 5MHz", partNumber: "UT-PRB-5MHZ", jumlah: 2, satuan: "Unit", hargaSatuan: 2150000, spesifikasi: "Kabel Lemo 00 to Microdot" }
    ],
    catatanArsip: "Telah diarsipkan di Rak B Box 04. Sertifikat kalibrasi pabrik dilampirkan."
  },
  {
    id: "pb-bms-008",
    nomorPb: "PB/BMS-WH/2026/09/008",
    tanggalPb: "2026-09-28",
    bagian: "Warehouse & Logistik",
    namaPemohon: "Wahyu Setiadi",
    nipPemohon: "BMS-LOG-0062",
    keterangan: "Pengadaan barcode ribbon wax-resin 110mm x 300m dan label thermal transfer tahan oli untuk penomoran racking gudang baru.",
    status: "Menunggu Arsip Fisik",
    lokasiRak: "Rak C",
    nomorBox: "Box 07",
    dokumen: "Form_PB_Barcode_Ribbon_Gudang.pdf",
    dokumenSize: "890 KB",
    uploadedAt: "2026-09-28 08:30",
    uploadedBy: "Budi Hendrawan (Admin)",
    items: [
      { nama: "Ribbon Barcode Wax-Resin 110mm x 300m", partNumber: "RBN-WXR-110", jumlah: 6, satuan: "Roll", hargaSatuan: 145000, spesifikasi: "Core 1 inch out face" },
      { nama: "Label Stiker Polyart Tahan Oli 100x50mm", partNumber: "LBL-PLY-10050", jumlah: 10, satuan: "Roll", hargaSatuan: 210000, spesifikasi: "Isi 1.000 label per roll" }
    ],
    catatanArsip: "Input tanggal hari ini. Dokumen menunggu verifikasi fisik dari pengawas gudang."
  }
];
