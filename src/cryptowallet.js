import React, {useState} from 'react';
import Wallet from './wallet';

function Cryptowallet(props) {
    const currencies = ["ETH","WETH","LEND","LINK","KNC","MKR","DAI"];
    const [sendAmount, setSendAmount]= useState("");
    const [address, setAddress]= useState("");
    const [type, setType]= useState("ETH")
    

       const  makeSelection = (event) => {
      
        setType(event.target.value);
  }

  const  changeAddress = (event) => {
      
    setAddress(event.target.value);
}

const  changeAmount = (event) => {
      
    setSendAmount(event.target.value);
}
      

    return (
      <div >
         <h2>USD Balance: {props.usdBalance} </h2><br></br> 
         <h2>Portfolio ETH Value: {props.accountBalance}  ETH</h2>
    
    <table className="App-table">
    <thead>
    <tr>
    <th>Ticker</th>
    <th>Total</th>
    </tr>
    </thead>
    <tbody>
        {props.walletData.map(({ticker, total}) =>
        <Wallet key={ticker} ticker={ticker} total={total}/>
        )}

    </tbody>
    </table> 
    <br></br>

       <div>
           <select onChange={makeSelection} className="type" value={type}>
               {currencies.map(currency => <option  key={currency} value={currency}>{currency}</option>)}
               </select>
               <input className="amount" placeholder="Amount" onChange={changeAmount} value={sendAmount}></input> <br></br>
               <input className="address" placeholder="Recipients Ethereum Address" onChange={changeAddress} value={address}></input> <br></br>
               <button>Send</button>
        </div>
       
      </div>
    );
  }
  
  export default Cryptowallet;