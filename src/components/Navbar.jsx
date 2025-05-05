import React from 'react'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>TCravings</h1>
      </div>
      <div className="navbar-auth">
        <button className="login-btn">Login</button>
        <button className="signup-btn">Create Account</button>
      </div>
    </nav>
  )
}

export default Navbar 