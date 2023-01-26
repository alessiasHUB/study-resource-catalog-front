import { IStudyListData, IUserData } from "../utils/interfaces";

interface StudyListProps {
  signedInUser: IUserData;
  studyListArr: IStudyListData[];
}

export default function StudyListPage(props: StudyListProps): JSX.Element {
  const { signedInUser, studyListArr } = props;
  console.log(signedInUser);

  // extract all the resource id's needed
  //  export default function extractResourceIds(studyListArr: IStudyListData[]): number[] {
  //     const studyListIdArr: number[] = studyListArr.map((resource) => {
  //       return resource.id
  //     })
  //     return studyListIdArr
  //   }
  //send array of id's to backend and get all study list resources back
  // const getStudyListResources= async (studyListArr: number[]) => {
  //     const response = await axios.get(`${url}/study_list/${signedInUser.id}/${studyListArr}`);
  //     //let studyListData: IStudyListData[] = response.data;
  //     setStudyListArr(studyListData);
  // }, [signedInUser]);
  // console.log("i am study list", studyListArr)

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
