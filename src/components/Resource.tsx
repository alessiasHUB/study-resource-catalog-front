import axios from "axios";
import { useState } from "react";
import {
  IResourceData,
  IUserData,
  ICommentData,
  IStudyListData,
  ILikesData,
} from "../utils/interfaces";
import { url } from "../utils/url";
import "./like-btns.css";
import Comment from "./Comment";
import findResourceInLikes from "../utils/find-resource-in-likes";
import checkForResourceInStudyList from "../utils/is-res-in-study-list";
import "./CatalogPage.css";
import dateFormatting from "../utils/date-format";

interface ResourceProps {
  resourceData: IResourceData;
  signedInUser: IUserData | undefined;
  fetchAndStoreResources: () => Promise<void>;
  getSignedInUserLikes: () => Promise<void>;
  allUsers: IUserData[];
  userLikes: ILikesData[];
  studyListArr: IStudyListData[];
}

function Resource({
  resourceData,
  signedInUser,
  fetchAndStoreResources,
  getSignedInUserLikes,
  allUsers,
  userLikes,
  studyListArr,
}: ResourceProps): JSX.Element {
  const [isFullView, setIsFullView] = useState<boolean>(false);
  const [comments, setComments] = useState<ICommentData[]>();
  const [newComment, setNewComment] = useState<string>("");
  const [isHovered, setIsHovered] = useState(false);

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

  //-----------------------------------add to study-list
  const postToStudyList = async () => {
    try {
      if (signedInUser) {
        await axios.post(
          url + `/study_list/${resourceData.id}/${signedInUser.id}`
        );
      }
    } catch (error) {
      console.error("Woops... issue with POST to study_list request: ", error);
    }
  };

  const deleteFromStudyList = async () => {
    try {
      if (signedInUser) {
        await axios.delete(
          url + `/study_list/${resourceData.id}/${signedInUser.id}`
        );
      }
    } catch (error) {
      console.error(
        "Woops... issue with DELETE to study_list request: ",
        error
      );
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
  //-----------------------------------handle like and dislike btns
  async function handleLikeClick() {
    if (signedInUser !== undefined) {
      await axios.post(`${url}/likes/${resourceData.id}/${signedInUser.id}`, {
        liked: true,
      });
    }
    fetchAndStoreResources();
    getSignedInUserLikes();
    console.log("POST a like");
  }
  async function handleDislikeClick() {
    if (signedInUser !== undefined) {
      await axios.post(`${url}/likes/${resourceData.id}/${signedInUser.id}`, {
        liked: false,
      });
    }
    fetchAndStoreResources();
    getSignedInUserLikes();
    console.log("Post dislike");
  }
  async function handleRemoveLike() {
    if (signedInUser !== undefined) {
      await axios.delete(
        `${url}/likes/${resourceData.id}/${signedInUser.id}?liked=${true}`
      );
    }
    fetchAndStoreResources();
    getSignedInUserLikes();
    console.log("DELETE like");
  }
  async function handleRemoveDislike() {
    if (signedInUser !== undefined) {
      await axios.delete(
        `${url}/likes/${resourceData.id}/${signedInUser.id}?liked=${false}`
      );
    }
    fetchAndStoreResources();
    getSignedInUserLikes();
    console.log("DELETE dislike");
  }

  return (
    <div className="ctn-resource">
      <p className="resource-title">{resourceData.title}</p>
      <p className="resource-post-date">
        Posted: {dateFormatting(resourceData.post_date)}
      </p>
      <p
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {evaluateUsage(resourceData.usage)}
      </p>
      <div>
        {isHovered && (
          <div className="ctn-resource-usage-key">
            <p> Used and recommended = 🌟</p>
            <p> Not used but recommended = 🔎</p>
            <p>Not recommended = 💩</p>
          </div>
        )}
      </div>
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
      {signedInUser !== undefined &&
        !findResourceInLikes(resourceData.id, userLikes) && (
          <div>
            <button
              className="false-like-resource-btn"
              onClick={handleLikeClick}
            >
              👍|{resourceData.likes}
            </button>
            <button
              className="false-dislike-resource-btn"
              onClick={handleDislikeClick}
            >
              👎|{resourceData.dislikes}
            </button>
          </div>
        )}
      {signedInUser !== undefined &&
        findResourceInLikes(resourceData.id, userLikes) === "like" && (
          <div>
            <button
              className={
                findResourceInLikes(resourceData.id, userLikes) +
                "d-resource-btn"
              }
              onClick={handleRemoveLike}
            >
              👍|{resourceData.likes}
            </button>
            <button
              className="false-dislike-resource-btn"
              // onClick={handleDislikeClick}
              disabled
            >
              👎|{resourceData.dislikes}
            </button>
          </div>
        )}
      {signedInUser !== undefined &&
        findResourceInLikes(resourceData.id, userLikes) === "dislike" && (
          <div>
            <button
              className="false-like-resource-btn"
              // onClick={handleLikeClick}
              disabled
            >
              👍|{resourceData.likes}
            </button>
            <button
              className={
                findResourceInLikes(resourceData.id, userLikes) +
                "d-resource-btn"
              }
              onClick={handleRemoveDislike}
            >
              👎|{resourceData.dislikes}
            </button>
          </div>
        )}
      <button className="full-view-btn" onClick={handleFullViewClicked}>
        {isFullView ? "See less":"Full View"}
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
                <Comment allUsers={allUsers} comment={el} />
              ))}
            </ul>
          </div>
        </>
      )}
      {signedInUser &&
        !checkForResourceInStudyList(resourceData.id, studyListArr) && (
          <button onClick={postToStudyList}>➕ Add to study-list</button>
        )}{" "}
      {signedInUser &&
        checkForResourceInStudyList(resourceData.id, studyListArr) && (
          <button onClick={deleteFromStudyList}>Remove from study-list</button>
        )}
    </div>
  );
}

export default Resource;
