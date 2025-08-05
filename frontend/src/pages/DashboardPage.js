import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function DashboardPage() {
    const { id } = useParams(); 
    const [intern, setIntern] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:5001/api/interns/${id}`)
            .then(response => {
                setIntern(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching intern data:', error);
                setError('Failed to fetch intern data. Please check the ID.');
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="container"><p>Loading dashboard...</p></div>;
    if (error) return <div className="container"><p style={{color: 'red'}}>{error}</p></div>;
    if (!intern) return <div className="container"><p>No intern data found.</p></div>;

    return (
        <div className="container">
            <div className="card">
                <h2>Welcome, {intern.name}!</h2>
                <div className="info-grid">
                    <div className="info-item">
                        <h3>Your Referral Code</h3>
                        <p>{intern.referralCode}</p>
                    </div>
                    <div className="info-item">
                        <h3>Total Donations Raised</h3>
                        <p>${intern.donationsRaised.toLocaleString()}</p>
                    </div>
                </div>
            </div>

            <div className="card">
                <h2>Rewards &amp; Unlockables</h2>
                <div className="info-grid">
                    <div className="reward-item">
                        <h3>$500 Raised</h3>
                        <p>✅ Unlocked: Company T-Shirt</p>
                    </div>
                    <div className="reward-item" style={{opacity: intern.donationsRaised >= 1000 ? 1 : 0.5}}>
                        <h3>$1,000 Raised</h3>
                        <p>{intern.donationsRaised >= 1000 ? '✅ Unlocked: LinkedIn Premium Voucher' : '🔒 Locked'}</p>
                    </div>
                     <div className="reward-item" style={{opacity: intern.donationsRaised >= 2000 ? 1 : 0.5}}>
                        <h3>$2,000 Raised</h3>
                        <p>{intern.donationsRaised >= 2000 ? '✅ Unlocked: Lunch with CEO' : '🔒 Locked'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;