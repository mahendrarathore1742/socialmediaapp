import React, { useState, useEffect } from "react";
import { Post } from "..";
import { db } from "../../firebase";
import "./style.css";
const Feed = () => {
  const [posts, setPost] = useState([]);

  useEffect(() => {
    db.collection("posts").onSnapshot(snapshot => {
      setPost(snapshot.docs.map(doc => ({ id: doc.id, post: doc.data() })));
    });
  }, []);

  return (
    <div className="feed">
      {posts.map(({ id, post }) => {
        return (
          <Post
            key={id}
            id={id}
            profile={post.profileUrl}
            username={post.username}
            photoURl={post.photourl}
            caption={post.caption}
            comments={post.comments}
          />
        );
      })}
    </div>
  );
};

export default Feed;
