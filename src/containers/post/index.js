import React, { useContext, useState } from "react";
import { userContext } from "../../contextApi/user";
import "./style.css";
import { Comment } from "../../components";
import CommentInput from "../../components/comment-input";
import { storage, db } from "../../firebase";
import * as firebase from "firebase/app";
const Post = ({ profile, username, photoURl, caption, comments, id }) => {
  const [user, setUser] = useContext(userContext).user;
  const currentUser = firebase
    .auth()
    .currentUser.email.replace("@gmail.com", "");

  const deletepost = () => {
    var imageref = storage.refFromURL(photoURl);
    imageref
      .delete()
      .then(() => {
        console.log("delete successfully");
      })
      .catch(error => {
        console.log(error);
      });

    db.collection("posts")
      .doc(id)
      .delete()
      .then(() => {
        console.log("delete post info successfully");
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="post">
      <div className="post__header">
        <div className="post__headerLeft">
          <img className="post__profilePic" src={profile} />
          <p style={{ marginLeft: "8px" }}>{username}</p>
        </div>
        {currentUser == username ? (
          <button onClick={deletepost} className="post__delete">
            Delete
          </button>
        ) : (
          ""
        )}
      </div>
      <div className="post__center">
        <img className="post__photoUrl" src={photoURl} />
      </div>
      <div>
        <p>
          <span style={{ fontWeight: "600", marginRight: "4px" }}>
            {username}
          </span>
          {caption}
        </p>
      </div>

      {comments ? (
        comments.map(comment => (
          <Comment username={comment.username} caption={comment.comment} />
        ))
      ) : (
        <></>
      )}
      {user ? <CommentInput comments={comments} id={id} /> : <></>}
    </div>
  );
};

export default Post;
