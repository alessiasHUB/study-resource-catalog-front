import axios from "axios";
import { useState } from "react";
import { IResourceData, IStudyListData, IUserData } from "../utils/interfaces";
import { url } from "../utils/url";

interface StudyListProps {
  signedInUser: IUserData;
  studyListArr: IStudyListData[];
}

export default function StudyListPage(props: StudyListProps): JSX.Element {
  const [studyListResources, setStudyListResources] = useState<IResourceData[]>(
    []
  );
  const { signedInUser, studyListArr } = props;

  async function getStudyListResources(userID: number) {
    const response = await axios.get(`${url}/study_resources/${userID}`);
    let studyListResourcesData: IResourceData[] = response.data;
    setStudyListResources(studyListResourcesData);
  }
  console.log(studyListResources);
  return (
    <>
      <button onClick={() => getStudyListResources(signedInUser.id)}>
        Refresh resources for this study list bro
      </button>
    </>
  );
}

//GET req for the joined study-list table here
