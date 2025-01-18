import React from "react";
import PhotoFavButton from "./PhotoFavButton";
import "../styles/PhotoListItem.scss";

const PhotoListItem = ({
  id,
  location,
  username,
  profile,
  isFav,
  onToggleFav,
  onPhotoClick,
  imageSource, // Ensure imageSource is passed as a prop
}) => {
  return (
    <div
      className="photo-list__item"
      id={`photo-${id}`}
      onClick={() => onPhotoClick(id)}
    >
      <PhotoFavButton
        selected={isFav}
        onClick={(e) => {
          e.stopPropagation(); // Prevent parent click
          onToggleFav(id);
        }}
      />
      <img
        className="photo-list__image"
        src={imageSource} 
        alt={`Photo by ${username}`}
      />
      <div className="photo-list__user-details">
        <img
          className="photo-list__user-profile"
          src={profile}
          alt={`${username}'s profile`}
        />
        <div>
          <p>{username}</p>
          <p className="photo-list__user-location">
            {location.city}, {location.country}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PhotoListItem;





















