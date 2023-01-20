import { typesArr } from "../utils/types";
import { usageArr } from "../utils/usage";
import { tagsArr } from "../utils/tags";
import { useState } from "react";

export default function AddResourcePage(): JSX.Element {
  const [tags, setTags] = useState<string[]>([]);

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
    // const tags = e.currentTarget.elements.namedItem("tags") as HTMLInputElement;
    // const types = e.currentTarget.elements.namedItem("types") as HTMLInputElement;
    // const usage = e.currentTarget.elements.namedItem("usage") as HTMLInputElement;

    const resourceForm = {
      title: title.value,
      link: link.value,
      description: description.value,
      // types: types.value,
      // usage: usage.value,
      tags: tags,
    };
    console.log(resourceForm);
    setTags([]);
  };

  return (
    <>
      <h1>Add new resource</h1>
      <form onSubmit={handleSubmitResource}>
        <input placeholder="title" type="text" id="title" required />
        <input placeholder="link" type="text" id="link" required />
        <textarea placeholder="description" id="description" required />
        {tagsArr.map((el, i) => (
          <button key={i} onClick={() => setTags((prev) => [...prev])}>
            {el}
          </button>
        ))}
        {/*<select id="type">{typesArr.map((el, index) => <option value={el} key={index}>{el}</option>)}</select>
        <select id="usage">{usageArr.map((el, index) => <option value={el} key={index}>{el}</option>)}</select>
       */}{" "}
        <button type="submit">SUBMIT</button>
      </form>
    </>
  );
}
