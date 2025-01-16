import { useReducer, useEffect } from "react";
import axios from "axios";

const ACTIONS = {
  SET_PHOTO_DATA: "SET_PHOTO_DATA",
  SET_TOPICS: "SET_TOPICS",
  LOAD_TOPIC_PHOTOS: "LOAD_TOPIC_PHOTOS",
  TOGGLE_FAV: "TOGGLE_FAV",
  SELECT_PHOTO: "SELECT_PHOTO",
  CLOSE_MODAL: "CLOSE_MODAL",
};

const initialState = {
  photos: [],
  topics: [],
  selectedPhoto: null,
  similarPhotos: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_PHOTO_DATA:
      return { ...state, photos: action.payload.photos };

    case ACTIONS.SET_TOPICS:
      return { ...state, topics: action.payload.topics };

    case ACTIONS.LOAD_TOPIC_PHOTOS:
      return { ...state, photos: action.payload.photos };

    case ACTIONS.TOGGLE_FAV:
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
      return { ...state, selectedPhoto: null, similarPhotos: [] };

    default:
      console.error(`Unhandled action type: ${action.type}`);
      return state;
  }
};

const useApplicationData = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // Fetch initial photo data
    const fetchPhotos = axios
      .get("/api/photos")
      .then((res) => {
        dispatch({ type: ACTIONS.SET_PHOTO_DATA, payload: { photos: res.data } });
      })
      .catch((err) => {
        console.error("Error fetching photos:", err.message);
      });

    // Fetch topics data
    const fetchTopics = axios
      .get("/api/topics")
      .then((res) => {
        dispatch({ type: ACTIONS.SET_TOPICS, payload: { topics: res.data } });
      })
      .catch((err) => {
        console.error("Error fetching topics:", err.message);
      });

    Promise.all([fetchPhotos, fetchTopics]).catch((err) =>
      console.error("Error loading initial data:", err.message)
    );
  }, []);

  const updateToFavPhotoIds = (id) => {
    dispatch({ type: ACTIONS.TOGGLE_FAV, id });
  };

  const onPhotoSelect = (photoId) => {
    dispatch({ type: ACTIONS.SELECT_PHOTO, photoId });
  };

  const onClosePhotoDetailsModal = () => {
    dispatch({ type: ACTIONS.CLOSE_MODAL });
  };

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




