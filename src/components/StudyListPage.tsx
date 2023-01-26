import axios from "axios";
import { useState } from "react";
import { IResourceData, IStudyListData, IUserData } from "../utils/interfaces";
import { url } from "../utils/url";

interface StudyListProps {
  signedInUser: IUserData;
  studyListArr: IStudyListData[];
}

export default function StudyListPage(props: StudyListProps): JSX.Element {
  const [studyListResources, setStudyListResources] = useState<IResourceData[]>([])
  const { signedInUser, studyListArr } = props;
  console.log(signedInUser);

  // extract all the resource id's needed
  function extractResourceIds(studyListArr: IStudyListData[]): number[] {
    const studyListIdArr: number[] = studyListArr.map((studyItem) => {
      return studyItem.resource_id
    })
    return studyListIdArr
  }
  console.log(extractResourceIds(studyListArr))

  // // send array of id's to backend and get all study list resources back
  async function getStudyListResources(resourceIDs: number[]) {
    const response = await axios.get(`${url}//study_resources/:${resourceIDs}`);
    let studyListResourcesData: IResourceData[] = response.data;
    setStudyListResources(studyListResourcesData);
  };
console.log(studyListResources)
  return (
    <>
        <button onClick={() => getStudyListResources(extractResourceIds(studyListArr))}>Refresh resources for this study list bro</button>
    </>
  );
}

//GET req for the joined study-list table here
