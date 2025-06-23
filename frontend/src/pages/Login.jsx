import React, { useState, useContext } from 'react';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const { setUser } = useContext(AuthContext);
  const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    if (!email || !password) {
      return handleError('All fields are required');
    }

    try {
      const response = await fetch('http://localhost:5000/api/v1/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // send cookies
        body: JSON.stringify(loginInfo),
      });

      const result = await response.json();
      const { success, message, data, error } = result;

      if (success) {
        setUser(data.user); 
        handleSuccess(message);
        setTimeout(() => navigate('/home'), 1000);
      } else if (error) {
        const details = error?.details?.[0]?.message;
        handleError(details || message || 'Login failed');
      } else {
        handleError(message || 'Something went wrong');
      }
    } catch (error) {
      handleError('Server error');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#1f1f1f] flex items-center justify-center px-4">
      <div className="bg-[#2a2a2a] shadow-2xl rounded-xl p-10 w-full max-w-md border border-[#444]">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#f4f4f5]">Login</h1>
          <p className="text-[#d4d4d8] mt-2 text-sm">Be part of the future of news.</p>
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm text-[#d4d4d8] mb-1">Email</label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-[#444] rounded-md bg-[#1f1f1f] text-[#f4f4f5] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#b91c1c]"
              value={loginInfo.email}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-[#d4d4d8] mb-1">Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-[#444] rounded-md bg-[#1f1f1f] text-[#f4f4f5] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#b91c1c]"
              value={loginInfo.password}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#b91c1c] hover:bg-[#991b1b] text-white font-semibold py-3 rounded-md transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center text-[#d4d4d8] mt-6">
          Don't have an account?{' '}
          <a href="/signup" className="text-[#b91c1c] font-semibold hover:underline">Signup</a>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
