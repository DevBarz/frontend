import React from 'react';

function Wallet(props) {
    return (
      <div >
            <td> {props.ticker}</td>
            <td> {props.total}</td>
        
      </div>
    );
  }
  
  export default Wallet;