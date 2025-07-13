import React from 'react';
import './Loading.css';
const Loading = () => {
    return (
        <div className="loading-page">
            <div className="spinner-border text-dark loader" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>

    )
}
export default Loading