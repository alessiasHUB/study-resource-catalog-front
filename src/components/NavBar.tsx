import { Link } from "react-router-dom";

function AppHeader(): JSX.Element {
  return (
    <nav>
      <Link to="/"> HOME </Link>
      <Link to="/catalog"> CATALOG </Link>
      <Link to="/signIn"> SIGN-IN </Link>
    </nav>
  );
}

export default AppHeader;
