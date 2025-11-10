import React from 'react';
import { RefreshCw } from 'lucide-react';
import { VUE_OPTIONS, COLORS } from '../../constants/tresorerie';

/**
 * Composant sélecteur de vue (Actuelle / Estimation)
 */
export const SelecteurVue = ({ vueActive, onChangerVue }) => {
  return (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
      {Object.values(VUE_OPTIONS).map(option => (
        <button
          key={option.value}
          onClick={() => onChangerVue(option.value)}
          style={{
            padding: '10px 20px',
            backgroundColor: vueActive === option.value ? option.color : COLORS.secondary,
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '14px',
            transition: 'all 0.2s',
            boxShadow: vueActive === option.value ? '0 4px 8px rgba(0,0,0,0.2)' : '0 2px 4px rgba(0,0,0,0.1)',
            transform: vueActive === option.value ? 'scale(1.05)' : 'scale(1)'
          }}
          onMouseEnter={(e) => {
            if (vueActive !== option.value) {
              e.target.style.backgroundColor = '#7f8c8d';
            }
          }}
          onMouseLeave={(e) => {
            if (vueActive !== option.value) {
              e.target.style.backgroundColor = COLORS.secondary;
            }
          }}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
