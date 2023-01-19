import HomePage from "./HomePage";
import CatalogPage from "./CatalogPage";
import { Route, Routes } from "react-router-dom";
import SignInPage from "./SignInPage";
import axios from "axios";
import { IUserData } from "../utils/interfaces";
import { useCallback, useEffect, useState } from "react";
import { url } from "../utils/url";

function MainContent(): JSX.Element {
  const [users, setUsers] = useState<IUserData[]>([]);
  const [signedInUser, setSignedInUser] = useState<string | undefined>();
  //signedinuser to be used in top corner of navbar after it has been assigned ---> may need to pass this state from App down to SigninPage instead***

  const fetchAndStoreUsers = useCallback(async () => {
    const response = await axios.get(`${url}/users`);
    let IUserData: IUserData[] = response.data;
    console.log(IUserData);
    setUsers(IUserData);
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
              <SignInPage IUserData={users} setSignedInUser={setSignedInUser} />
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default MainContent;
