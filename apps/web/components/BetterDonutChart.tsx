import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import { GaugeChart } from 'echarts/charts';
import { TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
echarts.use([GaugeChart, TooltipComponent, CanvasRenderer]);

interface Props {
  overallScore: number;
  topArchetype: string;
}

const BetterDonutChart: React.FC<Props> = ({ overallScore, topArchetype }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const chart = echarts.init(ref.current);
    const value = Math.max(0, Math.min(100, Math.round(overallScore)));
    chart.setOption({
      tooltip: { trigger: 'item' },
      series: [
        {
          type: 'gauge',
          startAngle: 90,
          endAngle: -270,
          center: ['50%', '50%'],
          radius: '90%',
          min: 0,
          max: 100,
          splitNumber: 10,
          progress: { show: true, roundCap: true, width: 18 },
          axisLine: { lineStyle: { width: 18 } },
          axisTick: { show: false },
          splitLine: { show: false },
          axisLabel: { show: false },
          pointer: { show: false },
          detail: {
            valueAnimation: true,
            formatter: '{value}%\n' + topArchetype,
            color: '#111827',
            offsetCenter: [0, 0],
            fontSize: 16
          },
          data: [{ value }]
        }
      ]
    });
    const ro = new ResizeObserver(() => chart.resize());
    ro.observe(ref.current);
    return () => { chart.dispose(); ro.disconnect(); };
  }, [overallScore, topArchetype]);

  return <div ref={ref} style={{ width: '100%', height: 280 }} />;
};

export default BetterDonutChart;
