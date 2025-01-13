import React from "react";
import useApplicationData from "./hooks/useApplicationData";
import HomeRoute from "./routes/HomeRoute";
import PhotoDetailsModal from "./routes/PhotoDetailsModal";
import TopNavigationBar from "./components/TopNavigationBar";
import "./App.scss";

const App = () => {
  const {
    state,
    onPhotoSelect,
    updateToFavPhotoIds,
    onLoadTopic,
    onClosePhotoDetailsModal,
  } = useApplicationData();

  return (
    <div className="App">
      <TopNavigationBar
        topics={state.topics}
        hasFavs={state.photos.some((photo) => photo.isFav)}
        onLoadTopic={onLoadTopic}
      />
      <HomeRoute
        topics={state.topics}
        photos={state.photos}
        onPhotoClick={onPhotoSelect}
        onToggleFav={updateToFavPhotoIds}
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


















