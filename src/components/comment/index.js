import React from "react";

const Comment = ({ username, caption }) => {
  return (
    <div className="comment">
      <p>
        <span style={{ fontWeight: "600", marginRight: "4px" }}>
          {username}
        </span>
        {caption}
      </p>
    </div>
  );
};
export default Comment;
