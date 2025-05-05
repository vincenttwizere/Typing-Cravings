import React, { useState } from 'react'

const AuthForms = ({ onClose }) => {
  const [activeForm, setActiveForm] = useState('login')
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
  const [inputErrors, setInputErrors] = useState({
    login: { email: false, password: false },
    signup: { email: false, password: false, confirmPassword: false, username: false }
  })

  const handleChange = (formType, e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [formType]: {
        ...prev[formType],
        [name]: value
      }
    }))
    // Clear error for this input when user starts typing
    setInputErrors(prev => ({
      ...prev,
      [formType]: {
        ...prev[formType],
        [name]: false
      }
    }))
    setError('')
  }

  const validateForm = (formType) => {
    const errors = { ...inputErrors[formType] }
    let hasError = false

    if (formType === 'login') {
      if (!formData.login.email) {
        errors.email = true
        hasError = true
      }
      if (!formData.login.password) {
        errors.password = true
        hasError = true
      }
    } else {
      if (!formData.signup.username) {
        errors.username = true
        hasError = true
      }
      if (!formData.signup.email) {
        errors.email = true
        hasError = true
      }
      if (!formData.signup.password) {
        errors.password = true
        hasError = true
      }
      if (!formData.signup.confirmPassword) {
        errors.confirmPassword = true
        hasError = true
      }
      if (formData.signup.password !== formData.signup.confirmPassword) {
        errors.confirmPassword = true
        hasError = true
        setError('Passwords do not match')
      }
    }

    setInputErrors(prev => ({
      ...prev,
      [formType]: errors
    }))

    return !hasError
  }

  const handleSubmit = async (e, formType) => {
    e.preventDefault()
    setError('')

    if (!validateForm(formType)) {
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
        
        <div className="auth-toggle">
          <button 
            className={`toggle-btn ${activeForm === 'login' ? 'active' : ''}`}
            onClick={() => setActiveForm('login')}
          >
            Login
          </button>
          <button 
            className={`toggle-btn ${activeForm === 'signup' ? 'active' : ''}`}
            onClick={() => setActiveForm('signup')}
          >
            Create Account
          </button>
        </div>

        <div className="auth-form-container">
          {activeForm === 'login' ? (
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
                    className={inputErrors.login.email ? 'error' : ''}
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
                    className={inputErrors.login.password ? 'error' : ''}
                  />
                </div>
                
                <button type="submit" className="submit-btn">
                  Login
                </button>
              </form>
            </div>
          ) : (
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
                    className={inputErrors.signup.username ? 'error' : ''}
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
                    className={inputErrors.signup.email ? 'error' : ''}
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
                    className={inputErrors.signup.password ? 'error' : ''}
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
                    className={inputErrors.signup.confirmPassword ? 'error' : ''}
                  />
                </div>
                
                <button type="submit" className="submit-btn">
                  Create Account
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AuthForms 