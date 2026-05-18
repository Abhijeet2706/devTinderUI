import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
/**
 * 
 * @returns Outlet is a conatiner which help to render the children of Body component
 */

const Body = () => {
  return (
    <div>
        <Navbar/>
        <Outlet/> 
        <Footer/>
    </div>
  )
}

export default Body