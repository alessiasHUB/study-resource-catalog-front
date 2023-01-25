import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { url } from "../utils/url";
import { IResourceData, ITypes, IUserData } from "../utils/interfaces";
import Resource from "./Resource";
import { Link } from "react-router-dom";
import { tagsArr } from "../utils/tags";
import { ResourceType, typesArr } from "../utils/types";

import "./CatalogPage.css";
import { filterResources } from "../utils/filterResources";

interface CatalogPageProps {
  signedInUser: IUserData | undefined;
}

function CatalogPage({ signedInUser }: CatalogPageProps): JSX.Element {
  //-----------------------------------------------------------------STATES
  const [resources, setResources] = useState<IResourceData[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [selectedTypesObj, setSelectedTypesObj] = useState<ITypes>({
    video: false,
    article: false,
    eBook: false,
    podcast: false,
    exercise: false,
    exercise_set: false,
    software_tool: false,
    course: false,
    diagram: false,
    cheat_sheet: false,
    reference: false,
    resource_list: false,
    youtube_channel: false,
    organisation: false,
  });
  const [selectedTagsArr, setSelectedTagsArr]= useState<string[]>([])
//---------------------------------------------------------------Code body
  const fetchAndStoreResources = useCallback(async () => {
    const response = await axios.get(`${url}/resources`);
    const resourceData: IResourceData[] = response.data;
    setResources(resourceData);
  }, []);

  useEffect(() => {
    fetchAndStoreResources();
  }, [fetchAndStoreResources]);

  const handleCheckedTypeBox = (resourcetype: ResourceType) => {
    setSelectedTypesObj((prev) => {
      //return an update of setSelectedTypesObj where the key (type) in question is switched from true --> false (or vice versa)
      // take the obj that denotes which types have been selected and update another key value pair where the key is the resourceType and the valu
      return { ...prev, [resourcetype]: !prev[resourcetype] };
    });
  };
  
  const handleCheckedTagsBox = (tag: string) => {
    if(selectedTagsArr.includes(tag)){
      setSelectedTagsArr(selectedTagsArr.filter((el) => el !== tag)) 
    } else{
      setSelectedTagsArr((prev) => {
        return ([...prev, tag])
      }
    )}
  }

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
              <div key={type}>
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
                <div key={tag} > 
                <input 
                  type="checkbox"
                  id="checkbox" 
                  value={tag} 
                  onChange={() => handleCheckedTagsBox(tag)}
                  />
                  <label htmlFor="checkbox">{tag}</label>
                </div>
              )
            })

            }
        </div>
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
        {resources.length > 0 &&
          filterResources(searchInput, selectedTypesObj, selectedTagsArr, resources).map(
            (resource) => {
              return (
                <Resource
                  resourceData={resource}
                  signedInUser={signedInUser}
                  fetchAndStoreResources={fetchAndStoreResources}
                  key={resource.id}
                />
              );
            }
          )}
      </div>
      <div>

      </div>
    </>
  );
}

export default CatalogPage;
