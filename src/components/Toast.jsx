export default function Toast({ mensaje, tipo }) {
  if (!mensaje) return null;

  return (
    <div className="toast-container">
      <div className={`toast ${tipo || 'info'}`}>
        {mensaje}
      </div>
    </div>
  );
}