import React, { useEffect, useRef,useState } from 'react';
import * as d3 from 'd3';
import '../Assets/css/GraphAlgo.css';
import {Button} from 'react-bootstrap'
import GraphTraversed from './GraphTraversed';

const GraphAlgo = () => {

  const [visitedNodes, setVisitedNodes] = useState([]);
  const [graph,setGraph] = useState([]);
  const graphRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(graphRef.current);
    const width = 1500; // Width of the SVG container
    const height = 300; // Height of the SVG container
    const nodeRadius = 20; // Radius of the nodes
  
    // Generate random data for nodes
    const nodes = d3.range(16).map((d, i) => ({
      id: i,
      value: i, // Random value for the node
    }));
  
    // Define links between nodes
    const links = [
      { source: 0, target: 1 },
      { source: 0, target: 2 },
      { source: 0, target: 3 },
      { source: 0, target: 4 },
      { source: 0, target: 5 },
      { source: 1, target: 6 },
      { source: 1, target: 7 },
      { source: 1, target: 8 },
      { source: 2, target: 9 },
      { source: 3, target: 9 },
      { source: 4, target: 10},
      { source: 4, target: 11},
      { source: 5, target: 11},
      { source: 6, target: 12},
      { source: 6, target: 13},
      { source: 9, target: 14},
      { source: 10, target: 14},
      { source: 11, target: 15},
    ];
    setGraph(links);
  
    // Fixed node positions
    const numRows = 2; // Number of rows in the grid
    const numCols = 5; // Number of columns in the grid
    const nodeSpacing = 100; // Spacing between nodes
    
    const fixedNodePositions = [
      {id:0, x:758, y:50},
      {id:1, x:560, y:140},
      {id:2, x:650, y:160},
      {id:3, x:730, y:155},
      {id:4, x:830, y:140},
      {id:5, x:910, y:120},
      {id:6, x:460, y:230},
      {id:7, x:530, y:235},
      {id:8, x:600, y:230},
      {id:9, x:690, y:220},
      {id:10, x:760, y:220},
      {id:11, x:950, y:200},
      {id:12, x:380, y:300},
      {id:13, x:520, y:300},
      {id:14, x:740, y:300},
      {id:15, x:1020, y:260},
    ]
  
    // Render links
    svg
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .style('stroke', 'black')
      .style('stroke-width', '1px')
      .attr('x1', (d) => fixedNodePositions[d.source].x)
      .attr('y1', (d) => fixedNodePositions[d.source].y)
      .attr('x2', (d) => fixedNodePositions[d.target].x)
      .attr('y2', (d) => fixedNodePositions[d.target].y);
  
    // Render nodes
    const nodeElements = svg
      .selectAll('circle')
      .data(nodes, (d) => d.id) // Use a key function to bind data based on the 'id' property
      .join(
        (enter) =>
          enter
            .append('circle')
            .attr('r', nodeRadius)
            .attr('cx', (d) => fixedNodePositions[d.id].x)
            .attr('cy', (d) => fixedNodePositions[d.id].y),
        (update) => update.attr('r', nodeRadius)
      )
      .style('fill', (d) => (!visitedNodes.includes(d.id) ? 'steelblue' : 'lightgreen'));


    // Render node values
    const textElements = svg
      .selectAll('text')
      .data(nodes)
      .enter()
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .text((d) => d.value)
      .style('fill', 'black')
      .attr('x', (d) => fixedNodePositions[d.id].x)
      .attr('y', (d) => fixedNodePositions[d.id].y);
  }, [visitedNodes]);
  


  const bfs = (startNodeId) => {
    const visited = new Set();
    const queue = [startNodeId];
  
    const interval = setInterval(() => {
      if (queue.length === 0) {
        clearInterval(interval);
        return;
      }
  
      const nodeId = queue.shift();
      visited.add(nodeId);
      setVisitedNodes((prevVisitedNodes) => [...prevVisitedNodes, nodeId]);
  
      const adjacentNodes = graph
        .filter((link) => link.source === nodeId)
        .map((link) => link.target);
      adjacentNodes.forEach((adjNode) => {
        if (!visited.has(adjNode) && !queue.includes(adjNode)) {
          queue.push(adjNode);
        }
      });
    }, 1000); // Change the interval as per your requirement
    console.log(graph);
  };

  const dfs = (startNodeId) => {
    const visited = new Set();
    const stack = [startNodeId];
  
    const interval = setInterval(() => {
      if (stack.length === 0) {
        clearInterval(interval);
        return;
      }
  
      const nodeId = stack.pop();
      visited.add(nodeId);
      setVisitedNodes((prevVisitedNodes) => [...prevVisitedNodes, nodeId]);
  
      const adjacentNodes = graph
        .filter((link) => link.source === nodeId)
        .map((link) => link.target);
      adjacentNodes.forEach((adjNode) => {
        if (!visited.has(adjNode) && !stack.includes(adjNode)) {
          stack.push(adjNode);
        }
      });
    }, 1000); // Change the interval as per your requirement
    
  };

  const v_nodes = visitedNodes.map((item)=>{
     return(<GraphTraversed item={item}/>);
  });
  

  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 330px)' }}>
      <svg ref={graphRef} style={{ width: '100%', height: '100%' }}></svg>
    </div>
    <div className="visNodes">
       {v_nodes}
    </div>
    <div className="graphBtn">
    <Button onClick={() => bfs(0)} variant="primary" size="lg" >
        BFS
      </Button>
      <Button onClick={() => dfs(0)} variant="primary" size="lg" >
        DFS
      </Button>
      <Button onClick={() => setVisitedNodes([])} variant="primary" size="lg" >
        Clear
      </Button>

    </div>
    </>
  );
};

export default GraphAlgo;