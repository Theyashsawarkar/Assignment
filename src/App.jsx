import { useState } from "react";
import Navbar from "./components/Navbar"
import PageDetails from "./components/PageDetails";
import UserDetails from "./components/UserDetails";

function App() {
  const [profile, setProfile] = useState(null);
  const [token, setToken] = useState({});

  return (
    <div>
      <Navbar handleProfile={setProfile} handleToken={setToken} />
      <UserDetails profile={profile} />
      <PageDetails accessToken={token} />
    </div>
  );
}

export default App;
