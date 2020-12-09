import React from "react";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { Newsfeed } from "./components/Newsfeed";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Newsfeed />
    </div>
  );
}

export default App;
