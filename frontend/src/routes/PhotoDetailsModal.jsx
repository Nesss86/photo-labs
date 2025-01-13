import React from "react";
import "../styles/PhotoDetailsModal.scss";
import closeSymbol from "../assets/closeSymbol.svg";
import PhotoListItem from "../components/PhotoListItem";
import PhotoFavButton from "../components/PhotoFavButton";

const PhotoDetailsModal = ({ photo, onClose, onToggleFav, similarPhotos }) => {
  if (!photo) return null;

  return (
    <div className="photo-details-modal" onClick={onClose}>
      <div
        className="photo-details-modal__content"
        onClick={(e) => e.stopPropagation()} // Prevent modal close on content click
      >
        {/* Close Button */}
        <button className="photo-details-modal__close-button" onClick={onClose}>
          <img src={closeSymbol} alt="Close modal" />
        </button>

        {/* Full-Size Photo Section */}
        <div className="photo-details-modal__main-photo">
          <PhotoFavButton
            selected={photo.isFav}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFav(photo.id);
            }}
            className="photo-details-modal__fav-icon"
          />
          <img
            src={`Image-${photo.id}-Full.jpeg`}
            alt={`Photo by ${photo.user.name}`}
            className="photo-details-modal__main-image"
          />
          <div className="photo-details-modal__user-details">
            <img
              src={photo.user.profile}
              alt={`${photo.user.name}'s profile`}
              className="photo-details-modal__user-profile"
            />
            <div>
              <p className="photo-details-modal__user-info">{photo.user.name}</p>
              <p className="photo-details-modal__user-location">
                {photo.location.city}, {photo.location.country}
              </p>
            </div>
          </div>
        </div>

        {/* Similar Photos Section */}
        <div className="photo-details-modal__similar-photos">
          <h3>Similar Photos</h3>
          <div className="photo-details-modal__similar-list">
            {similarPhotos.map((similarPhoto) => (
              <PhotoListItem
                key={similarPhoto.id}
                id={similarPhoto.id}
                location={similarPhoto.location}
                username={similarPhoto.user.name}
                profile={similarPhoto.user.profile}
                isFav={similarPhoto.isFav}
                onToggleFav={onToggleFav} // Ensure sync with global state
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoDetailsModal;


