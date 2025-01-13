import React from "react";
import "../styles/PhotoListItem.scss";
import PhotoFavButton from "./PhotoFavButton";

const PhotoListItem = ({ id, location, username, profile, isFav, onToggleFav, onClick }) => {
  return (
    <div className="photo-list__item" id={`photo-${id}`} onClick={onClick}>
      <PhotoFavButton
        selected={isFav} // Use global favorite state
        onClick={(e) => {
          e.stopPropagation(); // Prevent parent click
          onToggleFav(id); // Call global toggle function
        }}
      />
      <img
        className="photo-list__image"
        src={`Image-${id}-Regular.jpeg`}
        alt={`Photo by ${username}`}
      />
      <div className="photo-list__user-details">
        <img
          className="photo-list__user-profile"
          src={profile}
          alt={`${username}'s profile`}
        />
        <div className="photo-list__user-info">
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














