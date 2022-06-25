import React, { useState } from "react";
import { BASE_URL } from "../api";
import PostForm from "./PostForm";

const AddPost = ({ posts, token, setPosts, willDeliver }) => {
  const blankPost = {
    title: "",
    description: "",
    price: "",
    location: "",
    willDeliver: false,
  };
  const [post, setPost] = useState(blankPost);
  const handleAddPost = async (event) => {
    try {
      event.preventDefault();
      const response = await fetch(`${BASE_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          post,
        }),
      });
      const {
        data: { post: newPost },
      } = await response.json();
      console.log("newPost: ", newPost);
      setPosts([...posts, newPost]);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <h2>Add Post</h2>
      <PostForm
        willDeliver={willDeliver}
        handleSubmit={handleAddPost}
        post={post}
        setPost={setPost}
      />
    </>
  );
};
export default AddPost;
