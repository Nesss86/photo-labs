import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    setHasFavs(photos.some((photo) => photo.isFav));
  }, [photos]);

  const toggleFav = (id) => {
    setPhotos((prevPhotos) =>
      prevPhotos.map((photo) =>
        photo.id === id ? { ...photo, isFav: !photo.isFav } : photo
      )
    );

    // Update `selectedPhoto` if it matches the toggled photo
    if (selectedPhoto && selectedPhoto.id === id) {
      setSelectedPhoto((prev) => ({
        ...prev,
        isFav: !prev.isFav,
      }));
    }

    // Update `similarPhotos` dynamically
    if (selectedPhoto) {
      const updatedSimilarPhotos = photos
        .filter((p) => p.id !== selectedPhoto.id && p.topic === selectedPhoto.topic)
        .map((photo) =>
          photo.id === id ? { ...photo, isFav: !photo.isFav } : photo
        );
      setSimilarPhotos(updatedSimilarPhotos);
    }
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

















