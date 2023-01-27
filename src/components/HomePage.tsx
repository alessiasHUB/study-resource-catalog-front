import RecentlyAddedResources from "./RecentlyAddedResources";
import TopRecommendedResources from "./TopRecommendationsResources";

function HomePage(): JSX.Element {
  return (
    <>
      <p>Home Page</p>
      <TopRecommendedResources />
      <RecentlyAddedResources />
    </>
  );
}

export default HomePage;
