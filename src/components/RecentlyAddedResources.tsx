import dateFormatting from "../utils/date-format";
import { IResourceData } from "../utils/interfaces";

interface RecAddProps {
  recAddRes: IResourceData[];
}

export default function RecentlyAddedResources(
  props: RecAddProps
): JSX.Element {
  return (
    <>
      <h2>Recently added resources</h2>
      <div className="top-res-container">
        {props.recAddRes.map((el) => (
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
            <p className="rec-res-date">{dateFormatting(el.post_date)}</p>
          </button>
        ))}
      </div>
    </>
  );
}
