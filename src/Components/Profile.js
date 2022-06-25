import React from "react";

const Profile = ({ user }) => {
  // try {
  return (
    <>
      <br />
      Welcome, {user.username}!
      {user.messages.map((message) => {
        return (
          <>
            {/* <h3>{message.fromUser.username}</h3>
            <h3>{message.post.title}</h3>
            <div> {message.content}</div> */}
          </>
        );
      })}
    </>
  );
  // } catch (error) {
  //   console.error(error);
  // }

  //   return <h2>username:{user.username}</h2>;
};

export default Profile;
