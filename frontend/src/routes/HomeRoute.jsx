import React from "react";
import PhotoList from "../components/PhotoList";
import "../styles/HomeRoute.scss";

const HomeRoute = ({ topics, photos, onToggleFav, onPhotoClick }) => {
  return (
    <div className="home-route">
      <PhotoList
        photos={photos}
        onToggleFav={onToggleFav}
        onPhotoClick={onPhotoClick}
      />
    </div>
  );
};

export default HomeRoute;












