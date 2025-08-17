import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface HeatmapChartProps {
  data: Array<{
    archetype: string;
    letter: string;
    score: number;
  }>;
}

const SCENARIOS = [
  { key: 'leadership', label: 'Leadership' },
  { key: 'teamwork', label: 'Teamwork' },
  { key: 'stress', label: 'Under Stress' },
  { key: 'conflict', label: 'In Conflict' },
  { key: 'creativity', label: 'Creative Tasks' },
  { key: 'routine', label: 'Routine Work' }
];

const HeatmapChart: React.FC<HeatmapChartProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data || data.length === 0) return;

    // Clear previous chart
    d3.select(svgRef.current).selectAll('*').remove();

    // Setup dimensions
    const margin = { top: 80, right: 40, bottom: 40, left: 120 };
    const cellSize = 40;
    const width = SCENARIOS.length * cellSize + margin.left + margin.right;
    const height = data.length * cellSize + margin.top + margin.bottom;

    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Create color scale
    const colorScale = d3.scaleSequential(d3.interpolateRdYlBu)
      .domain([0, 100]);

    // Generate heatmap data (simulate scenario scores based on base scores)
    const heatmapData: Array<{archetype: string, letter: string, scenario: string, value: number}> = [];
    
    data.forEach(archetype => {
      SCENARIOS.forEach(scenario => {
        // Simulate scenario-specific modifiers
        let modifier = 0;
        switch (scenario.key) {
          case 'leadership':
            modifier = archetype.letter === 'P' ? 10 : archetype.letter === 'V' ? 5 : -2;
            break;
          case 'teamwork':
            modifier = archetype.letter === 'S' ? 10 : archetype.letter === 'M' ? 5 : -2;
            break;
          case 'stress':
            modifier = archetype.letter === 'L' ? 8 : archetype.letter === 'C' ? 5 : -5;
            break;
          case 'conflict':
            modifier = archetype.letter === 'R' ? 10 : archetype.letter === 'A' ? 8 : -3;
            break;
          case 'creativity':
            modifier = archetype.letter === 'I' ? 10 : archetype.letter === 'V' ? 8 : -2;
            break;
          case 'routine':
            modifier = archetype.letter === 'L' ? 10 : archetype.letter === 'P' ? 5 : -5;
            break;
        }
        const value = Math.max(0, Math.min(100, archetype.score + modifier));
        
        heatmapData.push({
          archetype: archetype.archetype,
          letter: archetype.letter,
          scenario: scenario.key,
          value: value
        });
      });
    });

    // Create scales
    const xScale = d3.scaleBand()
      .domain(SCENARIOS.map(d => d.key))
      .range([0, SCENARIOS.length * cellSize])
      .padding(0.1);

    const yScale = d3.scaleBand()
      .domain(data.map(d => d.letter))
      .range([0, data.length * cellSize])
      .padding(0.1);

    // Create cells
    g.selectAll('.cell')
      .data(heatmapData)
      .enter()
      .append('rect')
      .attr('class', 'cell')
      .attr('x', d => xScale(d.scenario)!)
      .attr('y', d => yScale(d.letter)!)
      .attr('width', xScale.bandwidth())
      .attr('height', yScale.bandwidth())
      .attr('fill', d => colorScale(d.value))
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .attr('rx', 4)
      .style('cursor', 'pointer')
      .on('mouseenter', function(event, d) {
        // Tooltip on hover
        const tooltip = d3.select('body').append('div')
          .attr('class', 'tooltip')
          .style('position', 'absolute')
          .style('background', 'rgba(0, 0, 0, 0.8)')
          .style('color', 'white')
          .style('padding', '8px')
          .style('border-radius', '4px')
          .style('font-size', '12px')
          .style('pointer-events', 'none')
          .style('opacity', 0);

        tooltip.transition().duration(200).style('opacity', 1);
        tooltip.html(`${d.archetype}<br/>${SCENARIOS.find(s => s.key === d.scenario)?.label}<br/>Score: ${Math.round(d.value)}`)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 30) + 'px');
      })
      .on('mouseleave', function() {
        d3.selectAll('.tooltip').remove();
      });

    // Add values to cells
    g.selectAll('.cell-text')
      .data(heatmapData)
      .enter()
      .append('text')
      .attr('class', 'cell-text')
      .attr('x', d => xScale(d.scenario)! + xScale.bandwidth() / 2)
      .attr('y', d => yScale(d.letter)! + yScale.bandwidth() / 2)
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .style('font-size', '11px')
      .style('font-weight', 'bold')
      .style('fill', d => d.value > 50 ? 'white' : 'black')
      .text(d => Math.round(d.value));

    // Add x-axis labels (scenarios)
    g.selectAll('.x-label')
      .data(SCENARIOS)
      .enter()
      .append('text')
      .attr('class', 'x-label')
      .attr('x', d => xScale(d.key)! + xScale.bandwidth() / 2)
      .attr('y', -10)
      .attr('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('font-weight', 'bold')
      .style('fill', '#374151')
      .text(d => d.label);

    // Add y-axis labels (archetypes)
    g.selectAll('.y-label')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'y-label')
      .attr('x', -10)
      .attr('y', d => yScale(d.letter)! + yScale.bandwidth() / 2)
      .attr('text-anchor', 'end')
      .attr('dy', '0.35em')
      .style('font-size', '12px')
      .style('font-weight', 'bold')
      .style('fill', '#374151')
      .text(d => d.archetype);

    // Add title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 30)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .style('font-weight', 'bold')
      .style('fill', '#1f2937')
      .text('Contextual Personality Expression');

    // Add color legend
    const legendWidth = 200;
    const legendHeight = 15;
    const legendX = width - legendWidth - 40;
    const legendY = 50;

    const legendScale = d3.scaleLinear()
      .domain([0, 100])
      .range([0, legendWidth]);

    const legendAxis = d3.axisBottom(legendScale)
      .tickSize(legendHeight)
      .tickValues([0, 25, 50, 75, 100]);

    const defs = svg.append('defs');
    const gradient = defs.append('linearGradient')
      .attr('id', 'legend-gradient')
      .attr('x1', '0%')
      .attr('x2', '100%')
      .attr('y1', '0%')
      .attr('y2', '0%');

    gradient.selectAll('stop')
      .data([0, 25, 50, 75, 100])
      .enter()
      .append('stop')
      .attr('offset', d => (d / 100) * 100 + '%')
      .attr('style', d => `stop-color:${colorScale(d)};stop-opacity:1`);

    svg.append('rect')
      .attr('x', legendX)
      .attr('y', legendY)
      .attr('width', legendWidth)
      .attr('height', legendHeight)
      .style('fill', 'url(#legend-gradient)');

    svg.append('g')
      .attr('transform', `translate(${legendX}, ${legendY})`)
      .call(legendAxis)
      .selectAll('text')
      .style('font-size', '10px');

    svg.append('text')
      .attr('x', legendX + legendWidth / 2)
      .attr('y', legendY - 5)
      .attr('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('fill', '#6b7280')
      .text('Performance Level');

  }, [data]);

  return (
    <div className="w-full overflow-x-auto">
      <svg ref={svgRef} className="w-full" />
    </div>
  );
};

export default HeatmapChart;
