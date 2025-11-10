import React from 'react';
import { Copy, Trash2, ArrowUpDown } from 'lucide-react';
import { TIMING_OPTIONS, TYPE_OPTIONS, COLORS } from '../../constants/tresorerie';

/**
 * Composant tableau des transactions avec édition inline
 */
export const TableauTransactions = ({
  transactions,
  onModifier,
  onSupprimer,
  onDupliquer,
  tri,
  onChangerTri
}) => {
  const colonnes = [
    { key: 'label', titre: 'Description', triable: true },
    { key: 'montant', titre: 'Montant', triable: true },
    { key: 'type', titre: 'Type', triable: true },
    { key: 'timing', titre: 'Timing', triable: true },
    { key: 'actions', titre: 'Actions', triable: false }
  ];

  const handleSupprimer = (id, label) => {
    if (window.confirm(`Supprimer "${label}" ?`)) {
      onSupprimer(id);
    }
  };

  return (
    <div
      style={{
        backgroundColor: COLORS.bg.white,
        padding: '15px',
        borderRadius: '8px',
        border: `1px solid ${COLORS.border.lighter}`,
        overflowX: 'auto',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}
    >
      <h3 style={{ margin: '0 0 15px 0', color: COLORS.text.primary, fontSize: '16px' }}>
        📋 Transactions ({transactions.length})
      </h3>

      {transactions.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '40px',
            color: COLORS.text.secondary,
            fontSize: '14px'
          }}
        >
          Aucune transaction trouvée
        </div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ backgroundColor: COLORS.bg.light, borderBottom: `2px solid ${COLORS.border.light}` }}>
              {colonnes.map(col => (
                <th
                  key={col.key}
                  onClick={() => col.triable && onChangerTri(col.key)}
                  style={{
                    padding: '12px 10px',
                    textAlign: col.key === 'montant' ? 'right' : col.key === 'actions' ? 'center' : 'left',
                    fontWeight: 'bold',
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    color: COLORS.text.primary,
                    cursor: col.triable ? 'pointer' : 'default',
                    userSelect: 'none',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => col.triable && (e.target.style.backgroundColor = '#e8e8e8')}
                  onMouseLeave={(e) => col.triable && (e.target.style.backgroundColor = 'transparent')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', justifyContent: col.key === 'montant' ? 'flex-end' : col.key === 'actions' ? 'center' : 'flex-start' }}>
                    {col.titre}
                    {col.triable && tri.colonne === col.key && (
                      <ArrowUpDown size={12} style={{ transform: tri.direction === 'desc' ? 'rotate(180deg)' : 'none' }} />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, idx) => (
              <tr
                key={t.id}
                style={{
                  borderBottom: `1px solid ${COLORS.border.lighter}`,
                  backgroundColor: idx % 2 === 0 ? COLORS.bg.white : COLORS.bg.light,
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = idx % 2 === 0 ? COLORS.bg.white : COLORS.bg.light}
              >
                {/* Description */}
                <td style={{ padding: '10px' }}>
                  <input
                    type="text"
                    value={t.label}
                    onChange={(e) => onModifier(t.id, 'label', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '6px',
                      border: `1px solid ${COLORS.border.light}`,
                      borderRadius: '3px',
                      fontSize: '13px',
                      outline: 'none',
                      backgroundColor: COLORS.bg.white
                    }}
                    onFocus={(e) => e.target.style.borderColor = COLORS.primary}
                    onBlur={(e) => e.target.style.borderColor = COLORS.border.light}
                  />
                </td>

                {/* Montant */}
                <td style={{ padding: '10px', textAlign: 'right' }}>
                  <input
                    type="number"
                    value={t.montant}
                    onChange={(e) => onModifier(t.id, 'montant', e.target.value)}
                    min="0"
                    step="0.01"
                    style={{
                      width: '90px',
                      padding: '6px',
                      border: `2px solid ${t.type === 'entree' ? COLORS.border.success : COLORS.border.danger}`,
                      borderRadius: '3px',
                      fontSize: '13px',
                      fontWeight: 'bold',
                      color: t.type === 'entree' ? COLORS.text.success : COLORS.text.danger,
                      textAlign: 'right',
                      outline: 'none',
                      backgroundColor: COLORS.bg.white
                    }}
                  />
                </td>

                {/* Type */}
                <td style={{ padding: '10px', textAlign: 'center' }}>
                  <select
                    value={t.type}
                    onChange={(e) => onModifier(t.id, 'type', e.target.value)}
                    style={{
                      padding: '6px',
                      borderRadius: '3px',
                      border: `1px solid ${COLORS.border.light}`,
                      fontSize: '12px',
                      backgroundColor: t.type === 'entree' ? COLORS.bg.success : COLORS.bg.danger,
                      color: t.type === 'entree' ? COLORS.text.success : COLORS.text.danger,
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      outline: 'none'
                    }}
                  >
                    <option value={TYPE_OPTIONS.entree.value}>{TYPE_OPTIONS.entree.label}</option>
                    <option value={TYPE_OPTIONS.sortie.value}>{TYPE_OPTIONS.sortie.label}</option>
                  </select>
                </td>

                {/* Timing */}
                <td style={{ padding: '10px', textAlign: 'center' }}>
                  <select
                    value={t.timing}
                    onChange={(e) => onModifier(t.id, 'timing', e.target.value)}
                    style={{
                      padding: '6px',
                      borderRadius: '3px',
                      border: `1px solid ${COLORS.border.light}`,
                      fontSize: '11px',
                      maxWidth: '100px',
                      cursor: 'pointer',
                      outline: 'none',
                      backgroundColor: COLORS.bg.white
                    }}
                  >
                    {Object.values(TIMING_OPTIONS).map(option => (
                      <option key={option.value} value={option.value}>
                        {option.shortLabel}
                      </option>
                    ))}
                  </select>
                </td>

                {/* Actions */}
                <td style={{ padding: '10px', textAlign: 'center' }}>
                  <div style={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
                    <button
                      onClick={() => onDupliquer(t.id)}
                      title="Dupliquer"
                      style={{
                        padding: '6px 10px',
                        backgroundColor: COLORS.info,
                        color: 'white',
                        border: 'none',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        fontSize: '11px',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '3px',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#16a085'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = COLORS.info}
                    >
                      <Copy size={12} />
                    </button>
                    <button
                      onClick={() => handleSupprimer(t.id, t.label)}
                      title="Supprimer"
                      style={{
                        padding: '6px 10px',
                        backgroundColor: COLORS.danger,
                        color: 'white',
                        border: 'none',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        fontSize: '11px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '3px',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#c0392b'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = COLORS.danger}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
