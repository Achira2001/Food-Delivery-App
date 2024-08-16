import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/loginUser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: credentials.email, password: credentials.password }),
      });

      const json = await response.json();
      console.log(json);

      if (!json.success) {
        alert("Enter Valid Credentials");
      } 
      
      if (json.success) {
        localStorage.setItem("authToken",json.authToken);
        console.log(localStorage.getItem("authToken"))
        navigate("/");
      } 
      

    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while trying to log in. Please try again later.");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <div className='container'>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input 
              type="email" 
              className="form-control" 
              name="email" 
              value={credentials.email} 
              onChange={onChange} 
              id="exampleInputEmail1" 
              aria-describedby="emailHelp" 
              placeholder="Enter email" 
              required 
            />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input 
              type="password" 
              className="form-control" 
              name="password" 
              value={credentials.password} 
              onChange={onChange} 
              id="exampleInputPassword1" 
              placeholder="Password" 
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to="/createUser" className='m-3 btn btn-danger'>I'm a new user</Link>
        </form>
      </div>
    </div>
  );
}
