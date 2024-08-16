import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Signup() {
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        geolocation: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/createUser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: credentials.name,
                    email: credentials.email,
                    password: credentials.password,
                    location: credentials.geolocation
                })
            });

            const json = await response.json();
            console.log(json);

            if (!json.success) {
                alert("Enter valid credentials or try a different email.");
            } else {
                alert("Signup successful! Please log in.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while signing up. Please try again later.");
        }
    };

    const onChange = (event) => {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value
        });
    };

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className='form-label'>Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="name" 
                        value={credentials.name} 
                        onChange={onChange} 
                        id="name"
                        placeholder="Enter your name"
                        required 
                    />
                </div>
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
                <div className="mb-3">
                    <label htmlFor="geolocation">Address</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="geolocation" 
                        value={credentials.geolocation} 
                        onChange={onChange} 
                        id="geolocation" 
                        placeholder="Enter your address"
                        required 
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/login" className='m-3 btn btn-danger'>Already a user</Link>
            </form>
        </div>
    );
}
