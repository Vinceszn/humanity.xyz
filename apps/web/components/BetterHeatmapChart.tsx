import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import { HeatmapChart as EHeatmapChart } from 'echarts/charts';
import { GridComponent, VisualMapComponent, TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
echarts.use([EHeatmapChart, GridComponent, VisualMapComponent, TooltipComponent, CanvasRenderer]);

interface DataPoint { archetype: string; letter: string; score: number; }

const contexts = ['Leadership', 'Teamwork', 'Problem Solving', 'Creativity', 'Communication'];

const BetterHeatmapChart: React.FC<{ data: DataPoint[] }> = ({ data }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const chart = echarts.init(ref.current);

    // Create a pseudo-contextual distribution: scale scores across contexts
    const letters = data.map(d => `${d.archetype} (${d.letter})`);
    const seriesData: [number, number, number][] = [];
    data.forEach((d, i) => {
      contexts.forEach((_, j) => {
        const val = Math.round(d.score * (0.8 + (j / (contexts.length * 10))));
        seriesData.push([j, i, Math.min(100, val)]);
      });
    });

    chart.setOption({
      tooltip: { position: 'top' },
      grid: { height: '70%', containLabel: true },
      xAxis: {
        type: 'category',
        data: contexts,
        axisLabel: { color: '#374151' },
        splitArea: { show: true }
      },
      yAxis: {
        type: 'category',
        data: letters,
        axisLabel: { color: '#374151' }
      },
      visualMap: {
        min: 0,
        max: 100,
        calculable: false,
        orient: 'horizontal',
        left: 'center',
        bottom: '2%'
      },
      series: [{
        name: 'Expression Strength',
        type: 'heatmap',
        data: seriesData,
        label: { show: false },
        emphasis: { itemStyle: { shadowBlur: 5, shadowColor: 'rgba(0, 0, 0, 0.3)' } }
      }]
    });

    const ro = new ResizeObserver(() => chart.resize());
    ro.observe(ref.current);
    return () => { chart.dispose(); ro.disconnect(); };
  }, [data]);

  return <div ref={ref} style={{ width: '100%', height: 420 }} />;
};

export default BetterHeatmapChart;
