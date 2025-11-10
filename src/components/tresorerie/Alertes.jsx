import React from 'react';
import { AlertCircle } from 'lucide-react';
import { COLORS } from '../../constants/tresorerie';

/**
 * Composant pour afficher les alertes
 */
export const Alertes = ({ alertes }) => {
  if (!alertes || alertes.length === 0) return null;

  return (
    <div style={{ marginBottom: '20px' }}>
      {alertes.map((alerte, idx) => (
        <div
          key={idx}
          style={{
            backgroundColor: alerte.type === 'danger' ? COLORS.bg.danger : COLORS.bg.warning,
            border: `2px solid ${alerte.type === 'danger' ? COLORS.border.danger : COLORS.border.warning}`,
            color: alerte.type === 'danger' ? COLORS.text.danger : COLORS.text.warning,
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          <AlertCircle size={20} />
          <strong>{alerte.msg}</strong>
        </div>
      ))}
    </div>
  );
};
