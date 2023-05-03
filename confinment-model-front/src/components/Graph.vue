<template>
    <div ref="graph" class="graph"></div>
</template>

<script>
import * as d3 from 'd3';
import {useGraph} from '../stores/graph.js'
import icon from '../assets/warning-svgrepo-com.svg';

export default {
  name: 'MyGraph',
  setup() {
    const graph = useGraph();
    return {gr: graph}
  },
  mounted () {
    this.renderGraph()
  },
  methods: {
    renderGraph () {
      const data = {
        
      }
      const svg = d3.select(this.$refs.graph)
        .append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
      const width = svg.node().getBoundingClientRect().width
      const height = svg.node().getBoundingClientRect().height

        const link = svg.append('g')
        .selectAll('path')
        .data(this.gr.links)
        .enter()
        .append('path')
        .attr("d", d => {
            let source = this.gr.nodes.find(node => node.id === d.source)
            let target = this.gr.nodes.find(node => node.id === d.target)
            return this.curvedPath(source.x, source.y, target.x, target.y, d.bend);})
        .attr("fill", "none")
        .attr('stroke', "#ccc")
        .attr('marker-end', 'url(#arrowhead)');
    

    const node = svg.append('g')
        .selectAll('circle')
        .data(this.gr.nodes)
        .enter()
        .append('circle')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('r', 20)
        .attr('id', d => d.id)
        .attr('fill', d => this.gr.getNodeColor(d.id))

    svg.append('g')
    .selectAll('text')
    .data(this.gr.nodes)
    .enter()
    .append("text")
      .attr("x", d => d.x)
      .attr("y", d => d.y + 5)
      .text(d => d.label)
      .style("text-anchor", "middle")
      .style("font-size", "20px")
      .style("fill", "#000")
      .style('cursor', 'pointer')
      .on('click', (event, d) => this.routing(event, d));

    const group = svg.append('g')
    .selectAll('g')
    .data(this.gr.nodes)
    .enter()
    .filter(d => d.status=="check")
    .append('g')
    .attr('transform', d => `translate(${d.x + 2}, ${d.y-28})`)
    group.append('path')
    .attr('d', 'M10.25,4.19,2.63,18a2,2,0,0,0,1.75,3H19.62a2,2,0,0,0,1.75-3L13.75,4.19A2,2,0,0,0,10.25,4.19Z')
    .style('fill', '#fff71a')
    .style('stroke-width', '2')
    group.append('line')
    .attr('x1', '12.05')
    .attr('y1', '17')
    .attr('x2', '11.95')
    .attr('y2', '17')
    .style('fill', 'none')
    .style('stroke', '#000000')
    .style('stroke-linecap', 'round')
    .style('stroke-linejoin', 'round')
    .style('stroke-width', '2.5');
    group.append('path')
    .attr('d', 'M12,9v4M10.25,4.19,2.63,18a2,2,0,0,0,1.75,3H19.62a2,2,0,0,0,1.75-3L13.75,4.19A2,2,0,0,0,10.25,4.19Z')
    .style('fill', 'none')
    .style('stroke', '#000000')
    .style('stroke-linecap', 'round')
    .style('stroke-linejoin', 'round')
    .style('stroke-width', '2');
    group.on('click', event => this.goToThisCheck(event))
    const tooltip = group.append('g').classed('tooltip', true);
    tooltip
    .append('rect')
    .attr('width', '215')
    .attr('height', '20')
    .style('display', 'block')
    tooltip.append('text')
    .text('появились новые вопросы для проверки')
    //.style('fill', '#d2d822')
        
    


    svg.append('defs').append('marker')
      .attr('id', 'arrowhead')
      .attr('viewBox', '-0 -5 10 10')
      .attr('refX', 33)
      .attr('refY', 0)
      .attr('orient', 'auto')
      .attr('markerWidth', 8)
      .attr('markerHeight', 8)
      .attr('xoverflow', 'visible')
      .append('svg:path')
      .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
      .attr('fill', '#ccc')
      .attr('stroke', '#ccc');
    

    node.append("text")
      .attr("x", d => d.x)
      .attr("y", d => d.y)
      .text(d => d.label)
      .style("text-anchor", "middle")
      .style("font-size", "20px")
      .style("fill", "#ccc").classed('selectable', true);
      
    },
    curvedPath(x1, y1, x2, y2, bend) {
        let dx = x2 - x1;
        let dy = y2 - y1;
        let cx = (x1 + x2 + dy) /2;
        let cy = (y1 + y2 + Math.abs(dx)) /2;
        let path = bend ? `M${x1},${y1}Q${cx}, ${cy},${x2},${y2}` : `M${x1},${y1}L${x2},${y2}` 
        return path;
    },
    routing(path) {
        this.$router.push('/' + path.target.__data__.id);
    },
    goToThisCheck(event) {
        this.$router.push('/' + event.target.__data__.id + '/check');
    }
  }
}
</script>

<style>
    .graph {
        width: 500px;
        height: 500px;
    }
    .unselectable {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    text.selectable {
        cursor: pointer;
    }
    .tooltip {
      opacity: 0;
      display: none;
      transition: 0.5s;
    }
    .tooltip rect {
      fill: #d2d822;
      color: #fff;
      position: absolute;
      transform: translateY(-20px) translateX(20px);
      transition: 1s;
    }
    g:hover > .tooltip{
      display: block;
      opacity: 1;
    }
    .tooltip text{

      font-family:Arial, Helvetica, sans-serif;
      transform: translateY(-8px) translateX(22px);
      font-size: 11px;
      fill: #000;
    }

</style>