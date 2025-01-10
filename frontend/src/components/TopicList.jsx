import React from "react";
import TopicListItem from "./TopicListItem";
import "../styles/TopicList.scss";

const TopicList = ({ topics = [] }) => {
  if (topics.length === 0) {
    return <p className="topic-list__error">No topics available</p>;
  }

  return (
    <div className="topic-list">
      {topics.map((topic, index) => (
        <TopicListItem key={index} topic={topic} />
      ))}
    </div>
  );
};

export default TopicList;





