import { useState } from 'react';
import axios from 'axios';    
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'
 
const SignUp = () => {
  const Navigate = useNavigate()
  const [details,setdetails] = useState({
    name:"",
    email:"",
    password:"",
 
  })
  const handleChange = (e) => {
  setdetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(
        "http://localhost:5000/details",
        details
      );
    
     toast.success("Sucessfully signup",{
      className: "bg-green-500 text-white rounded-xl shadow-lg absolute top-150",
  progressClassName: "bg-green-300",

     })
     
         Navigate('/login')
    
      console.log(response.
        data);
      console.log("created successfully");
      
  
   
    } catch (err) {
      console.log(err);
    }
  };
  
  
  
  



  
    
     
    return (
     
  
        <div className="flex w-full md:w-1/2 items-center justify-center bg-gradient-to-br from-indigo-300 via-purple-100 to-pink-300 relative overflow-hidden">

{/* Background Blur Shapes */}
<div className="absolute w-72 h-72 bg-purple-400 rounded-full blur-3xl opacity-30 -top-10 -left-10"></div>
<div className="absolute w-72 h-72 bg-indigo-400 rounded-full blur-3xl opacity-30 bottom-0 right-0"></div>

{/* Card */}
<div className="relative backdrop-blur-xl bg-black/70 border border-white/40 shadow-[0_20px_60px_rgba(0,0,0,0.15)] rounded-3xl p-10 w-[380px] transition duration-500 hover:scale-[1.02]">

  <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
    Create Account
  </h2>

  <p className="text-center text-gray-600 mb-8 mt-2">
   
  </p>

  <form className="space-y-5" onSubmit={submit}>

    {/* Input */}
    <input
      type="text"
      placeholder="Full Name"
      name='name'
      className="w-full p-3 rounded-xl bg-white/80 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
      onChange={handleChange}
    />  
   <input
   type="email"
   placeholder="Email Address"
   name="email"
   onChange={handleChange}
   className="w-full p-3 rounded-xl bg-white/80 border"
 />
 
        
 

    <input
      type="password"
      placeholder="Password"
      name='password'
        
      className="w-full p-3 rounded-xl bg-white/80 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
        onChange={handleChange}
    />



    {/* Gradient Button */}
    <button
      className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition duration-300"
    >
      Sign Up
    </button>

  </form>

  <p className="text-center text-sm text-blue-600 mt-7 ">
    Already have an account?
    
    <Link
  to="/login"
  className="ml-1 font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent cursor-pointer hover:underline"
>
  Login
</Link>


  </p>

</div>
</div>

     
    );
  };
  
  export default SignUp;
  