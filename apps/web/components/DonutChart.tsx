import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface DonutChartProps {
  overallScore: number;
  topArchetype: string;
  className?: string;
}

const DonutChart: React.FC<DonutChartProps> = ({ overallScore, topArchetype, className = '' }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous chart
    d3.select(svgRef.current).selectAll('*').remove();

    // Setup dimensions
    const width = 280;
    const height = 280;
    const radius = Math.min(width, height) / 2 - 20;
    const innerRadius = radius - 30;

    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    // Color scale based on score
    const getColor = (score: number) => {
      if (score >= 80) return '#10b981'; // green
      if (score >= 60) return '#f59e0b'; // amber
      if (score >= 40) return '#f97316'; // orange
      return '#ef4444'; // red
    };

    // Create arcs
    const arc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(radius)
      .startAngle(0)
      .cornerRadius(8);

    // Background arc
    svg.append('path')
      .datum({ startAngle: 0, endAngle: 2 * Math.PI, innerRadius, outerRadius: radius })
      .attr('d', arc as any)
      .attr('fill', '#e5e7eb')
      .attr('opacity', 0.3);

    // Animated progress arc
    const progressArc = svg.append('path')
      .datum({ startAngle: 0, endAngle: 0, innerRadius, outerRadius: radius })
      .attr('d', arc as any)
      .attr('fill', getColor(overallScore))
      .attr('filter', 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))');

    // Animate the arc
    progressArc
      .transition()
      .duration(1500)
      .ease(d3.easeElastic.period(0.4))
      .attrTween('d', function(d: d3.DefaultArcObject) {
        const interpolate = d3.interpolate(d.endAngle, (overallScore / 100) * 2 * Math.PI);
        return function(t) {
          d.endAngle = interpolate(t);
          return (arc as any)(d);
        };
      });

    // Add center text
    const centerGroup = svg.append('g')
      .attr('text-anchor', 'middle');

    // Score text
    const scoreText = centerGroup.append('text')
      .attr('y', -10)
      .attr('font-size', '36px')
      .attr('font-weight', 'bold')
      .attr('fill', getColor(overallScore))
      .text('0%');

    // Archetype text
    centerGroup.append('text')
      .attr('y', 15)
      .attr('font-size', '14px')
      .attr('fill', '#6b7280')
      .text(topArchetype);

    centerGroup.append('text')
      .attr('y', 32)
      .attr('font-size', '12px')
      .attr('fill', '#9ca3af')
      .text('Overall Score');

    // Animate score text
    scoreText
      .transition()
      .duration(1500)
      .ease(d3.easeElastic.period(0.4))
      .tween('text', function() {
        const interpolate = d3.interpolate(0, overallScore);
        return function(t) {
          setAnimatedScore(Math.round(interpolate(t)));
          d3.select(this).text(Math.round(interpolate(t)) + '%');
        };
      });

  }, [overallScore, topArchetype]);

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg ref={svgRef} className="mb-4" />
      <div className="text-center">
        <div className="text-sm text-gray-600 mb-2">
          Your Humanity Score
        </div>
        <div className="grid grid-cols-4 gap-2 text-xs">
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 bg-red-500 rounded mb-1"></div>
            <span>0-39</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 bg-orange-500 rounded mb-1"></div>
            <span>40-59</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 bg-amber-500 rounded mb-1"></div>
            <span>60-79</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 bg-green-500 rounded mb-1"></div>
            <span>80-100</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonutChart;
