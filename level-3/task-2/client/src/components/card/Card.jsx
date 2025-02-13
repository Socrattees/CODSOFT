import React from "react";
import PropTypes from "prop-types";
import "./card.css";

const Card = ({ type, itemDetails }) => {
  // Function to format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Function to determine if the end date is within a week
  const isLessThanAWeekLeft = (endDate) => {
    const currentDate = new Date();
    const end = new Date(endDate);
    const diffTime = end - currentDate;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays < 7;
  };

  // Function to determine the class based on priority
  const getPriorityClass = (priority) => {
    switch (priority.toLowerCase()) {
      case "medium":
        return "card-priority-medium";
      case "high":
        return "card-priority-high";
      default:
        return "";
    }
  };

  const endDateClass = isLessThanAWeekLeft(itemDetails.endDate) ? "less-than-a-week" : "";
  const priorityClass = getPriorityClass(itemDetails.priority);

  return (
    <div className={itemDetails.status === "completed" ? "card completed" : "card"}>
      {type === "project" ? (
        <>
          <h3>{itemDetails.name}</h3>
          <p>{itemDetails.description}</p>
          <p><strong>Start Date:</strong> {formatDate(itemDetails.startDate)}</p>
          <p><strong>End Date:</strong> <span className={endDateClass}>{formatDate(itemDetails.endDate)}</span></p>
          <p>Status: {itemDetails.status}</p>
          <p><strong>Priority:</strong> <span className={priorityClass}>{itemDetails.priority}</span></p>
        </>
      ) : (
        <>
          <h3>{itemDetails.title}</h3>
          <p>{itemDetails.description}</p>
          <p><strong>Start Date:</strong> {formatDate(itemDetails.startDate)}</p>
          <p><strong>End Date:</strong> <span className={endDateClass}>{formatDate(itemDetails.endDate)}</span></p>
          <p>Status: {itemDetails.status}</p>
          <p><strong>Priority:</strong> <span className={priorityClass}>{itemDetails.priority}</span></p>
        </>
      )}
    </div>
  );
};

Card.propTypes = {
  type: PropTypes.oneOf(["project", "task"]).isRequired,
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