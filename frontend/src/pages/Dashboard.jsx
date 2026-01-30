import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

export default function Dashboard() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get(`${import.meta.env.VITE_API_URL}api/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      setUser(res.data);
      toast.success(`Welcome back, ${res.data.name}!`, {
        style: {
          background: 'rgba(30, 58, 138, 0.9)',
          color: '#fff',
          backdropFilter: 'blur(10px)',
        },
      });
    })
    .catch((err) => {
      toast.error("Failed to load profile");
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully!", {
      style: {
        background: 'rgba(30, 58, 138, 0.9)',
        color: '#fff',
        backdropFilter: 'blur(10px)',
      },
    });
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
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
          <h1 className="text-3xl font-bold mb-8 text-white flex items-center gap-2">
            Welcome 👋
          </h1>

          <div className="space-y-6">
            <div className="backdrop-blur-sm bg-white/5 p-4 rounded-xl border border-white/10">
              <p className="text-blue-200 text-sm mb-1 font-medium">Name</p>
              <p className="text-white text-lg font-semibold">{user.name || "Loading..."}</p>
            </div>

            <div className="backdrop-blur-sm bg-white/5 p-4 rounded-xl border border-white/10">
              <p className="text-blue-200 text-sm mb-1 font-medium">Email</p>
              <p className="text-white text-lg font-semibold">{user.email || "Loading..."}</p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className="mt-8 w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-3 px-6 rounded-xl font-semibold shadow-lg transition-all duration-300 backdrop-blur-sm border border-red-400/30"
          >
            Logout
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}