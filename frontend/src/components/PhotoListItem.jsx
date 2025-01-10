import React from "react";
import PropTypes from "prop-types"; // Import PropTypes for type checking
import "../styles/PhotoListItem.scss";
import PhotoFavButton from "./PhotoFavButton"; // Import the favorite button component

const PhotoListItem = ({ id, location, imageSource, username, profile }) => {
  return (
    <div className="photo-list__item" id={`photo-${id}`}>
      {/* Favorite button positioned on top-left */}
      <PhotoFavButton />
      
      {/* Display the photo */}
      <img
        className="photo-list__image"
        src={imageSource || `${process.env.PUBLIC_URL}/default-image.jpeg`} // Fallback image
        alt={`Photo by ${username || "Unknown User"}`}
      />

      <div className="photo-list__user-details">
        {/* User profile image */}
        <img
          className="photo-list__user-profile"
          src={profile || `${process.env.PUBLIC_URL}/default-profile.jpg`} // Fallback profile image
          alt={`${username || "Unknown User"}'s profile`}
        />

        {/* User information */}
        <div className="photo-list__user-info">
          <p>{username || "Unknown User"}</p>
          <p className="photo-list__user-location">
            {location?.city && location?.country
              ? `${location.city}, ${location.country}`
              : "Location Unknown"}
          </p>
        </div>
      </div>
    </div>
  );
};

// Define PropTypes for the component
PhotoListItem.propTypes = {
  id: PropTypes.string.isRequired,
  location: PropTypes.shape({
    city: PropTypes.string,
    country: PropTypes.string,
  }).isRequired,
  imageSource: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profile: PropTypes.string.isRequired,
};

// Default props in case certain props are missing
PhotoListItem.defaultProps = {
  location: { city: "Unknown", country: "Unknown" },
  imageSource: `${process.env.PUBLIC_URL}/default-image.jpeg`,
  username: "Anonymous",
  profile: `${process.env.PUBLIC_URL}/default-profile.jpg`,
};

export default PhotoListItem;



