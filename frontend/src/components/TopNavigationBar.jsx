import React from "react";
import TopicList from "./TopicList";
import FavBadge from "./FavBadge";
import "../styles/TopNavigationBar.scss";
import { useFavContext } from "../context/FavContext"; // Import the context

const TopNavigationBar = ({ topics }) => {
  const { favorites } = useFavContext(); // Access favorites from global state
  const favCount = favorites.length; // Calculate the favorite count

  return (
    <nav className="top-navigation-bar">
      <div className="top-navigation-bar__logo">PhotoLabs</div>
      <TopicList topics={topics} />
      <FavBadge favCount={favCount} />
    </nav>
  );
};

export default TopNavigationBar;











