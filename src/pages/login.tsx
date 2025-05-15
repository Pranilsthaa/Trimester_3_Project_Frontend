import type { AxiosResponse } from "axios";
import { useState, type FormEvent } from "react";
import POSTDATA from "../../Api/PostData";
import { Link, useNavigate } from "react-router-dom";

interface LoginResponse {
  message: string;
  role: string;
  token: string;
}

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    console.log("Login");
    e.preventDefault();
    try {
      const response = (await POSTDATA("login", {
        username,
        password,
      })) as AxiosResponse<LoginResponse>;
      if (response?.status === 200) {
        if (response?.data?.role === "admin") {
          localStorage.setItem("token", response?.data?.token);
          navigate("/admin", { replace: true });
        } else {
          localStorage.setItem("token", response?.data?.token);
          navigate("/", { replace: true });
        }
      } else if (response?.status === 401) {
        alert(response?.response?.data?.message || "Unauthorized");
      } else {
        alert("Unexpected error occurred");
      }
    } catch (error: AxiosError) {
      console.log("Error:", error);
      alert(error?.response?.data?.message || "Server error");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800">Login</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-orange-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Not registered yet?{" "}
          <Link to="/signup" className="text-orange-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
