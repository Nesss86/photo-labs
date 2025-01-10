import React from 'react';
import TopicListItem from './TopicListItem';
import '../styles/TopicList.scss';

const TopicList = ({ topics, activeTopic, onTopicClick }) => {
  return (
    <div className="topic-list">
      {topics.map((topic) => (
        <TopicListItem
          key={topic.id} // Use unique ID
          topic={topic} // Pass the full topic object
          isActive={activeTopic === topic.slug} // Compare activeTopic with the slug
          onClick={onTopicClick}
        />
      ))}
    </div>
  );
};

export default TopicList;






