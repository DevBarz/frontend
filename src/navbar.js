import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Link} from 'react-router-dom';



function Navbar() {

    const navStyle = {
        color: 'white', 
    };

   

  return (
    <nav>
        <img src={logo} className="App-logo" alt="logo" />
        <Link style={navStyle} to="/"><h3 className="drau">DRaU</h3></Link>

        <ul className="nav-links">
        <Link style={navStyle} to="/swap"><li>SWAP</li></Link> 
           <Link style={navStyle} to="/cryptowallet"><li>Crypto Wallet</li></Link> 
           <Link style={navStyle} to="/fiatwallet"><li>Fiat Wallet</li></Link> 
        </ul>
    </nav>
  );
}

export default Navbar;
