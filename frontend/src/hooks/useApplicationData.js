import { useReducer, useEffect } from "react";
import axios from "axios";

// Action types for reducer
const ACTIONS = {
  SET_PHOTO_DATA: "SET_PHOTO_DATA",
  SET_TOPICS: "SET_TOPICS",
  LOAD_TOPIC_PHOTOS: "LOAD_TOPIC_PHOTOS",
  TOGGLE_FAV: "TOGGLE_FAV",
  SELECT_PHOTO: "SELECT_PHOTO",
  CLOSE_MODAL: "CLOSE_MODAL",
};

// Initial state for the reducer
const initialState = {
  photos: [], // List of all photos
  topics: [], // List of topics
  selectedPhoto: null, // Photo currently being viewed in detail
  similarPhotos: [], // Photos related to the selected photo
};

// Reducer function to manage state updates
const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_PHOTO_DATA:
      // Update state with the fetched photo data
      return { ...state, photos: action.payload.photos };

    case ACTIONS.SET_TOPICS:
      // Update state with the fetched topics
      return { ...state, topics: action.payload.topics };

    case ACTIONS.LOAD_TOPIC_PHOTOS:
      // Replace photos with those matching the selected topic
      return { ...state, photos: action.payload.photos };

    case ACTIONS.TOGGLE_FAV:
      // Toggle favorite status for a photo in all relevant arrays
      const updatedPhotos = state.photos.map((photo) =>
        photo.id === action.id ? { ...photo, isFav: !photo.isFav } : photo
      );

      const updatedSelectedPhoto =
        state.selectedPhoto?.id === action.id
          ? { ...state.selectedPhoto, isFav: !state.selectedPhoto.isFav }
          : state.selectedPhoto;

      const updatedSimilarPhotos = state.similarPhotos.map((photo) =>
        photo.id === action.id ? { ...photo, isFav: !photo.isFav } : photo
      );

      return {
        ...state,
        photos: updatedPhotos,
        selectedPhoto: updatedSelectedPhoto,
        similarPhotos: updatedSimilarPhotos,
      };

    case ACTIONS.SELECT_PHOTO:
      // Set the selected photo and its similar photos
      const selectedPhoto = state.photos.find((p) => p.id === action.photoId);
      const similarPhotos = state.photos.filter(
        (p) => p.topic === selectedPhoto.topic && p.id !== selectedPhoto.id
      );

      return {
        ...state,
        selectedPhoto,
        similarPhotos,
      };

    case ACTIONS.CLOSE_MODAL:
      // Clear the selected photo and similar photos
      return { ...state, selectedPhoto: null, similarPhotos: [] };

    default:
      console.error(`Unhandled action type: ${action.type}`);
      return state;
  }
};

// Hook to manage application data and state
const useApplicationData = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Fetch initial data when the component mounts
  useEffect(() => {
    const fetchPhotos = axios
      .get("/api/photos")
      .then((res) => {
        dispatch({ type: ACTIONS.SET_PHOTO_DATA, payload: { photos: res.data } });
      })
      .catch((err) => {
        console.error("Error fetching photos:", err.message);
      });

    const fetchTopics = axios
      .get("/api/topics")
      .then((res) => {
        dispatch({ type: ACTIONS.SET_TOPICS, payload: { topics: res.data } });
      })
      .catch((err) => {
        console.error("Error fetching topics:", err.message);
      });

    // Ensure both requests resolve
    Promise.all([fetchPhotos, fetchTopics]).catch((err) =>
      console.error("Error loading initial data:", err.message)
    );
  }, []);

  // Toggle favorite status for a photo
  const updateToFavPhotoIds = (id) => {
    dispatch({ type: ACTIONS.TOGGLE_FAV, id });
  };

  // Select a photo to view in detail
  const onPhotoSelect = (photoId) => {
    dispatch({ type: ACTIONS.SELECT_PHOTO, photoId });
  };

  // Close the photo details modal
  const onClosePhotoDetailsModal = () => {
    dispatch({ type: ACTIONS.CLOSE_MODAL });
  };

  // Load photos for a selected topic
  const onLoadTopic = (topic) => {
    if (!topic || !topic.id) {
      console.error("Invalid topic object passed to onLoadTopic:", topic);
      return;
    }

    axios
      .get(`/api/topics/photos/${topic.id}`)
      .then((res) => {
        dispatch({
          type: ACTIONS.LOAD_TOPIC_PHOTOS,
          payload: { photos: res.data },
        });
      })
      .catch((err) => {
        console.error(`Error fetching photos for topic ${topic.id}:`, err.message);
      });
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





