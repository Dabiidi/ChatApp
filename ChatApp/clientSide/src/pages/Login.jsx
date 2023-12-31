import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
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

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>Chat Me </h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Log In</button>
          <span>
            Don't have an account ? <Link to="/register">Register.</Link>
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
    .a{
      color: black;
      text-transform: none;
      font-weight: bold;

    }
  }


}
`;