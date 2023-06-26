import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../Assets/css/Algoview.css';

const AlogView = (props) => {
  return (
    <div className="col-md-4 mb-4">
      <Card className='algo-card'>
        <Card.Img className='algo-image' variant='top' src={props.image} />
        <Card.Body>
          <Card.Title>
            <Link className='algo-link' to={`/algoVisualize/${props.link}`}>
              {props.name}
            </Link>
          </Card.Title>
          <Card.Text>{props.description}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AlogView;
