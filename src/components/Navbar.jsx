import { Leaf, Book, Wallet, FileText, User, LogOut } from 'lucide-react';

export default function Navbar({ isAuthenticated, onLogout, onOpenAuth, vistaActual, onChangeVista }) {

  const navItemStyle = (id) => ({
    display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 1rem',
    borderRadius: '10px', cursor: 'pointer', fontWeight: 600, fontSize: '0.95rem',
    background: vistaActual === id ? '#fdf0ec' : 'transparent',
    color: vistaActual === id ? '#d1694e' : '#636b7e',
    transition: 'all 0.2s ease', border: 'none', outline: 'none'
  });

  const mobileItemStyle = (id) => ({
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem',
    background: 'transparent', border: 'none', outline: 'none',
    color: vistaActual === id ? '#d1694e' : '#9c9589',
    fontSize: '0.7rem', fontWeight: 600, cursor: 'pointer'
  });

  return (
    <>
      {/* --- BARRA SUPERIOR (PC) --- */}
      <nav className="card desktop-nav" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <div style={{ background: '#e07a5f', padding: '0.5rem', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Leaf color="white" size={20} />
          </div>
          <h1 style={{ fontSize: '1.4rem', margin: 0 }}>Koru</h1>
        </div>

        {isAuthenticated ? (
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', background: '#fcfaf6', padding: '0.3rem', borderRadius: '14px', border: '1px solid #eee7de' }}>
            <button style={navItemStyle('cuadernos')} onClick={() => onChangeVista('cuadernos')}><Book size={18} /> Cuadernos</button>
            <button style={navItemStyle('finanzas')} onClick={() => onChangeVista('finanzas')}><Wallet size={18} /> Finanzas</button>
            <button style={navItemStyle('diario')} onClick={() => onChangeVista('diario')}><FileText size={18} /> Diario</button>
            <div style={{ width: '1px', height: '24px', background: '#e8dfd5', margin: '0 0.5rem' }}></div>
            <button style={navItemStyle('perfil')} onClick={() => onChangeVista('perfil')}><User size={18} /></button>
            <button className="btn-secondary" onClick={onLogout} style={{ padding: '0.5rem', marginLeft: '0.5rem', borderRadius: '10px' }} title="Salir"><LogOut size={18} /></button>
          </div>
        ) : (
          <button onClick={onOpenAuth}>Entrar a mi Diario</button>
        )}
      </nav>

      {/* --- BARRA INFERIOR TIPO APP (MÓVILES) --- */}
      {isAuthenticated && (
        <nav className="mobile-nav">
          <button style={mobileItemStyle('cuadernos')} onClick={() => onChangeVista('cuadernos')}>
            <Book size={24} /> Cuadernos
          </button>
          <button style={mobileItemStyle('finanzas')} onClick={() => onChangeVista('finanzas')}>
            <Wallet size={24} /> Finanzas
          </button>
          <button style={mobileItemStyle('diario')} onClick={() => onChangeVista('diario')}>
            <FileText size={24} /> Diario
          </button>
          <button style={mobileItemStyle('perfil')} onClick={() => onChangeVista('perfil')}>
            <User size={24} /> Perfil
          </button>
        </nav>
      )}
    </>
  );
}