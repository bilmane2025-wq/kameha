import { useReducer, useEffect } from 'react';
import { INITIAL_TRANSACTIONS, STORAGE_KEY } from '../data';
import { loadStorage, saveStorage } from '../utils';

let nextId = Date.now();

function reducer(state, action) {
  switch (action.type) {
    case 'add': {
      const { label, montant, type, timing, vue } = action.payload;
      if (!label?.trim() || !montant || montant <= 0) return state;
      return [
        ...state,
        {
          id: ++nextId,
          label: label.trim(),
          montant: Number(montant),
          type,
          timing,
          vue,
          date: new Date().toISOString().slice(0, 10),
        },
      ];
    }
    case 'update': {
      const { id, field, value } = action.payload;
      return state.map((t) => {
        if (t.id !== id) return t;
        const newVal = field === 'montant' ? Math.max(0, Number(value) || 0) : value;
        return { ...t, [field]: newVal };
      });
    }
    case 'delete':
      return state.filter((t) => t.id !== action.payload);
    case 'duplicate': {
      const source = state.find((t) => t.id === action.payload);
      if (!source) return state;
      return [
        ...state,
        {
          ...source,
          id: ++nextId,
          label: `${source.label} (copie)`,
          date: new Date().toISOString().slice(0, 10),
        },
      ];
    }
    case 'reset':
      return INITIAL_TRANSACTIONS;
    default:
      return state;
  }
}

export function useTransactions() {
  const [transactions, dispatch] = useReducer(reducer, null, () => {
    const saved = loadStorage(STORAGE_KEY, INITIAL_TRANSACTIONS);
    nextId = Math.max(...saved.map((t) => t.id), nextId);
    return saved;
  });

  useEffect(() => {
    saveStorage(STORAGE_KEY, transactions);
  }, [transactions]);

  return [transactions, dispatch];
}
