import React from "react";
import "./Components.css";

const PostForm = ({ post, setPost, willDeliver, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="addPostForm">
        <input
          className="addInput"
          value={post.title}
          placeholder="Title"
          onChange={(event) => {
            setPost({ ...post, title: event.target.value });
          }}
        />
        <input
          className="addInput"
          value={post.description}
          placeholder="Description"
          onChange={(event) => {
            setPost({ ...post, description: event.target.value });
          }}
        />
        <input
          className="addInput"
          value={post.price}
          placeholder="$Price"
          unit="$"
          delimiter=","
          separator="."
          precision={2}
          onChange={(event) => {
            setPost({ ...post, price: event.target.value });
          }}
        />
        <input
          className="addInput"
          value={post.location}
          placeholder="Location"
          onChange={(event) => {
            setPost({ ...post, location: event.target.value });
          }}
        />
        <label className="deliveryLabel">
          {" "}
          Delivery Available?
          <input
            className="delivery"
            type="checkbox"
            name="Delivery"
            checked={willDeliver}
            onChange={(event) => {
              setPost({ ...post, willDeliver: event.target.checked });
            }}
          />
        </label>
      </div>
      <button>Submit</button>
    </form>
  );
};

export default PostForm;
