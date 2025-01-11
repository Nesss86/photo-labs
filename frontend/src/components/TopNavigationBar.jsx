import React from "react";
import TopicList from "./TopicList";
import FavBadge from "./FavBadge";
import "../styles/TopNavigationBar.scss";

const TopNavigationBar = ({ topics, hasFavs }) => {
  return (
    <nav className="top-navigation-bar">
      <div className="top-navigation-bar__logo">PhotoLabs</div>
      <TopicList topics={topics} />
      <FavBadge hasFavs={hasFavs} />
    </nav>
  );
};

export default TopNavigationBar;

















