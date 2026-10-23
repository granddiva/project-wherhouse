import React, { useState, useEffect } from 'react';
import { INITIAL_PB_DOCS, DEFAULT_USERS } from './data/initialData';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import DocumentList from './components/DocumentList';
import RackStorageView from './components/RackStorageView';
import UploadModal from './components/UploadModal';
import DetailModal from './components/DetailModal';
import DownloadModal from './components/DownloadModal';
import DeleteModal from './components/DeleteModal';
import LogoutModal from './components/LogoutModal';

const STORAGE_KEY_DOCS = 'BMS_PB_DOCUMENTS_V1';
const STORAGE_KEY_USER = 'BMS_PB_AUTH_USER_V1';

export default function App() {
  // Authentication State
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem(STORAGE_KEY_USER);
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  // Documents State (Local State + LocalStorage persistence)
  const [documents, setDocuments] = useState(() => {
    try {
      const savedDocs = localStorage.getItem(STORAGE_KEY_DOCS);
      return savedDocs ? JSON.parse(savedDocs) : INITIAL_PB_DOCS;
    } catch {
      return INITIAL_PB_DOCS;
    }
  });

  // Current Active View: 'dashboard' | 'documents' | 'racks'
  const [currentView, setCurrentView] = useState('documents');

  // Modals State
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState(null);

  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [detailDoc, setDetailDoc] = useState(null);

  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [downloadDoc, setDownloadDoc] = useState(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteDoc, setDeleteDoc] = useState(null);

  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  // Toast Notifications State
  const [toasts, setToasts] = useState([]);

  // Save documents to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_DOCS, JSON.stringify(documents));
    } catch (e) {
      console.error('Gagal menyimpan ke LocalStorage:', e);
    }
  }, [documents]);

  // Toast Trigger Helper
  const showToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  // Auth Handlers
  const handleLogin = (user) => {
    setCurrentUser(user);
    try {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    } catch {}
  };

  const handlePromptLogout = () => {
    setIsLogoutOpen(true);
  };

  const handleConfirmLogout = () => {
    setIsLogoutOpen(false);
    setCurrentUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY_USER);
    } catch {}
    showToast('Anda telah keluar dari sistem warehouse', 'info');
  };

  const handleUpdateUserName = (newName) => {
    if (!newName || !newName.trim()) return;
    const formattedName = newName.trim();
    const initials = formattedName
      .split(' ')
      .filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2) || 'US';

    const updatedUser = {
      ...(currentUser || {}),
      name: formattedName,
      avatar: initials
    };
    setCurrentUser(updatedUser);
    try {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(updatedUser));
    } catch {}
    showToast(`Nama profil berhasil diubah menjadi "${formattedName}"`, 'success');
  };

  const handleLogout = handlePromptLogout;

  // Document Handlers (Upload / Edit)
  const handleOpenUpload = () => {
    setEditingDoc(null);
    setIsUploadOpen(true);
  };

  const handleOpenEdit = (doc) => {
    setEditingDoc(doc);
    setIsUploadOpen(true);
  };

  const handleSaveDocument = (docData, isEdit) => {
    if (isEdit) {
      setDocuments((prev) =>
        prev.map((d) => (d.id === docData.id ? { ...d, ...docData } : d))
      );
      showToast(`Data dokumen PB ${docData.nomorPb} berhasil diperbarui`, 'success');
    } else {
      setDocuments((prev) => [docData, ...prev]);
      showToast(`Dokumen PB ${docData.nomorPb} berhasil diunggah & diarsipkan`, 'success');
    }
  };

  // Detail Modal Handlers
  const handleOpenDetail = (doc) => {
    setDetailDoc(doc);
    setIsDetailOpen(true);
  };

  // Download Modal Handlers
  const handleOpenDownload = (doc) => {
    setDownloadDoc(doc);
    setIsDownloadOpen(true);
  };

  // Delete Modal Handlers
  const handleOpenDelete = (doc) => {
    setDeleteDoc(doc);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = (docId) => {
    const target = documents.find((d) => d.id === docId);
    setDocuments((prev) => prev.filter((d) => d.id !== docId));
    setIsDeleteOpen(false);
    showToast(`Dokumen PB ${target ? target.nomorPb : ''} berhasil dihapus dari sistem`, 'warning');
  };

  // If user is not logged in, show Login Screen (Fitur 1: Login)
  if (!currentUser) {
    return (
      <>
        <Login onLogin={handleLogin} showToast={showToast} />
        {/* Toast Container */}
        <div className="toast-stack">
          {toasts.map((t) => (
            <div key={t.id} className={`toast-item toast-${t.type}`}>
              <span>{t.message}</span>
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <div className="app-layout">
      {/* Sidebar Navigation */}
      <Sidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        currentUser={currentUser}
        onPromptLogout={handlePromptLogout}
        onLogout={handlePromptLogout}
        onOpenUpload={handleOpenUpload}
        onUpdateUserName={handleUpdateUserName}
        docCount={documents.length}
      />

      {/* Main Content Area */}
      <div className="main-wrapper">
        <Navbar
          currentView={currentView}
          currentUser={currentUser}
          onOpenUpload={handleOpenUpload}
          onPromptLogout={handlePromptLogout}
          onLogout={handlePromptLogout}
          onToggleMobileSidebar={() => {
            document.querySelector('.app-sidebar')?.classList.toggle('open');
          }}
        />

        <main className="content-container">
          {/* Fitur 2: Dashboard */}
          {currentView === 'dashboard' && (
            <Dashboard
              documents={documents}
              onNavigateToDocs={() => setCurrentView('documents')}
              onOpenUpload={handleOpenUpload}
            />
          )}

          {/* Fitur 3, 5, 6, 7, 8, 9, 10: Data Dokumen PB, Search, Filter, Aksi */}
          {currentView === 'documents' && (
            <DocumentList
              documents={documents}
              onOpenUpload={handleOpenUpload}
              onOpenDetail={handleOpenDetail}
              onOpenDownload={handleOpenDownload}
              onOpenEdit={handleOpenEdit}
              onOpenDelete={handleOpenDelete}
              onResetFiltersNotification={() => showToast('Filter pencarian telah di-reset', 'info')}
            />
          )}

          {/* Tata Letak Rak Gudang */}
          {currentView === 'racks' && (
            <RackStorageView
              documents={documents}
              onOpenDetail={handleOpenDetail}
            />
          )}
        </main>
      </div>

      {/* Fitur 4 & 9: Modal Upload / Edit Dokumen PB */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onSave={handleSaveDocument}
        editingDoc={editingDoc}
        currentUser={currentUser}
        showToast={showToast}
      />

      {/* Fitur 7: Modal Detail Dokumen */}
      <DetailModal
        doc={detailDoc}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onOpenDownload={handleOpenDownload}
        onOpenEdit={handleOpenEdit}
      />

      {/* Fitur 8: Modal Download & Cetak Dokumen Resmi */}
      <DownloadModal
        doc={downloadDoc}
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
        showToast={showToast}
      />

      {/* Fitur 10: Modal Konfirmasi Hapus Data PB */}
      <DeleteModal
        doc={deleteDoc}
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirmDelete={handleConfirmDelete}
      />

      {/* Modal Konfirmasi Logout */}
      <LogoutModal
        isOpen={isLogoutOpen}
        onClose={() => setIsLogoutOpen(false)}
        onConfirm={handleConfirmLogout}
        currentUser={currentUser}
      />

      {/* Toast Notification Container */}
      <div className="toast-stack">
        {toasts.map((t) => (
          <div key={t.id} className={`toast-item toast-${t.type}`}>
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
              {t.type === 'success' && (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
              )}
              {t.type === 'warning' && (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
              )}
              {t.type === 'danger' && (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
              )}
              {t.type === 'info' && (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              )}
            </svg>
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
