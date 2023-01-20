import { IResourceData } from "../utils/interfaces";

interface ResourceProps {
  resourceData: IResourceData;
}

//TODO: add conditional rendering to a button "FULL VIEW"
//      if !FULL_VIEW =>  the current map (add comment and fullview btn)
//      if  FULL_VIEW =>  all tingzz

function Resource({ resourceData }: ResourceProps): JSX.Element {
  return (
    <div className="ctn-resource">
      <p className="resource-title">{resourceData.title}</p>
      <p className="resource-post-date">{String(resourceData.post_date)}</p>

      {/* use state to render? */}
      {resourceData.usage === "rec used" && <p>🌟</p>}
      {resourceData.usage === "no rec used" && <p>💩</p>}
      {resourceData.usage === "not used promise" && <p>🔍</p>}

      <p className="resource-type">{resourceData.type}</p>
      <p className="resource-description">{resourceData.description}</p>
      {resourceData.tags.map((tag) => {
        return <div className="resource-tag">{tag}</div>;
      })}
      <div className="resource-link-btn">
        <a href={resourceData.link}>Check it out</a>
      </div>
      <button className="like-resource-btn">👍</button>
      <button className="dislike-resource-btn">👎</button>
    </div>
  );
}

export default Resource;
