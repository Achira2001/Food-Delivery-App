import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
    const [credentials, setCredentials] = useState({
        name: '',
        email: '',
        password: '',
        location: '',
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/createUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            const json = await response.json();
            console.log('Signup response:', json);

            if (json.success) {
                alert('Signup successful! You can now log in.');
                navigate('/login');
            } else {
                const errorMsg = json.message || json.errors?.[0]?.msg || 'Signup failed. Please try again.';
                alert(errorMsg);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while signing up. Please try again later.');
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className="container">
            <h2>Create a New Account</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name">Name</label>
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
                        placeholder="Enter password"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="location">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        name="location"
                        value={credentials.location}
                        onChange={onChange}
                        id="location"
                        placeholder="Enter your address"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Signup</button>
                <Link to="/login" className="m-3 btn btn-secondary">Already have an account?</Link>
            </form>
        </div>
    );
}
