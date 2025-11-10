import React from 'react';
import { Plus, Download, RefreshCw, Upload } from 'lucide-react';
import { COLORS } from '../../constants/tresorerie';

/**
 * Barre d'actions principales
 */
export const BarreActions = ({
  onAjouter,
  onExporter,
  onReinitialiser,
  afficherAjouter
}) => {
  const boutons = [
    {
      icone: Plus,
      label: afficherAjouter ? 'Fermer' : 'Ajouter',
      couleur: afficherAjouter ? COLORS.secondary : COLORS.success,
      action: onAjouter
    },
    {
      icone: Download,
      label: 'Export CSV',
      couleur: COLORS.primary,
      action: onExporter
    },
    {
      icone: RefreshCw,
      label: 'Réinitialiser',
      couleur: COLORS.warning,
      action: onReinitialiser
    }
  ];

  return (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
      {boutons.map((btn, idx) => {
        const Icone = btn.icone;
        return (
          <button
            key={idx}
            onClick={btn.action}
            style={{
              padding: '10px 15px',
              backgroundColor: btn.couleur,
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
            }}
          >
            <Icone size={18} />
            {btn.label}
          </button>
        );
      })}
    </div>
  );
};
