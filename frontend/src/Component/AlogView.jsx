import React from 'react'
import {Card} from 'react-bootstrap'
import '../Assets/css/Algoview.css'
import {Link} from 'react-router-dom'

const AlogView = (props) => {
  return (
    <div>
      <Card style={{ width: '24rem' }}>
      <Card.Img className='fixed_size' variant="top" src={props.image} />
      <Card.Body>
        <Card.Title><Link  className='text' to={`/algoVisualize/${props.link}`}>{props.name}</Link></Card.Title>
        <Card.Text>
          {props.description}
        </Card.Text>
      </Card.Body>
    </Card>
    </div>
  )
}

export default AlogView
