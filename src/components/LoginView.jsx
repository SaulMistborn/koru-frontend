import { useState } from 'react';
import { Feather, Mail, Lock, ArrowRight, X, User } from 'lucide-react';

export default function LoginView({ onLogin, onRegister, onVolver, error }) {
  const [isRegistering, setIsRegistering] = useState(false); // Estado para alternar modos

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegistering) {
      onRegister(nombre, email, password);
    } else {
      onLogin(email, password);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Feather size={20} color="#e07a5f" />
            <span style={{ fontWeight: 700, fontSize: '1.1rem', color: '#1f222e' }}>
              {isRegistering ? 'Crear mi Diario Koru' : 'Entrar a Koru'}
            </span>
          </div>
          <button
            onClick={onVolver}
            className="btn-secondary"
            style={{ padding: '0.35rem 0.5rem', borderRadius: '8px' }}
            title="Volver"
          >
            <X size={16} />
          </button>
        </div>

        <p style={{ fontSize: '0.88rem', color: '#636b7e', marginBottom: '1.5rem' }}>
          {isRegistering
            ? 'Regístrate gratis para comenzar a construir tus cuadernos y hábitos.'
            : 'Accede a tus espacios de trabajo personales y retoma el camino trazado.'}
        </p>

        {error && (
          <div style={{
            padding: '0.75rem 1rem',
            marginBottom: '1.25rem',
            background: '#fdf0f0',
            border: '1px solid #f9d2d5',
            borderRadius: '10px',
            color: '#d64550',
            fontSize: '0.85rem'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

          {/* Campo Nombre (Solo visible en registro) */}
          {isRegistering && (
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#636b7e', marginBottom: '0.35rem', fontWeight: 600 }}>
                Tu Nombre
              </label>
              <div className="input-group">
                <User className="input-icon" size={17} />
                <input
                  type="text"
                  className="has-icon"
                  placeholder="Ej. Saúl Nájera"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required={isRegistering}
                />
              </div>
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: '#636b7e', marginBottom: '0.35rem', fontWeight: 600 }}>
              Correo electrónico
            </label>
            <div className="input-group">
              <Mail className="input-icon" size={17} />
              <input
                type="email"
                className="has-icon"
                placeholder="tu@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: '#636b7e', marginBottom: '0.35rem', fontWeight: 600 }}>
              Contraseña
            </label>
            <div className="input-group">
              <Lock className="input-icon" size={17} />
              <input
                type="password"
                className="has-icon"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" style={{ marginTop: '0.75rem', padding: '0.85rem' }}>
            <span>{isRegistering ? 'Comenzar mi historia' : 'Abrir mis páginas'}</span>
            <ArrowRight size={17} />
          </button>
        </form>

        {/* Alternador entre Login y Registro */}
        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.85rem' }}>
          <span style={{ color: '#636b7e' }}>
            {isRegistering ? '¿Ya tienes un diario?' : '¿Aún no tienes cuenta?'}
          </span>{' '}
          <button
            type="button"
            onClick={() => setIsRegistering(!isRegistering)}
            style={{
              background: 'none',
              border: 'none',
              color: '#e07a5f',
              fontWeight: 700,
              padding: 0,
              boxShadow: 'none',
              cursor: 'pointer',
              display: 'inline'
            }}
          >
            {isRegistering ? 'Entra aquí' : 'Crea uno gratis'}
          </button>
        </div>

      </div>
    </div>
  );
}