import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {FaBars, FaTimes} from 'react-icons/fa';
import './Sidebar.css';
function Sidebar({children}) {
  const menuItem=[
    {
      title:"Visapost",
      path:"/sharexperiences/visapost",
    },
    {
      title:"Scholarships",
      path:"/sharexperiences/scholarships",
    },
    {
      title:"Admission",
      path:"/sharexperiences/admission"
    },
    {
      title:"CreateNewPost",
      path:"/sharexperiences/createnewpost"
    },
    {
      title:"Myposts",
      path:"/sharexperiences/myposts"
    }
  ]
  const [isOpen,setIsOpen]=useState(false);
  const toggle=()=>{setIsOpen(!isOpen)}
  return (
    <div className='containr'style={{ display: 'flex'}}>
      <div className='bars' onClick={toggle}>{isOpen?<FaTimes/>:<FaBars/>}</div>
      <div className='sidebar'style={{display:isOpen?"block":""}} >
        {/* <h1 className='logo'><span>option</span>list</h1> */}
        <div className='menu'>
          <div>
            {
              menuItem.map((item,index)=>(
                <NavLink to={item.path} key={index} className="link">
                  <div className='link_title'>{item.title}</div>
                </NavLink>
              ))
            }
          </div>
        </div>
      </div>
      <main>{children}</main>
    </div>
  )
}

export default Sidebar