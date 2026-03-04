import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

// ✅ Production API URL from Render
const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({ email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setErrorMsg("");
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!user.email || !user.password) {
      setErrorMsg("Please enter email and password.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const response = await axios.post(
        "https://resumeded.onrender.com/login",
        user
      );

      if (response.data?.token) {
        localStorage.setItem("token", response.data.token);

        toast.success("Successfully logged in", {
          className: "bg-green-500 text-white rounded-xl shadow-lg",
          progressClassName: "bg-green-300",
        });

        navigate("/home");
        return;
      }

      setErrorMsg(response.data?.message || "Invalid email or password.");
      toast.error(response.data?.message || "Login failed!");

    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Invalid email or password.";

      setErrorMsg(msg);

      toast.error(msg, {
        className: "bg-red-500 text-white rounded-xl shadow-lg",
        progressClassName: "bg-red-300",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full md:w-1/2 items-center justify-center bg-gradient-to-br from-indigo-300 via-purple-100 to-pink-300 relative overflow-hidden min-h-screen">
      <div className="absolute w-72 h-72 bg-purple-400 rounded-full blur-3xl opacity-30 -top-10 -left-10"></div>
      <div className="absolute w-72 h-72 bg-indigo-400 rounded-full blur-3xl opacity-30 bottom-0 right-0"></div>

      <div className="relative backdrop-blur-xl bg-black/70 border border-white/40 shadow-[0_20px_60px_rgba(0,0,0,0.15)] rounded-3xl p-10 w-[380px] transition duration-500 hover:scale-[1.02]">
        <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Welcome Back
        </h2>

        <p className="text-center text-gray-400 mb-8 mt-2">
          Please enter your login details
        </p>

        <form className="space-y-5" onSubmit={submit}>
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/80 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={user.password}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/80 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
          />

          {errorMsg && (
            <p className="text-red-400 text-sm font-medium">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white p-3 rounded-xl font-semibold shadow-lg transition duration-300
              ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:shadow-xl hover:scale-105"
              }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-blue-200 mt-7">
          Don't have an account?
          <span className="ml-1 font-semibold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent cursor-pointer hover:underline">
            <Link to={"/"}>Signup</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
