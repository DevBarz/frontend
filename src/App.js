import React, { useState } from 'react';
import './App.css';
import Nav from './nav';
import Home from './homepage';
import Register from './register';
import Login from './login';
import MainDashboard from './maindashboard';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';



function App() {
  
  const [loggedIn, setLoggedIn] = useState(false);
  const [usdBalance, setUsdBalance] = useState(false);
  const [walletData, setwalletData] = useState(
    [
      {ticker:"ETH", total: 10 ,},
      {ticker:"WETH", total:0,},
      {ticker:"LEND", total:0,},
      {ticker:"LINK", total:0,},
      {ticker:"KNC", total: 0,},
      {ticker:"MKR", total: 0,},
      {ticker:"DAI", total: 0,} ]); 


 

  const handleLogin = (response) => {
    setLoggedIn(response);
  };

  const userWalletInfo = (response) =>{
    setwalletData(response);
  }

  const manageUsdBalance = (response) => {
    setUsdBalance(response);
  }

  return (
    <Router>
      <div >
        <Route path="/dashboard" exact render={() => (loggedIn ? (<MainDashboard handleLogin={handleLogin} walletData={walletData} userWalletInfo={userWalletInfo} usdBalance={usdBalance}/>) : (<Redirect to="/login" />))} />
         {loggedIn? <> </>: <Nav /> }
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={() =>
            <Login
            handleLogin={handleLogin}
              loggedIn={loggedIn}
              walletData={walletData}
              userWalletInfo={userWalletInfo}
              manageUsdBalance={manageUsdBalance}
              />} />
            
            
        </Switch>
      </div>
    </Router>
  );
}

export default App;
