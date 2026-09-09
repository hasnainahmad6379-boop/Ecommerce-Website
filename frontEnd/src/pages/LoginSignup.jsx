import React from "react";
import "./CSS/LoginSignup.css";
import { useState } from "react";
const LoginSignup = () => {
  const [state, setState] = useState("Login");

  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    console.log("Login exc", formData);
    let responseData;
    await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((Response) => Response.json())
      .then((data) => (responseData = data));

    console.log("RESPONSE DATA:", responseData);
    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.error);
    }
  };
  const signup = async () => {
    console.log("Signup", formData);
    let responseData;
    await fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((Response) => Response.json())
      .then((data) => (responseData = data));

    console.log("RESPONSE DATA:", responseData);
    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.error);
    }
  };
  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsingup-fields">
          {state === "Sign Up" ? (
            <input
              onChange={changeHandler}
              name="name"
              value={formData.name}
              type="text"
              placeholder="Your Name"
            />
          ) : (
            <></>
          )}
          <input
            name="email"
            value={formData.email}
            type="email"
            placeholder="Email"
            onChange={changeHandler}
          />
          <input
            name="password"
            value={formData.password}
            type="password"
            placeholder="Password"
            onChange={changeHandler}
          />
        </div>
        <button
          onClick={() => {
            state === "Login" ? login() : signup();
          }}
        >
          Continue
        </button>
        {state === "Sign Up" ? (
          <p className="loginsignup-login">
            Already have an account?{" "}
            <span
              onClick={() => {
                setState("Login");
              }}
            >
              Login Here
            </span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Create an account{" "}
            <span
              onClick={() => {
                setState("Sign Up");
              }}
            >
              Click Here
            </span>
          </p>
        )}

        <div className="loginsignup-agree">
          <input type="checkbox" />
          <p>
            By Continuing,I agree to the Terms of use{" "}
            <span>Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
