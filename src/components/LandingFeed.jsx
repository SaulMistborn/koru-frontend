import { Feather, Compass, HeartHandshake, ArrowRight, Sun, Sparkles, BookOpen } from 'lucide-react';

export default function LandingFeed({ onOpenAuth }) {
  const reflexiones = [
    {
      id: 1,
      autor: "Bitácora Koru",
      etiqueta: "Claridad Mental",
      contenido: "La productividad real no se mide en cuántas tareas tachas con angustia, sino en la convicción con la que proteges lo que de verdad importa cada día.",
      icono: <Compass size={18} color="#e07a5f" />
    },
    {
      id: 2,
      autor: "Comunidad",
      etiqueta: "Constancia Serena",
      contenido: "Separar tu vida en espacios claros de trabajo te da permiso para descansar. Cuando cierras un cuaderno, tu mente se apaga sin culpa.",
      icono: <Sun size={18} color="#5b8266" />
    },
    {
      id: 3,
      autor: "Enfoque Koru",
      etiqueta: "Nuevos Comienzos",
      contenido: "Koru representa la espiral del helecho que se abre: cada amanecer es una oportunidad de ordenar tus metas sin cargar con los errores de ayer.",
      icono: <Feather size={18} color="#a29bfe" />
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Hero Principal */}
      <section className="card" style={{ textAlign: 'center', padding: '3.5rem 1.5rem' }}>
        <div className="hero-badge">
          <Sparkles size={14} />
          Tu santuario personal de enfoque
        </div>
        <h1 style={{ fontSize: '2.4rem', marginBottom: '1rem', maxWidth: '650px', margin: '0 auto 1rem auto', lineHeight: 1.25 }}>
          Planifica con paz, avanza con convicción.
        </h1>
        <p style={{ fontSize: '1.05rem', maxWidth: '540px', margin: '0 auto 2rem auto' }}>
          Un diario digital diseñado para ordenar tus propósitos, metas cotidianas y hábitos sin la saturación del ruido moderno.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <button onClick={onOpenAuth} style={{ padding: '0.9rem 1.8rem', fontSize: '0.98rem' }}>
            <span>Abrir mi diario</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Pilares del Diario */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ background: '#fdf3ef', padding: '0.6rem', borderRadius: '10px', width: 'fit-content', marginBottom: '0.75rem' }}>
            <BookOpen size={20} color="#e07a5f" />
          </div>
          <h3 style={{ fontSize: '1.05rem', marginBottom: '0.4rem' }}>Espacios con Intención</h3>
          <p style={{ fontSize: '0.88rem' }}>Separa tu mente en tableros limpios: trabajo, desarrollo personal, salud o finanzas.</p>
        </div>

        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ background: '#eff6f1', padding: '0.6rem', borderRadius: '10px', width: 'fit-content', marginBottom: '0.75rem' }}>
            <Compass size={20} color="#5b8266" />
          </div>
          <h3 style={{ fontSize: '1.05rem', marginBottom: '0.4rem' }}>Metas con Propósito</h3>
          <p style={{ fontSize: '0.88rem' }}>Visualiza tu avance con barras serenas que celebran cada paso sin abrumarte.</p>
        </div>

        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ background: '#f4f2fd', padding: '0.6rem', borderRadius: '10px', width: 'fit-content', marginBottom: '0.75rem' }}>
            <HeartHandshake size={20} color="#a29bfe" />
          </div>
          <h3 style={{ fontSize: '1.05rem', marginBottom: '0.4rem' }}>Privacidad Aislada</h3>
          <p style={{ fontSize: '0.88rem' }}>Tus reflexiones y proyectos protegidos mediante tu propio token cifrado.</p>
        </div>
      </div>

      {/* Feed de Reflexión y Comunidad */}
      <section>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <h2 style={{ fontSize: '1.25rem' }}>Píldoras de Enfoque</h2>
          <span style={{ fontSize: '0.82rem', color: '#8c6d58' }}>Lecturas matutinas</span>
        </div>

        <div className="feed-grid" style={{ marginTop: '0.75rem' }}>
          {reflexiones.map((ref) => (
            <div key={ref.id} className="feed-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {ref.icono}
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#555b6e' }}>{ref.autor}</span>
                </div>
                <span style={{ fontSize: '0.72rem', background: '#f5efe8', padding: '0.2rem 0.5rem', borderRadius: '6px', color: '#8c6d58' }}>
                  {ref.etiqueta}
                </span>
              </div>
              <p style={{ fontSize: '0.9rem', fontStyle: 'italic', color: '#4a5060' }}>
                "{ref.contenido}"
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}