import HomePage from "./HomePage";
import CatalogPage from "./CatalogPage";
import { Route, Routes } from "react-router-dom";
import SignInPage from "./SignInPage";
import axios from "axios";
import { userData } from "../utils/interfaces";
import { useCallback, useEffect, useState } from "react";
import { url } from "../utils/url";

function MainContent(): JSX.Element {
  const [users, setUsers] = useState<userData[]>([]);
  const [signedInUser, setSignedInUser] = useState<string | undefined>();
  //signedinuser to be used in top corner of navbar after it has been assigned ---> may need to pass this state from App down to SigninPage instead***

  const fetchAndStoreUsers = useCallback(async () => {
    const response = await axios.get(`${url}/users`);
    let userData: userData[] = response.data;
    console.log(userData);
    setUsers(userData);
  }, []);

  useEffect(() => {
    fetchAndStoreUsers();
  }, [fetchAndStoreUsers]);

  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/catalog" element={<CatalogPage />} />

          <Route
            path="/signIn"
            element={
              <SignInPage userData={users} setSignedInUser={setSignedInUser} />
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default MainContent;