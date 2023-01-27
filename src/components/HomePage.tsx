import RecentlyAddedResources from "./RecentlyAddedResources";
import TopRecommendedResources from "./TopRecommendationsResources";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { IResourceData } from "../utils/interfaces";
import { url } from "../utils/url";

function HomePage(): JSX.Element {
  const [recentResources, setRecentResources] = useState<IResourceData[]>([]);
  const [recommendedResources, setRecommendedResources] = useState<
    IResourceData[]
  >([]);
  // most liked resources
  // GET 5 most liked resources (SORT BY LIKES in RESOURCES)

  const getRecommendedResources = useCallback(async () => {
    const response = await axios.get(`${url}/resources/top`);
    const resourceData: IResourceData[] = response.data;
    setRecommendedResources(resourceData);
  }, []);
  const getRecentResources = useCallback(async () => {
    const response = await axios.get(`${url}/resources/recent`);
    const resourceData: IResourceData[] = response.data;
    setRecentResources(resourceData);
  }, []);

  useEffect(() => {
    getRecommendedResources();
    getRecentResources();
  }, [getRecommendedResources, getRecentResources]);

  return (
    <>
      <p>Home Page</p>
      <TopRecommendedResources recommendedRes={recommendedResources} />
      <RecentlyAddedResources recAddRes={recentResources} />
    </>
  );
}

export default HomePage;
