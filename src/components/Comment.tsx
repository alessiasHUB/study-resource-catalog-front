import { ICommentData, IUserData } from "../utils/interfaces";
import findUsernameFromID from "../utils/find-username-from-id";

// todo: make a function that cleans up the time signature

interface CommentProps {
  allUsers: IUserData[];
  comment: ICommentData;
}

export default function Comment(props: CommentProps): JSX.Element {
  const { allUsers, comment } = props;
  return (
    <>
      <p>{findUsernameFromID(comment.id, allUsers)}</p>
      <p>{String(comment.post_date)}</p>
      <p>{comment.text}</p>
    </>
  );
}
