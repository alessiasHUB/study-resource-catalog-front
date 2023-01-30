import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import CatalogPage from "./components/CatalogPage";
import SignInPage from "./components/SignInPage";
import NavBar from "./components/NavBar";
import StudyListPage from "./components/StudyListPage";
import axios from "axios";
import { IStudyListData, IUserData } from "./utils/interfaces";
import { useCallback, useEffect, useState } from "react";
import { url } from "./utils/url";
import "./App.css";
import AddResourcePage from "./components/AddResourcePage";

function App() {
  const [users, setUsers] = useState<IUserData[]>([]);
  const [signedInUser, setSignedInUser] = useState<IUserData | undefined>();
  const [studyListArr, setStudyListArr] = useState<IStudyListData[]>([]);

  //---------------------------------------------------- get all user data
  const fetchAndStoreUsers = useCallback(async () => {
    const response = await axios.get(`${url}/users`);
    let userData: IUserData[] = response.data;
    console.log(userData);
    setUsers(userData);
  }, []);

  //---------------------------------------------------- get study list for a specific user
  const getStudyListForUser = useCallback(async () => {
    if (signedInUser) {
      const response = await axios.get(`${url}/study_list/${signedInUser.id}`);
      let studyListData: IStudyListData[] = response.data;
      setStudyListArr(studyListData);
    }
  }, [signedInUser]);
  console.log("i am study list", studyListArr);

  useEffect(() => {
    fetchAndStoreUsers();
    getStudyListForUser();
  }, [fetchAndStoreUsers, getStudyListForUser]);

  console.log("signedIn user", signedInUser);
  return (
    <div className="App">
      <NavBar signedInUser={signedInUser?.username} />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/catalog"
          element={
            <CatalogPage
              allUsers={users}
              signedInUser={signedInUser}
              studyListArr={studyListArr}
            />
          }
        />

        <Route
          path="/signIn"
          element={
            <SignInPage userData={users} setSignedInUser={setSignedInUser} />
          }
        />
        {signedInUser && (
          <Route
            path="/study_list"
            element={<StudyListPage signedInUser={signedInUser} />}
          />
        )}
        <Route
          path="/add_resource"
          element={<AddResourcePage signedInUser={signedInUser} />}
        />
      </Routes>
    </div>
  );
}

export default App;
