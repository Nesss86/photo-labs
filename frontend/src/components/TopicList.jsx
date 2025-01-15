import React from "react";
import TopicListItem from "./TopicListItem";
import "../styles/TopicList.scss";

const TopicList = ({ topics, onTopicClick }) => {
  return (
    <div className="topic-list">
      {topics.map((topic) => (
        <TopicListItem
          key={topic.id}
          topic={topic}
          onClick={() => onTopicClick(topic)} // Pass the topic to onLoadTopic
        />
      ))}
    </div>
  );
};

export default TopicList;



















