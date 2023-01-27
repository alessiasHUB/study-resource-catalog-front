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
      <p>Recently added resources</p>
      {props.recAddRes.map((el) => (
        <button key={el.id} className="recent-res">
          <h4>{el.title}</h4>
          <p>
            <a href={el.link}>🔗link</a>
          </p>
          <p>type: {el.type}</p>

          {el.tags.map((el, i) => (
            <span key={i}>{el}</span>
          ))}
          <p>{dateFormatting(el.post_date)}</p>
        </button>
      ))}
    </>
  );
}
