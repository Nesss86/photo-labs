import React from 'react';
import TopicListItem from './TopicListItem';
import '../styles/TopicList.scss';

const TopicList = ({ topics = [], activeTopic, onTopicClick }) => {
  return (
    <div className="topic-list">
      {topics.map((topic) => (
        <TopicListItem
          key={topic}
          topic={topic}
          isActive={topic === activeTopic}
          onClick={onTopicClick}
        />
      ))}
    </div>
  );
};

export default TopicList;




