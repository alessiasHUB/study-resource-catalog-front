import RecentlyAddedResources from "./RecentlyAddedResources";
import TopRecommendedResources from "./TopRecommendationsResources";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { IResourceData } from "../utils/interfaces";
import { url } from "../utils/url";
import logo from "../imgs/logo-grey-v1.png";
import "./homePage.css";

// todo: be able to add to study-list?

function HomePage(): JSX.Element {
  const [recentResources, setRecentResources] = useState<IResourceData[]>([]);
  const [recommendedResources, setRecommendedResources] = useState<
    IResourceData[]
  >([]);

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
    <div className="content">
      <img className="logo-home-page" src={logo} alt="logo" />
      <TopRecommendedResources recommendedRes={recommendedResources} />
      <RecentlyAddedResources recAddRes={recentResources} />
    </div>
  );
}

export default HomePage;
