import { useState, useEffect, useCallback } from 'react';
import api from './api/client';
import Navbar from './components/Navbar';
import LandingFeed from './components/LandingFeed';
import WorkspaceBar from './components/WorkspaceBar';
import WorkspaceStats from './components/WorkspaceStats';
import HabitSection from './components/HabitSection';
import FinanceSection from './components/FinanceSection';
import MetaSection from './components/MetaSection';
import NotesSection from './components/NotesSection';
import WishlistSection from './components/WishlistSection';
import ProfileView from './components/ProfileView';
import LoginView from './components/LoginView';
import Toast from './components/Toast';
import ConfirmModal from './components/ConfirmModal';

function App() {
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [modalLoginOpen, setModalLoginOpen] = useState(false);

  // Vistas: 'cuadernos', 'finanzas', 'diario', 'perfil'
  const [vistaActual, setVistaActual] = useState('cuadernos');

  const [tableros, setTableros] = useState([]);
  const [tableroActivo, setTableroActivo] = useState(null);
  const [metas, setMetas] = useState([]);
  const [habitos, setHabitos] = useState([]);

  // Datos Globales
  const [transacciones, setTransacciones] = useState([]);
  const [notas, setNotas] = useState([]);
  const [deseos, setDeseos] = useState([]);

  const [toast, setToast] = useState({ mensaje: '', tipo: '' });
  const [modalConfig, setModalConfig] = useState({ isOpen: false });

  const mostrarToast = (m, t = 'info') => { setToast({ mensaje: m, tipo: t }); setTimeout(() => setToast({ mensaje: '', tipo: '' }), 3000); };
  const cerrarModal = () => setModalConfig({ isOpen: false });

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token'); setToken(''); setTableros([]); setMetas([]); setHabitos([]);
    setTransacciones([]); setNotas([]); setDeseos([]); setTableroActivo(null); setVistaActual('cuadernos');
  }, []);

  // Carga Local (Cuadernos)
  const cargarLocal = useCallback(async (id) => {
    if (!token || !id) return;
    try {
      const [rMetas, rHabitos] = await Promise.all([ api.get(`/metas/?tablero_id=${id}`), api.get(`/habitos/?tablero_id=${id}`) ]);
      setMetas(rMetas.data); setHabitos(rHabitos.data);
    } catch (err) { }
  }, [token]);

  // Carga Global (Finanzas, Notas, Deseos)
  const cargarGlobales = useCallback(async () => {
    if (!token) return;
    try {
      const [rTrans, rNotas, rDeseos] = await Promise.all([ api.get('/transacciones/'), api.get('/notas/'), api.get('/deseos/') ]);
      setTransacciones(rTrans.data); setNotas(rNotas.data); setDeseos(rDeseos.data);
    } catch (err) { }
  }, [token]);

  useEffect(() => {
    let activo = true;
    const fetchInicial = async () => {
      if (!token) return;
      try {
        const resTab = await api.get('/tableros/');
        if (!activo) return;
        setTableros(resTab.data);
        if (resTab.data.length > 0) {
          setTableroActivo(resTab.data[0].id);
          cargarLocal(resTab.data[0].id);
        }
        cargarGlobales();
      } catch (err) {
        if (err.response?.status === 401) handleLogout();
      }
    };
    fetchInicial();
    return () => { activo = false; };
  }, [token, handleLogout, cargarLocal, cargarGlobales]);

  const handleLogin = async (e, p) => {
    try { const res = await api.post('/login/', { email: e, password: p }); localStorage.setItem('token', res.data.access_token); setToken(res.data.access_token); setModalLoginOpen(false); } catch (err) { mostrarToast('Error', 'error'); }
  };
  const handleRegister = async (n, e, p) => {
    try { await api.post('/usuarios/', { nombre: n, email: e, password: p }); await handleLogin(e, p); } catch (err) { mostrarToast('Error', 'error'); }
  };

  return (
    <div className="dashboard-container">
      <Toast mensaje={toast.mensaje} tipo={toast.tipo} />
      <ConfirmModal isOpen={modalConfig.isOpen} titulo={modalConfig.titulo} mensaje={modalConfig.mensaje} onConfirm={modalConfig.onConfirm} onCancel={cerrarModal} />

      <Navbar isAuthenticated={!!token} onLogout={handleLogout} onOpenAuth={() => setModalLoginOpen(true)} vistaActual={vistaActual} onChangeVista={setVistaActual} />

      {modalLoginOpen && <LoginView onLogin={handleLogin} onRegister={handleRegister} onVolver={() => setModalLoginOpen(false)} />}

      {!token ? (
        <LandingFeed onOpenAuth={() => setModalLoginOpen(true)} />
      ) : vistaActual === 'perfil' ? (
        <ProfileView onVolver={() => setVistaActual('cuadernos')} mostrarToast={mostrarToast} />
      ) : vistaActual === 'finanzas' ? (
        // VISTA GLOBAL: FINANZAS Y DESEOS
        <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
          <WishlistSection deseos={deseos} transacciones={transacciones} onAgregarDeseo={async (d) => { const res = await api.post('/deseos/', d); setDeseos([res.data, ...deseos]); }} onComprarDeseo={async (d) => { await api.post(`/deseos/${d.id}/comprar`); cargarGlobales(); mostrarToast('¡Comprado!', 'success'); }} onBorrarDeseo={async (id) => { await api.delete(`/deseos/${id}`); setDeseos(deseos.filter(d => d.id !== id)); }} />
          <FinanceSection transacciones={transacciones} onAgregarTransaccion={async (d) => { const res = await api.post('/transacciones/', d); setTransacciones([res.data, ...transacciones]); }} onBorrarTransaccion={async (id) => { await api.delete(`/transacciones/${id}`); setTransacciones(transacciones.filter(t => t.id !== id)); }} />
        </div>
      ) : vistaActual === 'diario' ? (
        // VISTA GLOBAL: DIARIO
        <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
          <NotesSection notas={notas} onAgregarNota={async (d) => { const res = await api.post('/notas/', d); setNotas([res.data, ...notas]); }} onActualizarNota={async (id, d) => { const res = await api.put(`/notas/${id}`, d); setNotas(notas.map(n => n.id === id ? res.data : n)); }} onBorrarNota={async (id) => { await api.delete(`/notas/${id}`); setNotas(notas.filter(n => n.id !== id)); }} />
        </div>
      ) : (
        // VISTA LOCAL: CUADERNOS
        <div className="dashboard-grid">
          <aside>
            <WorkspaceBar tableros={tableros} tableroActivo={tableroActivo} onSelectTablero={(id) => { setTableroActivo(id); cargarLocal(id); }} onCrearTablero={async (n) => { const res = await api.post('/tableros/', { nombre: n }); setTableros([...tableros, res.data]); setTableroActivo(res.data.id); cargarLocal(res.data.id); }} onEliminarTablero={async (id) => { await api.delete(`/tableros/${id}`); setTableros(tableros.filter(t => t.id !== id)); }} />
          </aside>
          <main>
            {tableroActivo ? (
              <>
                <WorkspaceStats metas={metas} habitos={habitos} />
                <HabitSection habitos={habitos} onAgregarHabito={async (t, i) => { const res = await api.post('/habitos/', { titulo: t, icono: i, tablero_id: tableroActivo }); setHabitos([...habitos, res.data]); }} onToggleHabito={async (id, f) => { const res = await api.post(f ? `/habitos/${id}/toggle?fecha=${f}` : `/habitos/${id}/toggle`); setHabitos(habitos.map(h => h.id === id ? res.data : h)); }} onBorrarHabito={async (id) => { await api.delete(`/habitos/${id}`); setHabitos(habitos.filter(h => h.id !== id)); }} />
                <MetaSection metas={metas} onAgregarMeta={async (t) => { const res = await api.post('/metas/', { titulo: t, tablero_id: tableroActivo }); setMetas([...metas, res.data]); }} onToggleMeta={async (id) => { const res = await api.put(`/metas/${id}`); setMetas(metas.map(m => m.id === id ? res.data : m)); }} onBorrarMeta={async (id) => { await api.delete(`/metas/${id}`); setMetas(metas.filter(m => m.id !== id)); }} />
              </>
            ) : (
              <p style={{ textAlign: 'center', color: '#8c6d58' }}>Selecciona un cuaderno.</p>
            )}
          </main>
        </div>
      )}
    </div>
  );
}

export default App;