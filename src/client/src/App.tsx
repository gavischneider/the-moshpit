import React from "react";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { Newsfeed } from "./components/Newsfeed";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Sidebar />
      <Newsfeed />
    </div>
  );
}

export default App;
