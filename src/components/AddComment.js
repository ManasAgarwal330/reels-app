import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import "./AddComment.css";
import Button from "@mui/material/Button";
import {database} from "../firebase";
import Like2 from "./Like2.js";

export default function AddComment({ user, post }) {
  const [text, setText] = useState("");

    function handleClick(){
        let commentObj ={
            userName:user.fullName,
            profilePic:user.profilePic,
            text:text
        }

        database.comments.add(commentObj).then((doc) => {
            database.posts.doc(post.postId).update({
                comments:[...post.comments,doc.id]
            })
        })
        setText("");
    }

  return (
    <>
      <div className="liked-by-area">
        <Avatar
          alt={user.fullName}
          src={user.profilePic}
          sx={{ marginRight: "0.5rem", border: "0.5px solid grey" }}
        />
        <Like2 post={post} user={user}/>
        {post.likes.length === 0
          ? `Liked by nobody😢`
          : `Liked by ${post.likes.length}`}
      </div>
      <div className="write-area">
        <TextField
          id="outlined-basic"
          label="Comment"
          variant="outlined"
          value={text}
          fullWidth={true}
          margin="dense"
          size="small"
          onChange={(e) => setText(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{
            height: "2.5rem",
            width: "4rem",
            marginRight: "0.5rem",
            marginLeft: "0.5rem",
        }}
        onClick={handleClick}
        >
          POST
        </Button>
      </div>
    </>
  );
}
