import React from 'react'
import '../Assets/css/sqElement.css'

const SQElement = (props) => {
  return (
    <>
     {!props.isStack && props.isTop?<h3 className='rotate'>Front</h3>:""}
      <div className={props.isStack?"Stelement":"Quelement rotate"}>
      {props.item}
    </div>
    {props.isStack && props.isTop?<h3>Top</h3>:""}
    </>
  )
}

export default SQElement
