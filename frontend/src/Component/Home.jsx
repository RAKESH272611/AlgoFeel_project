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
    <div className='home'>
    <h2 className='home-heading'>Explore Algorithms</h2>
    <div className='algos-container'>
      {algoview}
    </div>
  </div>
  )
}

export default Home
