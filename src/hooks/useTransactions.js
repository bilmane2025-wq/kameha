import { useState, useEffect, useCallback, useMemo } from 'react';
import { INITIAL_TRANSACTIONS, STORAGE_KEY } from '../constants/tresorerie';
import {
  chargerLocalStorage,
  sauvegarderLocalStorage,
  validerTransaction
} from '../utils/tresorerie';

/**
 * Hook personnalisé pour gérer les transactions
 */
export const useTransactions = () => {
  const [transactions, setTransactions] = useState(() => {
    // Charger depuis localStorage au démarrage
    const saved = chargerLocalStorage(STORAGE_KEY);
    return saved || INITIAL_TRANSACTIONS;
  });

  const [erreur, setErreur] = useState(null);

  // Sauvegarder automatiquement dans localStorage
  useEffect(() => {
    sauvegarderLocalStorage(STORAGE_KEY, transactions);
  }, [transactions]);

  // Ajouter une transaction
  const ajouterTransaction = useCallback((nouvelleTransaction) => {
    const validation = validerTransaction(nouvelleTransaction);

    if (!validation.valide) {
      setErreur(validation.erreurs.join(', '));
      return false;
    }

    const nextId = Math.max(...transactions.map(t => t.id), 0) + 1;
    const transaction = {
      ...nouvelleTransaction,
      id: nextId,
      montant: parseFloat(nouvelleTransaction.montant),
      date: nouvelleTransaction.date || new Date().toISOString().split('T')[0]
    };

    setTransactions(prev => [...prev, transaction]);
    setErreur(null);
    return true;
  }, [transactions]);

  // Modifier une transaction
  const modifierTransaction = useCallback((id, champ, valeur) => {
    setTransactions(prev =>
      prev.map(t => {
        if (t.id !== id) return t;

        const nouveauT = {
          ...t,
          [champ]: champ === 'montant' ? parseFloat(valeur) || 0 : valeur
        };

        // Valider si c'est un champ important
        if (['label', 'montant', 'type', 'vue'].includes(champ)) {
          const validation = validerTransaction(nouveauT);
          if (!validation.valide) {
            setErreur(validation.erreurs.join(', '));
            return t; // Ne pas modifier si invalide
          }
        }

        setErreur(null);
        return nouveauT;
      })
    );
  }, []);

  // Supprimer une transaction
  const supprimerTransaction = useCallback((id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
    setErreur(null);
  }, []);

  // Dupliquer une transaction
  const dupliquerTransaction = useCallback((id) => {
    const aDupliquer = transactions.find(t => t.id === id);
    if (!aDupliquer) return false;

    const nextId = Math.max(...transactions.map(t => t.id), 0) + 1;
    const nouvelle = {
      ...aDupliquer,
      id: nextId,
      label: `${aDupliquer.label} (copie)`,
      date: new Date().toISOString().split('T')[0]
    };

    setTransactions(prev => [...prev, nouvelle]);
    return true;
  }, [transactions]);

  // Réinitialiser aux données par défaut
  const reinitialiser = useCallback(() => {
    if (window.confirm('Réinitialiser toutes les transactions aux valeurs par défaut ?')) {
      setTransactions(INITIAL_TRANSACTIONS);
      setErreur(null);
      return true;
    }
    return false;
  }, []);

  // Importer des transactions (depuis un fichier JSON)
  const importerTransactions = useCallback((nouvellesTransactions) => {
    try {
      // Valider toutes les transactions
      const validations = nouvellesTransactions.map(validerTransaction);
      const invalides = validations.filter(v => !v.valide);

      if (invalides.length > 0) {
        setErreur(`${invalides.length} transaction(s) invalide(s)`);
        return false;
      }

      setTransactions(nouvellesTransactions);
      setErreur(null);
      return true;
    } catch (error) {
      setErreur('Erreur lors de l\'importation');
      return false;
    }
  }, []);

  // Effacer l'erreur
  const effacerErreur = useCallback(() => {
    setErreur(null);
  }, []);

  return {
    transactions,
    ajouterTransaction,
    modifierTransaction,
    supprimerTransaction,
    dupliquerTransaction,
    reinitialiser,
    importerTransactions,
    erreur,
    effacerErreur
  };
};
