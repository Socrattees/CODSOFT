import React from 'react';
import PropTypes from 'prop-types';
import './card.css';

const Card = ({ type, itemDetails }) => {
  // Function to format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <div className="card">
      {type === 'project' ? (
        <>
          <h3>{itemDetails.name}</h3>
          <p>{itemDetails.description}</p>
          <p><strong>Start Date:</strong> {formatDate(itemDetails.startDate)}</p>
          <p><strong>End Date:</strong> {formatDate(itemDetails.endDate)}</p>
          <p><strong>Priority:</strong> {itemDetails.priority}</p>
        </>
      ) : (
        <>
          <h3>{itemDetails.title}</h3>
          <p>{itemDetails.description}</p>
          <p><strong>Start Date:</strong> {formatDate(itemDetails.startDate)}</p>
          <p><strong>End Date:</strong> {formatDate(itemDetails.endDate)}</p>
          <p><strong>Priority:</strong> {itemDetails.priority}</p>
        </>
      )}
    </div>
  );
};

Card.propTypes = {
  type: PropTypes.oneOf(['project', 'task']).isRequired,
  itemDetails: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    title: PropTypes.string,
    project: PropTypes.string,
  }).isRequired,
};

export default Card;