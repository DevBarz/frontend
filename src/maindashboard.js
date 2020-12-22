import React, {useState} from 'react';
import './App.css'
import Navbar from './navbar';
import Swap from './swap';
import Cryptowallet from './cryptowallet';
import Fiatwallet from './fiatwallet';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';



function MainDashboard(props) {

const [accountBalance, setAccountBalance]= useState(0);
const [balanceUpdate, setBalanceUpdate]= useState(false);
const [swap, setSwap]= useState(false);
const [confirm, setConfirm]= useState(false);

const [amount, setAmount]= useState();
const [converted, setConverted]= useState();
const [base, setBase]= useState("ETH");
const [other, setOther]= useState("LEND");
const [price, setPrice]= useState("");

React.useEffect( () => {
  portfolioBalance();
})


      
    const handleBase = (response) =>{
      setBase(response);
    };
    
    const handleOther = (response) =>{
      setOther(response);
    };

    const handleAmount = (response) =>{
      setAmount(response);
    };

    const swapSetter = (response) =>{
      setSwap(response);
    };

    const handleConverted = (response) =>{
      setConverted(response);
    };

    const handlePrice = (response) =>{
      setPrice(response);
    };
    
    const handleConfirm = (response) =>{
      setConfirm(response);
    };

              

          const  calculateBalance = () => {
   
              const newWallets = props.walletData.map(function ({ ticker, total }) {
                let newTotal = total;
          
                if (ticker === base) {
                  newTotal = newTotal - amount;
                } else if (ticker === other) {
                  newTotal = newTotal + converted;
                }
          
                return {
                  ticker,
                  total: newTotal
                };
              });
          
              props.userWalletInfo(newWallets);
              portfolioBalance();
            };

            const prepareBalance = () => {
              setBalanceUpdate(true);
              setTimeout(calculateBalance(), 5000);
        }

  const portfolioBalance = async () =>{
  
  const wallets = props.walletData;
  const newBalance = wallets.map(async ({ ticker, total }) => {

    if (ticker === "ETH") {
      const price = 1;
     
      return {
        ticker: ticker,
        total: total * price
      };
    } 
    
    else if(ticker==="MKR") {
      const response = await fetch(
        `https://api.0x.org/swap/v1/quote?buyToken=ETH&sellToken=MKR&sellAmount=100000`
      );
      const responseJSON = await response.json();
      const price = await parseFloat(responseJSON.price).toFixed(5);
      return {
        ticker: ticker,
        total: total / price,
      };
    }
    
    else {
      const response = await fetch(
        `https://api.0x.org/swap/v1/quote?buyToken=ETH&sellToken=${ticker}&sellAmount=100000`
      );
      const responseJSON = await response.json();
      const price = await parseFloat(responseJSON.price).toFixed(5);
      return {
        ticker: ticker,
        total: total * price,
      };
    }
  });

  const updatedBalance = await Promise.all(newBalance);
  setAccountBalance(updatedBalance.reduce((a,v) =>  a = a + v.total , 0));
   

  }
            
//useeffect for portfoliobalance() upon login
    
    
  
  return (
    <Router>
    <div >
      <Navbar/>
     <Switch>
     <Route path="/swap" exact component={()=> 
     <Swap walletData={props.walletData} 
     swap={swap} 
     confirm={confirm} 
     amount={amount} 
     converted={converted} 
     base={base} 
     other={other}
     price={price}
     handleAmount={handleAmount}
     handleBase={handleBase}
     handleConfirm={handleConfirm}
     handleConverted={handleConverted}
     handleOther={handleOther}
     handlePrice={handlePrice}
     swapSetter={swapSetter}
     prepareBalance={prepareBalance}
     calculateBalance={calculateBalance}/>}/>

     <Route path="/cryptowallet" exact component={()=> 
     <Cryptowallet walletData={props.walletData} 
     accountBalance={accountBalance}
     prepareBalance={prepareBalance}
     calculateBalance={calculateBalance}
     portfolioBalance={portfolioBalance}
     usdBalance={props.usdBalance}/>}/>

     <Route path="/fiatwallet" exact component={Fiatwallet}/>

     </Switch>
    </div>
    </Router>
  );
}

export default MainDashboard;

