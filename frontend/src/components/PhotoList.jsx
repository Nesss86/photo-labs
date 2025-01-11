import React from "react";
import PhotoListItem from "./PhotoListItem";
import "../styles/PhotoList.scss";

const PhotoList = ({ photos, onToggleFav }) => {
  return (
    <div className="photo-list">
      {photos.map((photo) => (
        <PhotoListItem
          key={photo.id}
          id={photo.id}
          location={photo.location}
          imageSource={photo.urls.regular} // Use the correct field
          username={photo.user.name}
          profile={photo.user.profile}
          isFav={photo.isFav}
          onToggleFav={onToggleFav}
        />
      ))}
    </div>
  );
};

export default PhotoList;





