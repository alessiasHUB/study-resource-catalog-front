import axios from "axios";
import { useState } from "react";
import { IResourceData } from "../utils/interfaces";
import { url } from "../utils/url";

interface ResourceProps {
  resourceData: IResourceData;
}

function Resource({ resourceData }: ResourceProps): JSX.Element {
  const [isFullView, setIsFullView] = useState<boolean>(false);

  const handleFullViewClicked = () => {
    setIsFullView((prev) => !prev);
  };

  //-----------------------------------put this function into utils
  function evaluateUsage(resourceUsage: string) {
    switch (resourceUsage) {
      case "rec used":
        return "🌟";
      case "no rec used":
        return "💩";
      case "not used promise":
        return "🔍";
    }
  }

  // async function handleLikeClick () {
  //   const response = axios.post(url + "/likes/" + resourceData.id + "/" + )
  // }

  return (
    <div className="ctn-resource">
      <p className="resource-title">{resourceData.title}</p>
      <p className="resource-post-date">{String(resourceData.post_date)}</p>

      <p>{evaluateUsage(resourceData.usage)}</p>

      <p className="resource-type">{resourceData.type}</p>

      {/* -------------------------------if isFullView is true - render full description and all tags */}
      {isFullView ? (
        <>
          <p className="resource-description">{resourceData.description}</p>
          {resourceData.tags.map((tag) => {
            return (
              <div className="resource-tag" key={tag}>
                {tag}
              </div>
            );
          })}
        </>
      ) : (
        // ---------------------------------if isFullView is false - render reduced description and 3 tags
        <>
          <p className="resource-description">
            {resourceData.description.slice(0, 30)}...
          </p>
          {resourceData.tags
            .filter((el, index) => index < 3)
            .map((tag) => {
              return (
                <div className="resource-tag" key={tag}>
                  {tag}
                </div>
              );
            })}
        </>
      )}
      {/* -------------------------------------end of conditional rendering for isFullView*/}
      <div className="resource-link-btn">
        <a href={resourceData.link}>Check it out</a>
      </div>
      <button className="like-resource-btn">👍</button>
      <button className="dislike-resource-btn">👎</button>

      <button className="full-view-btn" onClick={handleFullViewClicked}>
        Full View
      </button>
      <hr />
    </div>
  );
}

export default Resource;
