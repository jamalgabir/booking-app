import React, { useState } from 'react'
import "./resetPassword.css";
import { puplicRequest } from '../../components/RequestUrl';
import { Alert } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const CreatPassword = () => {
  const navigate = useNavigate();
    const [password, setPassword]= useState({});
    const [alart, setAlart] = useState('');
    const [success, setSuccess] = useState('');
    const id = useLocation().pathname.split("/")[2];
    
    const onchange = (e)=>{
        return setPassword(pre=>({...pre,[e.target.name]:e.target.value}))
        
    }
    const handleClick =async (e)=>{
      e.preventDefault();

      try{

      if(!password){
        return setAlart("Please enter your password!")
      }
      await puplicRequest.post(`/auth/reset-password/${id}`,password);
      setSuccess("Password Saved Successful Please wait...");
      setTimeout(() =>navigate("/login"),5000)
    }catch(error){
      setAlart(error.response.message)
      setTimeout(()=>setAlart(""),5000)
      console.log(error)
    }

    }
  return (
    <div className='reset-container'>
        <div className="forgot-container">
          <label>ENTER YOUR NEW PASSWORD</label>
          <input name='newPassword' onChange={onchange} placeholder='Enter your new password'/>
          <button className='reset' onClick={(e)=>handleClick(e)}>Save</button>
          {alart?<Alert variant="outlined" severity="warning">
          {alart}
          </Alert>:success?<Alert variant="outlined" severity="success">
          {success}
          </Alert>:""}
        </div>
    </div>
  )
}

export default CreatPassword