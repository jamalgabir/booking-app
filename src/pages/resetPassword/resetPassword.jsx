import React, { useState } from 'react'
import "./resetPassword.css";
import { puplicRequest } from '../../components/RequestUrl';
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate();
    const [email, setEmail]= useState({});
    const [alart, setAlart] = useState('');
    const [success, setSuccess] = useState('');
    const onchange = (e)=>{
      return setEmail(pre=>({...pre,[e.target.name]:e.target.value}))
        
    }
    const handleClick =async (e)=>{
      e.preventDefault();
      
      if(!email){
        return setAlart("Please enter your email!")
      }

      try{

      
      await puplicRequest.post("/auth/forgot-password",email);
      setSuccess("Password Reset Sended to your email Please check your email!");
      setTimeout((navigate("/login"),5000)); 
    }catch(error){
      setAlart("Something Wrong Please try again later !")
      setTimeout(()=>setAlart(""),5000)
      console.log(error)
    }

    }
  return (
    <div>
        <div className="forgot-container">
          <label>Enter your email Please</label>
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