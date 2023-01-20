import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { url } from "../utils/url";
import { IResourceData } from "../utils/interfaces";
import Resource from "./Resource";
//get all resources
//useState and interface for resources
//map over all resources

function CatalogPage(): JSX.Element {
  const [resources, setResources] = useState<IResourceData[]>([]);

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
      <div className="ctn-resource-usage-key">
        <p> Used and recommended = 🌟</p>
        <p> Not used but recommended = 🔎</p>
        <p>Not recommended = 💩</p>
      </div>
      {resources.length > 0 &&
        resources.map((resource) => {
          return <Resource resourceData={resource} key={resource.id} />;
        })}
    </>
  );
}

export default CatalogPage;
