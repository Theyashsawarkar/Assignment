import { LoginSocialFacebook } from "reactjs-social-login"
import { FacebookLoginButton } from "react-social-login-buttons"


function Navbar() {
  return (
    <div>
      <LoginSocialFacebook
        appId='1700409334040630'
        onReject={response => {
          console.log("business response ", response)
        }}
        onResolve={error => {
          console.log("business error ", error)
        }}
      >
        <FacebookLoginButton />
      </LoginSocialFacebook>
    </div >
  )
}

export default Navbar
