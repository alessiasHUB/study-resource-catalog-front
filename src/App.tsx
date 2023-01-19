import React from "react";
import HomePage from "./components/HomePage";
import CatalogPage from "./components/CatalogPage";
import { Route, Routes } from "react-router-dom";
import SignInPage from "./components/SignInPage";
import axios from "axios";
import { IUserData } from "./utils/interfaces";
import { useCallback, useEffect, useState } from "react";
import { url } from "./utils/url";
import "./App.css";
import NavBar from "./components/NavBar";

function App() {
  const [users, setUsers] = useState<IUserData[]>([]);
  const [signedInUser, setSignedInUser] = useState<string | undefined>();
  //signedinuser to be used in top corner of navbar after it has been assigned ---> may need to pass this state from App down to SigninPage instead***

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
            <SignInPage IUserData={users} setSignedInUser={setSignedInUser} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
