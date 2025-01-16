import React from "react";
import useApplicationData from "./hooks/useApplicationData";
import HomeRoute from "./routes/HomeRoute";
import PhotoDetailsModal from "./routes/PhotoDetailsModal";
import TopNavigationBar from "./components/TopNavigationBar";
import "./App.scss";

const App = () => {
  const {
    state, // Contains photos, topics, selectedPhoto, and similarPhotos
    updateToFavPhotoIds, // Toggles favorite status for a photo
    onPhotoSelect, // Sets the selected photo for the modal
    onClosePhotoDetailsModal, // Closes the modal
    onLoadTopic, // Loads photos for a selected topic
  } = useApplicationData();

  // Check if any photos are marked as favorites
  const hasFavs = state.photos.some((photo) => photo.isFav);

  return (
    <div className="App">
      {/* Top navigation bar with topics and favorite badge */}
      <TopNavigationBar
        topics={state.topics}
        hasFavs={hasFavs}
        onLoadTopic={onLoadTopic}
      />

      {/* Main photo gallery */}
      <HomeRoute
        photos={state.photos}
        onToggleFav={updateToFavPhotoIds}
        onPhotoClick={onPhotoSelect}
      />

      {/* Photo details modal */}
      {state.selectedPhoto && (
        <PhotoDetailsModal
          photo={state.selectedPhoto}
          similarPhotos={state.similarPhotos}
          onClose={onClosePhotoDetailsModal}
          onToggleFav={updateToFavPhotoIds}
        />
      )}
    </div>
  );
};

export default App;






























