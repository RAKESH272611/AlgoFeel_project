import React, { useEffect, useState,useRef } from 'react'
import '../Assets/css/segmentTree.css';
import {Button} from 'react-bootstrap';
import * as d3 from 'd3';

const SegmentTree = () => {
  const [array,setArray] = useState([]);
  const [segmentTree,setSegmentTree] = useState([Array.from({ length: 31 }, () => -1)]);
  const [isRangeSum,setIsRangeSum] = useState(true);
  const [rangeValue,setRangeValue] = useState(-1);
  const [updateIndex,setUpdateIndex] = useState(-1);
  const [updateValue,setUpdateValue] = useState(-1);
  const [leftRange,setLeftRange] = useState(-1);
  const [rightRange,setRightRange] = useState(-1);
  const [orangeNodes,setOrangeNodes] = useState([]);
  const [greenNodes,setGreenNodes] = useState([]);
  const [segmentLeft,setSegmentLeft] = useState([]);
  const [segmentRight,setSegmentRight] = useState([]);

  const segTreeRef = useRef(null);

  const generateArray = () => {
    let sz = 16;
    let arr = new Array(sz);
    for(let i = 0; i<sz; i++){
    arr[i] = Math.floor((Math.random() * 100) + 1);
    }
    setArray(arr);
  }

  const segment = (si,ss,se,segmentArr,ArrLeft,ArrRight) => {
      ArrLeft[si] = ss;
      ArrRight[si] = se;
      if(ss===se){
         segmentArr[si] = array[ss];
         return;
      }
      let mid = Math.floor((ss+se)/2);
      segment(2*si+1,ss,mid,segmentArr,ArrLeft,ArrRight);
      segment(2*si+2,mid+1,se,segmentArr,ArrLeft,ArrRight);
      if(isRangeSum){
      segmentArr[si] = segmentArr[2*si+1]+segmentArr[2*si+2];
      }
      else{
        segmentArr[si] = Math.max(segmentArr[2*si+1],segmentArr[2*si+2]);
      }
  }

  const update = (si,ss,se,cntObj) => {
     if(ss<=updateIndex && se>=updateIndex){
      if(ss===se){
        setTimeout(()=>{
        setGreenNodes(prevGreenNodes=>
          [...prevGreenNodes,si])
        setSegmentTree(prevSegmentTree=>{
          const updatedSegmentTree = [...prevSegmentTree];
          updatedSegmentTree[si] = updateValue;
          return updatedSegmentTree;
        })
      },2000*cntObj.value)
        return;
      }
      setTimeout(()=>{
      setOrangeNodes(prevOrangeNodes=>
        [...prevOrangeNodes,si])
      },2000*cntObj.value)
      let mid = Math.floor((ss+se)/2);
      cntObj.value++;
      update(2*si+1,ss,mid,cntObj);
      update(2*si+2,mid+1,se,cntObj);
      setTimeout(()=>{
      setSegmentTree(prevSegmentTree=>{
        const updatedSegmentTree = [...prevSegmentTree];
        if(isRangeSum)
        updatedSegmentTree[si] = updatedSegmentTree[2*si+1]+updatedSegmentTree[2*si+2];
        else
        updatedSegmentTree[si] = Math.max(updatedSegmentTree[2*si+1],updatedSegmentTree[2*si+2]);
        return updatedSegmentTree;
      })
    },2000*cntObj.value)
     }
  }

  const query=(si,ss,se,cntObj)=>{
    if(ss>rightRange || se<leftRange){
        return 0;
    }
    else if(ss>=leftRange && se<=rightRange){
      setTimeout(() => {
        setGreenNodes((prevGreenNodes) => [...prevGreenNodes, si]);
      }, cntObj.value*2000);
       cntObj.value++;
        return segmentTree[si];
    }
    else{
      setTimeout(() => {
        setOrangeNodes((prevOrangeNodes) => [...prevOrangeNodes, si]);
      }, cntObj.value*2000);
       let mid = Math.floor((ss+se)/2);
       cntObj.value++;
       let a = query(2*si+1,ss,mid,cntObj);
       let b = query(2*si+2,mid+1,se,cntObj);
       if(isRangeSum) return (a+b);
       else return Math.max(a,b);
    }
  }

  const updateSegTree= ()=>{
    setRangeValue(-1);
    const cntObj = { value: 0 };
    update(0,0,array.length-1,cntObj);
    setTimeout(()=>{
    setArray(prevArray=>{
      const updatedArray = [...prevArray];
      updatedArray[updateIndex] = updateValue;
      return updatedArray;
   })
  },cntObj.value*2000);
  }

  const querySegTRee = () => {
    const cntObj = { value: 0 };
      let q_val = query(0,0,array.length-1,cntObj);
      setTimeout(()=>{
      setRangeValue(q_val);
    },cntObj.value*2000);
  }

  const cleanTree = () => {
    setOrangeNodes([]);
    setGreenNodes([]);
    setRangeValue(-1);
  }


  useEffect(()=>{
     generateArray();
  },[])

  useEffect(()=>{
     let segmentArr = Array.from({ length: 31 }, () => -1);
     let ArrLeft = Array.from({ length: 31 }, () => -1);
     let ArrRight = Array.from({ length: 31 }, () => -1);
     if(array.length>0){
     let d = array.length-1;
      segment(0,0,d,segmentArr,ArrLeft,ArrRight);
      setSegmentTree(segmentArr);
      setSegmentLeft(ArrLeft);
      setSegmentRight(ArrRight);
     }
  },[array,isRangeSum])


  const n_arr = array.map(item=>{
    return (<span>{item}</span>)
  });

// Creating Tree structure

  useEffect(() => {
    const svg = d3.select(segTreeRef.current);
    const width = window.innerWidth; // Width of the SVG container
    const height = window.innerHeight*0.5; // Height of the SVG container
    const nodeRadius = 36; // Radius of the nodes
  
    // Generate random data for nodes
    const nodes = d3.range(31).map((d, i) => ({
      id: i,
      value: `${segmentTree[i]} [${segmentLeft[i]},${segmentRight[i]}]`, 
    }));
  
    // Define links between nodes
    const links = [];
    for(let i = 0; i<=14; i++){
      links.push({source:i,target:2*i+1});
      links.push({source:i,target:2*i+2});
    }
  
    // Fixed node positions
    let w = width/2;
    let h = height/6;
    let j = 0;
    let cnt = 1;
    let d = width/4;
    let s = width-width/100;
    const fixedNodePositions = []
    while(j<31){
      let ct = 0;
      while(j<(1<<cnt)-1){
        fixedNodePositions.push({id:j,x:w+s*ct,y:h*cnt});
        j++;
        ct++;
      }
      w = w-d;
      d = d/2;
      s = s/2;
      cnt++;
    }
    
  
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
      .selectAll('rect')
      .data(nodes, (d) => d.id) // Use a key function to bind data based on the 'id' property
      .join(
        (enter) =>
          enter
            .append('rect')
            .attr('width', 2 * nodeRadius)
            .attr('height', nodeRadius)
            .attr('x', (d) => fixedNodePositions[d.id].x - nodeRadius)
            .attr('y', (d) => fixedNodePositions[d.id].y - nodeRadius),
        (update) =>
          update
            .attr('width', 2 * nodeRadius)
            .attr('height', nodeRadius)
            .attr('x', (d) => fixedNodePositions[d.id].x - nodeRadius)
            .attr('y', (d) => fixedNodePositions[d.id].y - nodeRadius)
      )
      .style('fill', (d) => (greenNodes.includes(d.id)?'lightgreen':orangeNodes.includes(d.id)?'orange':'skyblue'));


    // Render node values
    const textElements = svg
      .selectAll('text')
      .data(nodes)
      .join(
        (enter) =>
          enter
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('alignment-baseline', 'middle')
            .style('fill', 'black')
            .attr('x', (d) => fixedNodePositions[d.id].x)
            .attr('y', (d) => fixedNodePositions[d.id].y-18),
        (update) => update
      )
      .text((d) => d.value);
  }, [segmentTree,orangeNodes,greenNodes]);

  if(window.innerWidth<1300){
    const divStyle = {
      height: window.innerHeight + 'px',
      display:'flex',
      justifyContent:'center',
       alignItems:'center'
    };
    return (
       <div style={divStyle}>
        <h2>Make your screen wider</h2>
       </div>
    );
  }

  return (
    <div className="segweb">
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 350px)' }}>
      <svg ref={segTreeRef} style={{ width: '100%', height: '100%' }}></svg>
    </div>
    <div className="gen_array">
    <button onClick={generateArray} className='new_segArray'>Generate New Array</button>
    <b>Array: </b>
    {n_arr}
    <button onClick={cleanTree} className='cleanTree'>Clean</button>
    </div>
    <div className="fns">
       <span className="range_query">
       <button onClick={querySegTRee}>Query</button>
          <input className='short-input' onChange={(e)=>setLeftRange(parseInt(e.target.value))} type="number" placeholder='left_range'/>
          <input className='short-input' onChange={(e)=>setRightRange(parseInt(e.target.value))} type="number" placeholder='right_range'/>
       </span>
        <span className="rangeAns">
          {rangeValue!==-1?<b>{rangeValue}</b>:""}
        </span>
       <span className="seg_update">
          <button onClick={updateSegTree}>Update</button>
          <input className='short-input' onChange={(e)=>setUpdateIndex(parseInt(e.target.value))} type="number" placeholder='index'/>
          <input className='short-input' onChange={(e)=>setUpdateValue(parseInt(e.target.value))} type="number" placeholder='value'/>
       </span>
    </div>
    <div className="sum-max">
    <Button onClick={()=>setIsRangeSum(true)} variant="primary" size="lg" className={isRangeSum?'active':''} >
        Sum Segment Tree
      </Button>{' '}
      <Button onClick={()=>setIsRangeSum(false)} variant="primary" size="lg" className={!isRangeSum?'active':''}>
        Maximum Segment Tree
      </Button>
    </div>
    </div>
  )
}

export default SegmentTree
