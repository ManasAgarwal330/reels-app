import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import { database } from "../firebase";
import CircularProgress from "@mui/material/CircularProgress";

export default function Comment({ post }) {
  const [comment, setComment] = useState([]);
  useEffect(() => {
    async function func() {
      let arr = [];
      for (let i = 0; i < post.comments.length; i++) {
        let data = await database.comments.doc(post.comments[i]).get();
        arr.push(data.data());
      }
      setComment(arr);
    }
    func();
  }, [post]);
  return (
    <>
      {comment === [] ? (
        <CircularProgress />
      ) : (
        comment.map((obj, index) => (
          <div key={index} style={{display:"flex",alignItems:"center"}}>
            <Avatar
              alt={obj.userName}
              src={obj.profilePic}
              sx={{ marginRight: "1rem", border: "0.5px solid grey",height:"1.5rem",width:"1.5rem" }}
            />
            <p>{obj.text}</p>
          </div>
        ))
      )}
    </>
  );
}
