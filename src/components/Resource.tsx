import axios from "axios";
import { useState } from "react";
import { IResourceData, IUserData, ICommentData } from "../utils/interfaces";
import { url } from "../utils/url";
import "./resource.css";

interface ResourceProps {
  resourceData: IResourceData;
  signedInUser: IUserData | undefined;
  fetchAndStoreResources: () => Promise<void>;
}

function Resource({
  resourceData,
  signedInUser,
  fetchAndStoreResources,
}: ResourceProps): JSX.Element {
  const [isFullView, setIsFullView] = useState<boolean>(false);
  const [comments, setComments] = useState<ICommentData[]>();
  const [newComment, setNewComment] = useState<string>("");

  //-----------------------------------get comments
  const handleTopLvCommentBtn = (id: number) => {
    getResourceComments(id);
  };
  const getResourceComments = async (id: number) => {
    const response = await axios.get(`${url}/comments/${id}`);
    let resourceComments: ICommentData[] = response.data;
    console.log(resourceComments);
    setComments(resourceComments);
  };

  //-----------------------------------leave a new comment
  const handleSubmitNewComment = (commentTxt: string) => {
    postNewComment(commentTxt).then(() => getResourceComments(resourceData.id));
    setNewComment("");
  };
  const postNewComment = async (commentTxt: string) => {
    try {
      if (signedInUser) {
        console.log(newComment, resourceData.id, signedInUser.id);
        await axios.post(
          url + `/comments/${signedInUser.id}/${resourceData.id}`,
          {
            text: commentTxt,
          }
        );
      }
    } catch (error) {
      console.error("Woops... issue with POST request: ", error);
    }
  };

  const handleFullViewClicked = () => {
    setIsFullView((prev) => !prev);
  };

  //-----------------------------------put this function into utils
  function evaluateUsage(resourceUsage: string) {
    switch (resourceUsage) {
      case "rec used":
        return "🌟";
      case "no rec used":
        return "💩";
      case "not used promise":
        return "🔍";
    }
  }

  async function handleLikeClick() {
    if (signedInUser !== undefined) {
      await axios.post(`${url}/likes/${resourceData.id}/${signedInUser.id}`, {
        liked: true,
      });
    }
    fetchAndStoreResources();
  }

  async function handleDislikeClick() {
    if (signedInUser !== undefined) {
      await axios.post(`${url}/likes/${resourceData.id}/${signedInUser.id}`, {
        liked: false,
      });
    }
    fetchAndStoreResources();
  }

  return (
    <div className="ctn-resource">
      <p className="resource-title">{resourceData.title}</p>
      <p className="resource-post-date">{String(resourceData.post_date)}</p>
      <p>{evaluateUsage(resourceData.usage)}</p>
      <p className="resource-type">{resourceData.type}</p>
      {/* -------------------------------if isFullView is true - render full description and all tags */}
      {isFullView ? (
        <>
          <p className="resource-description">{resourceData.description}</p>
          {resourceData.tags.map((tag) => {
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
            {resourceData.description.slice(0, 30)}...
          </p>
          {resourceData.tags
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
      {/* -------------------------------------end of conditional rendering for isFullView*/}
      <div className="resource-link-btn">
        <a href={resourceData.link}>Check it out</a>
      </div>
      {signedInUser !== undefined && (
        <div>
          <button className="like-resource-btn" onClick={handleLikeClick}>
            👍|{resourceData.likes}
          </button>
          <button className="dislike-resource-btn" onClick={handleDislikeClick}>
            👎|{resourceData.dislikes}
          </button>
        </div>
      )}

      <button className="full-view-btn" onClick={handleFullViewClicked}>
        Full View
      </button>
      <button onClick={() => handleTopLvCommentBtn(resourceData.id)}>
        👀 Comments
      </button>
      {comments && (
        <>
          {signedInUser && (
            <div>
              <input
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button onClick={() => handleSubmitNewComment(newComment)}>
                Submit Comment
              </button>
            </div>
          )}
          <div>
            <h3>Comments</h3>
            <ul>
              {comments.map((el) => (
                <li key={el.id}>{el.text}</li>
              ))}
            </ul>
          </div>
        </>
      )}
      <hr />
    </div>
  );
}

export default Resource;
