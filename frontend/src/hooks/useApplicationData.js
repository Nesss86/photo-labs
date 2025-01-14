import { useReducer } from "react";
import photosData from "../mocks/photos";
import topicsData from "../mocks/topics";

// Action Types
const TOGGLE_FAV = "TOGGLE_FAV";
const SELECT_PHOTO = "SELECT_PHOTO";
const CLOSE_MODAL = "CLOSE_MODAL";
const LOAD_TOPIC = "LOAD_TOPIC";

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
    case TOGGLE_FAV:
      const updatedPhotos = state.photos.map((photo) =>
        photo.id === action.id ? { ...photo, isFav: !photo.isFav } : photo
      );

      return {
        ...state,
        photos: updatedPhotos,
        selectedPhoto: state.selectedPhoto
          ? updatedPhotos.find((photo) => photo.id === state.selectedPhoto.id)
          : null,
        similarPhotos: state.similarPhotos.map((photo) =>
          updatedPhotos.find((p) => p.id === photo.id)
        ),
      };

    case SELECT_PHOTO:
      return {
        ...state,
        selectedPhoto: action.photo,
        similarPhotos: state.photos.filter(
          (p) => p.id !== action.photo.id && p.topic === action.photo.topic
        ),
      };

    case CLOSE_MODAL:
      return {
        ...state,
        selectedPhoto: null,
        similarPhotos: [],
      };

    case LOAD_TOPIC:
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

  const updateToFavPhotoIds = (id) => {
    dispatch({ type: TOGGLE_FAV, id });
  };

  const onPhotoSelect = (photo) => {
    dispatch({ type: SELECT_PHOTO, photo });
  };

  const onClosePhotoDetailsModal = () => {
    dispatch({ type: CLOSE_MODAL });
  };

  const onLoadTopic = (topic) => {
    const filteredPhotos = photosData.filter((photo) => photo.topic === topic);
    dispatch({ type: LOAD_TOPIC, filteredPhotos });
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




