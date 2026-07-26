import React from 'react';

interface RadarChartData {
  axis: string;
  value: number; // 0 - 100
}

interface RadarChartProps {
  data: RadarChartData[];
  size?: number;
  id?: string;
}

export const RadarChart: React.FC<RadarChartProps> = ({ data, size = 280, id }) => {
  const center = size / 2;
  const radius = size * 0.38;
  const totalAxes = data.length;

  // Calculate coordinates for polygon
  const getCoordinates = (index: number, val: number) => {
    const angle = (Math.PI * 2 / totalAxes) * index - Math.PI / 2;
    const r = (val / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  // Concentric background grid levels
  const levels = [0.25, 0.5, 0.75, 1.0];

  const points = data
    .map((item, idx) => {
      const { x, y } = getCoordinates(idx, item.value);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div id={id} className="flex flex-col items-center justify-center relative">
      <svg width={size} height={size} className="overflow-visible">
        {/* Background webs */}
        {levels.map((lvl, lIdx) => {
          const levelPoints = data
            .map((_, idx) => {
              const { x, y } = getCoordinates(idx, lvl * 100);
              return `${x},${y}`;
            })
            .join(' ');
          return (
            <polygon
              key={lIdx}
              points={levelPoints}
              className="fill-none stroke-zinc-200 dark:stroke-zinc-800"
              strokeWidth="1"
            />
          );
        })}

        {/* Axis lines */}
        {data.map((item, idx) => {
          const { x, y } = getCoordinates(idx, 100);
          return (
            <line
              key={idx}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              className="stroke-zinc-200 dark:stroke-zinc-800"
              strokeWidth="1"
            />
          );
        })}

        {/* Data polygon */}
        <polygon
          points={points}
          className="fill-indigo-500/25 stroke-indigo-500 dark:stroke-indigo-400"
          strokeWidth="2.5"
        />

        {/* Data points */}
        {data.map((item, idx) => {
          const { x, y } = getCoordinates(idx, item.value);
          return (
            <circle
              key={idx}
              cx={x}
              cy={y}
              r="4"
              className="fill-indigo-600 dark:fill-indigo-400 stroke-white dark:stroke-zinc-900"
              strokeWidth="2"
            />
          );
        })}

        {/* Axis labels */}
        {data.map((item, idx) => {
          const { x, y } = getCoordinates(idx, 115);
          return (
            <text
              key={idx}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-[10px] sm:text-[11px] font-semibold fill-zinc-700 dark:fill-zinc-300"
            >
              {item.axis} ({item.value})
            </text>
          );
        })}
      </svg>
    </div>
  );
};

interface BarChartItem {
  label: string;
  value: number;
  target?: number;
}

export const SimpleBarChart: React.FC<{ items: BarChartItem[]; id?: string }> = ({ items, id }) => {
  const maxValue = Math.max(...items.map((i) => i.value), 100);

  return (
    <div id={id} className="space-y-3.5 w-full">
      {items.map((item, idx) => {
        const pct = Math.min(100, Math.max(0, (item.value / maxValue) * 100));
        return (
          <div key={idx} className="space-y-1">
            <div className="flex justify-between text-xs font-semibold text-zinc-800 dark:text-zinc-200">
              <span>{item.label}</span>
              <span className="font-mono text-indigo-600 dark:text-indigo-400">{item.value}%</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden relative">
              <div
                className="h-full rounded-full bg-indigo-600 dark:bg-indigo-500 transition-all duration-500"
                style={{ width: `${pct}%` }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
