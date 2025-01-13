import React from "react";
import PhotoListItem from "./PhotoListItem";
import "../styles/PhotoList.scss";

const PhotoList = ({ photos, onToggleFav, onPhotoClick }) => {
  return (
    <div className="photo-list">
      {photos.map((photo) => (
        <PhotoListItem
          key={photo.id}
          id={photo.id}
          location={photo.location}
          
          username={photo.user.name}
          profile={photo.user.profile}
          isFav={photo.isFav}
          onToggleFav={onToggleFav}
          onClick={() => onPhotoClick(photo)} // Pass photo to modal
        />
      ))}
    </div>
  );
};

export default PhotoList;






