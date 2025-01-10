import React, { useState } from 'react';
import '../styles/TopNavigationBar.scss';
import TopicList from './TopicList';

const TopNavigation = () => {
  const [activeTopic, setActiveTopic] = useState(null);

  const topics = ['Nature', 'Cities', 'Portraits']; // Define topics array

  return (
    <div className="top-nav-bar">
      <span className="top-nav-bar__logo">PhotoLabs</span>
      <div className="top-nav-bar__topics">
        {/* Pass the topics array and callback for topic click */}
        <TopicList
          topics={topics}
          activeTopic={activeTopic}
          onTopicClick={(topic) => setActiveTopic(topic)}
        />
      </div>
    </div>
  );
};

export default TopNavigation;


