import React, { useEffect, useState } from 'react'
import SortElement from './SortElement';
import '../Assets/css/Sorting.css'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const Sorting = () => {

  const [array,setArray] = useState([]);
  const [size,setSize] = useState(20);
  const [width,setWidth] = useState(20);
  const [typeSort,setTypeSort] = useState("Bubble Sort");
  const [sortColor,setSortColor] = useState([]);
  const [speed, setSpeed] = useState(310);
  const [sliderValue,setSliderValue] = useState(2700);

  const generateArray = () => {
    setWidth(size);
    let arr = new Array(size);
    let arr1 = new Array(size);
    for(let i = 0; i<size; i++){
    arr[i] = Math.floor((Math.random() * 100) + 1);
    arr1[i] = 0;
    }
    setArray(arr);
    setSortColor(arr1);
  }

  const bubbleSort = () => {
    let i = 0, j = array.length - 1;
    let isSorted = false;

    const timer = setInterval(() => {
      if(i-1>=0){
        let i1 = i;
        setSortColor(prevSortColor=>{
          const updatedColor = [...prevSortColor];
          updatedColor[i1-1] = 0;
          updatedColor[i1] = 0;
          return updatedColor;
        })
      }
      setArray(prevArray => {
        const newArr = [...prevArray]; 
  
        if (i === j) {
          if (isSorted === false) {
            setSortColor(prevSortColor=>{
              const updatedColor = [...prevSortColor];
              while(j>=0){
              updatedColor[j] = 1;
              j--;
              }
              return updatedColor;
            })
            clearInterval(timer);
            return prevArray;
          }
          let j1 = j;
          setSortColor(prevSortColor=>{
            const updatedColor = [...prevSortColor];
            updatedColor[j1] = 1;
            return updatedColor;
          })
          j--;
          i = 0;
          isSorted = false;
        }
        if (j === -1) {
          clearInterval(timer);
          return prevArray; 
        }
        if (newArr[i] > newArr[i + 1]) {
          [newArr[i], newArr[i + 1]] = [newArr[i + 1], newArr[i]];
          let i1 = i;
          isSorted = true;
        }
        let i1 = i;
        setSortColor(prevSortColor=>{
          const updatedColor = [...prevSortColor];
          updatedColor[i1] = 2;
          updatedColor[i1+1] = 2;
          return updatedColor;
        })
        i++;
        
        return newArr; 
      });
    }, speed);
  };
  

  const mergeSort = () => {

  }

  const startSort = () => {
    if(typeSort=="Bubble Sort"){
       bubbleSort();
    }
    else if(typeSort=="Merge Sort"){
      mergeSort();
    }
  }

  const resetSortColor = () => {
    let arr = new Array(size);
    for(let i = 0; i<size; i++){
      arr[i] = 0;
    }
    setSortColor(arr);
  }

  const handleSpeedChange = (event) => {
    const newSpeed = parseFloat(event.target.value);
    setSpeed(3010-newSpeed);
    setSliderValue(newSpeed);
    console.log(newSpeed);
    // Update your algorithm animation speed here based on 'newSpeed'
  };

  
  useEffect(()=>{
    generateArray();
  },[])

  const s_arr = array.map((item,index)=>{
    return (<SortElement item={item} sz={width} IsSortedElement={sortColor[index]}/>)
  })

  return (
    <div className='sort'>
      <div className="B_array">
      {s_arr}
      </div>
      <div className="size-gen">
      <input onChange={(e)=>setSize(e.target.value)} type="number"/>
      <button onClick={generateArray}>Generate Array</button>
      </div>

      <div className="sortButton">
    <button onClick={startSort}>Visualize</button>{' '}
    <input
        type="range"
        min="10"
        max="3000"
        step="40"
        value={sliderValue}
        onChange={handleSpeedChange}
      />{' '}
    <button onClick={resetSortColor}>Clean</button>
      </div>

    </div>
  )
}

export default Sorting
