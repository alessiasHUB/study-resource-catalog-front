import HomePage from "./HomePage";
import CatalogPage from "./CatalogPage";
import { Route, Routes } from "react-router-dom";
import SignInPage from "./SignInPage";
import axios from "axios";
import { userData } from "../utils/interfaces";
import { useState } from "react";

function MainContent(): JSX.Element {
  const [users, setUsers] = useState<string[]>([])
  const url =
    process.env.NODE_ENV === "production"
      ? "https://study-resource-catalog.onrender.com/"
      : "http://localhost:4000";

  const fetchAndStoreUsers = async () => {
    const response = await axios.get(`${url}/users`)
    let userData: userData[] = response.data
    let usernames: string[] = userData.map((data: { username: any; }) => {
      return data.username
    })
    console.log(usernames)
    setUsers(usernames)
  };

  return (
    <>
      <button onClick={fetchAndStoreUsers}>get stuff</button>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/catalog" element={<CatalogPage />} />

          <Route path="/signIn" element={<SignInPage usernames={users}/>} />
        </Routes>
      </div>
    </>
  );
}

export default MainContent;
