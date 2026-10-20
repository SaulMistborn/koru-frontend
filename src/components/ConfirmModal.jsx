export default function ConfirmModal({ isOpen, titulo, mensaje, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3 style={{ marginBottom: '0.75rem', fontSize: '1.25rem' }}>{titulo}</h3>
        <p style={{ color: '#94a3b8', marginBottom: '1.5rem', lineHeight: '1.5' }}>
          {mensaje}
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <button
            onClick={onCancel}
            style={{ background: '#334155', color: '#f8fafc' }}
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            style={{ background: '#ef4444' }}
          >
            Confirmar eliminación
          </button>
        </div>
      </div>
    </div>
  );
}