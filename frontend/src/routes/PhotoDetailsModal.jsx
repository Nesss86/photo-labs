import React from "react";
import "../styles/PhotoDetailsModal.scss";
import closeSymbol from "../assets/closeSymbol.svg";

const PhotoDetailsModal = ({ photo, onClose }) => {
  return (
    <div className="photo-details-modal" onClick={onClose}>
      <div className="photo-details-modal__content" onClick={(e) => e.stopPropagation()}>
        <button className="photo-details-modal__close-button" onClick={onClose}>
          <img src={closeSymbol} alt="close symbol" />
        </button>
        {/* Content placeholder */}
        <h1>{photo?.user.name}&#39;s Photo</h1>
        <p>{photo?.location.city}, {photo?.location.country}</p>
      </div>
    </div>
  );
};

export default PhotoDetailsModal;

