import React, { useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useNavigation } from 'react-router-dom';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AppContext);
  const navigation = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim().length) return setError('Email is required');
    if (!password.trim().length) return setError('Password is required');

    try {
      const { data } = await axios.post(
        'http://localhost:8000/api/admin/login',
        { email, password }
      );

      toast.success('Logged-in successfully', {
        position: toast.POSITION.TOP_CENTER,
      });

      setTimeout(() => {
        login(data.admin.token);
        navigation('/');
      }, 1000);
    } catch (error) {
      if (error?.response?.data?.msg) {
        toast.error(error?.response?.data?.msg, {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        console.log(error);
      }
    }
  };
  return (
    <form method="post" onSubmit={handleSubmit} className="auth-form">
      <ToastContainer />
      <h2 className="text-light mb-4">Admin Login</h2>
      {error.length ? <p style={{ color: 'red' }}>{error}</p> : ''}
      <div className="form-outline mb-4">
        <input
          type="text"
          id="form2Example1"
          className="form-control"
          placeholder="admin@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="form-label" htmlFor="form2Example1">
          Email address
        </label>
      </div>

      <div className="form-outline mb-4">
        <input
          type="password"
          id="form2Example2"
          className="form-control"
          placeholder="*******"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label className="form-label" htmlFor="form2Example2">
          Password
        </label>
      </div>

      <button type="submit" className="btn btn-primary btn-block mb-4 w-100">
        Sign in
      </button>
    </form>
  );
};

export default Signin;
