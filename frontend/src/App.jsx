import React, { useState } from "react";
import HomeRoute from "./routes/HomeRoute"; // Updated path for HomeRoute
import photos from "./mocks/photos"; // Import mock photos
import topics from "./mocks/topics"; // Import mock topics
import "./App.scss";

const App = () => {
  const [photoData, setPhotoData] = useState(photos); // Use mock photos
  const [topicData, setTopicData] = useState(topics); // Use mock topics

  // Calculate favorite count based on the photos array
  const favCount = photoData.filter((photo) => photo.isFav).length;

  // Toggle favorite status of a photo
  const toggleFav = (id) => {
    setPhotoData((prevPhotos) =>
      prevPhotos.map((photo) =>
        photo.id === id ? { ...photo, isFav: !photo.isFav } : photo
      )
    );
  };

  return (
    <div className="App">
      <HomeRoute
        topics={topicData}
        photos={photoData}
        favCount={favCount}
        onToggleFav={toggleFav}
      />
    </div>
  );
};

export default App;












