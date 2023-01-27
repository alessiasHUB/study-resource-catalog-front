import { IResourceData } from "../utils/interfaces";

interface TopRecResProps {
  recommendedRes: IResourceData[];
}

export default function TopRecommendedResources(
  props: TopRecResProps
): JSX.Element {
  return (
    <>
      <p>Recommended resources</p>
      {props.recommendedRes.map((el) => (
        <button key={el.id} className="recent-res">
          <h4>{el.title}</h4>
          <p>
            <a href={el.link}>🔗link</a>
          </p>
          <p>type: {el.type}</p>

          {el.tags.map((el, i) => (
            <span key={i}>{el}</span>
          ))}

          <p>{el.likes}👍</p>
        </button>
      ))}
    </>
  );
}
