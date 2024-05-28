import React, { useState } from "react";
import "./LoginComponent.css";
import { useAppDispatch } from "../store";
import { loginUser } from "../store/slices/authReducer";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const naivgate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(loginUser({email: username, password})).unwrap().then(() => {
        naivgate("/profile");
    }).catch((response) => {
        alert(`Error occured ${response.message}`);
    });
  };

  const onPropertyChage = (callback: typeof setUsername | typeof setPassword) => {
    return (event: React.ChangeEvent<HTMLInputElement>): void => {
        callback(event.target.value);
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <label htmlFor="username">
          <input onChange={onPropertyChage(setUsername)} type="text" placeholder="username" id="username" />
        </label>
        <label htmlFor="password">
          <input onChange={onPropertyChage(setPassword)} type="password" placeholder="password" id="password" />
        </label>
        <button>Login</button>
      </form>
    </div>
  );
};

export default LoginComponent;
