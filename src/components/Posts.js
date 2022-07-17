import React, { useState, useEffect } from "react";
import { database } from "../firebase";
import CircularProgress from "@mui/material/CircularProgress";
import Video from "./Video.js";
import "./Posts.css";
import Avatar from "@mui/material/Avatar";
import Like from "./Like.js";
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

export default function Posts({ userData }) {
  const [postData, setPostData] = useState(null);

  useEffect(() => {
    let parr = [];
    const unsub = database.posts
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        parr = [];
        snapshot.forEach((doc) => {
          let data = { ...doc.data(), postId: doc.id };
          parr.push(data);
        });
        setPostData(parr);
      });

    return unsub;
  }, []);
  return (
    <div className="posts-video-container">
      {postData === [] || userData === "" ? (
        <CircularProgress />
      ) : (
        postData.map((post, index) => (
          <React.Fragment key={index}>
            <div className="posts-video">
              <Video post={post} />
              <div className="fa">
                <Avatar alt={userData.fullName} src={userData.profilePic} sx={{marginRight:"0.5rem"}} sizes="1rem"/>
                <h5 style={{color:"black",backgroundColor:'lightgrey',}}>{userData.fullName}</h5>
              </div>
              <Like post = {post} user={userData}/>
              <ChatBubbleIcon className="chat-icon"/>
            </div>
          </React.Fragment>
        ))
      )}
    </div>
  );
}
