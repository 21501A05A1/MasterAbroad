import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import './Sharexperiences.css'
function Sharexperiences() {
  return (
    <div className='background-image'>
    <div className='containr'>
      <Sidebar/>
      <Outlet/>
    </div>
    </div>
 
  );
}

export default Sharexperiences;

