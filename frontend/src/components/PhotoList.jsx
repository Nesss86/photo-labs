import React from "react";
import PhotoListItem from "./PhotoListItem";
import "../styles/PhotoList.scss";

const PhotoList = ({ photos = [], onToggleFav, onPhotoClick }) => {
  // Handle empty photos array gracefully
  if (!photos.length) {
    return <div className="photo-list__empty">No photos available.</div>;
  }

  return (
    <div className="photo-list">
      {photos.map((photo) => (
        <PhotoListItem
          key={photo.id}
          id={photo.id}
          location={photo.location || { city: "Unknown", country: "Unknown" }}
          username={photo.user?.name || "Unknown"}
          profile={photo.user?.profile || ""}
          imageSource={photo.urls?.regular || "/placeholder.jpg"} // Fallback for missing image
          isFav={photo.isFav || false}
          onToggleFav={onToggleFav}
          onPhotoClick={onPhotoClick}
        />
      ))}
    </div>
  );
};

export default PhotoList;











