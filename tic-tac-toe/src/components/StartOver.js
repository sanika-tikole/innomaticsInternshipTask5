import React from 'react';
import './StartOver.css';

export const StartOver = ({ startOver }) => {
    return (
        <button className="start-over-btn" onClick={startOver}>
            🔄 Start Over
        </button>
    );
};
