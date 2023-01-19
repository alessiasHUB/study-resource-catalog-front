import { Link } from "react-router-dom";
interface NavBarProps {
  signedInUser: string | undefined;
}
function NavBar(props: NavBarProps): JSX.Element {
  return (
    <nav>
      <Link to="/"> HOME </Link>
      <Link to="/catalog"> CATALOG </Link>
      <Link to="/signIn"> SIGN-IN </Link>
      {props.signedInUser !== undefined ? (
        <p>{props.signedInUser}</p>
      ) : (
        <Link to="/signIn"> sign in please </Link>
      )}
    </nav>
  );
}

export default NavBar;
