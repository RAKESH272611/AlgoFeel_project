import React,{useState} from 'react'
import SieveElement from './SieveElement';
import '../Assets/css/sieve.css';
import { Button } from 'react-bootstrap';
import PrimeNumber from './PrimeNumber';

const SieveOfEratosthenes = () => {
  const [visitedArray,setVisitedArray] = useState(Array.from({ length: 100 }, () => -1));
  const [speed, setSpeed] = useState(100);
  const [sliderValue,setSliderValue] = useState(910);

  const array = [];
  for(let i = 1; i<=100; i++){
    array.push(i);
  }


  const startSieve = () => {
    initialise();
    let i = 2;
    let j = 0;
    let primeArray = [...visitedArray];
    const timer = setInterval(() => {
      if (i > 100) {
        clearInterval(timer);
        return;
      }
      while(j+i>100 || primeArray[i-1]===0){
        i++;
        j = 0;
        if(i>100){
          break;
        }
      }
      if (i > 100) {
        clearInterval(timer);
        return;
      }
      j = j+i;
      let i1 = i;
      let j1 = j;
      setVisitedArray(prevVisitedArray=>{
        let updatedVisitedArray = [...prevVisitedArray];
        updatedVisitedArray[j1-1] = j1===i1?1:0;
        primeArray[j1-1] = j1===i1?1:0;
        return updatedVisitedArray;
      })
    
    }, speed);
  }

  const handleSpeedChange = (event) => {
    const newSpeed = parseFloat(event.target.value);
    setSpeed(1010-newSpeed);
    setSliderValue(newSpeed);
    // console.log(newSpeed);
    // Update your algorithm animation speed here based on 'newSpeed'
  };

  const initialise = () => {
      setVisitedArray(Array.from({ length: 100 }, () => -1));
  }

  const arr = array.map(item=>{
     return(<SieveElement item={item} itsPrime={visitedArray[item-1]}/>);
  })

  const primeArray = array.map(item=>{
    if(visitedArray[item-1]===1){
    return(<PrimeNumber item={item}/>);
    }
 })

  return (
    <div className="SE">
      <div className="primes">
        <h2> Prime Numbers between 1 and 100.</h2>
        </div>
        <div className="primeVal">
        {primeArray}
        </div>
    <div className='sieve'>
      {arr}
    </div>
    <div className="visual">
    <Button className='spc' onClick={startSieve} >
        <h4>Visualize</h4>
      </Button>
      <input 
        type="range"
        min="10"
        max="1000"
        step="10"
        value={sliderValue}
        onChange={handleSpeedChange}
      />
      <Button>
        <h4 onClick={initialise}>Clean</h4>
      </Button>
    </div>
    </div>
  )
}

export default SieveOfEratosthenes
