import axios from 'axios';

import  { useContext, useState } from 'react';
import { Navigate } from 'react-router';
import IsLoading from '../../components/spinner/isloading';
import { AuthContext } from '../../context/auothContext';
import "./login.css";
const Login = () => {
    
    
    const [credentials, setCrededtials] = useState({
        email:undefined,
        password:undefined,
    });
   const {dispatch,...others} = useContext(AuthContext);
   

   const handleChange = (e)=>{
    setCrededtials(prev=>({...prev,[e.target.name]: e.target.value}));
   };
   
   const handleClick =async (e)=>{
    e.preventDefault()
    dispatch({type:"LOGIN_START"});
    try{
        const res = await axios.post("//localhost:5000/auth/login",credentials)
        dispatch({type:"LOGIN_SUCCESSFULLY",payload:res.data})
        
        

    }catch(error){
        
        dispatch({type:"LOGIN_FAILURE",payload:error.response.data})
    }
    
   }
   
  return (
    <div className='login'>
        <h2 style={{textAlign:"center"}}>Login</h2>
        <div className="lcontainer">
            <input className='linput'name='email' type="text" onChange={handleChange} placeholder='Email'/>
            <input className='linput' name='password' onChange={handleChange} placeholder='Password' type={"password"}/>
            
            {others.loading?<div><IsLoading/></div>:<button type='submit' onClick={handleClick}>Login</button>}
        </div>
        
    </div>
  )
}

export default Login