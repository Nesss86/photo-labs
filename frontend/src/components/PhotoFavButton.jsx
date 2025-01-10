import React, { useState } from 'react';
import FavIcon from './FavIcon';
import '../styles/PhotoFavButton.scss';

function PhotoFavButton() {
  const [selected, setSelected] = useState(false);

  const toggleFav = () => {
    setSelected((prev) => !prev); // Toggle the selected state
  };

  return (
    <div className="photo-list__fav-icon" onClick={toggleFav}>
      {/* Pass the selected state to FavIcon */}
      <FavIcon selected={selected} />
    </div>
  );
}

export default PhotoFavButton;

