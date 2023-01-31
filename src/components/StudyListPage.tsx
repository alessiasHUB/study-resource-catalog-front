import axios from "axios";
import { useEffect, useState } from "react";
import dateFormatting from "../utils/date-format";
import { IResourceData, IUserData } from "../utils/interfaces";
import { url } from "../utils/url";

interface StudyListProps {
  signedInUser: IUserData;
}

export default function StudyListPage(props: StudyListProps): JSX.Element {
  const [studyListResources, setStudyListResources] = useState<IResourceData[]>(
    []
  );
  const { signedInUser } = props;

  async function getStudyListResources(userID: number) {
    const response = await axios.get(`${url}/study_resources/${userID}`);
    let studyListResourcesData: IResourceData[] = response.data;
    setStudyListResources(studyListResourcesData);
  }

  useEffect(() => {
    getStudyListResources(signedInUser.id);
    console.log("useEffect is running");
  }, [signedInUser]);

  console.log(studyListResources);

  return (
    <div className="content">
      <h2>Your Study List</h2>
      {studyListResources.map((resource: IResourceData) => {
        return (
          <div key={resource.id} className="ctn-resource">
            <h2 className="resource-title"> {resource.title}</h2>
            <p className="resource-post-date"> {dateFormatting(resource.post_date)} </p>
            <>
              <p className="resource-description">{resource.description}</p>
              {resource.tags.map((tag) => {
                return (
                  <div className="resource-tag" key={tag}>
                    {tag}
                  </div>
                );
              })}
            </>
            <div>
              <div>
                <a className="resource-link-btn" href={resource.link}>🔗Link to resource</a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

//GET req for the joined study-list table here
