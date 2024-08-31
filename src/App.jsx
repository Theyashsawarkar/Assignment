import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";
import { useState } from "react";
import Navbar from "./components/Navbar"
import PageDetails from "./components/PageDetails";
import UserDetails from "./components/UserDetails";

function App() {
  const [profile, setProfile] = useState(null);
  const [token, setToken] = useState({});

  return (
    <div>

      <div>
        <span className="ml-3">
          if business login dosn&apos;t work then use this one , it can only provide login authentication !!
        </span>
        {!profile && (
          <LoginSocialFacebook
            appId="878454434176187"
            onResolve={(response) => {
              console.log(response);
              setProfile(response.data);
            }}
            onReject={(error) => {
              console.log(error);
            }}
          >
            <FacebookLoginButton />
          </LoginSocialFacebook>
        )}
      </div>

      <Navbar handleProfile={setProfile} handleToken={setToken} />
      <UserDetails profile={profile} />
      <PageDetails accessToken={token} />
    </div>
  );
}

export default App;
