import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { GridComponent, TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([BarChart, GridComponent, TooltipComponent, CanvasRenderer]);

interface DataPoint { archetype: string; letter: string; score: number; }

const BetterBarChart: React.FC<{ data: DataPoint[] }> = ({ data }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const chart = echarts.init(ref.current);
    const names = data.map(d => `${d.archetype} (${d.letter})`);
    const values = data.map(d => Math.round(d.score));

    chart.setOption({
      tooltip: { trigger: 'axis' },
      grid: { left: 0, right: 8, bottom: 0, top: 10, containLabel: true },
      xAxis: { type: 'value', max: 100, axisLabel: { color: '#111827', fontWeight: '700' } },
      yAxis: { type: 'category', data: names, axisLabel: { color: '#111827', fontWeight: '700' } },
      series: [{
        type: 'bar',
        data: values,
        itemStyle: { color: '#0EA5E9' },
        emphasis: { focus: 'series' }
      }]
    });

    const ro = new ResizeObserver(() => chart.resize());
    ro.observe(ref.current);
    return () => { chart.dispose(); ro.disconnect(); };
  }, [data]);

  return <div ref={ref} style={{ width: '100%', height: 420 }} />;
};

export default BetterBarChart;
