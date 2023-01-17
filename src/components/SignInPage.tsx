import { SignInProps } from "../utils/interfaces";


function SignInPage(props: SignInProps): JSX.Element {
  return (
    <>
      <div>
        <> Sign-In Page </>
        <select>{props.usernames.map((username) => {
          return (
            <option>{username}</option>
          )
        })}</select>
        <button> SIGN IN </button>
      </div>
    </>
  );
}

export default SignInPage;
