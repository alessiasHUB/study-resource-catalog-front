import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { url } from "../utils/url";
import { IResourceData } from "../utils/interfaces";
import Resource from "./Resource";
import { Link } from "react-router-dom";
//get all resources
//useState and interface for resources
//map over all resources

function CatalogPage(): JSX.Element {
  const [resources, setResources] = useState<IResourceData[]>([]);

  const fetchAndStoreResources = useCallback(async () => {
    const response = await axios.get(`${url}/resources`);
    const resourceData: IResourceData[] = response.data;
    console.log("i am resource data", resourceData);
    setResources(resourceData);
  }, []);

  console.log("i am resource a piece of state outside useEffect", resources);
  useEffect(() => {
    fetchAndStoreResources();
  }, [fetchAndStoreResources]);

  return (
    <>
      <Link to="/add_resource"> ADD RESOURCE YOU PLEB </Link>
      {resources.length > 0 &&
        resources.map((resource) => {
          return <Resource resourceData={resource} />;
        })}
    </>
  );
}

export default CatalogPage;
