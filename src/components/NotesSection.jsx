import { useState } from 'react';
import { FileText, Plus, Trash2, Edit3, X, Save } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function NotesSection({ notas, onAgregarNota, onActualizarNota, onBorrarNota }) {
  const [notaActivaId, setNotaActivaId] = useState(null);
  const [editando, setEditando] = useState(false);

  // Estados para el formulario de edición/creación
  const [tituloTemp, setTituloTemp] = useState('');
  const [contenidoTemp, setContenidoTemp] = useState('');

  const notaActiva = notas.find(n => n.id === notaActivaId);

  // Iniciar la creación de una nota nueva
  const handleNuevaNota = () => {
    setNotaActivaId(null);
    setTituloTemp('');
    setContenidoTemp('');
    setEditando(true);
  };

  // Abrir una nota existente para lectura
  const handleSeleccionarNota = (nota) => {
    setNotaActivaId(nota.id);
    setEditando(false);
  };

  // Pasar a modo edición en la nota activa
  const handleEditarNota = () => {
    if (notaActiva) {
      setTituloTemp(notaActiva.titulo);
      setContenidoTemp(notaActiva.contenido || '');
      setEditando(true);
    }
  };

  // Guardar cambios (POST si es nueva, PUT si existe)
  const handleGuardar = () => {
    if (!tituloTemp.trim()) return;

    if (notaActivaId) {
      // Actualizar existente
      onActualizarNota(notaActivaId, { titulo: tituloTemp, contenido: contenidoTemp });
    } else {
      // Crear nueva
      onAgregarNota({ titulo: tituloTemp, contenido: contenidoTemp });
    }
    setEditando(false);
  };

  // Cancelar edición
  const handleCancelar = () => {
    if (!notaActivaId) {
      // Si estábamos creando una nueva y cancelamos, cerramos el panel
      setEditando(false);
    } else {
      // Si estábamos editando, volvemos a modo lectura
      setEditando(false);
    }
  };

  return (
    <div className="card" style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', height: '600px', padding: 0, overflow: 'hidden' }}>

      {/* Cabecera de la sección */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 1.75rem', borderBottom: '1px solid #eee7de', background: '#fdfbf9' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FileText size={20} color="#8c6d58" />
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Reflexiones & Notas</h3>
        </div>
        <button className="btn-secondary" onClick={handleNuevaNota} style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>
          <Plus size={16} /> Nueva Nota
        </button>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* Panel Izquierdo: Lista de Notas */}
        <div style={{ width: '280px', borderRight: '1px solid #eee7de', background: '#fcfaf6', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
          {notas.length === 0 ? (
            <p style={{ padding: '2rem 1rem', textAlign: 'center', color: '#9c9589', fontSize: '0.85rem' }}>
              Tu diario está vacío. Comienza a escribir.
            </p>
          ) : (
            notas.map(nota => (
              <div
                key={nota.id}
                onClick={() => handleSeleccionarNota(nota)}
                style={{
                  padding: '1rem',
                  borderBottom: '1px solid #eee7de',
                  cursor: 'pointer',
                  background: notaActivaId === nota.id && !editando ? '#ffffff' : 'transparent',
                  borderLeft: notaActivaId === nota.id && !editando ? '3px solid #e07a5f' : '3px solid transparent',
                  transition: 'background 0.2s ease'
                }}
              >
                <div style={{ fontWeight: 600, color: '#2d3142', fontSize: '0.95rem', marginBottom: '0.25rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {nota.titulo}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#8c6d58' }}>
                  {nota.fecha_actualizacion}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Panel Derecho: Área de Lectura / Edición */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#ffffff', overflowY: 'auto' }}>

          {!notaActivaId && !editando ? (
            // Estado vacío (Ninguna nota seleccionada)
            <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', color: '#9c9589', flexDirection: 'column', gap: '1rem' }}>
              <FileText size={48} color="#e5ddd3" />
              <p>Selecciona una nota para leer o crea una nueva.</p>
            </div>
          ) : editando ? (
            // MODO EDICIÓN
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '1.75rem' }}>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                <input
                  type="text"
                  placeholder="Título de tu reflexión..."
                  value={tituloTemp}
                  onChange={(e) => setTituloTemp(e.target.value)}
                  style={{ fontSize: '1.2rem', fontWeight: 700, padding: '0.75rem', flex: 1 }}
                  autoFocus
                />
                <button className="btn-secondary" onClick={handleCancelar} title="Cancelar">
                  <X size={18} />
                </button>
                <button className="btn-sage" onClick={handleGuardar} title="Guardar">
                  <Save size={18} /> Guardar
                </button>
              </div>
              <textarea
                placeholder="Escribe aquí... (Soporta formato Markdown)"
                value={contenidoTemp}
                onChange={(e) => setContenidoTemp(e.target.value)}
                style={{
                  flex: 1, width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #e8dfd5',
                  background: '#fcf8f3', color: '#2d3142', fontSize: '1rem', lineHeight: '1.6',
                  resize: 'none', outline: 'none', fontFamily: 'inherit'
                }}
              />
            </div>
          ) : (
            // MODO LECTURA
            notaActiva && (
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '2rem 3rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #eee7de', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
                  <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1f222e', marginBottom: '0.5rem' }}>{notaActiva.titulo}</h2>
                    <span style={{ fontSize: '0.8rem', color: '#8c6d58' }}>Última edición: {notaActiva.fecha_actualizacion}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn-secondary" onClick={handleEditarNota} style={{ padding: '0.5rem' }}>
                      <Edit3 size={16} /> Editar
                    </button>
                    <button className="btn-delete" onClick={() => onBorrarNota(notaActiva.id)} style={{ padding: '0.5rem' }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Renderizado Markdown */}
                <div className="markdown-body" style={{ color: '#2d3142', lineHeight: '1.7', fontSize: '1.05rem' }}>
                  {notaActiva.contenido ? (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {notaActiva.contenido}
                    </ReactMarkdown>
                  ) : (
                    <p style={{ color: '#9c9589', fontStyle: 'italic' }}>Esta nota está vacía.</p>
                  )}
                </div>
              </div>
            )
          )}

        </div>
      </div>
    </div>
  );
}