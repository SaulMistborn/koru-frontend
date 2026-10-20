import { useState } from 'react';
import { Gift, Plus, ShoppingCart, Trash2, ExternalLink, CheckCircle, Search, Image as ImageIcon } from 'lucide-react';
import api from '../api/client';

export default function WishlistSection({ deseos, transacciones, onAgregarDeseo, onComprarDeseo, onBorrarDeseo, onActualizarDeseo }) {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [url, setUrl] = useState('');
  const [imagen, setImagen] = useState('');
  const [cargandoLink, setCargandoLink] = useState(false);

  // Estado para saber qué deseo estamos editando su imagen
  const [editandoImagenId, setEditandoImagenId] = useState(null);
  const [nuevaUrlImagen, setNuevaUrlImagen] = useState('');

  const ingresos = transacciones.filter(t => t.tipo === 'ingreso').reduce((acc, t) => acc + t.monto, 0);
  const gastos = transacciones.filter(t => t.tipo === 'gasto').reduce((acc, t) => acc + t.monto, 0);
  const balanceDisponible = ingresos - gastos;

  const handleBuscarLink = async () => {
    if (!url.trim()) return;
    setCargandoLink(true);
    try {
      const res = await api.post('/util/scrape', { url: url.trim() });
      if (res.data.titulo) setNombre(res.data.titulo);
      if (res.data.precio > 0) setPrecio(res.data.precio);
      if (res.data.imagen) setImagen(res.data.imagen);
      setUrl(res.data.url_limpia);
    } catch (err) {
      console.log('No se pudo extraer data, llénalo manual');
    } finally {
      setCargandoLink(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre.trim() || !precio) return;
    onAgregarDeseo({ nombre: nombre.trim(), precio: parseFloat(precio), url: url.trim(), imagen: imagen });
    setNombre(''); setPrecio(''); setUrl(''); setImagen('');
  };

  // Función para guardar imagen manual
  const handleGuardarImagenManual = async (deseo) => {
    if (nuevaUrlImagen.trim() && onActualizarDeseo) {
      // Como no tenemos una ruta específica de PUT para deseos en el backend que te pasé,
      // esto simula la actualización o puedes agregarlo al backend después.
      // Por ahora, el botón solo se ocultará, asumiendo que implementarás el PUT en el backend si lo deseas.
      console.log("Se intentaría guardar la imagen:", nuevaUrlImagen);
      // await api.put(`/deseos/${deseo.id}`, { imagen: nuevaUrlImagen });
    }
    setEditandoImagenId(null);
    setNuevaUrlImagen('');
  };

  return (
    <div className="card" style={{ marginBottom: '1.5rem', background: '#fcfaf6' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Gift size={22} color="#e07a5f" />
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1f222e' }}>Metas de Ahorro & Deseos</h3>
        </div>
        <div style={{ background: balanceDisponible >= 0 ? '#f3f8f4' : '#fdf0f0', border: balanceDisponible >= 0 ? '1px solid #cce3d2' : '1px solid #f9d2d5', padding: '0.4rem 1rem', borderRadius: '9999px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: balanceDisponible >= 0 ? '#5b8266' : '#d64550' }}>Balance Disponible:</span>
          <span style={{ fontSize: '0.9rem', fontWeight: 800, color: balanceDisponible >= 0 ? '#5b8266' : '#d64550' }}>${balanceDisponible.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
        </div>
      </div>

      <div style={{ background: '#fff', padding: '1rem', borderRadius: '12px', border: '1px solid #eee7de', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          <input type="text" placeholder="Pega un link y presiona buscar..." value={url} onChange={(e) => setUrl(e.target.value)} style={{ flex: 1 }} />
          <button className="btn-secondary" onClick={handleBuscarLink} disabled={cargandoLink}>
            {cargandoLink ? 'Buscando...' : <><Search size={16} /> Buscar datos</>}
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          <input type="text" placeholder="¿Qué quieres comprar? (Manual o auto)" value={nombre} onChange={(e) => setNombre(e.target.value)} style={{ flex: '2 1 200px' }} />
          <input type="number" step="0.01" placeholder="Precio ($)" value={precio} onChange={(e) => setPrecio(e.target.value)} style={{ flex: '1 1 120px' }} />
          <input type="text" placeholder="URL Imagen (Opcional)" value={imagen} onChange={(e) => setImagen(e.target.value)} style={{ flex: '1 1 120px' }} />
          <button type="submit" className="btn-sage" style={{ whiteSpace: 'nowrap' }}><Plus size={16} /> Agregar</button>
        </form>
      </div>

      {deseos.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem 1rem', color: '#9c9589', border: '1px dashed #dcd0c2', borderRadius: '12px' }}>
          <p>No tienes metas de ahorro pendientes.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
          {deseos.map(deseo => {
            const esAlcanzable = balanceDisponible >= deseo.precio;
            const porcentaje = Math.min((balanceDisponible / deseo.precio) * 100, 100);
            return (
              <div key={deseo.id} style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #eee7de', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem', opacity: deseo.comprado ? 0.6 : 1 }}>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>

                  {/* Imagen clickable para editar si está vacía */}
                  {deseo.imagen ? (
                     <img src={deseo.imagen} alt={deseo.nombre} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #eee7de' }} />
                  ) : (
                     <div
                        title="No hay imagen"
                        style={{ width: '60px', height: '60px', background: '#f5efe8', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                     >
                       <Gift color="#8c6d58"/>
                     </div>
                  )}

                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#2d3142', textDecoration: deseo.comprado ? 'line-through' : 'none', marginBottom: '0.2rem' }}>{deseo.nombre}</h4>
                    <p style={{ fontSize: '1.1rem', fontWeight: 800, color: '#e07a5f' }}>${deseo.precio.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                  </div>
                  {deseo.url && <a href={deseo.url} target="_blank" rel="noopener noreferrer" style={{ color: '#8c6d58', padding: '0.4rem', background: '#f5efe8', borderRadius: '8px' }}><ExternalLink size={16} /></a>}
                </div>

                {!deseo.comprado && (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.4rem', color: '#636b7e', fontWeight: 600 }}>
                      <span>{porcentaje > 0 ? porcentaje.toFixed(0) : 0}%</span>
                      <span style={{ color: esAlcanzable ? '#5b8266' : '#636b7e' }}>{esAlcanzable ? '¡Comprable!' : `Faltan $${(deseo.precio - balanceDisponible).toLocaleString('en-US', {minimumFractionDigits: 2})}`}</span>
                    </div>
                    <div style={{ height: '8px', background: '#f3ece3', borderRadius: '99px', overflow: 'hidden' }}>
                      <div style={{ width: `${Math.max(porcentaje, 0)}%`, height: '100%', background: esAlcanzable ? '#5b8266' : '#e07a5f', transition: 'width 0.5s ease-out' }}></div>
                    </div>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '0.5rem', borderTop: '1px dashed #eee7de' }}>
                  {deseo.comprado ? <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#5b8266', fontSize: '0.85rem', fontWeight: 700 }}><CheckCircle size={16} /> Obtenido</span> : <button onClick={() => onComprarDeseo(deseo)} disabled={!esAlcanzable} style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', borderRadius: '8px', background: esAlcanzable ? '#5b8266' : '#e5ddd3', color: esAlcanzable ? '#fff' : '#9c9589', cursor: esAlcanzable ? 'pointer' : 'not-allowed' }}><ShoppingCart size={14} /> Comprar</button>}
                  <button className="btn-delete" onClick={() => onBorrarDeseo(deseo.id)} style={{ padding: '0.4rem' }}><Trash2 size={16} /></button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}