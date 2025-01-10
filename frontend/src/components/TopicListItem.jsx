import React from 'react';
import '../styles/TopicListItem.scss';

const TopicListItem = ({ topic, isActive, onClick }) => {
  return (
    <span
      className={`topic-list-item ${isActive ? 'active' : ''}`}
      onClick={() => onClick(topic)}
    >
      {topic}
    </span>
  );
};

export default TopicListItem;


