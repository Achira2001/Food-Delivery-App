import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/loginUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            const json = await response.json();
            console.log('Login response:', json);

            if (json.success) {
                localStorage.setItem('authToken', json.authToken);
                navigate('/');
            } else {
                alert(json.message || 'Invalid credentials');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while trying to log in. Please try again later.');
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className="container">
            <h2>Login to Your Account</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={credentials.email}
                        onChange={onChange}
                        id="email"
                        placeholder="Enter email"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={credentials.password}
                        onChange={onChange}
                        id="password"
                        placeholder="Password"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
                <Link to="/createUser" className="m-3 btn btn-secondary">I'm a new user</Link>
            </form>
        </div>
    );
}
