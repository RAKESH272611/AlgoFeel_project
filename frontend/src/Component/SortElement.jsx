import React from 'react'
import '../Assets/css/SortElement.css';

const SortElement = (props) => {
  return (
    <div className={props.IsSortedElement==1?"b-val sortSuccess":props.IsSortedElement==2?"b-val sortTraverse":"b-val sortNotSuccess"} style={{ '--item': props.item,'--size':props.sz }}>
      {props.item}
    </div>
  )
}

export default SortElement
