const euroFmt = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
});

export const fmt = (n) => euroFmt.format(n);

export function totaux(transactions) {
  let entrees = 0;
  let sorties = 0;
  for (const t of transactions) {
    if (t.type === 'entree') entrees += t.montant;
    else sorties += t.montant;
  }
  return { entrees, sorties, solde: entrees - sorties };
}

export function filtrer(transactions, { vue, type, timing, recherche }) {
  return transactions.filter((t) => {
    if (vue !== 'tous' && t.vue !== vue) return false;
    if (type !== 'tous' && t.type !== type) return false;
    if (timing !== 'tous' && t.timing !== timing) return false;
    if (recherche && !t.label.toLowerCase().includes(recherche.toLowerCase())) return false;
    return true;
  });
}

export function trier(transactions, colonne, direction) {
  return [...transactions].sort((a, b) => {
    let va = a[colonne];
    let vb = b[colonne];
    if (typeof va === 'string') { va = va.toLowerCase(); vb = vb.toLowerCase(); }
    if (va < vb) return direction === 'asc' ? -1 : 1;
    if (va > vb) return direction === 'asc' ? 1 : -1;
    return 0;
  });
}

function escapeCsvField(value) {
  const str = String(value);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function exportCSV(transactions) {
  const headers = ['Description', 'Montant', 'Type', 'Timing', 'Vue', 'Date'];
  const rows = transactions.map((t) =>
    [t.label, t.montant, t.type, t.timing, t.vue, t.date].map(escapeCsvField).join(',')
  );
  const csv = [headers.join(','), ...rows].join('\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' }); // BOM pour Excel
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `tresorerie_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export function timelineData(transactions, timingMap) {
  const groupes = {};
  for (const t of transactions) {
    if (!groupes[t.timing]) {
      groupes[t.timing] = { label: timingMap[t.timing]?.label || t.timing, entrees: 0, sorties: 0 };
    }
    if (t.type === 'entree') groupes[t.timing].entrees += t.montant;
    else groupes[t.timing].sorties += t.montant;
  }
  return Object.values(groupes).filter((g) => g.entrees > 0 || g.sorties > 0);
}

export function categorieData(transactions) {
  const map = {};
  for (const t of transactions) {
    map[t.label] = (map[t.label] || 0) + t.montant;
  }
  return Object.entries(map)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);
}

export function loadStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function saveStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch { /* quota exceeded - fail silently */ }
}
