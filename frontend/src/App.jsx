import React from "react";
import PhotoList from "./components/PhotoList";
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

const App = () => {
  return (
    <div className="App">
      <PhotoList photos={photos} />
    </div>
  );
};

export default App;


