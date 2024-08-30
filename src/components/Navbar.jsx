import { LoginSocialFacebook } from "reactjs-social-login"
import { FacebookLoginButton } from "react-social-login-buttons"


function Navbar() {
  return (
    <div>
      <LoginSocialFacebook
        appId='1194128941822890'
        onReject={response => {
          console.log(response)
        }}
        onResolve={error => {
          console.log(error)
        }}
      >
        <FacebookLoginButton />
      </LoginSocialFacebook>
    </div >
  )
}

export default Navbar
