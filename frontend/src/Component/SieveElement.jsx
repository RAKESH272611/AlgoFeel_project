import React from 'react'
import '../Assets/css/sieveElement.css';

const SieveElement = (props) => {
  return (
    
    <div className={props.itsPrime === 1 ? "yes_prime se_val" : props.itsPrime === 0 ? "not_prime se_val" : "not_valued se_val"}>
  {props.item}
</div>
    
  )
}

export default SieveElement
