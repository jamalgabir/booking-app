import React, { useState } from 'react'
import "./resetPassword.css";
import { puplicRequest } from '../../components/RequestUrl';
import { Alert } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const CreatPassword = () => {
  const navigate = useNavigate();
    const [email, setEmail]= useState({});
    const [alart, setAlart] = useState('');
    const [success, setSuccess] = useState('');
    const id = useLocation().pathname.split("/")[2];
    console.log(id)
    const onchange = (e)=>{
        return setEmail(pre=>({...pre,[e.target.name]:e.target.value}))
        
    }
    const handleClick =async (e)=>{
      e.preventDefault();

      try{

      if(!email){
        return setAlart("Please enter your password!")
      }
      await puplicRequest.post("/auth/reset-password",email);
      setSuccess("Password Saved Successful Please wait...");
      setTimeout(() =>navigate("/login"),5000)
    }catch(error){
      setAlart("Something Wrong Please try again later !")
      setTimeout(()=>setAlart(""),5000)
      console.log(error)
    }

    }
  return (
    <div>
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