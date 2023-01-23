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
  allUsers: IUserData[];
}

function CatalogPage({
  signedInUser,
  allUsers,
}: CatalogPageProps): JSX.Element {
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
      {resources.length > 0 &&
        resources.map((resource) => {
          return (
            <Resource
              resourceData={resource}
              signedInUser={signedInUser}
              fetchAndStoreResources={fetchAndStoreResources}
              key={resource.id}
              allUsers={allUsers}
            />
          );
        })}
    </>
  );
}

export default CatalogPage;
