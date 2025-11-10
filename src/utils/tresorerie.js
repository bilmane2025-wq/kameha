/**
 * Fonctions utilitaires pour la trésorerie
 */

/**
 * Formate un montant en euros
 */
export const formatEuro = (montant) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(montant);
};

/**
 * Formate un montant simple (sans symbole €)
 */
export const formatMontant = (montant) => {
  return montant.toLocaleString('fr-FR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

/**
 * Calcule les totaux (entrées, sorties, solde)
 */
export const calculerTotaux = (transactions) => {
  const entrees = transactions
    .filter(t => t.type === 'entree')
    .reduce((sum, t) => sum + t.montant, 0);

  const sorties = transactions
    .filter(t => t.type === 'sortie')
    .reduce((sum, t) => sum + t.montant, 0);

  return {
    entrees,
    sorties,
    solde: entrees - sorties
  };
};

/**
 * Filtre les transactions selon les critères
 */
export const filtrerTransactions = (transactions, filtres) => {
  return transactions.filter(t => {
    if (filtres.vue !== 'tous' && t.vue !== filtres.vue) return false;
    if (filtres.type !== 'tous' && t.type !== filtres.type) return false;
    if (filtres.timing !== 'tous' && t.timing !== filtres.timing) return false;
    if (filtres.recherche) {
      const recherche = filtres.recherche.toLowerCase();
      if (!t.label.toLowerCase().includes(recherche)) return false;
    }
    return true;
  });
};

/**
 * Génère les données pour le graphique timeline
 */
export const genererTimelineData = (transactions, timingOptions) => {
  const groupes = {};

  Object.values(timingOptions).forEach(option => {
    groupes[option.value] = {
      label: option.label,
      entrees: 0,
      sorties: 0
    };
  });

  transactions.forEach(t => {
    if (groupes[t.timing]) {
      if (t.type === 'entree') {
        groupes[t.timing].entrees += t.montant;
      } else {
        groupes[t.timing].sorties += t.montant;
      }
    }
  });

  return Object.values(groupes).filter(g => g.entrees > 0 || g.sorties > 0);
};

/**
 * Génère les données pour le pie chart
 */
export const genererCategorieData = (transactions) => {
  const categories = {};

  transactions.forEach(t => {
    if (!categories[t.label]) {
      categories[t.label] = 0;
    }
    categories[t.label] += t.montant * (t.type === 'entree' ? 1 : -1);
  });

  return Object.entries(categories)
    .map(([name, value]) => ({
      name,
      value: Math.abs(value)
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10); // Top 10
};

/**
 * Génère les alertes basées sur les seuils
 */
export const genererAlertes = (totalActuelle, totalEstimation, seuils) => {
  const alertes = [];

  if (totalActuelle.solde < seuils.deficit) {
    alertes.push({
      type: 'danger',
      msg: `Déficit actuellement: ${formatEuro(totalActuelle.solde)}`,
      priorite: 1
    });
  } else if (totalActuelle.solde < seuils.tresorerieBassse) {
    alertes.push({
      type: 'warning',
      msg: `Trésorerie faible: ${formatEuro(totalActuelle.solde)}`,
      priorite: 2
    });
  }

  if (totalEstimation.solde < seuils.deficit) {
    alertes.push({
      type: 'danger',
      msg: `Estimation négative: ${formatEuro(totalEstimation.solde)}`,
      priorite: 1
    });
  }

  // Trier par priorité
  return alertes.sort((a, b) => a.priorite - b.priorite);
};

/**
 * Valide une transaction
 */
export const validerTransaction = (transaction) => {
  const erreurs = [];

  if (!transaction.label || transaction.label.trim() === '') {
    erreurs.push('La description est requise');
  }

  if (!transaction.montant || transaction.montant <= 0) {
    erreurs.push('Le montant doit être supérieur à 0');
  }

  if (!transaction.type || !['entree', 'sortie'].includes(transaction.type)) {
    erreurs.push('Type invalide');
  }

  if (!transaction.timing) {
    erreurs.push('Le timing est requis');
  }

  if (!transaction.vue || !['actuelle', 'estimation'].includes(transaction.vue)) {
    erreurs.push('Vue invalide');
  }

  return {
    valide: erreurs.length === 0,
    erreurs
  };
};

/**
 * Exporte les transactions en CSV
 */
export const exporterCSV = (transactions, nomFichier = null) => {
  const headers = ['Description', 'Montant', 'Type', 'Timing', 'Vue', 'Date'];
  const rows = transactions.map(t => [
    t.label,
    t.montant,
    t.type,
    t.timing,
    t.vue,
    t.date
  ]);

  const csv = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = nomFichier || `tresorerie_${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
  window.URL.revokeObjectURL(url);
};

/**
 * Trie les transactions
 */
export const trierTransactions = (transactions, colonne, direction) => {
  return [...transactions].sort((a, b) => {
    let valA = a[colonne];
    let valB = b[colonne];

    // Gestion des nombres
    if (colonne === 'montant') {
      valA = parseFloat(valA);
      valB = parseFloat(valB);
    }

    // Gestion des dates
    if (colonne === 'date') {
      valA = new Date(valA);
      valB = new Date(valB);
    }

    // Gestion des chaînes
    if (typeof valA === 'string') {
      valA = valA.toLowerCase();
      valB = valB.toLowerCase();
    }

    if (valA < valB) return direction === 'asc' ? -1 : 1;
    if (valA > valB) return direction === 'asc' ? 1 : -1;
    return 0;
  });
};

/**
 * Calcule les statistiques avancées
 */
export const calculerStatistiques = (transactions) => {
  const stats = {
    nombreTotal: transactions.length,
    nombreEntrees: transactions.filter(t => t.type === 'entree').length,
    nombreSorties: transactions.filter(t => t.type === 'sortie').length,
    montantMoyen: 0,
    montantMedian: 0,
    montantMax: 0,
    montantMin: 0
  };

  if (transactions.length === 0) return stats;

  const montants = transactions.map(t => t.montant).sort((a, b) => a - b);

  stats.montantMoyen = montants.reduce((sum, m) => sum + m, 0) / montants.length;
  stats.montantMedian = montants[Math.floor(montants.length / 2)];
  stats.montantMax = Math.max(...montants);
  stats.montantMin = Math.min(...montants);

  return stats;
};

/**
 * Sauvegarde dans localStorage
 */
export const sauvegarderLocalStorage = (cle, donnees) => {
  try {
    localStorage.setItem(cle, JSON.stringify(donnees));
    return true;
  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error);
    return false;
  }
};

/**
 * Charge depuis localStorage
 */
export const chargerLocalStorage = (cle, valeurParDefaut = null) => {
  try {
    const donnees = localStorage.getItem(cle);
    return donnees ? JSON.parse(donnees) : valeurParDefaut;
  } catch (error) {
    console.error('Erreur lors du chargement:', error);
    return valeurParDefaut;
  }
};
