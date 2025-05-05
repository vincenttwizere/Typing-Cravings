import React, { useState } from 'react'
import AuthForms from './AuthForms'

const Navbar = () => {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authType, setAuthType] = useState('login')

  const handleAuthClick = (type) => {
    setAuthType(type)
    setShowAuthModal(true)
  }

  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand">
          <h1>TCravings</h1>
        </div>
        <div className="navbar-auth">
          <button 
            className="login-btn"
            onClick={() => handleAuthClick('login')}
          >
            Login
          </button>
          <button 
            className="signup-btn"
            onClick={() => handleAuthClick('signup')}
          >
            Create Account
          </button>
        </div>
      </nav>

      {showAuthModal && (
        <AuthForms 
          onClose={() => setShowAuthModal(false)}
          initialType={authType}
        />
      )}
    </>
  )
}

export default Navbar 