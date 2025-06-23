import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import { useNavigate } from 'react-router-dom';
function Signup() {

  const [signupInfo, setSignupInfo]=useState({
        username:'',  //initialize the value
        email:'',
        password:''
  })
  const navigate=useNavigate();
  const handleChange=(e)=>{
    const {name,value}=e.target; //capture name,value from target
    console.log(name,value);
    const copySignupInfo={...signupInfo};  //extract info and copy it in copySignup
    copySignupInfo[name]=value;
    setSignupInfo(copySignupInfo);  //object created to send it to server
  }
  
  const handleSignup=async (e)=>{
    e.preventDefault();  //prevent refresh
    const {username,email,password}=signupInfo;
    if(!username || !email || !password){
        return handleError('All fields are required');
    }
    try {
        const url= "http://localhost:5000/api/v1/users/register";
        const response= await fetch(url,{
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(signupInfo)   
        });
        const result=await response.json();
        const {success,message,error}=result;
        if(success){
            handleSuccess(message);
            setTimeout(()=>{
                navigate('/login')
            },1000)
        }else if(error){
            const details=error?.details[0].message;
            handleError(details);
        }else if(!success){
            handleError(message);
        }
        console.log(result);
    } catch (error) {
        handleError(error);
    }
  }
  return (
    <div className="min-h-screen bg-[#1f1f1f] flex items-center justify-center px-4">
      <div className="bg-[#2a2a2a] shadow-2xl rounded-xl p-10 w-full max-w-md border border-[#444]">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#f4f4f5]">Create an account</h1>
          <p className="text-[#d4d4d8] mt-2 text-sm">Be part of the future of news.</p>
        </div>

        <form className="space-y-6" onSubmit={handleSignup}>
          <div>
            <label htmlFor="username" className="block text-sm text-[#d4d4d8] mb-1">Username</label>
            <input
              onChange={handleChange}
              type="text"
              name="username"
              placeholder="tom123"
              className="w-full px-4 py-3 border border-[#444] rounded-md bg-[#1f1f1f] text-[#f4f4f5] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#b91c1c]"
              value={signupInfo.username}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm text-[#d4d4d8] mb-1">Email</label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-[#444] rounded-md bg-[#1f1f1f] text-[#f4f4f5] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#b91c1c]"
              value={signupInfo.email}
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
              value={signupInfo.password}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#b91c1c] hover:bg-[#991b1b] text-white font-semibold py-3 rounded-md transition duration-300"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center text-[#d4d4d8] mt-6">
          Already have an account?{' '}
          <a href="/login" className="text-[#b91c1c] font-semibold hover:underline">Login</a>
        </p>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Signup
