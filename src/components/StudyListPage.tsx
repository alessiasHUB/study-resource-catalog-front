import { IStudyListData, IUserData } from "../utils/interfaces";

interface StudyListProps {
  signedInUser: IUserData;
  studyListArr: IStudyListData[];
}

export default function StudyListPage(props: StudyListProps): JSX.Element {
  const { signedInUser, studyListArr } = props;
  console.log(signedInUser);
  return (
    <>
      <>
        {studyListArr.map((el) => (
          <p>{el.resource_id}</p>
        ))}
      </>
    </>
  );
}

//GET req for the joined study-list table here
