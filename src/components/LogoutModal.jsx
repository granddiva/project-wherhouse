import React, { useState } from 'react';
import LogoutModal from './LogoutModal'; // Pastikan path file LogoutModal sesuai dengan folder kamu

export default function Dashboard() {
  // 1. State untuk membuka & menutup modal logout
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // 2. Data dummy user (sesuaikan jika kamu sudah punya data user sendiri)
  const currentUser = {
    name: 'Pengguna',
    role: 'Warehouse'
  };

  // 3. Fungsi saat tombol "Ya, Keluar" diklik
  const handleConfirmLogout = () => {
    // Hapus session/token
    localStorage.clear();
    sessionStorage.clear();

    // Tutup modal
    setIsLogoutModalOpen(false);

    // Pindah ke halaman login
    window.location.href = '/login';
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* Tombol pemicu untuk membuka modal Logout */}
      <button
        type="button"
        className="btn-primary"
        onClick={() => setIsLogoutModalOpen(true)}
      >
        Keluar / Logout
      </button>

      {/* Komponen Modal Logout */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleConfirmLogout}
        currentUser={currentUser}
      />
    </div>
  );
}