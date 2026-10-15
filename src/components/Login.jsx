import React, { useState } from 'react';
import { DEFAULT_USERS } from '../data/initialData';
import besmindoLogo from '../assets/besmindo-logo.jpg';

export default function Login({ onLogin, showToast }) {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const foundUser = DEFAULT_USERS.find(
      (u) => u.username.toLowerCase() === username.trim().toLowerCase() && u.password === password
    );

    if (foundUser) {
      onLogin(foundUser);
      showToast(`Selamat datang, ${foundUser.name} (${foundUser.role})`, 'success');
    } else {
      showToast('Username atau password salah! Silakan coba lagi.', 'danger');
    }
  };

  const handleQuickFill = (roleType) => {
    if (roleType === 'admin') {
      setUsername('admin');
      setPassword('admin123');
    } else {
      setUsername('petugas');
      setPassword('petugas123');
    }
  };

  return (
    <div className="login-screen">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo-container">
            <img
              src={besmindoLogo}
              alt="PT Besmindo Materi Sewatama"
              className="login-logo-img"
            />
          </div>
          <div className="login-brand-badge">
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
            </svg>
            Warehouse Archive System
          </div>
          <h1 className="login-title">Sistem Pengarsipan &amp; Pencarian PB</h1>
          <p className="login-company">PT BESMINDO MATERI SEWATAMA</p>
          <p className="login-subtitle">Silakan masuk menggunakan akun Petugas atau Admin Warehouse</p>
        </div>

        {/* Quick Fill Preset Buttons */}
        <div className="quick-fill-box">
          <span className="quick-fill-label">Pilih Akun Demo Cepat:</span>
          <div className="quick-fill-grid">
            <button
              type="button"
              className="btn-quick-fill"
              onClick={() => handleQuickFill('admin')}
            >
              <strong>Admin Warehouse</strong>
              <span>User: admin / admin123</span>
            </button>
            <button
              type="button"
              className="btn-quick-fill"
              onClick={() => handleQuickFill('petugas')}
            >
              <strong>Petugas Arsip</strong>
              <span>User: petugas / petugas123</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="username">Username / ID Pegawai</label>
            <div className="form-input-icon-wrap">
              <svg className="form-input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
              <input
                id="username"
                type="text"
                className="form-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username..."
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Kata Sandi</label>
            <div className="form-input-icon-wrap">
              <svg className="form-input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
              <input
                id="password"
                type="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password..."
                required
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', fontSize: '0.8rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', color: 'var(--text-muted)' }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Ingat sesi saya
            </label>
            <span style={{ color: 'var(--bms-blue-600)', fontWeight: 600, cursor: 'pointer' }} onClick={() => showToast('Hubungi Dept IT / Supervisor Warehouse untuk reset akun', 'info')}>
              Bantuan Akun?
            </span>
          </div>

          <button type="submit" className="btn-login-submit">
            <span>Masuk ke Sistem Warehouse</span>
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </button>
        </form>

        <div className="login-footer-info">
          &copy; 2026 PT Besmindo Materi Sewatama &bull; Oilfield Warehouse Division
        </div>
      </div>
    </div>
  );
}
