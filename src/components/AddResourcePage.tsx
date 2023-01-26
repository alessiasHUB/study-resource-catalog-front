import { typesArr } from "../utils/types";
import { usageArr } from "../utils/usage";
import { tagsArr } from "../utils/tags";
import { useState } from "react";
import axios from "axios";
import { url } from "../utils/url";

export default function AddResourcePage(): JSX.Element {
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
      tags: tags.value,
    };
    console.log(resourceForm);
    //setTags([]);
  };
  // const handleAddTag= (el: string) => {
  //  setTags([el, ...tags])
  // }

  return (
    <>
      <h1>Add new resource</h1>
      <form onSubmit={handleSubmitResource}>
        <input placeholder="title" type="text" id="title" required />
        <input
          placeholder="link"
          type="text"
          id="link"
          required
          onChange={async (e) =>
            setLink(await getMatchingResource(e.target.value))
          }
        />
        {link && <p>This resource is already in the database!</p>}
        <textarea placeholder="description" id="description" required />
        {/* {tagsArr.map((el, i) => ( ------------------------------------------replaced by select tags below :(
          <button key={i} onClick={() => setTags([...tags])}>
            {el}
          </button>
        ))} */}
        <select id="tags">
          {tagsArr.map((el, index) => (
            <option value={el} key={index}>
              {el}
            </option>
          ))}
        </select>
        <select id="type">
          {typesArr.map((el, index) => (
            <option value={el} key={index}>
              {el}
            </option>
          ))}
        </select>
        <select id="usage">
          {usageArr.map((el, index) => (
            <option value={el} key={index}>
              {el}
            </option>
          ))}
        </select>

        {link ? (
          <button type="submit" disabled>
            SUBMIT
          </button>
        ) : (
          <button type="submit">SUBMIT</button>
        )}
      </form>
    </>
  );
}
