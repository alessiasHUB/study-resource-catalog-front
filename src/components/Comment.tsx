import { ICommentData, IUserData } from "../utils/interfaces";
import findUsernameFromID from "../utils/find-username-from-id copy";

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
        User: {findUsernameFromID(comment.id, allUsers)}
      </p>
      <p className="comment-date">{String(comment.post_date)}</p>
      <p className="comment-text">{comment.text}</p>
    </div>
  );
}
