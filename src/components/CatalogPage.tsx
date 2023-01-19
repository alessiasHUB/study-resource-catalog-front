import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { url } from "../utils/url";
import { IResourceData } from "../utils/interfaces";
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
  }, [url]);

  console.log("i am resource a piece of state outside useEffect", resources);
  useEffect(() => {
    fetchAndStoreResources();
  }, [fetchAndStoreResources]);

  return <> Catalog Page </>;
}

export default CatalogPage;
