import React from "react";
import PhotoListItem from "./components/PhotoListItem";
import "./App.scss";

const photos = new Array(3).fill(null).map((_, index) => ({
  id: `${index + 1}`,
  location: {
    city: ["Montreal", "Toronto", "Vancouver"][index],
    country: "Canada",
  },
  imageSource: `${process.env.PUBLIC_URL}/Image-${index + 1}-Regular.jpeg`,
  username: ["Joe Example", "Jane Doe", "Sam Smith"][index],
  profile: `${process.env.PUBLIC_URL}/profile-${index + 1}.jpg`,
}));

// Note: Rendering a single component to build components in isolation
const App = () => {
  return (
    <div className="App">
      {/*Pass sample data as props*/}
      {photos.map((photo) => (
      <PhotoListItem
      key={photo.id}
      id={photo.id}
      location={photo.location}
      imageSource={photo.imageSource}
      username={photo.username}
      profile={photo.profile}
      />
    ))}
    </div>
  );
};

export default App;
