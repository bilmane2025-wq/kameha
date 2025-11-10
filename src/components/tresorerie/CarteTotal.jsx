import React from 'react';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { formatEuro } from '../../utils/tresorerie';
import { COLORS } from '../../constants/tresorerie';

/**
 * Composant pour afficher une carte de total
 */
export const CarteTotal = ({ titre, montant, type, icone: Icone }) => {
  const config = {
    entree: {
      couleur: COLORS.success,
      bg: COLORS.bg.success,
      border: COLORS.border.success,
      icone: TrendingUp
    },
    sortie: {
      couleur: COLORS.danger,
      bg: COLORS.bg.danger,
      border: COLORS.border.danger,
      icone: TrendingDown
    },
    solde: {
      couleur: montant >= 0 ? COLORS.primary : COLORS.danger,
      bg: montant >= 0 ? COLORS.bg.info : COLORS.bg.danger,
      border: montant >= 0 ? COLORS.border.primary : COLORS.border.danger,
      icone: DollarSign
    }
  };

  const style = config[type] || config.solde;
  const IconeAffichee = Icone || style.icone;

  return (
    <div
      style={{
        backgroundColor: style.bg,
        padding: '15px',
        borderRadius: '8px',
        border: `2px solid ${style.border}`,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        cursor: 'default'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <IconeAffichee size={16} color={style.couleur} />
        <p style={{
          margin: '0',
          fontSize: '11px',
          fontWeight: 'bold',
          color: style.couleur,
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          {titre}
        </p>
      </div>
      <p style={{
        margin: '0',
        fontSize: '22px',
        fontWeight: 'bold',
        color: style.couleur
      }}>
        {type === 'entree' && '+'}
        {type === 'sortie' && '-'}
        {type === 'solde' && montant >= 0 && '+'}
        {formatEuro(Math.abs(montant))}
      </p>
    </div>
  );
};
