import React from "react";

import "../styles/PhotoListItem.scss";


const PhotoListItem = ({id, location, imageSource, username, profile}) => {
  return (
    <div className="photo-list-item" id={`photo-${id}`}>
      <img className="photo-list-item_image" src={imageSource} alt={`Photo by ${username}`}/>
      <div className="photo-list-item_details">
        <img
          className="photo-list-item_profile"
          src={profile}
          alt={`${username}'s profile`}
        />
        <p className="photo-list-item_username">{username}</p>
        <p className="photo-list-item_location">
          {location.city}, {location.country}
        </p>  
   </div>
  </div>
  );
};

export default PhotoListItem;
