import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand">Intern Portal</Link>
            <div className="nav-links">
                <Link to="/dashboard/60d5ec49f1a8e2a8c8e8b456">Dashboard</Link> {/* Example ID */}
                <Link to="/leaderboard">Leaderboard</Link>
                <Link to="/">Logout</Link>
            </div>
        </nav>
    );
}

export default Navbar;