import { useState, useCallback, useMemo } from 'react';
import { filtrerTransactions } from '../utils/tresorerie';

/**
 * Hook personnalisé pour gérer les filtres
 */
export const useFiltres = (transactions) => {
  const [filtres, setFiltres] = useState({
    vue: 'actuelle',
    type: 'tous',
    timing: 'tous',
    recherche: ''
  });

  // Changer un filtre
  const changerFiltre = useCallback((nom, valeur) => {
    setFiltres(prev => ({
      ...prev,
      [nom]: valeur
    }));
  }, []);

  // Réinitialiser les filtres
  const reinitialiserFiltres = useCallback(() => {
    setFiltres({
      vue: filtres.vue, // Garder la vue actuelle
      type: 'tous',
      timing: 'tous',
      recherche: ''
    });
  }, [filtres.vue]);

  // Changer de vue
  const changerVue = useCallback((vue) => {
    setFiltres(prev => ({
      ...prev,
      vue
    }));
  }, []);

  // Transactions filtrées
  const transactionsFiltrees = useMemo(() => {
    return filtrerTransactions(transactions, filtres);
  }, [transactions, filtres]);

  return {
    filtres,
    changerFiltre,
    reinitialiserFiltres,
    changerVue,
    transactionsFiltrees
  };
};
