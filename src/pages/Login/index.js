import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './styles.css';
import { useNavigate } from 'react-router';
import { login } from '../../api/user';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setError({...error, email:''})
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setError({...error, password:''})
  };

  const validateForm = () => {
    if (email === '') {
      setError({...error, email:'Email is required'});
      return false;
    }
  
    if (password === '') {
      setError({...error, password:'Password is required'});
      return false;
    }

    return true;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if form data is valid
    if(!validateForm()) {
      return
    }

    let data = await login(email, password)
    if (data.statusCode ===  200) {
      setError({...error, save:''})
      localStorage.setItem("token", data.data.data.authToken)
      navigate('/')
    } else {
      setError({...error, save:'Error in login, check your email and password'})
    }
    
  };

  return (
    <>
    <div className='title'>MyBlogs</div>
    <div className='subtitle'>Welcome to my blogs</div>
    <div className='login-container'>
    <form onSubmit={handleSubmit} className='login-form '>
      <div>
        <TextField
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      {error?.email && <div className="error">{error.email}</div>}
      <div>
        <TextField
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      {error?.password && <div className="error">{error.password}</div>}
      {error?.save && <div className="error">{error.save}</div>}
      <Button variant="contained" color="primary" type="submit">
        Login
      </Button>
    </form>
    </div>
    </>
  );
}
