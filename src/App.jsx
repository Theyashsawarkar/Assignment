import { useState } from "react";
import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";
import Navbar from "./components/Navbar"
import PageDetails from "./components/PageDetails";

function App() {
  const [profile, setProfile] = useState(null);
  const [token, setToken] = useState({});

  return (
    <div>
      {!profile ? (
        <LoginSocialFacebook
          appId="878454434176187"
          onResolve={(response) => {
            setProfile(response.data)
            console.log("response for first button : ", response.data);
          }}
          onReject={(error) => {
            console.log(error);
          }}
        >
          <FacebookLoginButton />
        </LoginSocialFacebook>
      ) : (
        ""
      )}

      {profile ? (
        <div>
          <h1>{profile.name}</h1>
          <img src={profile.picture.data.url} />
        </div>
      ) : (
        ""
      )}

      <div>
        <Navbar handleProfile={setProfile} handleToken={setToken} />
        <PageDetails accessToken={token} />
      </div>
    </div>
  );
}

export default App;
