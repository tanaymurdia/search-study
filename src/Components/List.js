import React, { useState } from 'react';

// Study Component
function Study({ details }) {
    const [expanded, setExpanded] = useState(false);
  
    const handleToggle = () => {
      setExpanded(!expanded);
    };
  
    return (
      <div className="study-container" onClick={handleToggle}>
        <div className="study-header">
          <h3 className="study-title">{details['Study Title']}</h3>
          <button className="toggle-icon-button" aria-label="Toggle Details">
            {expanded ? '−' : '+'}
          </button>
        </div>
        <button className="study-url-button" onClick={(e) => e.stopPropagation()}>
          <a href={details['Study URL']} target="_blank" rel="noopener noreferrer">
            Visit Study URL
          </a>
        </button>
        <p className="study-start-date"><strong>Start Date:</strong> {details['Start Date']}</p>
        
        {expanded && (
          <div className="study-details">
            {Object.keys(details).map((key) => (
              <div key={key} className="detail-item">
                <span>
                  <h3 className="detail-key">{key}</h3>
                  <span className="detail-value">{details[key]}</span>
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

export default Study;