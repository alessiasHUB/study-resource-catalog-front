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
            <h2 className="top-res-title">{el.title}</h2>
            <p>
              <a href={el.link}>🔗link</a>
            </p>
            <h3 className="top-res-type">type: {el.type}</h3>
            {el.tags.map((el, i) => (
              <span className="top-res-tag" key={i}>
                {el}
              </span>
            ))}
            <h4>{el.likes}👍</h4>
          </button>
        ))}
      </div>
    </>
  );
}
