import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { TIMING_OPTIONS, VUE_OPTIONS, TYPE_OPTIONS, COLORS } from '../../constants/tresorerie';

/**
 * Composant formulaire pour ajouter/modifier une transaction
 */
export const FormulaireTransaction = ({ onAjouter, onAnnuler, erreur }) => {
  const [formData, setFormData] = useState({
    label: '',
    montant: '',
    type: 'sortie',
    timing: 'immediate',
    vue: 'actuelle'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = onAjouter(formData);
    if (success) {
      setFormData({
        label: '',
        montant: '',
        type: 'sortie',
        timing: 'immediate',
        vue: 'actuelle'
      });
    }
  };

  return (
    <div
      style={{
        backgroundColor: COLORS.bg.white,
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px',
        border: `2px solid ${COLORS.border.primary}`,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}
    >
      <h3 style={{ margin: '0 0 15px 0', color: COLORS.text.primary, fontSize: '16px' }}>
        ➕ Ajouter une transaction
      </h3>

      {erreur && (
        <div
          style={{
            backgroundColor: COLORS.bg.danger,
            color: COLORS.text.danger,
            padding: '10px',
            borderRadius: '4px',
            marginBottom: '15px',
            fontSize: '13px',
            border: `1px solid ${COLORS.border.danger}`
          }}
        >
          ⚠️ {erreur}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '10px',
            marginBottom: '15px'
          }}
        >
          <input
            type="text"
            placeholder="Description *"
            value={formData.label}
            onChange={(e) => setFormData({ ...formData, label: e.target.value })}
            required
            style={{
              padding: '10px',
              borderRadius: '4px',
              border: `1px solid ${COLORS.border.light}`,
              fontSize: '13px',
              outline: 'none'
            }}
            onFocus={(e) => e.target.style.borderColor = COLORS.primary}
            onBlur={(e) => e.target.style.borderColor = COLORS.border.light}
          />

          <input
            type="number"
            placeholder="Montant *"
            value={formData.montant}
            onChange={(e) => setFormData({ ...formData, montant: e.target.value })}
            required
            min="0"
            step="0.01"
            style={{
              padding: '10px',
              borderRadius: '4px',
              border: `1px solid ${COLORS.border.light}`,
              fontSize: '13px',
              outline: 'none'
            }}
            onFocus={(e) => e.target.style.borderColor = COLORS.primary}
            onBlur={(e) => e.target.style.borderColor = COLORS.border.light}
          />

          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            style={{
              padding: '10px',
              borderRadius: '4px',
              border: `1px solid ${COLORS.border.light}`,
              fontSize: '13px',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value={TYPE_OPTIONS.entree.value}>{TYPE_OPTIONS.entree.label}</option>
            <option value={TYPE_OPTIONS.sortie.value}>{TYPE_OPTIONS.sortie.label}</option>
          </select>

          <select
            value={formData.timing}
            onChange={(e) => setFormData({ ...formData, timing: e.target.value })}
            style={{
              padding: '10px',
              borderRadius: '4px',
              border: `1px solid ${COLORS.border.light}`,
              fontSize: '13px',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            {Object.values(TIMING_OPTIONS).map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <select
            value={formData.vue}
            onChange={(e) => setFormData({ ...formData, vue: e.target.value })}
            style={{
              padding: '10px',
              borderRadius: '4px',
              border: `1px solid ${COLORS.border.light}`,
              fontSize: '13px',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value={VUE_OPTIONS.actuelle.value}>{VUE_OPTIONS.actuelle.label}</option>
            <option value={VUE_OPTIONS.estimation.value}>{VUE_OPTIONS.estimation.label}</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              backgroundColor: COLORS.success,
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#229954'}
            onMouseLeave={(e) => e.target.style.backgroundColor = COLORS.success}
          >
            <Check size={18} />
            Ajouter
          </button>

          <button
            type="button"
            onClick={onAnnuler}
            style={{
              padding: '10px 20px',
              backgroundColor: COLORS.secondary,
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#7f8c8d'}
            onMouseLeave={(e) => e.target.style.backgroundColor = COLORS.secondary}
          >
            <X size={18} />
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
};
