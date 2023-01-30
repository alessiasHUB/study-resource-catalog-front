import { typesArr } from "../utils/types";
import { usageArr } from "../utils/usage";
import { tagsArr } from "../utils/tags";
import { useState } from "react";
import { url } from "../utils/url";
import { IUserData, INewResourceData } from "../utils/interfaces";
import axios from "axios";

// todo: have the input fields cleared when submit

interface AddResourcePageProps {
  signedInUser: IUserData | undefined;
}

export default function AddResourcePage({
  signedInUser,
}: AddResourcePageProps): JSX.Element {
  //const [tags, setTags] = useState<string[]>([]);  ------------------------replaced by dropdown

  const [link, setLink] = useState<boolean>();

  async function getMatchingResource(inputLink: string) {
    const response = await axios.get(`${url}/resources/link?link=${inputLink}`);
    if (response.data.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  const handleSubmitResource = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit button clicked");
    const title = e.currentTarget.elements.namedItem(
      "title"
    ) as HTMLInputElement;
    const link = e.currentTarget.elements.namedItem("link") as HTMLInputElement;
    const description = e.currentTarget.elements.namedItem(
      "description"
    ) as HTMLInputElement;
    const tags = e.currentTarget.elements.namedItem("tags") as HTMLInputElement;
    const type = e.currentTarget.elements.namedItem("type") as HTMLInputElement;
    const usage = e.currentTarget.elements.namedItem(
      "usage"
    ) as HTMLInputElement;

    const resourceForm = {
      title: title.value,
      link: link.value,
      description: description.value,
      type: type.value,
      usage: usage.value,

      tags: [tags.value],
    };
    console.log(resourceForm);
    //setTags([]);
    postAddResource(resourceForm);
  };

  const postAddResource = async (newFormData: INewResourceData) => {
    const response = await axios.post(url + "/resources/" + signedInUser?.id, {
      newResourceData: newFormData,
    });
    console.log(response);
  };
  // const handleAddTag= (el: string) => {
  //  setTags([el, ...tags])
  // }

  return (
    <div className="content">
      <h1>Add new resource</h1>
      <form onSubmit={handleSubmitResource}>
        <div>
          <input
            className="add-res-title"
            placeholder="Title"
            type="text"
            id="title"
            required
          />
          <br />
          <input
            className="add-res-link"
            placeholder="Link"
            type="text"
            id="link"
            required
            onChange={async (e) =>
              setLink(await getMatchingResource(e.target.value))
            }
          />
          {link && <p>This resource is already in the database!</p>}
        </div>
        <textarea
          className="add-res-desc"
          placeholder="Description..."
          id="description"
          required
        />
        <div>
          <select className="add-res-tags" id="tags">
            {tagsArr.map((el, index) => (
              <option value={el} key={index}>
                {el}
              </option>
            ))}
          </select>
          <select className="add-res-types" id="type">
            {typesArr.map((el, index) => (
              <option value={el} key={index}>
                {el}
              </option>
            ))}
          </select>
          <select className="add-res-usage" id="usage">
            {usageArr.map((el, index) => (
              <option value={el} key={index}>
                {el}
              </option>
            ))}
          </select>
        </div>
        {link ? (
          <button className="add-res-submit-btn" type="submit" disabled>
            SUBMIT
          </button>
        ) : (
          <button className="add-res-submit-btn" type="submit">
            SUBMIT
          </button>
        )}
      </form>
    </div>
  );
}
