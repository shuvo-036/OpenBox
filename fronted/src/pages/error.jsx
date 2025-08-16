import React from "react";

export default function Error() {
    return (
        <div className="error-wrapper">
            <h1 className="error-title">404</h1>
            <p className="error-message">Oops! The page you are looking for does not exist.</p>
            <a href="/" className="back-home">Back to Home</a>
        </div>
    );
}

