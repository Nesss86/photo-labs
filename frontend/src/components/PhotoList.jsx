import React from "react";
import PhotoListItem from "./PhotoListItem";
import "../styles/PhotoList.scss";

const PhotoList = ({ photos }) => {
  return (
    <div className="photo-list">
      {photos.map((photo) => (
        <PhotoListItem
          key={photo.id}
          id={photo.id}
          location={photo.location}
          imageSource={photo.imageSource}
          username={photo.username}
          profile={photo.profile}
        />
      ))}
    </div>
  );
};

export default PhotoList;


