import React from 'react';
import { useHistory } from 'react-router-dom';
import './App.css';




function Signout(props) {
const history = useHistory();

React.useEffect( () => {
   props.handleLogin(false);
    history.push("/login");
}, [])

   

  return (
    <>
    </>
  );
}

export default Signout;
