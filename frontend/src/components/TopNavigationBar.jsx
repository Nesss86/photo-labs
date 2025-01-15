import React from "react";
import TopicList from "./TopicList";
import FavBadge from "./FavBadge";
import "../styles/TopNavigationBar.scss";

const TopNavigationBar = ({ topics, hasFavs, onLoadTopic }) => {
  return (
    <nav className="top-navigation-bar">
      <div className="top-navigation-bar__logo">PhotoLabs</div>
      <TopicList topics={topics} onTopicClick={onLoadTopic} />
      <FavBadge hasFavs={hasFavs} /> {/* Add the FavBadge */}
    </nav>
  );
};

export default TopNavigationBar;

































