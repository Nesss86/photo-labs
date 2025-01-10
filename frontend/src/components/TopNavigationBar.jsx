import React from "react";
import TopicList from "./TopicList";
import "../styles/TopNavigationBar.scss";

const TopNavigationBar = ({ topics, favCount }) => {
  return (
    <div className="top-navigation-bar">
      {/* Logo Section */}
      <div className="top-navigation-bar__logo">
        <h1 className="logo">PhotoLabs</h1>
      </div>

      {/* Topics Section */}
      <div className="top-navigation-bar__topics">
        <TopicList topics={topics} />
      </div>

      {/* Favorite Badge Section */}
      <div className="top-navigation-bar__fav-badge">
        <div className="fav-icon">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 1 4.5 2.09C13.09 4 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill="#C80000"
            />
          </svg>
          <span className="fav-count">{favCount || 0}</span>
        </div>
      </div>
    </div>
  );
};

export default TopNavigationBar;







