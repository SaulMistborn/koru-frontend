import { useState } from 'react';
import { Plus, Trash2, BookOpen } from 'lucide-react';

export default function WorkspaceBar({ tableros, tableroActivo, onSelectTablero, onCrearTablero, onEliminarTablero }) {
  const [nuevoNombre, setNuevoNombre] = useState('');

  const handleCrear = (e) => {
    e.preventDefault();
    if (nuevoNombre.trim()) {
      onCrearTablero(nuevoNombre);
      setNuevoNombre('');
    }
  };

  const sugerencias = [
    { nombre: 'Gimnasio & Salud', icono: '💪' },
    { nombre: 'Finanzas Claras', icono: '💰' },
    { nombre: 'Trabajo & Proyectos', icono: '💼' },
    { nombre: 'Hábitos & Rutinas', icono: '🌱' },
    { nombre: 'Estudio & Lectura', icono: '📚' }
  ];

  return (
    <div className="card" style={{ backgroundColor: '#fcf6f0', borderColor: '#f2e5d9', height: 'fit-content' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#2d3142' }}>Tus Cuadernos</h2>
        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#8c6d58', background: '#f0e6da', padding: '0.2rem 0.6rem', borderRadius: '10px' }}>
          {tableros.length} activos
        </span>
      </div>

      <form onSubmit={handleCrear} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <input
          type="text"
          placeholder="Nombre del cuaderno..."
          value={nuevoNombre}
          onChange={(e) => setNuevoNombre(e.target.value)}
          style={{ padding: '0.65rem 0.85rem', fontSize: '0.85rem', flex: 1 }}
        />
        <button type="submit" style={{ padding: '0.65rem', borderRadius: '10px' }}>
          <Plus size={18} />
        </button>
      </form>

      {tableros.length === 0 ? (
        <div>
          <p style={{ fontSize: '0.85rem', color: '#9c9589', marginBottom: '1rem' }}>
            No hay cuadernos activos aún. Elige una sugerencia abajo o crea el primero.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#e07a5f', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <span style={{ fontSize: '1rem' }}>✨</span> Sugerencias rápidas
            </span>
            {sugerencias.map((sug, i) => (
              <button
                key={i}
                className="btn-secondary"
                style={{ justifyContent: 'flex-start', padding: '0.5rem 0.85rem', fontSize: '0.85rem' }}
                onClick={() => onCrearTablero(sug.nombre)}
              >
                <span style={{ width: '20px' }}>{sug.icono}</span>
                {sug.nombre}
                <Plus size={14} style={{ marginLeft: 'auto', color: '#8c6d58' }} />
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {tableros.map((t) => (
            <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button
                onClick={() => onSelectTablero(t.id)}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  justifyContent: 'flex-start',
                  padding: '0.75rem 1rem',
                  background: tableroActivo === t.id ? '#ffffff' : 'transparent',
                  border: tableroActivo === t.id ? '1px solid #e07a5f' : '1px solid transparent',
                  color: tableroActivo === t.id ? '#e07a5f' : '#636b7e',
                  borderRadius: '12px',
                  boxShadow: tableroActivo === t.id ? '0 2px 8px rgba(224, 122, 95, 0.1)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                <BookOpen size={16} color={tableroActivo === t.id ? '#e07a5f' : '#9c9589'} />
                <span style={{ fontWeight: tableroActivo === t.id ? 700 : 500, fontSize: '0.9rem' }}>
                  {t.nombre}
                </span>
              </button>

              <button
                className="btn-delete"
                onClick={() => onEliminarTablero(t.id)}
                title="Eliminar cuaderno"
                style={{ padding: '0.5rem' }}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}