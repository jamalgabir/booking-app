import "./navbar.css"
import {Link}from "react-router-dom"
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link style={{textDecoration:"none",color:"inherit"}} to="/">
        <span className="logo">J.booking</span>
        </Link>
        
        <div className="navItems">
          <Link style={{textDecoration:"none",color:"inherit"}} to="/register">
          <button className="navButton">Register</button>
          </Link>
          <Link style={{textDecoration:"none",color:"inherit"}} to="/login">
          <button className="navButton">Login</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar
