import React from 'react';
import { Copy, Trash2 } from 'lucide-react';
import { TIMING } from '../data';

const COLONNES = [
  { key: 'label', label: 'Description' },
  { key: 'montant', label: 'Montant', align: 'right' },
  { key: 'type', label: 'Type', align: 'center' },
  { key: 'timing', label: 'Timing', align: 'center' },
  { key: '_actions', label: 'Actions', align: 'center', sortable: false },
];

export function TransactionTable({ transactions, dispatch, tri, onTri }) {
  const handleUpdate = (id, field) => (e) => {
    dispatch({ type: 'update', payload: { id, field, value: e.target.value } });
  };

  const handleDelete = (id, label) => {
    if (window.confirm(`Supprimer "${label}" ?`)) {
      dispatch({ type: 'delete', payload: id });
    }
  };

  return (
    <div className="table-container">
      <div className="table-header">
        <span>Transactions</span>
        <span className="table-header__count">{transactions.length} ligne{transactions.length !== 1 ? 's' : ''}</span>
      </div>

      {transactions.length === 0 ? (
        <div className="table-empty">Aucune transaction</div>
      ) : (
        <table>
          <thead>
            <tr>
              {COLONNES.map((col) => (
                <th
                  key={col.key}
                  data-align={col.align}
                  onClick={col.sortable !== false ? () => onTri(col.key) : undefined}
                  style={col.sortable === false ? { cursor: 'default' } : undefined}
                  aria-sort={tri.col === col.key ? (tri.dir === 'asc' ? 'ascending' : 'descending') : undefined}
                >
                  {col.label}
                  {tri.col === col.key && (
                    <span className="sort-indicator">{tri.dir === 'asc' ? '▲' : '▼'}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id}>
                <td>
                  <input
                    className="table__input"
                    type="text"
                    value={t.label}
                    onChange={handleUpdate(t.id, 'label')}
                    aria-label={`Description de ${t.label}`}
                  />
                </td>
                <td style={{ textAlign: 'right' }}>
                  <input
                    className={`table__input table__montant table__montant--${t.type}`}
                    type="number"
                    min="0"
                    step="0.01"
                    value={t.montant}
                    onChange={handleUpdate(t.id, 'montant')}
                    aria-label={`Montant de ${t.label}`}
                  />
                </td>
                <td style={{ textAlign: 'center' }}>
                  <select
                    className={`table__select table__select--${t.type}`}
                    value={t.type}
                    onChange={handleUpdate(t.id, 'type')}
                    aria-label={`Type de ${t.label}`}
                  >
                    <option value="entree">Entrée</option>
                    <option value="sortie">Sortie</option>
                  </select>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <select
                    className="table__select"
                    value={t.timing}
                    onChange={handleUpdate(t.id, 'timing')}
                    aria-label={`Timing de ${t.label}`}
                  >
                    {Object.entries(TIMING).map(([key, { short }]) => (
                      <option key={key} value={key}>{short}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <div className="table__actions">
                    <button
                      className="btn btn--info btn--sm"
                      onClick={() => dispatch({ type: 'duplicate', payload: t.id })}
                      title="Dupliquer"
                      aria-label={`Dupliquer ${t.label}`}
                    >
                      <Copy size={12} />
                    </button>
                    <button
                      className="btn btn--danger btn--sm"
                      onClick={() => handleDelete(t.id, t.label)}
                      title="Supprimer"
                      aria-label={`Supprimer ${t.label}`}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
