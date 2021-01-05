import React from 'react';


function Swap(props) {

  const currencies = ["ETH", "WETH", "LEND", "LINK", "KNC", "MKR", "DAI"];


  let content = "";
  if (props.confirm === true) {
    content = <> You have sold:{props.amount}    {props.base} ,   for: {props.converted}  {props.other} ,  at the current 0x protocols  {props.base} vs {props.other} liquidity pool rate: 1 : {props.price}</>;
  }
  else if (props.swap) {

    content = "your transaction is being proccessed";

  }

  const makeBaseSelection = (event) => {
    const base = event.target.value;
    props.handleBase(base);
    calculateSwap(base, props.other, props.amount);
  }

  const makeOtherSelection = (event) => {
    const other = event.target.value;
    props.handleOther(other);
    calculateSwap(props.base, other, props.amount);
  }

  const calculateSwap = (base, other, amount) => {
    const isValid = parseFloat(amount);
    if (isNaN(isValid)) {
      return;
    }

    fetch(`https://api.0x.org/swap/v1/quote?buyToken=${other}&sellToken=${base}&sellAmount=${amount}`)
      .then(response => response.json())
      .then(data => {
        const convertedValue = data.price * isValid;
        console.log(convertedValue)
        props.handleConverted(convertedValue);
        props.handlePrice(data.price);

      });
  }

  const changeValue = (event) => {
    const amount = event.target.value;
    props.handleAmount(amount);
    calculateSwap(props.base, props.other, amount);
  }

  const handleSwap = (e) => {
    e.preventDefault();

    const sold = props.amount;
    const core = props.base;
    const alter = props.other;
    const bought = props.converted;
    const wallets = props.walletData;


    for (var n = 0; n < wallets.length; n++) {
      if ((wallets[n].ticker === core) && (wallets[n].total === 0)) {
        alert("insufficient balance");
        return false;
      }
    }
    if (isNaN(sold)) {

      alert("unable to process");
      return false;
    }

    else if (isNaN(bought)) {
      alert("unable to process");
      return false;

    }

    else if (core === alter) {

      alert("unable to process");
      return false;


    }
    else if (bought === 0) {

      alert("unable to process");
      return false;
    }
    else if (bought === "") {

      alert("unable to process");
      return false;
    }
    else if (sold === "") {

      alert("unable to process");
      return false;
    }

    else {

      props.swapSetter(true);
      props.prepareBalance();

    }

    setTimeout(resetSwap, 5000);

  }



  const resetSwap = () => {
    props.swapSetter(false);
    props.handleConfirm(true);
    setTimeout(resetTransaction, 7000);

  }

  const resetTransaction = () => {
    props.handleConfirm(false);
    props.handleAmount("");
    props.handleConverted("");
  }


  return (
    <div >
      <form action="#" method="Post">
        <div>
          <select onChange={makeBaseSelection} className="base" value={props.base}>
            {currencies.map(currency => <option disabled={(props.swap === true) || (props.confirm === true)} key={currency} value={currency}>{currency}</option>)}
          </select>
          <input disabled={(props.swap === true) || (props.confirm === true)} className="amount" placeholder="Amount" onChange={changeValue} value={props.amount}></input>
        </div>
        <br></br>
        <div>
          <select onChange={makeOtherSelection} className="other" value={props.other}>
            {currencies.map(currency => <option disabled={(props.swap === true) || (props.confirm === true)} key={currency} value={currency}>{currency}</option>)}
          </select>
          <input disabled={true} className="converted" placeholder="your Swap amount" value={props.converted} ></input>

        </div>

        <br></br>

        <button disabled={(props.swap === true) || (props.confirm === true)} className="swap" onClick={handleSwap} >SWAP</button>
      </form>

      <p>{content}</p>
    </div>
  );


}

export default Swap;