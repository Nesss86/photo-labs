import React, { useState } from "react";
import HomeRoute from "./routes/HomeRoute"; // Import the HomeRoute component
import "./App.scss";

const topics = ["Nature", "Cities", "People"]; // Example topics

const initialPhotos = new Array(3).fill(null).map((_, index) => ({
  id: `${index + 1}`,
  location: {
    city: ["Montreal", "Toronto", "Vancouver"][index],
    country: "Canada",
  },
  imageSource: `${process.env.PUBLIC_URL}/Image-${index + 1}-Regular.jpeg`,
  username: ["Joe Example", "Jane Doe", "Sam Smith"][index],
  profile: `${process.env.PUBLIC_URL}/profile-${index + 1}.jpg`,
  isFav: false, // Add a property to track if the photo is favorited
}));

const App = () => {
  const [photos, setPhotos] = useState(initialPhotos);

  // Calculate favorite count based on the photos array
  const favCount = photos.filter((photo) => photo.isFav).length;

  // Toggle favorite status of a photo
  const toggleFav = (id) => {
    setPhotos((prevPhotos) =>
      prevPhotos.map((photo) =>
        photo.id === id ? { ...photo, isFav: !photo.isFav } : photo
      )
    );
  };

  return (
    <div className="App">
      {/* Use HomeRoute and pass necessary props */}
      <HomeRoute topics={topics} photos={photos} favCount={favCount} onToggleFav={toggleFav} />
    </div>
  );
};

export default App;










