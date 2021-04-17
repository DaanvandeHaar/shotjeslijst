import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Components/Header'
import EditTable from './Components/EditTable'
import ShotGraph from "./Components/ShotGraph";
import Paper from "@material-ui/core/Paper";
import Footer from "./Components/Footer";



function App() {
  return (
    <div className="App">
      <Header/>
      <EditTable/>
      <ShotGraph/>
      <Footer/>
    </div>
  );
}

export default App;
