export const TIMING = {
  immediate:  { label: 'Immédiat',   short: 'Imm.',  description: 'En main' },
  disponible: { label: 'Disponible', short: 'Dispo.', description: 'Sur comptes' },
  semaine:    { label: 'Semaine',    short: 'Sem.',   description: '7 jours' },
  semaine1:   { label: 'Semaine 1',  short: 'S1',     description: '1re semaine' },
  semaine2:   { label: 'Semaine 2',  short: 'S2',     description: '2e semaine' },
  finmois:    { label: 'Fin mois',   short: 'Fin',    description: 'Fin du mois' },
  spread:     { label: 'Réparti',    short: 'Rép.',   description: 'Sur le mois' },
};

export const CHART_COLORS = [
  '#3498db', '#e74c3c', '#27ae60', '#f39c12',
  '#9b59b6', '#1abc9c', '#34495e', '#e67e22',
];

export const STORAGE_KEY = 'kameha_tresorerie_v2';

export const INITIAL_TRANSACTIONS = [
  // Situation actuelle
  { id: 1,   label: 'Takeaway novembre',            montant: 8763.32, type: 'entree', timing: 'immediate',  vue: 'actuelle',   date: '2025-11-10' },
  { id: 2,   label: 'Cash en main',                 montant: 700,     type: 'entree', timing: 'immediate',  vue: 'actuelle',   date: '2025-11-10' },
  { id: 3,   label: 'Fintro',                       montant: 907,     type: 'entree', timing: 'disponible', vue: 'actuelle',   date: '2025-11-10' },
  { id: 4,   label: 'Revolut Business',             montant: 2447.98, type: 'entree', timing: 'disponible', vue: 'actuelle',   date: '2025-11-10' },
  { id: 101, label: 'Loyer',                        montant: 1250,    type: 'sortie', timing: 'immediate',  vue: 'actuelle',   date: '2025-11-10' },
  { id: 102, label: 'Mimosa (fournitures)',          montant: 385,     type: 'sortie', timing: 'immediate',  vue: 'actuelle',   date: '2025-11-10' },
  { id: 103, label: 'Lucas (fournisseur)',           montant: 126,     type: 'sortie', timing: 'immediate',  vue: 'actuelle',   date: '2025-11-10' },
  { id: 104, label: 'Frais bancaires',              montant: 50,      type: 'sortie', timing: 'immediate',  vue: 'actuelle',   date: '2025-11-10' },
  { id: 105, label: 'Salaire Découpeur',             montant: 2084,    type: 'sortie', timing: 'disponible', vue: 'actuelle',   date: '2025-11-10' },
  { id: 106, label: 'Salaire Livreur 2',            montant: 3034,    type: 'sortie', timing: 'disponible', vue: 'actuelle',   date: '2025-11-10' },
  { id: 107, label: 'Remboursement Ellie (5 du mois)', montant: 2420, type: 'sortie', timing: 'semaine',    vue: 'actuelle',   date: '2025-11-10' },
  { id: 108, label: 'Commissions iFood',            montant: 1800,    type: 'sortie', timing: 'finmois',    vue: 'actuelle',   date: '2025-11-10' },
  { id: 109, label: 'Comptable ELY CORP',           montant: 305,     type: 'sortie', timing: 'finmois',    vue: 'actuelle',   date: '2025-11-10' },
  { id: 110, label: 'Assurance',                    montant: 200,     type: 'sortie', timing: 'finmois',    vue: 'actuelle',   date: '2025-11-10' },

  // Estimation mensuelle
  { id: 201, label: 'CA Takeaway/Livraison',        montant: 30000,   type: 'entree', timing: 'spread',     vue: 'estimation', date: '2025-12-01' },
  { id: 301, label: 'Loyer',                        montant: 1250,    type: 'sortie', timing: 'immediate',  vue: 'estimation', date: '2025-12-01' },
  { id: 302, label: 'Remboursement Ellie',          montant: 2420,    type: 'sortie', timing: 'semaine1',   vue: 'estimation', date: '2025-12-05' },
  { id: 303, label: 'Food Cost',                    montant: 6900,    type: 'sortie', timing: 'spread',     vue: 'estimation', date: '2025-12-01' },
  { id: 304, label: 'Salaire Découpeur',             montant: 2084,    type: 'sortie', timing: 'semaine2',   vue: 'estimation', date: '2025-12-10' },
  { id: 305, label: 'Salaire Livreur 2',            montant: 3034,    type: 'sortie', timing: 'semaine2',   vue: 'estimation', date: '2025-12-10' },
  { id: 306, label: 'Charges patronales',           montant: 1280,    type: 'sortie', timing: 'finmois',    vue: 'estimation', date: '2025-12-30' },
  { id: 307, label: 'Comptable ELY CORP',           montant: 305,     type: 'sortie', timing: 'finmois',    vue: 'estimation', date: '2025-12-30' },
  { id: 308, label: 'Assurance',                    montant: 200,     type: 'sortie', timing: 'finmois',    vue: 'estimation', date: '2025-12-30' },
  { id: 309, label: 'Électricité/Gaz',              montant: 400,     type: 'sortie', timing: 'finmois',    vue: 'estimation', date: '2025-12-30' },
  { id: 310, label: 'Eau',                          montant: 100,     type: 'sortie', timing: 'finmois',    vue: 'estimation', date: '2025-12-30' },
  { id: 311, label: 'Indemnités km livreurs',       montant: 400,     type: 'sortie', timing: 'spread',     vue: 'estimation', date: '2025-12-01' },
  { id: 312, label: 'Commissions iFood',            montant: 1800,    type: 'sortie', timing: 'finmois',    vue: 'estimation', date: '2025-12-30' },
];
