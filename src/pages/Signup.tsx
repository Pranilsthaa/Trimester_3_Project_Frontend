import { useState, type FormEvent } from "react";
import POSTDATA from "../../Api/PostData";
import type { AxiosResponse } from "axios";
import { Link, useNavigate } from "react-router";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = (await POSTDATA("register", {
        username,
        password,
      })) as AxiosResponse<LoginResponse>;
      if (response?.status === 200) {
        navigate("/login", { replace: true });
        alert("User registered successfully");
      } else if (response?.status === 400) {
        alert(response?.response?.data?.message || "user already exists");
      } else {
        alert("Unexpected error occurred");
      }
    } catch (error: AxiosError) {
      console.log("Error:", error);
      alert(error?.response?.data?.message || "Server error");
    }
  };
  return (
    <div className="">
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
        <button onClick={(e) => handleSubmit(e)}>Signup</button>
      </form>
      <p>
        Already Registered? <Link to={"/login"}>Login</Link>
      </p>
    </div>
  );
}

export default Signup;
