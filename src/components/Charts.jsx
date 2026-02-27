import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';
import { CHART_COLORS } from '../data';
import { fmt } from '../utils';

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#fff', padding: '8px 12px', borderRadius: 6, boxShadow: '0 2px 8px rgba(0,0,0,.15)', fontSize: 12 }}>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color, fontWeight: 600 }}>
          {p.name}: {fmt(p.value)}
        </div>
      ))}
    </div>
  );
};

export function TimelineChart({ data }) {
  if (!data.length) return null;
  return (
    <div className="chart-card">
      <h3 className="chart-card__title">Flux par timing</h3>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 50 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ecf0f1" />
          <XAxis
            dataKey="label"
            angle={-40}
            textAnchor="end"
            height={70}
            interval={0}
            tick={{ fontSize: 11, fill: '#7f8c8d' }}
          />
          <YAxis tick={{ fontSize: 11, fill: '#7f8c8d' }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Bar dataKey="entrees" fill="#27ae60" name="Entrées" radius={[3, 3, 0, 0]} />
          <Bar dataKey="sorties" fill="#e74c3c" name="Sorties" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function RepartitionChart({ data }) {
  if (!data.length) return null;
  return (
    <div className="chart-card">
      <h3 className="chart-card__title">Répartition</h3>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((_, i) => (
              <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <div className="chart-legend">
        {data.map((entry, i) => (
          <div key={i} className="chart-legend__item">
            <span className="chart-legend__color" style={{ background: CHART_COLORS[i % CHART_COLORS.length] }} />
            <span className="chart-legend__label">{entry.name}</span>
            <span className="chart-legend__value">{fmt(entry.value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
