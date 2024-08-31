/* eslint-disable react/prop-types */


function UserDetails({ profile }) {
  return (
    <div className="my-10 border-black">
      <img src={profile?.picture?.data?.url} alt="profile image" />
      <h1>
        {profile?.name}
      </h1>
    </div>
  )
}

export default UserDetails
