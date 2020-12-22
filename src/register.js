import React, {useState} from 'react';
import axios from 'axios'; 

function Register() {
    const [code, setCode] = useState("xyz123");
    const [phoneSub, setPhoneSub]= useState(false);
    const [verifyEmail, setVerifyEmail] =  useState(false);
    const [name, setName] = useState("");
    const [dateofBirth, setDateofBirth] = useState("");
    const [address, setAddress] = useState("");
    const [passport, setPassport] = useState("");
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [cellPhone, setCellPhone] = useState("");

    const logName = (event) => {
        setName(event.target.value);
        return false;
    }
    const logDate = (event) => {
        setDateofBirth(event.target.value);
    }
    const logAddress = (event) => {
        setAddress(event.target.value);
    } 
    const logPassport = (event) => {
        setPassport(event.target.value);
    }
    const logEmail = (event) => {
        setEmail(event.target.value);
    }
    const logPassword = (event) => {
        setPassword(event.target.value);
    }
    const logConfirm = (event) => {
        setConfirm(event.target.value);
    }
   
    const logPhone = (event) => {
        setCellPhone(event.target.value);
    }

   

    const handlePhone = (event) => {

        if((cellPhone==="")){
            alert("please enter a cell phone number");
            return false;
        }
        else {
            event.preventDefault();
            axios.get(`http://localhost:5000/api/verify`)
            .then(response => {
              setCode(response.data.code);  
              setPhoneSub(true);   
          });
        }
       
        alert("we have sent a code to  " + cellPhone + "  please proceed to your email submission");
    }
    
    const handleEmail = (event) => {
        event.preventDefault();
        
        console.log(code);

        if (email === ""){
            alert("please enter a email");
            event.preventDefault();
        }

        else if (phoneSub===false){
            alert("please submit a cell phone number");
        }

        else {
            const answer = prompt("please enter the sms code sent to:" + cellPhone);

            if (answer===code){
            alert("correct, please verify your email by clicking the link sent to:   " + email);
           
            axios.get(`http://localhost:5000/api/verify`)
            .then(response => {
              setVerifyEmail(response.data.email);
        });  
    }

    else {
        const secTry =  prompt("incorrect code, please try again");
          
        if(secTry===code){
            alert("correct, please verify your email by clicking the link sent to:   " + email);
           
            axios.get(`http://localhost:5000/api/verify`)
            .then(response => {
              setVerifyEmail(response.data.email);
        });  

        }

        else {
            return false;
        }
    }
     }
 }

    
    const handleSub = (event) => {

        const newMemeber = {
            name: name,
            DoB: dateofBirth,
            address: address,
            passport: passport,
            password: password,
            email: email, 
            telephone: cellPhone, 
 
        };

        if ((name && dateofBirth && address && passport && password && confirm) === "") {

            alert("please fill in all data fields");
            event.preventDefault();
        } 
        
        else if (verifyEmail !==true){
            alert("please verify your email before submitting more information");
            event.preventDefault();
         }
         else if ((password !== confirm)){
             alert ("your passwords dont match");
             event.preventDefault();
             
         }
         
         else {
             event.preventDefault();
             axios.post(`http://localhost:5000/api/members`, newMemeber)
             .then(response => {
                console.log(response.data);
                alert("thank you   " +name+ "  your basic information has been submitted, please login to finalize your registration")
              })
            
            
     } 
 }
     
    
    

    
    return (
      
      <div >
       
        <form className="email" onSubmit= {handlePhone}>
        <input onChange={logPhone} className="phone number" placeholder="phone number" type="text" value={cellPhone}/>
        <input type="submit"/>
        </form>

       <br></br>
       <form className="email" onSubmit= {handleEmail}>
       <input onChange={logEmail} className="email" placeholder="email" type="text" value={email}/>
       <input type="submit"/>
       </form>

       <br></br>
        
        
       <form className="bio" onSubmit= {handleSub}>
       
       <input onChange={logName} className="name" placeholder="name" type="text" value={name}/> 
      <input onChange={logDate} className="date" placeholder="DOB" type="text" value={dateofBirth}/> 
      <input onChange={logAddress} className="address" placeholder="address" type="text"value={address}/>
      <input onChange={logPassport} className="id number" placeholder="passport number" type="text" value={passport}/><br></br>
      <input onChange={logPassword} className="password" placeholder="password" type="password" value={password}/>
       <input onChange={logConfirm} className="confirm password" placeholder="confirm password" type="password" value={confirm}/> <br></br>
       <input type="submit"/>
       </form> 
         


      </div>
    );


  }
  
  export default Register;
  