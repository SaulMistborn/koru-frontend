import { useState, useEffect } from 'react';
import { User, Award, Flame, Target, Book, ArrowLeft, Camera } from 'lucide-react';
import api from '../api/client';

// Frases inspiradoras relacionadas al concepto de "Koru" (crecimiento, paz, naturaleza)
const frasesMotivacion = [
  "Un pequeño paso hoy es el bosque del mañana.",
  "La claridad no se encuentra, se construye.",
  "Tu ritmo es el correcto. Respira.",
  "La constancia es más poderosa que la velocidad.",
  "Cada día es un lienzo en blanco para tu evolución.",
  "Ordena tu entorno para ordenar tu mente.",
  "El progreso silencioso sigue siendo progreso.",
  "Eres el arquitecto de tu propia tranquilidad.",
  "Las grandes montañas se escalan paso a paso.",
  "Hoy es un buen día para sembrar una nueva intención."
];

export default function ProfileView({ onVolver, mostrarToast }) {
  const [stats, setStats] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [errorLocal, setErrorLocal] = useState('');

  const [editandoAvatar, setEditandoAvatar] = useState(false);
  const [nuevaUrlAvatar, setNuevaUrlAvatar] = useState('');

  // Elegir una frase basada en el día del mes para que cambie a diario
  const diaMes = new Date().getDate();
  const fraseDelDia = frasesMotivacion[diaMes % frasesMotivacion.length];

  const fetchStats = async () => {
    try {
      const res = await api.get('/perfil/stats');
      setStats(res.data);
    } catch (err) {
      console.error('Error al cargar perfil:', err);
      setErrorLocal(err.message || 'El servidor no responde.');
      mostrarToast('Error al cargar tus estadísticas', 'error');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    fetchStats();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGuardarAvatar = async () => {
    if (!nuevaUrlAvatar.trim()) {
      setEditandoAvatar(false);
      return;
    }

    try {
      await api.post('/perfil/avatar', { avatar_url: nuevaUrlAvatar });
      mostrarToast('Foto de perfil actualizada', 'success');
      setEditandoAvatar(false);
      setNuevaUrlAvatar('');
      fetchStats(); // Recargar stats para ver la nueva foto
    } catch (err) {
      mostrarToast('No se pudo guardar la foto', 'error');
    }
  };

  if (cargando) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh', color: '#8c6d58' }}>
        <p>Cargando tu evolución...</p>
      </div>
    );
  }

  if (errorLocal || !stats) {
    return (
      <div style={{ textAlign: 'center', marginTop: '4rem' }}>
        <p style={{ color: '#d64550', marginBottom: '1rem', fontWeight: 600 }}>No pudimos conectar con el servidor.</p>
        <button className="btn-secondary" onClick={onVolver}>
          <ArrowLeft size={18} /> Volver a mi diario
        </button>
      </div>
    );
  }

  return (
    <div style={{ animation: 'fadeIn 0.3s ease' }}>

      <button className="btn-secondary" onClick={onVolver} style={{ marginBottom: '2rem' }}>
        <ArrowLeft size={18} /> Volver a mi diario
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'start' }}>

        {/* Tarjeta de Usuario, Avatar y Frase */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', background: '#fdfaf6', border: '1px solid #f0e6da' }}>

          {/* Contenedor del Avatar */}
          <div
            onClick={() => setEditandoAvatar(true)}
            title="Cambiar foto de perfil"
            style={{
              width: '110px', height: '110px', borderRadius: '50%', background: '#e07a5f', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.8rem', fontWeight: 700,
              marginBottom: '1rem', boxShadow: '0 8px 24px rgba(224, 122, 95, 0.25)',
              position: 'relative', cursor: 'pointer', overflow: 'hidden', border: '3px solid #fff'
            }}
          >
            {stats.avatar ? (
              <img src={stats.avatar} alt="Perfil" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              stats.nombre.charAt(0).toUpperCase()
            )}

            {/* Overlay para indicar que se puede clickear */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(45, 49, 66, 0.6)',
              padding: '0.2rem', display: 'flex', justifyContent: 'center'
            }}>
              <Camera size={14} color="#fff" />
            </div>
          </div>

          {/* Formulario rápido para URL de avatar */}
          {editandoAvatar && (
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', width: '100%' }}>
              <input
                type="text"
                placeholder="Pega la URL de una imagen..."
                value={nuevaUrlAvatar}
                onChange={(e) => setNuevaUrlAvatar(e.target.value)}
                style={{ padding: '0.5rem', fontSize: '0.8rem' }}
                autoFocus
              />
              <button className="btn-sage" onClick={handleGuardarAvatar} style={{ padding: '0.5rem 0.8rem', fontSize: '0.8rem' }}>
                Ok
              </button>
            </div>
          )}

          <h2 style={{ fontSize: '1.6rem', marginBottom: '0.2rem', color: '#1f222e' }}>{stats.nombre}</h2>
          <p style={{ color: '#8c6d58', fontSize: '0.85rem', marginBottom: '1.2rem', fontWeight: 500 }}>{stats.email}</p>

          {/* Frase del día */}
          <div style={{ background: '#f4efe8', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', width: '100%' }}>
            <p style={{ fontStyle: 'italic', color: '#636b7e', fontSize: '0.9rem', lineHeight: '1.5' }}>
              "{fraseDelDia}"
            </p>
          </div>

          <div style={{ background: '#ffffff', width: '100%', padding: '1.5rem', borderRadius: '16px', border: '1px solid #eee7de', boxShadow: '0 4px 12px rgba(138, 121, 103, 0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontWeight: 600, color: '#636b7e' }}>Nivel de Evolución</span>
              <span style={{ fontWeight: 800, color: '#5b8266', fontSize: '1.2rem' }}>Lvl. {stats.nivel}</span>
            </div>
            <div style={{ height: '8px', background: '#f3ece3', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${Math.min((stats.nivel * 10), 100)}%`, height: '100%', background: 'linear-gradient(90deg, #e07a5f, #5b8266)', borderRadius: '4px' }}></div>
            </div>
          </div>
        </div>

        {/* Tarjeta de Estadísticas Globales */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <Award size={22} color="#e07a5f" />
            <h3 style={{ fontSize: '1.2rem' }}>Tu recorrido en Koru</h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ padding: '1.25rem', background: '#fdfbf9', borderRadius: '14px', border: '1px solid #ede5dc', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#8c6d58' }}>
                <Target size={18} />
                <span style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase' }}>Metas Logradas</span>
              </div>
              <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#2d3142' }}>{stats.metas_completadas}</span>
            </div>

            <div style={{ padding: '1.25rem', background: '#fff9f7', borderRadius: '14px', border: '1px solid #f9e8e3', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#d1694e' }}>
                <Flame size={18} />
                <span style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase' }}>Racha Máxima</span>
              </div>
              <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#e07a5f' }}>{stats.racha_global} <span style={{fontSize: '0.9rem', fontWeight: 500}}>días</span></span>
            </div>

            <div style={{ padding: '1.25rem', background: '#f4f8f5', borderRadius: '14px', border: '1px solid #e1eee5', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4f7359' }}>
                <User size={18} />
                <span style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase' }}>Hábitos Activos</span>
              </div>
              <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#5b8266' }}>{stats.habitos_activos}</span>
            </div>

            <div style={{ padding: '1.25rem', background: '#fdfbf9', borderRadius: '14px', border: '1px solid #ede5dc', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#8c6d58' }}>
                <Book size={18} />
                <span style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase' }}>Cuadernos</span>
              </div>
              <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#2d3142' }}>{stats.total_cuadernos}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}