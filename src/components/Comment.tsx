import { ICommentData, IUserData } from "../utils/interfaces";
import findUsernameFromID from "../utils/find-username-from-id copy";
import dateFormatting from "../utils/date-format";

// todo: make a function that cleans up the time signature

interface CommentProps {
  allUsers: IUserData[];
  comment: ICommentData;
}

export default function Comment(props: CommentProps): JSX.Element {
  const { allUsers, comment } = props;
  return (
    <div className="comment-ctn">
      <p className="comment-user">
        <i>
          {findUsernameFromID(comment.id, allUsers)} -{" "}
          {dateFormatting(comment.post_date)}
        </i>
      </p>
      <p className="comment-text">{comment.text}</p>
    </div>
  );
}
