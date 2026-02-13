import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

// --- Daily Records Data ---
const recordsData = [
  { day: 'Seg', count: 45 },
  { day: 'Ter', count: 52 },
  { day: 'Qua', count: 49 },
  { day: 'Qui', count: 62 },
  { day: 'Sex', count: 58 },
  { day: 'Sáb', count: 71 },
  { day: 'Dom', count: 65 },
];

export const DailyRecordsChart = () => {
  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={recordsData}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-slate-800" />
          <XAxis 
            dataKey="day" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12, fill: '#64748b' }} 
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12, fill: '#64748b' }} 
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.9)', 
              borderRadius: '8px', 
              border: 'none', 
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' 
            }}
            labelStyle={{ color: '#0f172a', fontWeight: 600 }}
            itemStyle={{ color: '#14b8a6' }}
            formatter={(value) => [`${value} Registros`, 'Quantidade']}
          />
          <Area 
            type="monotone" 
            dataKey="count" 
            stroke="#14b8a6" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorCount)" 
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

// --- Alerts Distribution Data ---
const alertData = [
  { name: 'PA', value: 35, color: '#f87171' }, // Red (Critical)
  { name: 'FC', value: 25, color: '#fb923c' }, // Orange
  { name: 'SpO₂', value: 20, color: '#38bdf8' }, // Sky
  { name: 'Temp', value: 15, color: '#fbbf24' }, // Amber
  { name: 'Outros', value: 5, color: '#94a3b8' }, // Slate
];

export const AlertsChart = () => {
  return (
    <div className="h-[250px] w-full flex items-center justify-center">
       <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={alertData} 
          layout="vertical"
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis type="number" hide />
          <YAxis 
            dataKey="name" 
            type="category" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 11, fill: '#64748b', fontWeight: 500 }}
            width={40}
          />
          <Tooltip 
            cursor={{fill: 'transparent'}}
            contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                borderRadius: '8px', 
                border: 'none', 
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' 
              }}
            formatter={(value) => [`${value}%`, 'Frequência']}
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20} animationDuration={1500}>
            {alertData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};