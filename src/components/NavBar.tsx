import { Link } from "react-router-dom";
interface NavBarProps {
  signedInUser: string | undefined;
}
function NavBar(props: NavBarProps): JSX.Element {
  return (
    <nav>
      {props.signedInUser !== undefined ? (
        <>
          <Link to="/"> HOME </Link>
          <Link to="/catalog"> CATALOG </Link>
          <Link to="/study_list"> STUDY LIST </Link>
          <p>{props.signedInUser}</p>
        </>
      ) : (
        <>
          <Link to="/"> HOME </Link>
          <Link to="/catalog"> CATALOG </Link>
          <Link to="/signIn"> SIGN-IN </Link>
        </>
      )}
    </nav>
  );
}

export default NavBar;
