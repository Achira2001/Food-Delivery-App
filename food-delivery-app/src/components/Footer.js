import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <div>
            <footer className="d-flex flex-wrap justify-content-center align-items-center py-3 my-4 border-top bg-dark">
                <div className="col-md-4 d-flex flex-column align-items-center text-center">
                    <Link to="/" className="mb-3 me-2 mb-md-0 text-white text-decoration-none lh-1">
                        Food Delivery App
                    </Link>
                    <span className="text-white">© 2024 Food Delivery App, Inc</span>
                </div>
            </footer>
        </div>
    );
}
