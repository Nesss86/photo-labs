import { useReducer } from "react";
import photosData from "../mocks/photos";
import topicsData from "../mocks/topics";

// Initial State
const initialState = {
  photos: photosData,
  topics: topicsData,
  selectedPhoto: null,
  similarPhotos: [],
};

// Reducer Function
const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_FAV":
      return {
        ...state,
        photos: state.photos.map((photo) =>
          photo.id === action.id ? { ...photo, isFav: !photo.isFav } : photo
        ),
        selectedPhoto:
          state.selectedPhoto?.id === action.id
            ? { ...state.selectedPhoto, isFav: !state.selectedPhoto.isFav }
            : state.selectedPhoto,
        similarPhotos: state.similarPhotos.map((photo) =>
          photo.id === action.id ? { ...photo, isFav: !photo.isFav } : photo
        ),
      };

    case "SELECT_PHOTO":
      return {
        ...state,
        selectedPhoto: action.photo,
        similarPhotos: state.photos.filter(
          (p) => p.id !== action.photo.id && p.topic === action.photo.topic
        ),
      };

    case "CLOSE_MODAL":
      return {
        ...state,
        selectedPhoto: null,
        similarPhotos: [],
      };

    case "LOAD_TOPIC":
      return {
        ...state,
        photos: action.filteredPhotos,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

// Custom Hook
const useApplicationData = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Action to toggle favorite
  const updateToFavPhotoIds = (id) => {
    dispatch({ type: "TOGGLE_FAV", id });
  };

  // Action to select a photo
  const onPhotoSelect = (photo) => {
    dispatch({ type: "SELECT_PHOTO", photo });
  };

  // Action to close the modal
  const onClosePhotoDetailsModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  // Action to load a topic
  const onLoadTopic = (topic) => {
    const filteredPhotos = photosData.filter((photo) => photo.topic === topic);
    dispatch({ type: "LOAD_TOPIC", filteredPhotos });
  };

  return {
    state,
    updateToFavPhotoIds,
    onPhotoSelect,
    onClosePhotoDetailsModal,
    onLoadTopic,
  };
};

export default useApplicationData;



