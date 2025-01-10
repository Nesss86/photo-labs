import React from "react";
import TopNavigationBar from "../components/TopNavigationBar";
import PhotoList from "../components/PhotoList";
import "../styles/HomeRoute.scss";

const HomeRoute = ({ topics, photos, favCount, onToggleFav }) => {
  return (
    <div className="home-route">
      <TopNavigationBar topics={topics} favCount={favCount} />
      <PhotoList photos={photos} onToggleFav={onToggleFav} />
    </div>
  );
};

export default HomeRoute;


