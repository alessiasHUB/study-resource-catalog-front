import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { url } from "../utils/url";
import { ILikesData, IResourceData, IUserData } from "../utils/interfaces";
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
  const [userLikes, setUserLikes] = useState<ILikesData[]>([]);

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
              getSignedInUserLikes={getSignedInUserLikes}
              key={resource.id}
              allUsers={allUsers}
              userLikes={userLikes}
            />
          );
        })}
    </>
  );
}

export default CatalogPage;
