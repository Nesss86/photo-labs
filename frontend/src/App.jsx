import React, { useState } from "react";
import HomeRoute from "./routes/HomeRoute";
import "./App.scss";
import photosData from "./mocks/photos"; // Import mock data
import topicsData from "./mocks/topics"; // Import mock data

const App = () => {
  const [photos, setPhotos] = useState(
    photosData.map((photo) => ({ ...photo, isFav: false }))
  );

  // Toggle favorite status of a photo
  const toggleFav = (id) => {
    setPhotos((prevPhotos) =>
      prevPhotos.map((photo) =>
        photo.id === id ? { ...photo, isFav: !photo.isFav } : photo
      )
    );
  };

  return (
    <div className="App">
      <HomeRoute
        topics={topicsData}
        photos={photos}
        favCount={photos.filter((photo) => photo.isFav).length}
        onToggleFav={toggleFav}
      />
    </div>
  );
};

export default App;














