import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { url } from "../utils/url";
import { IResourceData, IUserData } from "../utils/interfaces";
import Resource from "./Resource";
import { Link } from "react-router-dom";
//get all resources
//useState and interface for resources
//map over all resources

interface CatalogPageProps {
  signedInUser: IUserData | undefined;
}

function CatalogPage({ signedInUser }: CatalogPageProps): JSX.Element {
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
      {signedInUser && <Link to="/add_resource"> ADD RESOURCE YOU PLEB </Link>}
      <div className="ctn-resource-usage-key">
        <p> Used and recommended = 🌟</p>
        <p> Not used but recommended = 🔎</p>
        <p>Not recommended = 💩</p>
      </div>
      {resources.length > 0 &&
        resources.map((resource) => {
          return (
            <Resource
              resourceData={resource}
              signedInUser={signedInUser}
              fetchAndStoreResources={fetchAndStoreResources}
              key={resource.id}
            />
          );
        })}
    </>
  );
}

export default CatalogPage;
