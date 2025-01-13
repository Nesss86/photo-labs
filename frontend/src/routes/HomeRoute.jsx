import React from "react";
import TopNavigationBar from "../components/TopNavigationBar";
import PhotoList from "../components/PhotoList";
import "../styles/HomeRoute.scss";

const HomeRoute = ({ topics, photos, favCount, onToggleFav, onPhotoClick }) => {
  return (
    <div className="home-route">
      <TopNavigationBar topics={topics} favCount={favCount} />
      <PhotoList
        photos={photos}
        onToggleFav={onToggleFav}
        onPhotoClick={onPhotoClick} // Pass photo click handler
      />
    </div>
  );
};

export default HomeRoute;



