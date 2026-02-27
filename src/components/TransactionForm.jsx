import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { TIMING } from '../data';

const EMPTY = { label: '', montant: '', type: 'sortie', timing: 'immediate', vue: 'actuelle' };

export function TransactionForm({ dispatch, onClose }) {
  const [form, setForm] = useState(EMPTY);
  const [erreur, setErreur] = useState('');

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.label.trim()) return setErreur('Description requise');
    if (!form.montant || Number(form.montant) <= 0) return setErreur('Montant invalide');
    dispatch({ type: 'add', payload: form });
    setForm(EMPTY);
    setErreur('');
    onClose();
  };

  return (
    <div className="form-panel">
      <h3 className="form-panel__title">Nouvelle transaction</h3>
      {erreur && <div className="form-error">{erreur}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-field">
            <label className="form-field__label" htmlFor="tx-label">Description</label>
            <input
              id="tx-label"
              className="form-field__input"
              type="text"
              placeholder="Ex: Loyer"
              value={form.label}
              onChange={set('label')}
              autoFocus
              required
            />
          </div>
          <div className="form-field">
            <label className="form-field__label" htmlFor="tx-montant">Montant</label>
            <input
              id="tx-montant"
              className="form-field__input"
              type="number"
              placeholder="0.00"
              min="0.01"
              step="0.01"
              value={form.montant}
              onChange={set('montant')}
              required
            />
          </div>
          <div className="form-field">
            <label className="form-field__label" htmlFor="tx-type">Type</label>
            <select id="tx-type" className="form-field__select" value={form.type} onChange={set('type')}>
              <option value="entree">Entrée</option>
              <option value="sortie">Sortie</option>
            </select>
          </div>
          <div className="form-field">
            <label className="form-field__label" htmlFor="tx-timing">Timing</label>
            <select id="tx-timing" className="form-field__select" value={form.timing} onChange={set('timing')}>
              {Object.entries(TIMING).map(([key, { label }]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
          <div className="form-field">
            <label className="form-field__label" htmlFor="tx-vue">Vue</label>
            <select id="tx-vue" className="form-field__select" value={form.vue} onChange={set('vue')}>
              <option value="actuelle">Actuelle</option>
              <option value="estimation">Estimation</option>
            </select>
          </div>
        </div>
        <div className="toolbar">
          <button type="submit" className="btn btn--success">
            <Plus size={16} /> Ajouter
          </button>
          <button type="button" className="btn btn--muted" onClick={onClose}>
            <X size={16} /> Annuler
          </button>
        </div>
      </form>
    </div>
  );
}
