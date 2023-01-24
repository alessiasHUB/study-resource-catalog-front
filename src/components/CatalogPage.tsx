import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { url } from "../utils/url";
import { IResourceData, IStudyListData, IUserData } from "../utils/interfaces";
import Resource from "./Resource";
import { Link } from "react-router-dom";

import "./CatalogPage.css";
import { filterResources } from "../utils/filterResources";

interface CatalogPageProps {
  signedInUser: IUserData | undefined;
  allUsers: IUserData[];
  studyListArr: IStudyListData[];
}

function CatalogPage({
  signedInUser,
  allUsers,
  studyListArr,
}: CatalogPageProps): JSX.Element {
  const [resources, setResources] = useState<IResourceData[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");

  const fetchAndStoreResources = useCallback(async () => {
    const response = await axios.get(`${url}/resources`);
    const resourceData: IResourceData[] = response.data;
    setResources(resourceData);
  }, []);

  useEffect(() => {
    fetchAndStoreResources();
  }, [fetchAndStoreResources]);

  return (
    <>

      <div className="ctn-catalog-page-left">
        <input
          className="catalog-search-input"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="search here..."
        ></input>
      </div>

      <div className="ctn-catalog-page-right">
        {signedInUser && (
          <Link to="/add_resource" className="add-resource-btn">
            Add new resource
          </Link>
        )}

        <div className="ctn-resource-usage-key">
          <p> Used and recommended = 🌟</p>
          <p> Not used but recommended = 🔎</p>
          <p>Not recommended = 💩</p>
        </div>
        {signedInUser && <Link to="/add_resource"> ADD RESOURCE YOU PLEB </Link>}
        {resources.length > 0 &&
          filterResources(searchInput, resources).map((resource) => {
            return (
              <Resource
                resourceData={resource}
                signedInUser={signedInUser}
                fetchAndStoreResources={fetchAndStoreResources}
                key={resource.id}
                allUsers={allUsers}
              studyListArr={studyListArr}
              />
            );
          })}
      </div>
    </>
  );
}

export default CatalogPage;
