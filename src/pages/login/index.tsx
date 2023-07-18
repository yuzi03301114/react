import React, { useState } from "react";
import "./index.css";
import loginLeftImg from "../../assets/img/login-left.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Login() {
  const [email, setEmail] = useState("");
  const [pwd, setpwd] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (): Promise<void> => {
    const res = await axios.post(
      "https://topaz.kinfolk.vc/api/v1/admin/auth/signin",
      {
        // email: "jay@kinfolk.vc",
        // password: "12345678",
        email: email,
        password: pwd,
      }
    );
    navigate("/list");
    sessionStorage.setItem("userInfo", JSON.stringify(res.data));
  };
  const changeEmail = (e: any) => {
    setEmail(e.target.value);
  };
  const changePwd = (e: any) => {
    setpwd(e.target.value);
  };
  return (
    <div className="login-page flex w-full h-screen bg-black text-zinc-400">
      <div className="login-right absolute bg-white">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-center">Sign In</h1>
          <p className="text-center">Welcome to Kinfolk Venture Capital</p>
          <div className="mt-16 text-sm">
            <div>Email Address</div>
            <input
              type="text"
              className="border input p-3"
              onChange={(e: any): void => changeEmail(e)}
            />
          </div>
          <div className="mt-8">
            <div>Password</div>
            <input
              type="password"
              className="border input p-3"
              onChange={(e: any): void => changePwd(e)}
            />
          </div>
          <div className="self-end mr-16 text-black text-sm">
            <div>Forgot Password?</div>
          </div>
          <button className="login-button mt-8 bg-black" onClick={handleLogin}>
            Sign In
          </button>
          <div className="mt-8">
            Don’t have an account?{" "}
            <span className="text-white text-sm">Sign Up</span>
          </div>
        </div>
      </div>
      <div className="login-left ">
        <img src={loginLeftImg} alt="图片" />
      </div>
    </div>
  );
}
export default Login;
