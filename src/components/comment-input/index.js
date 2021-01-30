import React, { useState, useContext } from "react";
import "./style.css";
import { db } from "../../firebase";
import { userContext } from "../../contextApi/user";
const CommentInput = ({ id, comments }) => {
  const [user, setuser] = useContext(userContext).user;
  const [comment, setcomment] = useState();
  const [commentArray, setCommentArray] = useState(comments ? comments : []);

  const addComment = () => {
    if (comment != "") {
      // add comment to the post info

      commentArray.push({
        comment: comment,
        username: user.email.replace("@gmail.com", "").toLowerCase()
      });

      db.collection("posts")
        .doc(id)
        .update({
          comments: commentArray
        })
        .then(function() {
          setcomment("");
          console.log("comment added");
        })
        .catch(function(error) {
          console.log(`Error ${error}`);
        });
    }
  };

  return (
    <div className="commentinput">
      <textarea
        className="commentinput_textarea"
        row="1"
        placeholder="Comment"
        value={comment}
        onChange={e => setcomment(e.target.value)}
      />
      <button onClick={addComment} className="commentinput_btn">
        Post
      </button>
    </div>
  );
};

export default CommentInput;
