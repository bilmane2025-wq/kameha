import React from 'react';
import { Search, X } from 'lucide-react';
import { TIMING_OPTIONS, TYPE_OPTIONS } from '../../constants/tresorerie';
import { COLORS } from '../../constants/tresorerie';

/**
 * Composant pour les filtres
 */
export const Filtres = ({ filtres, changerFiltre, reinitialiser }) => {
  return (
    <div
      style={{
        backgroundColor: COLORS.bg.white,
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px',
        border: `1px solid ${COLORS.border.lighter}`,
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '10px',
          alignItems: 'end'
        }}
      >
        {/* Barre de recherche */}
        <div style={{ position: 'relative' }}>
          <label
            style={{
              display: 'block',
              fontSize: '11px',
              fontWeight: 'bold',
              color: COLORS.text.secondary,
              marginBottom: '4px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
          >
            Recherche
          </label>
          <div style={{ position: 'relative' }}>
            <Search
              size={16}
              style={{
                position: 'absolute',
                left: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: COLORS.text.secondary
              }}
            />
            <input
              type="text"
              placeholder="Rechercher..."
              value={filtres.recherche}
              onChange={(e) => changerFiltre('recherche', e.target.value)}
              style={{
                width: '100%',
                padding: '8px 8px 8px 32px',
                borderRadius: '4px',
                border: `1px solid ${COLORS.border.light}`,
                fontSize: '13px',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = COLORS.primary}
              onBlur={(e) => e.target.style.borderColor = COLORS.border.light}
            />
          </div>
        </div>

        {/* Filtre Type */}
        <div>
          <label
            style={{
              display: 'block',
              fontSize: '11px',
              fontWeight: 'bold',
              color: COLORS.text.secondary,
              marginBottom: '4px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
          >
            Type
          </label>
          <select
            value={filtres.type}
            onChange={(e) => changerFiltre('type', e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: `1px solid ${COLORS.border.light}`,
              fontSize: '13px',
              outline: 'none',
              cursor: 'pointer',
              backgroundColor: COLORS.bg.white,
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = COLORS.primary}
            onBlur={(e) => e.target.style.borderColor = COLORS.border.light}
          >
            <option value="tous">Tous les types</option>
            <option value={TYPE_OPTIONS.entree.value}>{TYPE_OPTIONS.entree.label}</option>
            <option value={TYPE_OPTIONS.sortie.value}>{TYPE_OPTIONS.sortie.label}</option>
          </select>
        </div>

        {/* Filtre Timing */}
        <div>
          <label
            style={{
              display: 'block',
              fontSize: '11px',
              fontWeight: 'bold',
              color: COLORS.text.secondary,
              marginBottom: '4px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
          >
            Timing
          </label>
          <select
            value={filtres.timing}
            onChange={(e) => changerFiltre('timing', e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: `1px solid ${COLORS.border.light}`,
              fontSize: '13px',
              outline: 'none',
              cursor: 'pointer',
              backgroundColor: COLORS.bg.white,
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = COLORS.primary}
            onBlur={(e) => e.target.style.borderColor = COLORS.border.light}
          >
            <option value="tous">Tous les timings</option>
            {Object.values(TIMING_OPTIONS).map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Bouton Reset */}
        <button
          onClick={reinitialiser}
          style={{
            padding: '8px 15px',
            backgroundColor: COLORS.secondary,
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            justifyContent: 'center',
            transition: 'background-color 0.2s',
            height: '36px'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#7f8c8d'}
          onMouseLeave={(e) => e.target.style.backgroundColor = COLORS.secondary}
        >
          <X size={16} />
          Reset
        </button>
      </div>
    </div>
  );
};
