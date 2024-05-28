import React, { useState } from "react";
import "./RegisterComponent.css";
import { registerUser } from "../store/slices/authReducer";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store";

const RegisterComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const naivgate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(registerUser({ name, email, password }))
      .unwrap()
      .then(() => {
        naivgate("/login");
      })
      .catch((response) => {
        alert(`Error occured ${response.message}`);
      });
  };

  const onPropertyChage = (
    callback: typeof setName | typeof setEmail | typeof setPassword
  ) => {
    return (event: React.ChangeEvent<HTMLInputElement>): void => {
      callback(event.target.value);
    };
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <label htmlFor="name">
          <input onChange={onPropertyChage(setName)} type="text" placeholder="name" id="name" />
        </label>
        <label htmlFor="email">
          <input onChange={onPropertyChage(setEmail)} type="text" placeholder="email" id="email" />
        </label>
        <label htmlFor="password">
          <input onChange={onPropertyChage(setPassword)} type="password" placeholder="password" id="password" />
        </label>
        <button>Register</button>
      </form>
    </div>
  );
};

export default RegisterComponent;
