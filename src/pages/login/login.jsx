import axios from 'axios';

import  { useContext, useState } from 'react';
import IsLoading from '../../components/spinner/isloading';
import { AuthContext } from '../../context/auothContext';
import "./login.css";
import { Link } from 'react-router-dom';
const Login = () => {
    
    const [msg,setMsg] = useState('');
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
        setMsg(error.response.data.message)
        dispatch({type:"LOGIN_FAILURE",payload:error.response.data})
    }
    
   }
   
  return (
    <div className='lcontainer'>
    <div className='login'>
        <h2 style={{textAlign:"center"}}>Login</h2>
        <div className="infocontainer">
            <input className='linput'name='email' type="text" onChange={handleChange} placeholder='Email'/>
            <input className='linput' name='password' onChange={handleChange} placeholder='Password' type={"password"}/>
            {msg&&<p style={{color:"red"}}>{msg}</p>}
            {others.loading?<div><IsLoading/></div>:<button className='btn' type='submit' onClick={handleClick}>Login</button>}
            <Link to={"/register"}><p style={{marginTop:"30px",color:"white"}}>Rigister</p></Link>
        </div>
        
    </div>
    </div>
  )
}

export default Login