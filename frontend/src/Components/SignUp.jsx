import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();

  const [details, setDetails] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://resumeded.onrender.com/details",  
        details
      );

      toast.success("Successfully Signed Up 🎉");

      console.log(response.data);

      navigate("/login");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Signup failed ❌"
      );
    }
  };

  return (
    <div className="flex w-full min-h-screen items-center justify-center bg-gradient-to-br from-indigo-300 via-purple-100 to-pink-300 relative overflow-hidden">

      {/* Background Blur */}
      <div className="absolute w-72 h-72 bg-purple-400 rounded-full blur-3xl opacity-30 -top-10 -left-10"></div>
      <div className="absolute w-72 h-72 bg-indigo-400 rounded-full blur-3xl opacity-30 bottom-0 right-0"></div>

      {/* Card */}
      <div className="relative backdrop-blur-xl bg-black/70 border border-white/40 shadow-[0_20px_60px_rgba(0,0,0,0.15)] rounded-3xl p-10 w-[380px] transition duration-500 hover:scale-[1.02]">

        <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Create Account
        </h2>

        <form className="space-y-5 mt-8" onSubmit={submit}>

          <input
            type="text"
            placeholder="Full Name"
            name="name"
            required
            className="w-full p-3 rounded-xl bg-white/80 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            onChange={handleChange}
          />

          <input
            type="email"
            placeholder="Email Address"
            name="email"
            required
            className="w-full p-3 rounded-xl bg-white/80 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            onChange={handleChange}
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            required
            className="w-full p-3 rounded-xl bg-white/80 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition duration-300"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-blue-600 mt-7">
          Already have an account?
          <Link
            to="/login"
            className="ml-1 font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
