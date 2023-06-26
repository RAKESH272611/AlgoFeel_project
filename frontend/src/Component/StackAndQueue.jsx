import React, { useState } from 'react'
import {Button} from 'react-bootstrap'
import '../Assets/css/stackandQueue.css';
import SQElement from './SQElement';

const StackAndQueue = () => {
  const [stack,setStack] = useState([]);
  const [valueInserted,setValueInserted] = useState(-1);
  const [isStack,setIsStack] = useState(true);

  const push_element = () => {
    if(valueInserted==-1 || stack.length>18) return;
    setStack([...stack,valueInserted]);
  }

  const pop_element = () => {
    if(isStack){
      setStack(prevStack => prevStack.slice(0, -1));
    }
    else{
      setStack(prevStack => prevStack.slice(1));
    }
  }

  const toStack = () => {
     setIsStack(1);
  }
  
  const toQueue = () => {
     setIsStack(0);
  }


  const st = stack.map((item,index)=>{
    return(<SQElement item={item} isTop={isStack?index===stack.length-1:index===0} isStack={isStack}/>);
  });

  return (
    <div className='SQ'>
       <div className='lb'>
        <div>
       <Button onClick={toStack} variant="primary" size="lg" className={isStack?'active':''} >
        Stack
      </Button>{' '}
      <Button onClick={toQueue} variant="primary" size="lg" className={!isStack?'active':''} >
        Queue
      </Button>
      </div>
      <div className='push'>
       <input onChange={(e)=>setValueInserted(e.target.value)} type="text" name='element' id='element' placeholder='Element'/>
       <button onClick={push_element}>Push Element</button>
       </div>

       <div className='pop'>
       <button onClick={pop_element}>Pop Element</button>
       </div>
      </div>
       <div className={isStack?"widthS":"widthQ"}>
       <div className={isStack?"stack":"queue"}>
        {st}
       </div>
       </div>
       </div>
  )
}

export default StackAndQueue
