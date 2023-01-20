import { useState } from "react";
import { IResourceData } from "../utils/interfaces";

interface ResourceProps {
  resourceData: IResourceData;
}

//TODO: add conditional rendering to a button "FULL VIEW"
//      if !FULL_VIEW =>  the current map (add comment and fullview btn)
//      if  FULL_VIEW =>  all tingzz

function Resource({ resourceData }: ResourceProps): JSX.Element {
  const [isFullView, setIsFullView] = useState<boolean>(false);

  const handleFullViewClicked = () => {
    setIsFullView((prev) => !prev);
  };

  return (
    <div className="ctn-resource">
      <p className="resource-title">{resourceData.title}</p>
      <p className="resource-post-date">{String(resourceData.post_date)}</p>

      {/* use state to render? */}
      {resourceData.usage === "rec used" && <p>🌟</p>}
      {resourceData.usage === "no rec used" && <p>💩</p>}
      {resourceData.usage === "not used promise" && <p>🔍</p>}

      <p className="resource-type">{resourceData.type}</p>

      {/* -------------------------------if isFullView is true - render full description and all tags */}
      {isFullView ? (
        <>
          <p className="resource-description">{resourceData.description}</p>
          {resourceData.tags.map((tag) => {
            return (
              <div className="resource-tag" key={resourceData.id}>
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
                <div className="resource-tag" key={resourceData.id}>
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
