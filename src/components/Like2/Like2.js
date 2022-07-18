import React, { useState, useEffect } from "react";
import { database } from "../../firebase";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./Like2.css";

export default function Like2({ post, user }) {
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
    <>
      {like === null ? (
        <></>
      ) : like ? (
        <FavoriteIcon
          className="like icon-styling"
          onClick={handleClick}
          style={{ marginRight: "0.5rem" }}
        />
      ) : (
        <FavoriteIcon
          className="icon-styling unlike"
          onClick={handleClick}
          style={{ marginRight: "0.5rem" }}
        />
      )}
    </>
  );
}
