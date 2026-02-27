import React, { useState, useMemo, useCallback } from 'react';
import { Plus, Download, RotateCcw, AlertCircle, Search } from 'lucide-react';
import { TIMING } from '../data';
import { useTransactions } from '../hooks/useTransactions';
import { fmt, totaux, filtrer, trier, exportCSV, timelineData, categorieData } from '../utils';
import { TransactionForm } from './TransactionForm';
import { TransactionTable } from './TransactionTable';
import { TimelineChart, RepartitionChart } from './Charts';

export default function TresoreriePro() {
  const [transactions, dispatch] = useTransactions();

  // UI state
  const [showForm, setShowForm] = useState(false);
  const [vue, setVue] = useState('actuelle');
  const [filtre, setFiltre] = useState({ type: 'tous', timing: 'tous', recherche: '' });
  const [tri, setTri] = useState({ col: 'label', dir: 'asc' });

  const handleTri = useCallback((col) => {
    setTri((prev) => ({
      col,
      dir: prev.col === col && prev.dir === 'asc' ? 'desc' : 'asc',
    }));
  }, []);

  // Computed data
  const filtered = useMemo(
    () => filtrer(transactions, { vue, ...filtre }),
    [transactions, vue, filtre]
  );

  const sorted = useMemo(
    () => trier(filtered, tri.col, tri.dir),
    [filtered, tri]
  );

  const totFiltered = useMemo(() => totaux(filtered), [filtered]);
  const totActuelle = useMemo(() => totaux(transactions.filter((t) => t.vue === 'actuelle')), [transactions]);
  const totEstimation = useMemo(() => totaux(transactions.filter((t) => t.vue === 'estimation')), [transactions]);

  const chartTimeline = useMemo(() => timelineData(filtered, TIMING), [filtered]);
  const chartCategorie = useMemo(() => categorieData(filtered), [filtered]);

  // Alertes
  const alertes = useMemo(() => {
    const a = [];
    if (totActuelle.solde < 0)
      a.push({ level: 'danger', msg: `Déficit actuel : ${fmt(totActuelle.solde)}` });
    else if (totActuelle.solde < 5000)
      a.push({ level: 'warning', msg: `Trésorerie faible : ${fmt(totActuelle.solde)}` });
    if (totEstimation.solde < 0)
      a.push({ level: 'danger', msg: `Estimation négative : ${fmt(totEstimation.solde)}` });
    return a;
  }, [totActuelle, totEstimation]);

  const handleReset = () => {
    if (window.confirm('Réinitialiser toutes les transactions ?')) {
      dispatch({ type: 'reset' });
    }
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <h1>Trésorerie Pro</h1>
        <p>Gestion des flux - Kamehapoke</p>
      </header>

      {/* Alertes */}
      {alertes.map((a, i) => (
        <div key={i} className={`alerte alerte--${a.level}`}>
          <AlertCircle size={18} />
          {a.msg}
        </div>
      ))}

      {/* Vue tabs */}
      <div className="vue-tabs" role="tablist" aria-label="Vues">
        {['actuelle', 'estimation'].map((v) => (
          <button
            key={v}
            role="tab"
            aria-selected={vue === v}
            className={`vue-tab ${vue === v ? 'vue-tab--active' : ''}`}
            onClick={() => setVue(v)}
          >
            {v === 'actuelle' ? 'Actuelle' : 'Estimation'}
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="toolbar">
        <button className="btn btn--success" onClick={() => setShowForm(!showForm)}>
          <Plus size={16} /> {showForm ? 'Fermer' : 'Ajouter'}
        </button>
        <button className="btn btn--primary" onClick={() => exportCSV(sorted)}>
          <Download size={16} /> CSV
        </button>
        <button className="btn btn--warning" onClick={handleReset}>
          <RotateCcw size={16} /> Reset
        </button>
      </div>

      {/* Form */}
      {showForm && <TransactionForm dispatch={dispatch} onClose={() => setShowForm(false)} />}

      {/* Filtres */}
      <div className="filtres">
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Search size={16} style={{ position: 'absolute', left: 10, color: '#95a5a6', pointerEvents: 'none' }} />
          <input
            className="filtres__input"
            type="text"
            placeholder="Rechercher..."
            value={filtre.recherche}
            onChange={(e) => setFiltre({ ...filtre, recherche: e.target.value })}
            style={{ paddingLeft: 34 }}
            aria-label="Rechercher dans les transactions"
          />
        </div>
        <select
          className="filtres__select"
          value={filtre.type}
          onChange={(e) => setFiltre({ ...filtre, type: e.target.value })}
          aria-label="Filtrer par type"
        >
          <option value="tous">Tous types</option>
          <option value="entree">Entrées</option>
          <option value="sortie">Sorties</option>
        </select>
        <select
          className="filtres__select"
          value={filtre.timing}
          onChange={(e) => setFiltre({ ...filtre, timing: e.target.value })}
          aria-label="Filtrer par timing"
        >
          <option value="tous">Tous timings</option>
          {Object.entries(TIMING).map(([key, { label }]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
        {(filtre.type !== 'tous' || filtre.timing !== 'tous' || filtre.recherche) && (
          <button
            className="btn btn--muted btn--sm"
            onClick={() => setFiltre({ type: 'tous', timing: 'tous', recherche: '' })}
          >
            Effacer filtres
          </button>
        )}
      </div>

      {/* Cartes totaux */}
      <div className="grid-3">
        <div className="carte carte--success">
          <div className="carte__label">Entrées</div>
          <div className="carte__montant carte__montant--success">+{fmt(totFiltered.entrees)}</div>
        </div>
        <div className="carte carte--danger">
          <div className="carte__label">Sorties</div>
          <div className="carte__montant carte__montant--danger">-{fmt(totFiltered.sorties)}</div>
        </div>
        <div className={`carte ${totFiltered.solde >= 0 ? 'carte--primary' : 'carte--danger'}`}>
          <div className="carte__label">Solde</div>
          <div className={`carte__montant ${totFiltered.solde >= 0 ? 'carte__montant--primary' : 'carte__montant--danger'}`}>
            {fmt(totFiltered.solde)}
          </div>
        </div>
      </div>

      {/* Résumé par vue */}
      <div className="grid-3">
        <div className="carte carte--neutral">
          <div className="carte__label">Situation actuelle</div>
          <div className={`carte__montant ${totActuelle.solde >= 0 ? 'carte__montant--success' : 'carte__montant--danger'}`}>
            {fmt(totActuelle.solde)}
          </div>
          <div className="carte__detail">
            {fmt(totActuelle.entrees)} in / {fmt(totActuelle.sorties)} out
          </div>
        </div>
        <div className="carte carte--neutral">
          <div className="carte__label">Estimation mensuelle</div>
          <div className={`carte__montant ${totEstimation.solde >= 0 ? 'carte__montant--success' : 'carte__montant--danger'}`}>
            {fmt(totEstimation.solde)}
          </div>
          <div className="carte__detail">
            {fmt(totEstimation.entrees)} in / {fmt(totEstimation.sorties)} out
          </div>
        </div>
      </div>

      {/* Graphiques */}
      <div className="grid-2">
        <TimelineChart data={chartTimeline} />
        <RepartitionChart data={chartCategorie} />
      </div>

      {/* Tableau */}
      <TransactionTable
        transactions={sorted}
        dispatch={dispatch}
        tri={tri}
        onTri={handleTri}
      />

      {/* Footer */}
      <footer className="footer">
        Sauvegarde automatique dans le navigateur &middot; {transactions.length} transactions
      </footer>
    </div>
  );
}
