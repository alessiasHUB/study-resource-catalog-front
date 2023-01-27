import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { url } from "../utils/url";

import {
  ILikesData,
  IResourceData,
  IStudyListData,
  IUserData,
  ITypes,
} from "../utils/interfaces";
import Resource from "./Resource";
import { Link } from "react-router-dom";
import { tagsArr } from "../utils/tags";
import { typesArr } from "../utils/types";

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
  const [userLikes, setUserLikes] = useState<ILikesData[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [selectedTypesArr, setSelectedTypesArr] = useState<string[]>([]);
  const [selectedTagsArr, setSelectedTagsArr] = useState<string[]>([]);
  //---------------------------------------------------------------Code body
  const fetchAndStoreResources = useCallback(async () => {
    const response = await axios.get(`${url}/resources`);
    const resourceData: IResourceData[] = response.data;
    setResources(resourceData);
  }, []);

  const getSignedInUserLikes = useCallback(async () => {
    if (signedInUser) {
      const response = await axios.get(`${url}/likes/${signedInUser.id}`);
      const resourceData: ILikesData[] = response.data;
      setUserLikes(resourceData);
    }
  }, [signedInUser]);

  useEffect(() => {
    fetchAndStoreResources();
    getSignedInUserLikes();
  }, [fetchAndStoreResources, getSignedInUserLikes]);

  const handleCheckedTypeBox = (resourceType: string) => {
    if (selectedTypesArr.includes(resourceType)) {
      setSelectedTypesArr(selectedTypesArr.filter((el) => el !== resourceType));
    } else {
      setSelectedTypesArr((prev) => {
        return [...prev, resourceType];
      });
    }
  };

  console.log("SELECTED TYPES", selectedTypesArr)

  const handleCheckedTagsBox = (tag: string) => {
    if (selectedTagsArr.includes(tag)) {
      setSelectedTagsArr(selectedTagsArr.filter((el) => el !== tag));
    } else {
      setSelectedTagsArr((prev) => {
        return [...prev, tag];
      });
    }
  };

  return (
    <>
      <div className="ctn-catalog-page-left">
        <input
          className="catalog-search-input"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="search here..."
        ></input>

        <div className="ctn-filter-by-type">
          <h3> FILTER BY TYPE...</h3>
          {typesArr.map((type) => {
            return (
              <div key={type} className="nav-box">
                <input
                  type="checkbox"
                  id="checkbox"
                  value={type}
                  onChange={() => handleCheckedTypeBox(type)}
                />
                <label htmlFor="checkbox">{type}</label>
              </div>
            );
          })}
        </div>
        <div className="ctn-filter-by-tags">
          <h3> FILTER BY TAG...</h3>
          {tagsArr.map((tag) => {
            return (
              <div key={tag}>
                <input
                  type="checkbox"
                  id="checkbox"
                  value={tag}
                  onChange={() => handleCheckedTagsBox(tag)}
                />
                <label htmlFor="checkbox">{tag}</label>
              </div>
            );
          })}
        </div>
      </div>

      <div className="ctn-catalog-page-right">
        {signedInUser && (
          <Link to="/add_resource" className="add-resource-btn">
            Add new resource
          </Link>
        )}

        {/* <div className="ctn-resource-usage-key">
          <p> Used and recommended = 🌟</p>
          <p> Not used but recommended = 🔎</p>
          <p>Not recommended = 💩</p>
        </div> */}
        {signedInUser && (
          <Link to="/add_resource"> ADD RESOURCE YOU PLEB </Link>
        )}
        {resources.length > 0 &&
          filterResources(
            searchInput,
            selectedTypesArr,
            selectedTagsArr,
            resources
          ).map((resource) => {
            return (
              <Resource
                resourceData={resource}
                signedInUser={signedInUser}
                getSignedInUserLikes={getSignedInUserLikes}
                fetchAndStoreResources={fetchAndStoreResources}
                key={resource.id}
                allUsers={allUsers}
                studyListArr={studyListArr}
                userLikes={userLikes}
              />
            );
          })}
      </div>
    </>
  );
}

export default CatalogPage;
