import React from 'react';
import './App.css';
import {Link} from 'react-router-dom';



function Nav() {

    const navStyle = {
        color: 'white', 
    };

  return (
    <nav>
        <Link style={navStyle} to="/"><h3>DRaU</h3></Link>

        <ul className="nav-links">
           <Link style={navStyle} to="/register"><li>REGISTER</li></Link> 
           <Link style={navStyle} to="/login"><li>LOGIN</li></Link> 
        </ul>
    </nav>
  );
}

export default Nav;
