import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import { RadarChart as ERadarChart } from 'echarts/charts';
import { TooltipComponent, RadarComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
echarts.use([ERadarChart, TooltipComponent, RadarComponent, CanvasRenderer]);

interface DataPoint {
  archetype: string;
  letter: string;
  score: number;
}

const BetterRadarChart: React.FC<{ data: DataPoint[] }> = ({ data }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const chart = echarts.init(ref.current);

    const indicators = data.map(d => ({ name: `${d.archetype} (${d.letter})`, max: 100 }));
    const scores = data.map(d => Math.round(d.score));

    const palette = ['#0EA5E9', '#22C55E', '#F59E0B', '#EF4444', '#8B5CF6'];
    chart.setOption({
      tooltip: {},
      radar: {
        indicator: indicators,
        shape: 'circle',
        splitNumber: 5,
        name: { textStyle: { color: '#111827', fontWeight: '700', fontSize: 12 } },
        splitArea: { areaStyle: { color: ['#ffffff', '#f8fafc'] } },
        axisLine: { lineStyle: { color: '#111827', width: 1.5 } },
        splitLine: { lineStyle: { color: '#11182733', width: 1.5 } }
      },
      series: [
        {
          type: 'radar',
          areaStyle: {
            opacity: 0.25,
            color: {
              type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: palette[0] + '99' },
                { offset: 1, color: palette[2] + '66' }
              ]
            }
          },
          lineStyle: { width: 3, color: '#111827' },
          symbol: 'circle',
          symbolSize: 6,
          itemStyle: { color: palette[4], borderColor: '#111827', borderWidth: 1 },
          data: [{ value: scores, name: 'Archetype Scores' }]
        }
      ]
    });
    const ro = new ResizeObserver(() => chart.resize());
    ro.observe(ref.current);
    return () => { chart.dispose(); ro.disconnect(); };
  }, [data]);

  return <div ref={ref} style={{ width: '100%', height: 420 }} />;
};

export default BetterRadarChart;
