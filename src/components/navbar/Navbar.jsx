import "./navbar.css"
import {Link}from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auothContext";

const Navbar = () => {
  const {user,dispatch} = useContext(AuthContext)
  
  const logout = ()=>{
    localStorage.clear();
    dispatch({type:"LOG_OUT"})
  }


  return (
    <div className="navbar">
      <div className="navContainer">
        <Link style={{textDecoration:"none",color:"inherit"}} to="/">
        <span className="logo">J.Booking</span>
        </Link>
        
        <div className="navItems">
          {!user?<><Link to="/register">
            <button className="navButton">Register</button>
          </Link>
          <Link to="/login">
          <button className="navButton">Login</button>

          
          </Link></>:<button onClick={()=>logout()} className="navButton">Logout</button>}
        </div>
      </div>
    </div>
  )
}

export default Navbar
