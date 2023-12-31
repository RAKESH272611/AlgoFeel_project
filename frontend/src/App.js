import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Component/Home.jsx';
import Sorting from './Component/Sorting.jsx'
import Searching from './Component/Searching'
import SieveOfEratosthenes from './Component/SieveOfEratosthenes.jsx'
import GraphAlgo from './Component/GraphAlgo.jsx'
import StackAndQueue from './Component/StackAndQueue.jsx'
import SegmentTree from './Component/SegmentTree.jsx'
import Header from './Component/Header.jsx';
import Footer from './Component/Footer.jsx';
import About from './Component/About.jsx';
import Contact from './Component/Contact.jsx';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
      <Routes>
      <Route path="/" element={<Home/>}/> 
      <Route path="/algoVisualize/sorting" element={<Sorting/>}/>
      <Route path="/algoVisualize/searching" element={<Searching/>}/>
      <Route path="/algoVisualize/stackAndQueue" element={<StackAndQueue/>}/>
      <Route path="/algoVisualize/segmentTree" element={<SegmentTree/>}/>
      <Route path="/algoVisualize/SieveOfEratosthenes" element={<SieveOfEratosthenes/>}/>
      <Route path="/algoVisualize/graphAlgo" element={<GraphAlgo/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/contact" element={<Contact/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
