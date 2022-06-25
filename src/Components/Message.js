import React, { useState } from "react";
import { BASE_URL } from "../api";

const Message = ({ token, _id, messages, setMessages }) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/posts/${_id}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: {
            content,
          },
        }),
      });
      const data = await response.json();
      setMessages = [...messages, data];
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <textarea
          className="messageInput"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Send a Message"
        ></textarea>
        <button className="buttonRight">Submit</button>
      </form>
    </>
  );
};

export default Message;
