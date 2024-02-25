import React, { useState } from 'react'
import "./resetPassword.css";
import { puplicRequest } from '../../components/RequestUrl';
import { Alert } from '@mui/material';

const ForgotPassword = () => {
    const [email, setEmail]= useState({});
    const [alart, setAlart] = useState('');
    const [success, setSuccess] = useState('');
    const onchange = (e)=>{
      return setEmail(pre=>({...pre,[e.target.name]:e.target.value}))
        
    }
    const handleClick =async (e)=>{
      e.preventDefault();

      try{

      if(!email){
        return setAlart("Please enter your email!")
      }
      await puplicRequest.post("/auth/forgot-password",email);
      setSuccess("Password Reset Sended to your email Please check your email !");
    }catch(error){
      setAlart("Something Wrong Please try again later !")
      setTimeout(()=>setAlart(""),5000)
      console.log(error)
    }

    }
  return (
    <div>
        <div className="forgot-container">
          <label>ENTER YOUR EMAIL</label>
          <input name='email' onChange={onchange} placeholder='Enter your email'/>
          <button className='reset' onClick={(e)=>handleClick(e)}>Send</button>
          {alart?<Alert variant="outlined" severity="warning">
          {alart}
          </Alert>:success?<Alert variant="outlined" severity="success">
          {success}
          </Alert>:""}
        </div>
    </div>
  )
}

export default ForgotPassword