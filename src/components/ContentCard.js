import React from 'react';
import { Link } from 'react-router-dom';

const ContentCard = ({ to, thumbnail, title, description, progress, buttonText }) => (
  <Link to={to} className="card">
    <img src={thumbnail} alt={title} className="card-thumbnail" />
    <div className="card-content">
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      {progress !== undefined && (
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
      )}
      {buttonText && <div className="btn-start">{buttonText}</div>}
    </div>
  </Link>
);

export default ContentCard;