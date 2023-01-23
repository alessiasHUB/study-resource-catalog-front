import { IStudyListData, IUserData } from "../utils/interfaces";

interface StudyListProps {
  signedInUser: IUserData;
  studyListArr: IStudyListData[];
}

export default function StudyListPage(props: StudyListProps): JSX.Element {
  const { signedInUser, studyListArr } = props;
  return (
    <>
      <p>Study List Page</p>
    </>
  );
}
