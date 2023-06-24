import React from 'react'
import AlogView from './AlogView.jsx'
import ALGOS from '../Data/Algo.js';
import '../Assets/css/home.css'


const Home = () => {
  const algoview = ALGOS.map(item => {
    return(
      <AlogView name={item.name} image={item.image} link={item.link} description={item.description}/>
    )
  });
  return (
    <div className='algo'>
       {algoview}
    </div>
  )
}

export default Home
