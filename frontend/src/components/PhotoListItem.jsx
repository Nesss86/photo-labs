import React from "react";
import "../styles/PhotoListItem.scss";
import PhotoFavButton from "./PhotoFavButton"; // Import the favorite button component

const PhotoListItem = ({ id, location, imageSource, username, profile }) => {
  return (
    <div className="photo-list__item" id={`photo-${id}`}>
      {/* Add the favorite button positioned on top-right */}
      <PhotoFavButton />
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


