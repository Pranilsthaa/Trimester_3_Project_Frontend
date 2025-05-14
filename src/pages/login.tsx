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
    <div className="main">
      <form>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <input
          type="text"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button onClick={(e) => handleSubmit(e)}>Login</button>
      </form>
      <p>
        Not Registered Yet? <Link to={"/signup"}>Register Here</Link>
      </p>
    </div>
  );
}

export default Login;
