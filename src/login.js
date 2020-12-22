import axios from 'axios';
import React from 'react';
import './App.css';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login(props) {
    
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();


  const userEmail = (event) => {
    setEmail(event.target.value);
    console.log(email);
  }

  const userPassword = (event) => {
    setPassword(event.target.value);
    console.log(password);
  }

  const verifyUser = (event) => {
    event.preventDefault();
    const user = {
      email: email,
      password: password,
    }

    console.log(user);

    axios.post(`http://localhost:5000/api/login`, user)

      .then(response => {
       const wallets = props.walletData;
       const Response = response.data;
       
       const usersWallets = wallets.map(({ ticker, total }) => {

         let newTotal = total;

        if (ticker === "ETH") {
          newTotal = Response.ETH;
        }
        else if (ticker === "WETH"){
          newTotal = Response.WETH;
        }
        else if (ticker === "LEND"){
          newTotal = Response.LEND;
        }
        else if (ticker === "LINK"){
          newTotal = Response.LINK;
        }
        else if (ticker === "KNC"){
          newTotal = Response.KNC;
        }
        else if (ticker === "MKR"){
          newTotal = Response.MKR;
        }
        else if (ticker === "DAI"){
          newTotal = Response.DAI;
        }

        return{
          ticker,
          total: newTotal,
        }
          
        });

        console.log(response);
        console.log(usersWallets);
        alert(response.data.msg);
        props.handleLogin(response.data.logged);
        props.manageUsdBalance(response.data.USD);
        props.userWalletInfo(usersWallets)
        history.push("/dashboard");
      })
      
  }
  
  
    return (
      <div >

          <form onSubmit={verifyUser} method="POST">
          <input onChange= {userEmail} className="email" placeholder="email" type="text" value={email}/>
         <input onChange={userPassword} className="password" placeholder="password" type="password" value={password}/>
         <button type="submit">Login</button>
          </form>
         
         
         
      
        
      </div>
    );

   
  }

  
  export default Login;
  