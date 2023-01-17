import React from "react";
import logo from "./logo.svg";
import "./App.css";
import AppHeader from "./AppHeader";
import HomePage from "./components/HomePage";
import MainContent from "./components/MainContent";

function App() {
  return (
    <div className="App">
      <AppHeader />
      <MainContent />
    </div>
  );
}

export default App;
