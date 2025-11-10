import { useMemo } from 'react';
import { calculerTotaux } from '../utils/tresorerie';

/**
 * Hook personnalisé pour calculer les totaux
 */
export const useTotaux = (transactions) => {
  // Totaux des transactions filtrées
  const totaux = useMemo(() => {
    return calculerTotaux(transactions);
  }, [transactions]);

  // Totaux de la vue actuelle
  const totalActuelle = useMemo(() => {
    const actuelle = transactions.filter(t => t.vue === 'actuelle');
    return calculerTotaux(actuelle);
  }, [transactions]);

  // Totaux de la vue estimation
  const totalEstimation = useMemo(() => {
    const estimation = transactions.filter(t => t.vue === 'estimation');
    return calculerTotaux(estimation);
  }, [transactions]);

  // Totaux par timing
  const totauxParTiming = useMemo(() => {
    const groupes = {};

    transactions.forEach(t => {
      if (!groupes[t.timing]) {
        groupes[t.timing] = {
          entrees: 0,
          sorties: 0,
          solde: 0
        };
      }

      if (t.type === 'entree') {
        groupes[t.timing].entrees += t.montant;
      } else {
        groupes[t.timing].sorties += t.montant;
      }
      groupes[t.timing].solde = groupes[t.timing].entrees - groupes[t.timing].sorties;
    });

    return groupes;
  }, [transactions]);

  return {
    totaux,
    totalActuelle,
    totalEstimation,
    totauxParTiming
  };
};
