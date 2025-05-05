import React, { useState } from 'react'

const AuthForms = ({ onClose }) => {
  const [formData, setFormData] = useState({
    login: {
      email: '',
      password: ''
    },
    signup: {
      email: '',
      password: '',
      confirmPassword: '',
      username: ''
    }
  })
  const [error, setError] = useState('')

  const handleChange = (formType, e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [formType]: {
        ...prev[formType],
        [name]: value
      }
    }))
  }

  const handleSubmit = async (e, formType) => {
    e.preventDefault()
    setError('')

    if (formType === 'signup' && formData.signup.password !== formData.signup.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      if (formType === 'login') {
        console.log('Login attempt:', formData.login)
        // Add your login API call here
        alert('Login successful!')
      } else {
        console.log('Signup attempt:', formData.signup)
        // Add your signup API call here
        alert('Account created successfully!')
      }
      onClose()
    } catch (err) {
      setError(err.message || 'An error occurred')
    }
  }

  return (
    <div className="auth-modal">
      <div className="auth-content">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <div className="auth-forms-container">
          {/* Login Form */}
          <div className="auth-form-section">
            <h2>Login</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={(e) => handleSubmit(e, 'login')}>
              <div className="form-group">
                <label htmlFor="login-email">Email</label>
                <input
                  type="email"
                  id="login-email"
                  name="email"
                  value={formData.login.email}
                  onChange={(e) => handleChange('login', e)}
                  required
                  placeholder="Enter your email"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="login-password">Password</label>
                <input
                  type="password"
                  id="login-password"
                  name="password"
                  value={formData.login.password}
                  onChange={(e) => handleChange('login', e)}
                  required
                  placeholder="Enter your password"
                />
              </div>
              
              <button type="submit" className="submit-btn">
                Login
              </button>
            </form>
          </div>

          {/* Signup Form */}
          <div className="auth-form-section">
            <h2>Create Account</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={(e) => handleSubmit(e, 'signup')}>
              <div className="form-group">
                <label htmlFor="signup-username">Username</label>
                <input
                  type="text"
                  id="signup-username"
                  name="username"
                  value={formData.signup.username}
                  onChange={(e) => handleChange('signup', e)}
                  required
                  placeholder="Enter your username"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="signup-email">Email</label>
                <input
                  type="email"
                  id="signup-email"
                  name="email"
                  value={formData.signup.email}
                  onChange={(e) => handleChange('signup', e)}
                  required
                  placeholder="Enter your email"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="signup-password">Password</label>
                <input
                  type="password"
                  id="signup-password"
                  name="password"
                  value={formData.signup.password}
                  onChange={(e) => handleChange('signup', e)}
                  required
                  placeholder="Enter your password"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="signup-confirm-password">Confirm Password</label>
                <input
                  type="password"
                  id="signup-confirm-password"
                  name="confirmPassword"
                  value={formData.signup.confirmPassword}
                  onChange={(e) => handleChange('signup', e)}
                  required
                  placeholder="Confirm your password"
                />
              </div>
              
              <button type="submit" className="submit-btn">
                Create Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthForms 