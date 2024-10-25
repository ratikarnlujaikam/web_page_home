import React from 'react';

export default function Home() {
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0',
        padding: '20px',
        boxSizing: 'border-box',
    };

    const imgStyle = {
        maxWidth: '80%',
        height: 'auto',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '15px',
    };

    return (
        <div style={containerStyle}>
            <img src="/main.jpg" alt="Main Image" style={imgStyle} />
        </div>
    );
}
