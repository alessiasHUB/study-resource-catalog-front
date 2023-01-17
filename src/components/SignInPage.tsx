import { useState } from "react";
import { userData } from "../utils/interfaces";

interface SignInProps {
  userData: userData[];
  setSignedInUser: React.Dispatch<React.SetStateAction<string | undefined>>
}

function SignInPage(props: SignInProps): JSX.Element {
  const [selectedUser, setSelectedUser] = useState<string | undefined>()
  function handleSignIn() {
    if(selectedUser !== undefined) {
      props.setSignedInUser(selectedUser)
    }
    console.log("signed in as: ", selectedUser)
  }
  return (
    <>
      <div>
        <> Sign-In Page </>
        <select onChange={(e) => setSelectedUser(e.target.value)}>{props.userData.map((userData) => {
          return (
            <option 
            key={userData.id}
            value={userData.username}
            >{userData.username}
            </option>
          )
        })}</select>
        <button onClick={handleSignIn}> SIGN IN </button>
      </div>
    </>
  );
}

export default SignInPage;

// onClick={props.setSignedInUser}
