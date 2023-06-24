import React,{useEffect, useState} from 'react'
import ArrValue from './ArrValue';
import '../Assets/css/searching.css';
import {Button} from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Searching = () => {
  let arr = new Array(14);
  for(let i = 0; i<14; i++){
    arr[i] = Math.floor((Math.random() * 1000) + 1);
  }
  const [size,setSize] = useState(14);
  const [array,setArray] = useState(arr);
  const [isBinarySearch,setIsBinarySearch] = useState(0);
  const [valueSearch,setValueSearch] = useState(-1);
  const [highlightedIndex,setHighlightedIndex] = useState(-1);
  const [elementFound,setElementFound] = useState(false);
  const [lower_range,setLower_range] = useState(-1);
  const [higher_range,setHigher_range] = useState(-1);
  const fixSize = (e) => {
     setSize(e.target.value);
  }
  const generateArray = () => {
    let sz = size;
    if(sz===0) sz = 14;
     arr = new Array(sz);
     for(let i = 0; i<sz; i++){
     arr[i] = Math.floor((Math.random() * 1000) + 1);
     }
     if(isBinarySearch===1){
      arr.sort(function(a, b){return a - b});
     }
     setArray(arr);
  }

  const fliptoLinearSearch = () => {
    setIsBinarySearch(0);
  }

  const fliptoBinarySearch = () => {
    setIsBinarySearch(1);
    let a = array;
    a.sort(function(a, b){return a - b});
    setArray(a);
  }

  const searchElement = () => {
    if(isBinarySearch){
      BinarySearch();
    }
    else{
      LinearSearch();
    }
  }


  const LinearSearch = () => {
    if(valueSearch==-1) return;
    let index = 0;
    let flag = 0;

    const timer = setInterval(() => {
      if (index >= array.length) {
        clearInterval(timer);
        setHighlightedIndex(-1);
        showFailureNotification();
        return;
      }
      if(flag>0){
        clearInterval(timer);
        setHighlightedIndex(-1);
        setElementFound(false);
        showSuccessNotification();
        return;
      }
      if(array[index]==valueSearch){
        flag++;
        setElementFound(true);
      }

      setHighlightedIndex(index);
      index++;
    }, 500);
  }

  const BinarySearch = () =>  {
    if(valueSearch==-1) return;
    let low = 0, high = array.length-1;
    let flag = 0;
    setLower_range(low);
    setHigher_range(high);
    const timer = setInterval(() => {
      let mid = Math.floor((low+high)/2);
      if (low>high) {
        clearInterval(timer);
        setHighlightedIndex(-1);
        showFailureNotification();
        setLower_range(-1);
        setHigher_range(-1);
        return;
      }
      if(flag>0){
        clearInterval(timer);
        setHighlightedIndex(-1);
        setElementFound(false);
        showSuccessNotification();
        setLower_range(-1);
        setHigher_range(-1);
        return;
      }
      if(array[mid]==valueSearch){
        flag++;
        setElementFound(true);
      }
      else if(array[mid]>valueSearch){
        high = mid-1;
        setHigher_range(high);
      }
      else{
        low = mid+1;
        setLower_range(low);
      }

      setHighlightedIndex(mid);
    }, 2000);
  }

  const arrValue = array.map((val,index)=>{
    return(
    <ArrValue val={val} highlighted={index===highlightedIndex} elementFound={elementFound}
    searchSpace={index>=lower_range && index<=higher_range}/>
    );
  })

  const showSuccessNotification = () => {
    toast.success('Element Found Successfully', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000
    });
  };
  
  const showFailureNotification = () => {
    toast.error('Element Not Found', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000
    });
  };

  

  return (
    <div className='search'>
      <span className="lb">
       <Button onClick={fliptoLinearSearch} variant="primary" size="lg" className={isBinarySearch===0?"active":""}>
        Linear Search
      </Button>{' '}
      <Button onClick={fliptoBinarySearch} variant="primary" size="lg" className={isBinarySearch===1?"active":""} >
        Binary Search
      </Button>
      </span>
       <span className='sz'>
       <input onChange={fixSize} type="text" name='size' id='size' placeholder='size'/>
       <button onClick={generateArray}>Generate Array</button>
       </span>

       <span className='sz'>
       <input onChange={(e)=>{setValueSearch(e.target.value?e.target.value:-1)}} type="text" name='val' id='val' placeholder='value'/>
       <button onClick={searchElement}>Search</button>
       </span>
       <div className="array">

       {arrValue}
       </div>
       <ToastContainer />
    </div>
  )
}

export default Searching
