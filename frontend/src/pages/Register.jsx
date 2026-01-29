import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      
      toast.success("Registration successful! Redirecting to login...", {
        style: {
          background: 'rgba(30, 58, 138, 0.9)',
          color: '#fff',
          backdropFilter: 'blur(10px)',
        },
      });

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      toast.error("Registration failed. Please try again.", {
        style: {
          background: 'rgba(30, 58, 138, 0.9)',
          color: '#fff',
          backdropFilter: 'blur(10px)',
        },
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 p-4 relative overflow-hidden">
      <Toaster position="top-center" />
      
      {/* Background decorative elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative backdrop-blur-xl bg-white/10 p-10 rounded-3xl shadow-2xl w-full max-w-md border border-white/20"
      >
        {/* Glass effect overlay */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>
        
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-center mb-8 text-white">
            Register
          </h1>

          <div className="space-y-5">
            <div>
              <input
                name="name"
                type="text"
                placeholder="Name"
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 text-white placeholder-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <input
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 text-white placeholder-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 text-white placeholder-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-6 rounded-xl font-semibold shadow-lg transition-all duration-300 mt-6 backdrop-blur-sm border border-blue-400/30"
            >
              Create Account
            </motion.button>

            <div className="flex items-center justify-center my-6">
              <div className="border-t border-white/20 flex-grow"></div>
              <span className="px-4 text-blue-200 text-sm">or</span>
              <div className="border-t border-white/20 flex-grow"></div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/login")}
              className="w-full backdrop-blur-sm bg-white/5 hover:bg-white/10 text-white py-3 px-6 rounded-xl font-semibold border border-white/30 transition-all duration-300"
            >
              Login
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}