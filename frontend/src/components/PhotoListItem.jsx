import React from "react";
import "../styles/PhotoListItem.scss";
import PhotoFavButton from "./PhotoFavButton";
import { useFavContext } from "../context/FavContext";

const PhotoListItem = ({ id, location, imageSource, username, profile, onClick }) => {
  const { favorites, dispatch } = useFavContext();
  const isFavorited = favorites.includes(id);

  const toggleFav = () => {
    dispatch({ type: "TOGGLE_FAV", payload: id });
  };

  return (
    <div className="photo-list__item" id={`photo-${id}`} onClick={onClick}>
      <PhotoFavButton selected={isFavorited} onClick={(e) => {
        e.stopPropagation(); // Prevent modal from opening when toggling favorite
        toggleFav();
      }} />
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










