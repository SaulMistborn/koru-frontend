import { useState } from 'react';
import { Sparkles, Dumbbell, Apple, BookOpen, Wallet, Moon, ChevronDown, ChevronUp } from 'lucide-react';

export default function GoalTemplates({ onSelectTemplate }) {
  const [expandido, setExpandido] = useState(false);
  const [categoriaActiva, setCategoriaActiva] = useState('salud');

  const categorias = {
    salud: {
      nombre: 'Cuerpo & Salud',
      icono: <Dumbbell size={15} color="#e07a5f" />,
      metas: [
        'Comer balanceado y sin ultraprocesados',
        'Entrenar fuerza o cardio 4 días esta semana',
        'Tomar 2 litros de agua natural al día',
        'Caminar 8,000 pasos diarios'
      ]
    },
    mente: {
      nombre: 'Mente & Descanso',
      icono: <Moon size={15} color="#a29bfe" />,
      metas: [
        'Dormir 7 a 8 horas continuas',
        'Leer 15 a 20 minutos de un libro',
        'Escribir 3 reflexiones o agradecimientos del día',
        'Cero pantallas 30 minutos antes de dormir'
      ]
    },
    finanzas: {
      nombre: 'Finanzas Claras',
      icono: <Wallet size={15} color="#5b8266" />,
      metas: [
        'Registrar todos los gastos y compras del día',
        'Apartar el 10% de ahorro semanal',
        'Revisar suscripciones y gastos hormiga innecesarios',
        'Planificar el presupuesto de la próxima quincena'
      ]
    },
    enfoque: {
      nombre: 'Enfoque & Aprendizaje',
      icono: <BookOpen size={15} color="#f4a261" />,
      metas: [
        'Dedicar 1 hora de enfoque profundo al proyecto central',
        'Practicar 20 minutos de inglés o nuevo vocabulario',
        'Ordenar el espacio físico y escritorio de trabajo',
        'Planear las 3 prioridades clave de mañana'
      ]
    }
  };

  return (
    <div style={{
      backgroundColor: '#fdfbf9',
      border: '1px solid #eee7de',
      borderRadius: '12px',
      padding: '1rem',
      marginBottom: '1.25rem',
      transition: 'all 0.2s ease'
    }}>
      {/* Botón de apertura/cierre */}
      <div
        onClick={() => setExpandido(!expandido)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          userSelect: 'none'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles size={16} color="#e07a5f" />
          <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#1f222e' }}>
            Explorar sugerencias e inspiraciones típicas
          </span>
        </div>
        <button
          className="btn-secondary"
          style={{ padding: '0.25rem 0.5rem', borderRadius: '6px' }}
        >
          {expandido ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {/* Contenido desplegable */}
      {expandido && (
        <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #eee7de' }}>
          {/* Selector de categoría */}
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            {Object.keys(categorias).map((catKey) => {
              const cat = categorias[catKey];
              const isSelected = categoriaActiva === catKey;
              return (
                <button
                  key={catKey}
                  onClick={() => setCategoriaActiva(catKey)}
                  style={{
                    padding: '0.4rem 0.75rem',
                    fontSize: '0.8rem',
                    borderRadius: '8px',
                    backgroundColor: isSelected ? '#e07a5f' : '#f5efe8',
                    color: isSelected ? '#ffffff' : '#636b7e',
                    border: 'none',
                    boxShadow: isSelected ? '0 2px 8px rgba(224, 122, 95, 0.25)' : 'none'
                  }}
                >
                  {cat.icono}
                  <span>{cat.nombre}</span>
                </button>
              );
            })}
          </div>

          {/* Lista de metas seleccionables */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
            {categorias[categoriaActiva].metas.map((metaTitulo, idx) => (
              <div
                key={idx}
                onClick={() => onSelectTemplate(metaTitulo)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.65rem 0.85rem',
                  backgroundColor: '#ffffff',
                  border: '1px solid #ede5dc',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '0.88rem',
                  color: '#2d3142',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#e07a5f';
                  e.currentTarget.style.transform = 'translateX(3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#ede5dc';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <span>{metaTitulo}</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#e07a5f' }}>
                  + Anotar
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}