import { useState, useMemo } from 'react';
import { Wallet, TrendingUp, TrendingDown, Trash2, Calendar, Plus } from 'lucide-react';

const MESES = [
  { valor: 1, nombre: 'Enero' }, { valor: 2, nombre: 'Febrero' },
  { valor: 3, nombre: 'Marzo' }, { valor: 4, nombre: 'Abril' },
  { valor: 5, nombre: 'Mayo' }, { valor: 6, nombre: 'Junio' },
  { valor: 7, nombre: 'Julio' }, { valor: 8, nombre: 'Agosto' },
  { valor: 9, nombre: 'Septiembre' }, { valor: 10, nombre: 'Octubre' },
  { valor: 11, nombre: 'Noviembre' }, { valor: 12, nombre: 'Diciembre' },
  { valor: 0, nombre: '-- Todo el Año --' } // NUEVA OPCIÓN
];

export default function FinanceSection({ transacciones, onAgregarTransaccion, onBorrarTransaccion }) {
  const fechaActual = new Date();
  const [mesSeleccionado, setMesSeleccionado] = useState(fechaActual.getMonth() + 1);
  const [anioSeleccionado, setAnioSeleccionado] = useState(fechaActual.getFullYear());

  const [tipo, setTipo] = useState('gasto');
  const [monto, setMonto] = useState('');
  const [concepto, setConcepto] = useState('');

  // 1. Filtrar transacciones por AÑO (Para el total anual)
  const transaccionesDelAnio = useMemo(() => {
    return transacciones.filter(t => {
      if (!t.fecha) return false;
      const [year] = t.fecha.split('-');
      return parseInt(year, 10) === anioSeleccionado;
    });
  }, [transacciones, anioSeleccionado]);

  // 2. Filtrar transacciones por MES (Para la lista y tarjetas principales)
  const transaccionesDelMes = useMemo(() => {
    if (mesSeleccionado === 0) return transaccionesDelAnio; // Si elige "Todo el año"
    return transaccionesDelAnio.filter(t => {
      const [, month] = t.fecha.split('-');
      return parseInt(month, 10) === mesSeleccionado;
    });
  }, [transaccionesDelAnio, mesSeleccionado]);

  // Totales de las tarjetas principales (Mes o Año si lo seleccionó)
  const ingresosMes = transaccionesDelMes.filter(t => t.tipo === 'ingreso').reduce((acc, t) => acc + t.monto, 0);
  const gastosMes = transaccionesDelMes.filter(t => t.tipo === 'gasto').reduce((acc, t) => acc + t.monto, 0);
  const balanceMes = ingresosMes - gastosMes;

  // Totales fijos de TODO EL AÑO para la mini-barra
  const ingresosAnio = transaccionesDelAnio.filter(t => t.tipo === 'ingreso').reduce((acc, t) => acc + t.monto, 0);
  const gastosAnio = transaccionesDelAnio.filter(t => t.tipo === 'gasto').reduce((acc, t) => acc + t.monto, 0);
  const balanceAnio = ingresosAnio - gastosAnio;

  const añosDisponibles = Array.from(new Array(5), (val, index) => fechaActual.getFullYear() - 2 + index);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!monto || !concepto.trim()) return;

    onAgregarTransaccion({ tipo, monto: parseFloat(monto), concepto: concepto.trim() });
    setMonto('');
    setConcepto('');
  };

  return (
    <div className="card" style={{ marginBottom: '1.5rem' }}>

      {/* Cabecera con Filtros Temporales */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Wallet size={22} color="#5b8266" />
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1f222e' }}>Flujo Financiero</h3>
        </div>

        {/* Selector de Mes y Año */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#fdfbf9', padding: '0.4rem', borderRadius: '12px', border: '1px solid #e8dfd5' }}>
          <Calendar size={16} color="#8c6d58" style={{ marginLeft: '0.4rem' }} />
          <select
            value={mesSeleccionado}
            onChange={(e) => setMesSeleccionado(parseInt(e.target.value))}
            style={{ border: 'none', background: 'transparent', padding: '0.2rem 0.5rem', fontWeight: 600, color: '#2d3142', outline: 'none', cursor: 'pointer' }}
          >
            {MESES.map(m => <option key={m.valor} value={m.valor}>{m.nombre}</option>)}
          </select>
          <span style={{ color: '#dcd0c2' }}>|</span>
          <select
            value={anioSeleccionado}
            onChange={(e) => setAnioSeleccionado(parseInt(e.target.value))}
            style={{ border: 'none', background: 'transparent', padding: '0.2rem 0.5rem', fontWeight: 600, color: '#2d3142', outline: 'none', cursor: 'pointer' }}
          >
            {añosDisponibles.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>
      </div>

      {/* Tarjetas de Resumen Principal */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: mesSeleccionado === 0 ? '2rem' : '1rem' }}>
        <div style={{ padding: '1rem', background: '#f4f8f5', borderRadius: '12px', border: '1px solid #e1eee5' }}>
          <p style={{ fontSize: '0.8rem', color: '#5b8266', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.2rem' }}>
            {mesSeleccionado === 0 ? 'Ingresos del Año' : 'Ingresos del Mes'}
          </p>
          <p style={{ fontSize: '1.4rem', fontWeight: 800, color: '#2d3142' }}>${ingresosMes.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
        </div>
        <div style={{ padding: '1rem', background: '#fff9f7', borderRadius: '12px', border: '1px solid #f9e8e3' }}>
          <p style={{ fontSize: '0.8rem', color: '#d1694e', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.2rem' }}>
            {mesSeleccionado === 0 ? 'Gastos del Año' : 'Gastos del Mes'}
          </p>
          <p style={{ fontSize: '1.4rem', fontWeight: 800, color: '#2d3142' }}>${gastosMes.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
        </div>
        <div style={{ padding: '1rem', background: balanceMes >= 0 ? '#fdfcfb' : '#fdf0f0', borderRadius: '12px', border: balanceMes >= 0 ? '1px solid #ede5dc' : '1px solid #f9d2d5' }}>
          <p style={{ fontSize: '0.8rem', color: balanceMes >= 0 ? '#8c6d58' : '#d64550', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.2rem' }}>
            {mesSeleccionado === 0 ? 'Balance del Año' : 'Balance del Mes'}
          </p>
          <p style={{ fontSize: '1.4rem', fontWeight: 800, color: balanceMes >= 0 ? '#2d3142' : '#d64550' }}>${balanceMes.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
        </div>
      </div>

      {/* Mini Resumen Anual (Visible solo cuando ves un mes en específico) */}
      {mesSeleccionado !== 0 && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem' }}>
          <div style={{ background: '#fdfaf6', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid #f0e6da', display: 'flex', gap: '1rem', fontSize: '0.85rem', flexWrap: 'wrap' }}>
            <span style={{ color: '#8c6d58', fontWeight: 700 }}>Resumen Anual ({anioSeleccionado}):</span>
            <span style={{ color: '#5b8266', display: 'flex', alignItems: 'center', gap: '0.2rem' }} title="Ingresos Anuales"><TrendingUp size={14}/> ${ingresosAnio.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            <span style={{ color: '#e07a5f', display: 'flex', alignItems: 'center', gap: '0.2rem' }} title="Gastos Anuales"><TrendingDown size={14}/> ${gastosAnio.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            <span style={{ color: '#2d3142', fontWeight: 800 }}>= ${balanceAnio.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
          </div>
        </div>
      )}

      {/* Formulario de Nuevo Registro */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <select value={tipo} onChange={(e) => setTipo(e.target.value)} style={{ flex: '0 1 120px' }}>
          <option value="gasto">Gasto</option>
          <option value="ingreso">Ingreso</option>
        </select>
        <input type="number" step="0.01" placeholder="Monto ($)" value={monto} onChange={(e) => setMonto(e.target.value)} style={{ flex: '0 1 120px' }} />
        <input type="text" placeholder="Concepto (Ej. Súper, Sueldo)" value={concepto} onChange={(e) => setConcepto(e.target.value)} style={{ flex: '2 1 200px' }} />
        <button type="submit" className={tipo === 'ingreso' ? "btn-sage" : ""} style={{ background: tipo === 'gasto' ? '#e07a5f' : '' }}>
          <Plus size={16} /> Registrar
        </button>
      </form>

      {/* Lista de Transacciones Filtradas */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {transaccionesDelMes.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#9c9589', fontSize: '0.9rem', padding: '1rem' }}>No hay movimientos en este periodo.</p>
        ) : (
          transaccionesDelMes.map(t => (
            <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.8rem 1rem', background: '#fff', borderRadius: '10px', border: '1px solid #f0e6da' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                {t.tipo === 'ingreso' ? <TrendingUp color="#5b8266" size={18} /> : <TrendingDown color="#e07a5f" size={18} />}
                <div>
                  <p style={{ fontWeight: 600, color: '#2d3142', fontSize: '0.95rem' }}>{t.concepto}</p>
                  <p style={{ fontSize: '0.75rem', color: '#9c9589' }}>{t.fecha}</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontWeight: 700, color: t.tipo === 'ingreso' ? '#5b8266' : '#e07a5f' }}>
                  {t.tipo === 'ingreso' ? '+' : '-'}${t.monto.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
                <button className="btn-delete" onClick={() => onBorrarTransaccion(t.id)}><Trash2 size={16} /></button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}