import React from 'react'
import '../Assets/css/arrValue.css';

const ArrValue = (props) => {
  return (
    
    <div className={props.highlighted && props.elementFound?"val success":props.highlighted?"val traverse":props.searchSpace?"search_space val":"val"}>
        {props.val}
    </div>
  )
}

export default ArrValue
