import React from "react";

const Post = (props) => {
  return (
    <div>
      <div>
        {props.link.description} ({props.link.url})
      </div>
    </div>
  );
};

export default Post;
