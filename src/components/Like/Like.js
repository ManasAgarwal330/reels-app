import React, { useState, useEffect } from "react";
import { database } from "../../firebase";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./Like.css";

export default function Like({ post, user, styleProp }) {
  const [like, setLike] = useState(null);
  useEffect(() => {
    let check = post.likes.includes(user.userId) ? true : false;
    setLike(check);
  }, [post]);

  function handleClick() {
    let nArr = [];
    if (like) {
      nArr = post.likes.filter((id) => id !== user.userId);
    } else {
      nArr = post.likes;
      nArr.push(user.userId);
    }
    database.posts.doc(post.postId).update({
      likes: nArr,
    });
  }
  return (
    <div style={styleProp}>
      {like === null ? (
        <></>
      ) : like ? (
        <FavoriteIcon className="like icon-styling" onClick={handleClick} />
      ) : (
        <FavoriteIcon className="icon-styling unlike" onClick={handleClick} />
      )}
    </div>
  );
}
