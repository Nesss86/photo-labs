import React, { useState } from "react";
import PhotoList from "./components/PhotoList";
import TopicList from "./components/TopicList";
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

const topics = ["Nature", "Cities", "Portraits"]; // Define the topics array

const App = () => {
  const [activeTopic, setActiveTopic] = useState(null); // Manage active topic state

  return (
    <div className="App">
      {/* Pass topics and active topic to TopicList */}
      <TopicList
        topics={topics}
        activeTopic={activeTopic}
        onTopicClick={(topic) => setActiveTopic(topic)}
      />
      <PhotoList photos={photos} />
    </div>
  );
};

export default App;




