import HomePage from "./HomePage";
import CatalogPage from "./CatalogPage";
import { Route, Routes } from "react-router-dom";
import SignInPage from "./SignInPage";
import axios from "axios";

function MainContent(): JSX.Element {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://study-resource-catalog.onrender.com/"
      : "http://localhost:4000";

  //   const fetchAndStoreUsers = async () => {
  //       const response = await axios.get(`${baseUrl}/users`)
  //       const userData = response.data.data
  //       const userArr = []
  //   };
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/catalog" element={<CatalogPage />} />

        <Route path="/signIn" element={<SignInPage />} />
      </Routes>
    </div>
  );
}

export default MainContent;
