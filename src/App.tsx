import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import CatalogPage from "./components/CatalogPage";
import SignInPage from "./components/SignInPage";
import NavBar from "./components/NavBar";
import StudyListPage from "./components/StudyListPage";
import axios from "axios";
import { IUserData } from "./utils/interfaces";
import { useCallback, useEffect, useState } from "react";
import { url } from "./utils/url";
import "./App.css";

function App() {
  const [users, setUsers] = useState<IUserData[]>([]);
  const [signedInUser, setSignedInUser] = useState<string | undefined>();

  const fetchAndStoreUsers = useCallback(async () => {
    const response = await axios.get(`${url}/users`);
    let userData: IUserData[] = response.data;
    console.log(userData);
    setUsers(userData);
  }, []);

  useEffect(() => {
    fetchAndStoreUsers();
  }, [fetchAndStoreUsers]);
  return (
    <div className="App">
      <NavBar signedInUser={signedInUser} />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/catalog" element={<CatalogPage />} />

        <Route
          path="/signIn"
          element={
            <SignInPage userData={users} setSignedInUser={setSignedInUser} />
          }
        />
        <Route path="/study_list" element={<StudyListPage />} />
      </Routes>
    </div>
  );
}

export default App;
