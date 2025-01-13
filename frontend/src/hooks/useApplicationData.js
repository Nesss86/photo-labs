import { useState } from "react";
import photosData from "../mocks/photos"; // Import initial data
import topicsData from "../mocks/topics"; // Import initial data

const useApplicationData = () => {
  // State Management
  const [state, setState] = useState({
    photos: photosData,
    topics: topicsData,
    selectedPhoto: null,
    similarPhotos: [],
  });

  // Load Topics (Example Functionality)
  const onLoadTopic = (topic) => {
    const filteredPhotos = photosData.filter((photo) => photo.topic === topic);
    setState((prev) => ({ ...prev, photos: filteredPhotos }));
  };

  // Update Favorite Photos
  const updateToFavPhotoIds = (id) => {
    setState((prev) => {
      // Update photos
      const updatedPhotos = prev.photos.map((photo) =>
        photo.id === id ? { ...photo, isFav: !photo.isFav } : photo
      );

      // Update selectedPhoto if applicable
      const updatedSelectedPhoto =
        prev.selectedPhoto?.id === id
          ? { ...prev.selectedPhoto, isFav: !prev.selectedPhoto.isFav }
          : prev.selectedPhoto;

      // Update similarPhotos dynamically
      const updatedSimilarPhotos = prev.similarPhotos.map((photo) =>
        photo.id === id ? { ...photo, isFav: !photo.isFav } : photo
      );

      return {
        ...prev,
        photos: updatedPhotos,
        selectedPhoto: updatedSelectedPhoto,
        similarPhotos: updatedSimilarPhotos,
      };
    });
  };

  // Open Photo Details Modal
  const onPhotoSelect = (photo) => {
    const similarPhotos = state.photos.filter(
      (p) => p.id !== photo.id && p.topic === photo.topic
    );
    setState((prev) => ({
      ...prev,
      selectedPhoto: photo,
      similarPhotos,
    }));
  };

  // Close Photo Details Modal
  const onClosePhotoDetailsModal = () => {
    setState((prev) => ({
      ...prev,
      selectedPhoto: null,
      similarPhotos: [],
    }));
  };

  // Return the state and actions
  return {
    state,
    onPhotoSelect,
    updateToFavPhotoIds,
    onLoadTopic,
    onClosePhotoDetailsModal,
  };
};

export default useApplicationData;


