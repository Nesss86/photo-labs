import React from "react";
import "../styles/TopicListItem.scss";

const TopicListItem = ({ topic, onClick }) => {
  return (
    <span
      className="topic-list-item"
      onClick={onClick} 
    >
      {topic.title}
    </span>
  );
};

export default TopicListItem;















