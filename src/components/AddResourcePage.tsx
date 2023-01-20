export default function AddResourcePage(): JSX.Element {
  return (
    <>
      <h1>Add new resource</h1>
      <form>
        <input placeholder="title" />
        <input placeholder="link" />
        <textarea placeholder="description" />
        {/* {tags.map((el)=> <button>{el}</button>)} */}
        <select>{/* {types.map((el) => <option>{el}</option>)} */}</select>
        <select>{/* {usage.map((el) => <option>{el}</option>)} */}</select>
        <button type="submit">SUBMIT</button>
      </form>
    </>
  );
}
