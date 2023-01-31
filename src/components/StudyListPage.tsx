import axios from "axios";
import { useEffect, useState } from "react";
import { IResourceData, IUserData } from "../utils/interfaces";
import { url } from "../utils/url";

interface StudyListProps {
  signedInUser: IUserData;
}

export default function StudyListPage(props: StudyListProps): JSX.Element {
  const [studyListResources, setStudyListResources] = useState<IResourceData[]>(
    []
  );
  const [isFullView, setIsFullView] = useState<boolean>(false);
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
      {studyListResources.map((resource: IResourceData) => {
        return (
          <div key={resource.id}>
            <h4> {resource.title}</h4>
            <p> {String(resource.post_date)} </p>

            {/* -------------------------------if isFullView is true - render full description and all tags */}
            {isFullView ? (
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
            ) : (
              // ---------------------------------if isFullView is false - render reduced description and 3 tags
              <>
                <p className="resource-description">
                  {resource.description.slice(0, 30)}...
                </p>
                {resource.tags
                  .filter((el, index) => index < 3)
                  .map((tag) => {
                    return (
                      <div className="resource-tag" key={tag}>
                        {tag}
                      </div>
                    );
                  })}
              </>
            )}
            <div>
              {/* -------------------------------------end of conditional rendering for isFullView*/}
              <div className="resource-link-btn">
                <a href={resource.link}>Check it out</a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

//GET req for the joined study-list table here
