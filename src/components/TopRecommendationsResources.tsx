import { IResourceData } from "../utils/interfaces";

interface TopRecResProps {
  recommendedRes: IResourceData[];
}

export default function TopRecommendedResources(
  props: TopRecResProps
): JSX.Element {
  return (
    <>
      <h2>Recommended resources</h2>
      <div className="top-res-container">
        {props.recommendedRes.map((el) => (
          <button key={el.id} className="top-res">
            <h4 className="top-res-title">{el.title}</h4>
            <p>
              <a href={el.link}>🔗link</a>
            </p>
            <p className="top-res-type">type: {el.type}</p>
            {el.tags.map((el, i) => (
              <span className="top-res-tag" key={i}>
                {el}
              </span>
            ))}
            <p>{el.likes}👍</p>
          </button>
        ))}
      </div>
    </>
  );
}
