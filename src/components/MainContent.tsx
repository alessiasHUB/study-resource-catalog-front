import HomePage from "./HomePage";
import CatalogPage from "./CatalogPage";
import { Route, Routes } from "react-router-dom";
import SignInPage from "./SignInPage";

function MainContent(): JSX.Element {
  const fetchAndStoreUsers = async () => {
    // axios.get
  };
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
