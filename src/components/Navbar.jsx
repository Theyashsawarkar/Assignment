import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";

function Navbar({ handleToken, handleProfile }) {
  return (
    <div>
      <LoginSocialFacebook
        appId="1700409334040630"
        onReject={error => {
          console.log("Login error: ", error);
        }}
        onResolve={response => {
          handleProfile(response.data);
          handleToken(response.data.accessToken);
          console.log("Login success: ", response.data);
        }}
      >
        <FacebookLoginButton />
      </LoginSocialFacebook>
    </div>
  );
}

export default Navbar;
