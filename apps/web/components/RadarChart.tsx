import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface RadarChartProps {
  data: Array<{
    archetype: string;
    letter: string;
    score: number;
  }>;
}

// Define archetype colors
const ARCHETYPE_COLORS = {
  V: '#8B5CF6', // Visionary - purple
  I: '#EC4899', // Dreamer - pink
  E: '#06B6D4', // Architect - cyan
  P: '#F59E0B', // Catalyst - amber
  C: '#10B981', // Realist - emerald
  R: '#EF4444', // Maverick - red
  S: '#3B82F6', // Connector - blue
  M: '#6366F1', // Sage - indigo
  L: '#84CC16', // Builder - lime
  A: '#F97316', // Harmonizer - orange
};

const RadarChart: React.FC<RadarChartProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data || data.length === 0) return;

    // Clear previous chart
    d3.select(svgRef.current).selectAll('*').remove();

    // Setup dimensions
    const margin = { top: 80, right: 80, bottom: 80, left: 80 };
    const width = 500 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
    const radius = Math.min(width, height) / 2;
    
    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left + width / 2}, ${margin.top + height / 2})`);
    
    // Features for radar
    const features = data.map(d => d.letter);
    const numFeatures = features.length;
    
    // Scale for radius
    const rScale = d3.scaleLinear()
      .domain([0, 100])
      .range([0, radius]);
    
    // Create circular grid
    const levels = 5;
    const gridColor = '#e2e8f0';
    
    // Circular grid lines
    for (let j = 0; j < levels; j++) {
      const levelFactor = radius * ((j + 1) / levels);
      
      // Draw the circular grid
      svg.selectAll('.gridCircle')
        .data([1])
        .enter()
        .append('circle')
        .attr('class', 'gridCircle')
        .attr('r', levelFactor)
        .style('fill', 'none')
        .style('stroke', gridColor)
        .style('stroke-opacity', 0.8);
      
      // Draw the grid level indicators
      svg.selectAll('.axisLabel')
        .data([1])
        .enter()
        .append('text')
        .attr('class', 'axisLabel')
        .attr('x', 4)
        .attr('y', -levelFactor + 4)
        .attr('dy', '0.4em')
        .style('font-size', '10px')
        .style('fill', '#64748b')
        .text(Math.round(((j + 1) * 100) / levels) + '%');
    }
    
    // Draw axis lines
    const axis = svg.selectAll('.axis')
      .data(features)
      .enter()
      .append('g')
      .attr('class', 'axis');
    
    // Draw axis lines
    axis.append('line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', (d, i) => rScale(100) * Math.cos(i * 2 * Math.PI / numFeatures - Math.PI / 2))
      .attr('y2', (d, i) => rScale(100) * Math.sin(i * 2 * Math.PI / numFeatures - Math.PI / 2))
      .style('stroke', gridColor)
      .style('stroke-width', '1px');
    
    // Add labels
    axis.append('text')
      .attr('class', 'legend')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('x', (d, i) => (radius + 20) * Math.cos(i * 2 * Math.PI / numFeatures - Math.PI / 2))
      .attr('y', (d, i) => (radius + 20) * Math.sin(i * 2 * Math.PI / numFeatures - Math.PI / 2))
      .text(d => d)
      .style('font-size', '12px')
      .style('fill', d => ARCHETYPE_COLORS[d as keyof typeof ARCHETYPE_COLORS] || '#333')
      .style('font-weight', 'bold');
    
    // Draw radar chart areas
    const radarLine = d3.lineRadial<{angle: number, radius: number}>()
      .angle(d => d.angle)
      .radius(d => d.radius)
      .curve(d3.curveLinearClosed);
    
    // Prepare data points for the radar chart
    const dataPoints = features.map((feature, i) => {
      const dataPoint = data.find(d => d.letter === feature);
      const value = dataPoint ? dataPoint.score : 0;
      return {
        angle: i * 2 * Math.PI / numFeatures - Math.PI / 2,
        radius: rScale(value)
      };
    });
    
    // Draw radar area
    svg.append('path')
      .datum(dataPoints)
      .attr('class', 'radarArea')
      .attr('d', radarLine)
      .style('fill', 'rgba(99, 102, 241, 0.3)')
      .style('stroke', '#6366f1')
      .style('stroke-width', 2);
    
    // Add dots at each data point
    svg.selectAll('.radarCircle')
      .data(dataPoints)
      .enter()
      .append('circle')
      .attr('class', 'radarCircle')
      .attr('r', 5)
      .attr('cx', d => d.radius * Math.cos(d.angle))
      .attr('cy', d => d.radius * Math.sin(d.angle))
      .style('fill', (d, i) => ARCHETYPE_COLORS[features[i] as keyof typeof ARCHETYPE_COLORS] || '#333')
      .style('stroke', '#fff')
      .style('stroke-width', 2);
    
    // Add title
    svg.append('text')
      .attr('x', 0)
      .attr('y', -radius - 30)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .style('font-weight', 'bold')
      .style('fill', '#4b5563')
      .text('Personality Dimensions');
    
  }, [data]);

  return (
    <div className="flex justify-center items-center w-full h-full">
      <svg ref={svgRef} className="w-full max-w-md" />
    </div>
  );
};

export default RadarChart;
