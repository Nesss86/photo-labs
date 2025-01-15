import React from "react";
import useApplicationData from "./hooks/useApplicationData";
import HomeRoute from "./routes/HomeRoute";
import PhotoDetailsModal from "./routes/PhotoDetailsModal";
import TopNavigationBar from "./components/TopNavigationBar";
import "./App.scss";

const App = () => {
  const {
    state,
    updateToFavPhotoIds,
    onPhotoSelect,
    onClosePhotoDetailsModal,
    onLoadTopic,
  } = useApplicationData();

  const hasFavs = state.photos.some((photo) => photo.isFav);

  return (
    <div className="App">
      <TopNavigationBar
        topics={state.topics}
        hasFavs={hasFavs} // Pass favorite status to FavBadge
        onLoadTopic={onLoadTopic}
      />
      <HomeRoute
        photos={state.photos}
        onToggleFav={updateToFavPhotoIds}
        onPhotoClick={onPhotoSelect}
      />
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




























