import { useState } from 'react';
import { Target, Plus, CheckCircle, Circle, Trash2, CalendarDays } from 'lucide-react';

const SUGERENCIAS = [
  { titulo: "Tomar 2L de agua", icono: "💧" },
  { type: 'separator' },
  { titulo: "Leer 20 mins", icono: "📖" },
  { type: 'separator' },
  { titulo: "Caminar 8,000 pasos", icono: "🚶" },
  { type: 'separator' },
  { titulo: "Meditar 10 min", icono: "🧘" },
  { type: 'separator' },
  { titulo: "Cero pantallas", icono: "📵" }
];

export default function HabitSection({ habitos, onAgregarHabito, onToggleHabito, onBorrarHabito }) {
  const [nuevoHabito, setNuevoHabito] = useState('');
  const [habitoExpandido, setHabitoExpandido] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nuevoHabito.trim()) return;
    onAgregarHabito(nuevoHabito.trim(), "🌱");
    setNuevoHabito('');
  };

  const toggleExpandir = (id) => {
    setHabitoExpandido(habitoExpandido === id ? null : id);
  };

  const renderMiniCalendario = (ultimos7DiasIso) => {
    const dias = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const iso = d.toISOString().split('T')[0];
      const cumplido = ultimos7DiasIso.includes(iso);
      dias.push(
        <div key={iso} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          <span style={{ fontSize: '0.65rem', color: '#9c9589' }}>{d.getDate()}</span>
          <div style={{
            width: '18px', height: '18px', borderRadius: '4px',
            background: cumplido ? '#5b8266' : '#f4efe8',
            border: `1px solid ${cumplido ? '#4f7359' : '#e5ddd3'}`
          }}></div>
        </div>
      );
    }
    return (
      <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', padding: '1rem 0', marginTop: '0.5rem', borderTop: '1px dashed #eee7de' }}>
        {dias}
      </div>
    );
  };

  return (
    <div className="card" style={{ marginBottom: '1.5rem', background: '#fcfaf6' }}>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Target size={22} color="#5b8266" />
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1f222e' }}>Hábitos Diarios</h3>
        </div>
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#5b8266', background: '#f4f8f5', padding: '0.3rem 0.8rem', borderRadius: '20px' }}>
          {habitos.filter(h => h.completado_hoy).length}/{habitos.length} hoy
        </span>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.6rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <input type="text" placeholder="Nuevo hábito diario (ej. Leer 10 mins)" value={nuevoHabito} onChange={(e) => setNuevoHabito(e.target.value)} style={{ flex: '1 1 200px' }} />
        <button type="submit" className="btn-sage" style={{ flex: '0 1 auto' }}><Plus size={16} /> Sembrar</button>
      </form>

      {/* SUGERENCIAS RÁPIDAS (Optimizadas para no mover la pantalla) */}
      <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '1.5rem', scrollbarWidth: 'none' }}>
        {SUGERENCIAS.map((sug, idx) => {
          if (sug.type === 'separator') {
            return <div key={`sep-${idx}`} style={{ width: '1px', background: '#e8dfd5', margin: '0 0.2rem', flexShrink: 0 }}></div>;
          }
          return (
            <button
              key={idx}
              type="button"
              onClick={() => onAgregarHabito(sug.titulo, sug.icono)}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem', whiteSpace: 'nowrap',
                padding: '0 0.8rem', background: '#fff', border: '1px solid #e8dfd5',
                borderRadius: '99px', fontSize: '0.8rem', color: '#636b7e', cursor: 'pointer',
                transition: 'all 0.2s ease', outline: 'none',
                height: '32px', flexShrink: 0 /* Fija la altura y evita que se encoja/empuje */
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#5b8266'; e.currentTarget.style.color = '#5b8266'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e8dfd5'; e.currentTarget.style.color = '#636b7e'; }}
            >
              <span>{sug.icono}</span>
              {sug.titulo}
            </button>
          );
        })}
      </div>

      {habitos.length === 0 ? (
        <div style={{ textAlign: 'center', color: '#9c9589', fontSize: '0.9rem', padding: '1rem', border: '1px dashed #dcd0c2', borderRadius: '12px' }}>
          <p>No tienes hábitos diarios en este cuaderno.</p>
          <p style={{ fontSize: '0.8rem', marginTop: '0.4rem' }}>Agrega uno y táchalo todos los días para mantener tu racha viva 🔥.</p>
        </div>
      ) : (
        /* Se cambió de grid a flex column para evitar brincos de pantalla */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {habitos.map(habito => (
            <div key={habito.id} style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #eee7de', padding: '1rem', transition: 'all 0.2s ease', boxShadow: habito.completado_hoy ? 'none' : '0 4px 10px rgba(138, 121, 103, 0.05)' }}>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flex: 1, cursor: 'pointer' }} onClick={() => onToggleHabito(habito.id)}>
                  {habito.completado_hoy ? <CheckCircle size={22} color="#5b8266" /> : <Circle size={22} color="#cce3d2" />}
                  <span style={{ fontWeight: habito.completado_hoy ? 500 : 600, color: habito.completado_hoy ? '#8c6d58' : '#2d3142', textDecoration: habito.completado_hoy ? 'line-through' : 'none' }}>
                    {habito.icono} {habito.titulo}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#e07a5f', display: 'flex', alignItems: 'center', gap: '0.2rem' }} title="Tu racha de días consecutivos">
                    🔥 {habito.racha_actual}
                  </span>
                  <button onClick={() => toggleExpandir(habito.id)} style={{ background: 'transparent', border: 'none', color: '#8c6d58', cursor: 'pointer', padding: '0.2rem' }} title="Ver calendario de constancia">
                    <CalendarDays size={18} />
                  </button>
                  <button className="btn-delete" onClick={() => onBorrarHabito(habito.id)} style={{ padding: '0.2rem' }} title="Eliminar hábito"><Trash2 size={16} /></button>
                </div>
              </div>

              {/* Minicalendario Expansible */}
              {habitoExpandido === habito.id && renderMiniCalendario(habito.ultimos_7_dias)}

            </div>
          ))}
        </div>
      )}
    </div>
  );
}