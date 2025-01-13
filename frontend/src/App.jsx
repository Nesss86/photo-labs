import React, { useState } from "react";
import HomeRoute from "./routes/HomeRoute";
import PhotoDetailsModal from "./routes/PhotoDetailsModal";
import "./App.scss";
import photosData from "./mocks/photos";
import topicsData from "./mocks/topics";
import TopNavigationBar from "./components/TopNavigationBar";

const App = () => {
  const [photos, setPhotos] = useState(photosData);
  const [selectedPhoto, setSelectedPhoto] = useState(null); // State for modal

  const toggleFav = (id) => {
    setPhotos((prevPhotos) =>
      prevPhotos.map((photo) =>
        photo.id === id ? { ...photo, isFav: !photo.isFav } : photo
      )
    );
  };

  const hasFavs = photos.some((photo) => photo.isFav);

  const openModal = (photo) => setSelectedPhoto(photo); // Open modal
  const closeModal = () => setSelectedPhoto(null); // Close modal

  return (
    <div className="App">
      <HomeRoute
        topics={topicsData}
        photos={photos}
        onToggleFav={toggleFav}
        onPhotoClick={openModal} // Pass photo click handler
      />
      <TopNavigationBar topics={topicsData} hasFavs={hasFavs} />
      {selectedPhoto && (
        <PhotoDetailsModal photo={selectedPhoto} onClose={closeModal} />
      )}
    </div>
  );
};

export default App;
















