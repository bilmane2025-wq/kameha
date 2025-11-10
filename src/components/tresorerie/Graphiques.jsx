import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { COLORS } from '../../constants/tresorerie';
import { formatEuro } from '../../utils/tresorerie';

/**
 * Tooltip personnalisé pour les graphiques
 */
const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div
      style={{
        backgroundColor: 'white',
        padding: '10px',
        border: `1px solid ${COLORS.border.light}`,
        borderRadius: '4px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
      }}
    >
      {payload.map((entry, index) => (
        <div key={index} style={{ color: entry.color, fontSize: '12px', fontWeight: 'bold' }}>
          {entry.name}: {formatEuro(entry.value)}
        </div>
      ))}
    </div>
  );
};

/**
 * Graphique en barres pour la timeline
 */
export const GraphiqueTimeline = ({ data }) => {
  return (
    <div
      style={{
        backgroundColor: COLORS.bg.white,
        padding: '15px',
        borderRadius: '8px',
        border: `1px solid ${COLORS.border.lighter}`,
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}
    >
      <h3 style={{ margin: '0 0 10px 0', fontSize: '14px', color: COLORS.text.primary }}>
        📊 Flux par Timeline
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border.lighter} />
          <XAxis
            dataKey="label"
            angle={-45}
            textAnchor="end"
            height={80}
            interval={0}
            tick={{ fontSize: 11, fill: COLORS.text.secondary }}
          />
          <YAxis tick={{ fontSize: 11, fill: COLORS.text.secondary }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: '11px' }}
            iconType="circle"
          />
          <Bar dataKey="entrees" fill={COLORS.success} name="Entrées" radius={[4, 4, 0, 0]} />
          <Bar dataKey="sorties" fill={COLORS.danger} name="Sorties" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

/**
 * Graphique camembert pour la répartition
 */
export const GraphiqueRepartition = ({ data }) => {
  if (!data || data.length === 0) return null;

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percent < 0.05) return null; // Ne pas afficher les labels < 5%

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize={11}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div
      style={{
        backgroundColor: COLORS.bg.white,
        padding: '15px',
        borderRadius: '8px',
        border: `1px solid ${COLORS.border.lighter}`,
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}
    >
      <h3 style={{ margin: '0 0 10px 0', fontSize: '14px', color: COLORS.text.primary }}>
        🥧 Répartition (Top 10)
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={90}
            innerRadius={55}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS.chart[index % COLORS.chart.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <div style={{ marginTop: '10px', maxHeight: '120px', overflowY: 'auto' }}>
        {data.map((entry, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '11px',
              marginBottom: '5px',
              padding: '4px',
              borderRadius: '3px',
              backgroundColor: index % 2 === 0 ? COLORS.bg.light : 'transparent'
            }}
          >
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '2px',
                backgroundColor: COLORS.chart[index % COLORS.chart.length],
                flexShrink: 0
              }}
            />
            <span style={{ flex: 1, color: COLORS.text.primary, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {entry.name}
            </span>
            <span style={{ fontWeight: 'bold', color: COLORS.text.primary }}>
              {formatEuro(entry.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
