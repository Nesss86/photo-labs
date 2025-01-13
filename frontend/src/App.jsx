import React, { useState } from "react";
import HomeRoute from "./routes/HomeRoute";
import PhotoDetailsModal from "./routes/PhotoDetailsModal";
import TopNavigationBar from "./components/TopNavigationBar";
import "./App.scss";
import photosData from "./mocks/photos";
import topicsData from "./mocks/topics";

const App = () => {
  const [photos, setPhotos] = useState(photosData);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [similarPhotos, setSimilarPhotos] = useState([]);
  const [hasFavs, setHasFavs] = useState(
    photosData.some((photo) => photo.isFav)
  );

  const recalculateHasFavs = (updatedPhotos) => {
    setHasFavs(updatedPhotos.some((photo) => photo.isFav));
  };

  const toggleFav = (id) => {
    setPhotos((prevPhotos) => {
      const updatedPhotos = prevPhotos.map((photo) =>
        photo.id === id ? { ...photo, isFav: !photo.isFav } : photo
      );

      recalculateHasFavs(updatedPhotos); // Recalculate `hasFavs`

      // Update `selectedPhoto` if it matches the toggled photo
      if (selectedPhoto && selectedPhoto.id === id) {
        setSelectedPhoto((prev) => ({
          ...prev,
          isFav: !prev.isFav,
        }));
      }

      return updatedPhotos;
    });
  };

  const openModal = (photo) => {
    const relatedPhotos = photos.filter(
      (p) => p.id !== photo.id && p.topic === photo.topic
    );
    setSelectedPhoto(photo);
    setSimilarPhotos(relatedPhotos);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
    setSimilarPhotos([]);
  };

  return (
    <div className="App">
      <TopNavigationBar topics={topicsData} hasFavs={hasFavs} />
      <HomeRoute
        topics={topicsData}
        photos={photos}
        onToggleFav={toggleFav}
        onPhotoClick={openModal}
      />
      {selectedPhoto && (
        <PhotoDetailsModal
          photo={selectedPhoto}
          similarPhotos={similarPhotos}
          onClose={closeModal}
          onToggleFav={toggleFav}
        />
      )}
    </div>
  );
};

export default App;
















