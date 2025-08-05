import React from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const DUMMY_INTERN_ID = 'YOUR_INTERN_ID_HERE'; 
        navigate(`/dashboard/${DUMMY_INTERN_ID}`);
    };

    return (
        <div className="login-container container">
            <div className="card">
                <h2>Intern Login</h2>
                <form onSubmit={handleLogin}>
                    <input type="email" placeholder="Email" required />
                    <input type="password" placeholder="Password" required />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;