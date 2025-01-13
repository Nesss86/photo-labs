import React, { useEffect } from "react";
import "../styles/PhotoDetailsModal.scss";
import closeSymbol from "../assets/closeSymbol.svg";

const PhotoDetailsModal = ({ photo, onClose }) => {
  // Log photo details to the console
  useEffect(() => {
    if (photo) {
      console.log("Selected Photo Details:", photo);
    }
  }, [photo]);

  return (
    <div className="photo-details-modal" onClick={onClose}>
      <div
        className="photo-details-modal__content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="photo-details-modal__close-button" onClick={onClose}>
          <img src={closeSymbol} alt="close symbol" />
        </button>
        {/* Placeholder content */}
        <p>Modal content goes here...</p>
      </div>
    </div>
  );
};

export default PhotoDetailsModal;


