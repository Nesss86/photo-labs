import React, { useState } from "react";
import HomeRoute from "./routes/HomeRoute";
import "./App.scss";
import photosData from "./mocks/photos";
import topicsData from "./mocks/topics";
import TopNavigationBar from "./components/TopNavigationBar";

const App = () => {
  const [photos, setPhotos] = useState(photosData);

  const toggleFav = (id) => {
    setPhotos((prevPhotos) =>
      prevPhotos.map((photo) =>
        photo.id === id ? { ...photo, isFav: !photo.isFav } : photo
      )
    );
  };

  const hasFavs = photos.some((photo) => photo.isFav);

  return (
    <div className="App">
      <HomeRoute
        topics={topicsData}
        photos={photos}
        onToggleFav={toggleFav}
      />
      <TopNavigationBar topics={topicsData} hasFavs={hasFavs} />
    </div>
  );
};

export default App;















