import { useState } from 'react';
import { Plus, Check, Trash2, Bookmark } from 'lucide-react';
import GoalTemplates from './GoalTemplates';

export default function MetaSection({ metas, onAgregarMeta, onToggleMeta, onBorrarMeta }) {
  const [nuevaMeta, setNuevaMeta] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nuevaMeta.trim()) return;
    onAgregarMeta(nuevaMeta);
    setNuevaMeta('');
  };

  const handleSelectTemplate = (tituloTemplate) => {
    onAgregarMeta(tituloTemplate);
  };

  return (
    <div className="card">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
        <Bookmark size={18} color="#e07a5f" />
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Metas & Trazas</h3>
      </div>

      {/* Formulario de creación manual */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Escribe una meta específica para este cuaderno..."
          value={nuevaMeta}
          onChange={(e) => setNuevaMeta(e.target.value)}
        />
        <button type="submit" style={{ whiteSpace: 'nowrap' }}>
          <Plus size={17} />
          Anotar
        </button>
      </form>

      {/* Acordeón de plantillas predeterminadas */}
      <GoalTemplates onSelectTemplate={handleSelectTemplate} />

      {/* Listado de metas existentes */}
      {metas.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2.5rem 1rem', color: '#9c9589' }}>
          <p style={{ fontSize: '0.95rem' }}>Este cuaderno aún no tiene metas anotadas.</p>
          <span style={{ fontSize: '0.8rem', opacity: 0.85 }}>
            Anota una arriba o presiona una sugerencia típica para arrancar.
          </span>
        </div>
      ) : (
        metas.map((m) => (
          <div key={m.id} className={`meta-item ${m.completada ? 'completada' : ''}`}>
            <div
              onClick={() => onToggleMeta(m.id)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', cursor: 'pointer', flex: 1 }}
            >
              <div style={{
                width: '21px',
                height: '21px',
                borderRadius: '6px',
                border: m.completada ? 'none' : '2px solid #dcd0c2',
                background: m.completada ? '#5b8266' : '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.15s ease'
              }}>
                {m.completada && <Check size={14} color="white" strokeWidth={3} />}
              </div>
              <span style={{ fontSize: '0.94rem', fontWeight: 500 }}>
                {m.titulo}
              </span>
            </div>

            <button
              className="btn-delete"
              onClick={() => onBorrarMeta(m.id)}
              title="Borrar anotación"
            >
              <Trash2 size={15} />
            </button>
          </div>
        ))
      )}
    </div>
  );
}