import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LeaderboardPage() {
    const [interns, setInterns] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:5001/api/interns')
            .then(response => {
                setInterns(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching leaderboard data:', error);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="container"><p>Loading leaderboard...</p></div>;

    return (
        <div className="container">
            <div className="card">
                <h2>Leaderboard</h2>
                <table className="leaderboard-table">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Name</th>
                            <th>Donations Raised</th>
                        </tr>
                    </thead>
                    <tbody>
                        {interns.map((intern, index) => (
                            <tr key={intern._id}>
                                <td>{index + 1}</td>
                                <td>{intern.name}</td>
                                <td>${intern.donationsRaised.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default LeaderboardPage;