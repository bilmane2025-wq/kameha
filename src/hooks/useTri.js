import { useState, useCallback, useMemo } from 'react';
import { trierTransactions } from '../utils/tresorerie';

/**
 * Hook personnalisé pour gérer le tri des transactions
 */
export const useTri = (transactions) => {
  const [tri, setTri] = useState({
    colonne: 'date',
    direction: 'desc'
  });

  // Changer le tri
  const changerTri = useCallback((colonne) => {
    setTri(prev => ({
      colonne,
      direction: prev.colonne === colonne && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  }, []);

  // Transactions triées
  const transactionsTriees = useMemo(() => {
    return trierTransactions(transactions, tri.colonne, tri.direction);
  }, [transactions, tri]);

  return {
    tri,
    changerTri,
    transactionsTriees
  };
};
