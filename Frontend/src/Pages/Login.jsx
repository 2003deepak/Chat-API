import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import authStore from "../store/authStore";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setLogIn } = authStore((state) => state);
  const navigate = useNavigate();

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setConfirmation("");

    try {
      const resp = await axios.post(
        "http://localhost:3000/login", 
        { username, password }, 
        { withCredentials: true } 
      );

      if (resp.data.status === "success") {
        setConfirmation(resp.data.message);

        
        setLogIn(resp.data.userId, "user");

        // Redirect to dashboard
        setTimeout(() => {
          navigate("/chat");
        }, 1000);
      } else {
        setError(resp.data.message);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred. Please try again."
      );
      console.error("Login Error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Google login handler
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      
      const decoded = jwtDecode(credentialResponse.credential);
  
      // Send token to backend
      const resp = await axios.post(
        "http://localhost:3000/google-login", 
        { googleToken: credentialResponse.credential },
        { withCredentials: true }
      );
  
      if (resp.data.status === "success") {
        setConfirmation(resp.data.message);
        setLogIn(resp.data.userId, "user");
  

  
        navigate("/chat");
      } else {
        setError(resp.data.message);
      }
    } catch (err) {
      console.error("Google Login Error:", err);
      setError(`Google login failed: ${err.response?.data?.error || "Unknown error"}`);
    }
  };
 

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-600">Sign in to access your account</p>
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {confirmation && <p className="text-green-500 text-center">{confirmation}</p>}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>

          {/* Google Login */}
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => console.log("Google Login Failed")}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
