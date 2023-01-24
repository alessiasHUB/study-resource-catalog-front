import { typesArr } from "../utils/types";
import { usageArr } from "../utils/usage";
import { tagsArr } from "../utils/tags";
import { url } from "../utils/url";
import { IUserData, INewResourceData } from "../utils/interfaces";
import axios from "axios";

interface AddResourcePageProps {
  signedInUser: IUserData | undefined;
}

export default function AddResourcePage({
  signedInUser,
}: AddResourcePageProps): JSX.Element {
  //const [tags, setTags] = useState<string[]>([]);  ------------------------replaced by dropdown

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
    <>
      <h1>Add new resource</h1>
      <form onSubmit={handleSubmitResource}>
        <input placeholder="title" type="text" id="title" required />
        <input placeholder="link" type="text" id="link" required />
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

        <button type="submit">SUBMIT</button>
      </form>
    </>
  );
}
