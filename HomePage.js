import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="container" style={{ textAlign: 'center', padding: '50px 0' }}>
            <h1>Welcome to Little Lemon</h1>
            <p>Your favorite Mediterranean restaurant.</p>
            <Link to="/booking" style={{
                display: 'inline-block',
                marginTop: '20px',
                padding: '15px 30px',
                backgroundColor: '#F4CE14',
                color: '#495E57',
                textDecoration: 'none',
                fontWeight: 'bold',
                borderRadius: '8px',
            }}>
                Book a Table
            </Link>
        </div>
    );
};

export default HomePage;
