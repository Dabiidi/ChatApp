import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes"; 
import showPwdImg from './show-password.svg';
import hidePwdImg from './hide-password.svg';

export default function Register() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, username, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );
        navigate("/");
      }
    }
  };

  const [isRevealPwd, setIsRevealPwd] = useState(false);

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>Chat Me</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
        
        <div className="pwd-container">
        <input
          name="password"
          placeholder="Password"
          type={isRevealPwd ? "text" : "password"}
          onChange={e =>  handleChange(e)}
          />
       <img
          title={isRevealPwd ? "Hide password" : "Show password"}
          src={isRevealPwd ? hidePwdImg : showPwdImg}
          onClick={() => setIsRevealPwd(prevState => !prevState)}
        />
        </div>
        
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          
          
          <button type="submit">Register</button>
          <span>
            Already have an account?       <Link to="/login">Login.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`

height: 100vh;
width: 100vw;
display: flex;
flex-direction:column;
justify-content:center;
gap:1rem;
align-items:center;
background-color: #28615D;

.pwd-container {
  position: relative;
  width: 295px;
}

.pwd-container input {
  padding: 1rem;
  font-size: 20px;
  
}

.pwd-container img {
  cursor: pointer;
  position: absolute;
  width: 20px;
  right: 8px;
  top: 20px;
}

.brand{
  display: flex;
  align-items: center;
  gap: 0.1rem;
  justify-content: center;
img{
  height: 5rem ;
}
h1{
  color : black;
  text-transform: uppercase;
}

}
form{
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background-color: white;
  border-radius: 2rem;
  padding: 3rem 5rem;
  input{
    background-color: transparent;
    padding: 1rem;
    border:.1rem solid #000000;
    border-radius: .4rem;
    color: black;
    width: 100%;
    font-size:1rem;
    &:focus{
      border:.1rem solid #000000;
      outline: none;
    }
  }
  button{
    background-color:  #000000;
    color:white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: .4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: 0.5s ease-in-out;
    &:hover{
      background-color: #28615D;

    }

  }
  
  span{
    color: black;
    text-transform: uppercase;
    font-weight:bold;
    padding-left: 5%;
    .a{
      color: black;
      text-transform: none;
      font-weight: bold;

    }
  }

}


`;