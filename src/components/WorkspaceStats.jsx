import { CheckCircle2, Clock, Sparkles } from 'lucide-react';

export default function WorkspaceStats({ metas }) {
  const total = metas.length;
  const completadas = metas.filter((m) => m.completada).length;
  const pendientes = total - completadas;
  const porcentaje = total === 0 ? 0 : Math.round((completadas / total) * 100);

  return (
    <div className="card" style={{ marginBottom: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Evolución del Cuaderno</h3>
          <span style={{ fontSize: '0.8rem', color: '#8c6d58' }}>Progreso consciente a tu ritmo</span>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#5b8266' }}>{porcentaje}%</span>
        </div>
      </div>

      <div style={{
        width: '100%',
        height: '8px',
        background: '#f2ece4',
        borderRadius: '9999px',
        overflow: 'hidden',
        marginBottom: '1.25rem'
      }}>
        <div style={{
          height: '100%',
          width: `${porcentaje}%`,
          background: 'linear-gradient(90deg, #f4a261 0%, #5b8266 100%)',
          transition: 'width 0.4s ease',
          borderRadius: '9999px'
        }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
        <div style={{ background: '#fdfbf9', padding: '0.85rem', borderRadius: '12px', border: '1px solid #eee7de' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#e07a5f', marginBottom: '0.2rem' }}>
            <Sparkles size={14} />
            <span style={{ fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase' }}>Propósitos</span>
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1f222e' }}>{total}</span>
        </div>

        <div style={{ background: '#fdfbf9', padding: '0.85rem', borderRadius: '12px', border: '1px solid #eee7de' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#5b8266', marginBottom: '0.2rem' }}>
            <CheckCircle2 size={14} />
            <span style={{ fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase' }}>Completados</span>
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#5b8266' }}>{completadas}</span>
        </div>

        <div style={{ background: '#fdfbf9', padding: '0.85rem', borderRadius: '12px', border: '1px solid #eee7de' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#8c6d58', marginBottom: '0.2rem' }}>
            <Clock size={14} />
            <span style={{ fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase' }}>En Camino</span>
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#8c6d58' }}>{pendientes}</span>
        </div>
      </div>
    </div>
  );
}