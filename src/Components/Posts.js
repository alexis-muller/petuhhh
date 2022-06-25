import { fetchPosts } from "../api";
import React, { useEffect, useState } from "react";
import { AddPost } from ".";
import { BASE_URL } from "../api";
import Message from "./Message";

const Posts = ({ token }) => {
  const [posts, setPosts] = useState([]);

  const postDelete = async (token, id) => {
    try {
      await fetch(`${BASE_URL}/posts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const newPosts = posts.filter((post) => {
        return post._id !== id;
      });
      setPosts(newPosts);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPosts(token)
      .then((posts) => {
        setPosts(posts);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token]);

  const [searchTerm, setSearchTerm] = useState("");
  const filteredPosts = posts.filter(({ title, description, location }) => {
    return (
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      description.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
      location.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    );
  });

  return (
    <>
      {/* <h2>Search</h2>
      <input
        className="search"
        type="text"
        placeholder="Search Stranger's Things"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      /> */}
      <AddPost token={token} posts={posts} setPosts={setPosts} />

      <div className="posts">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(
            ({
              _id,
              author,
              title,
              description,
              price,
              location,
              willDeliver,
              isAuthor,
            }) => {
              return (
                <div className="post" key={_id} posts={posts}>
                  {author.username}
                  <h3>{title}</h3>
                  {description}
                  <h5>{price}</h5>
                  {location}
                  <h5>Delivery Available?</h5>
                  {willDeliver ? "yes" : "no"}
                  {token && isAuthor && (
                    <button
                      className="delete-button"
                      onClick={() => postDelete(token, _id)}
                    >
                      Delete
                    </button>
                  )}
                  {!isAuthor && <Message token={token} _id={_id} />}
                </div>
              );
            }
          )
        ) : (
          <h5>No Posts Found</h5>
        )}
      </div>
    </>
  );
};

export default Posts;
