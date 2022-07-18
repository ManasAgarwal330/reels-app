import React, { useState, useEffect } from "react";
import { database } from "../firebase";
import CircularProgress from "@mui/material/CircularProgress";
import Video from "./Video.js";
import "./Posts.css";
import Avatar from "@mui/material/Avatar";
import Like from "./Like.js";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import Dialog from "@mui/material/Dialog";
import AddComment from "./AddComment";
import Comment from "./Comment";

export default function Posts({ userData }) {
  const [postData, setPostData] = useState(null);
  const [open, setOpen] = React.useState(null);

  const handleClickOpen = (pid) => {
    setOpen(pid);
  };

  const handleClose = () => {
    setOpen(null);
  };

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

  let observer = new IntersectionObserver(callback, {threshold:0.6});
  function callback(entries){
    entries.forEach((entry) => {
      let element = entry.target.childNodes[0];
      element.play().then(() => {
        if(!element.paused && !entry.isIntersecting){
          element.pause();
        }
      })
    })
    
  }

  useEffect(() => {
    let elements = document.querySelectorAll(".posts-video");
    elements.forEach((element) => {
      observer.observe(element);
    })

    return () => {
      observer.disconnect();
    }
  },[postData])
  return (
    <div className="posts-video-container">
      {postData === null || userData === undefined ? (
        <CircularProgress />
      ) : (
        postData.map((post, index) => (
          <React.Fragment key={index}>
            <div className="posts-video">
              <Video post={post} />
              <div className="fa">
                <Avatar
                  alt={userData.fullName}
                  src={userData.profilePic}
                  sx={{ marginRight: "0.5rem" }}
                  sizes="1rem"
                />
                <h5 style={{ color: "black", backgroundColor: "lightgrey" }}>
                  {userData.fullName}
                </h5>
              </div>
              <Like
                post={post}
                user={userData}
                styleProp={{
                  position: "absolute",
                  bottom: "0rem",
                  left: "5rem",
                }}
              />
              <ChatBubbleIcon
                className="chat-icon"
                onClick={() => handleClickOpen(post.postId)}
              />
              <Dialog
                open={open === post.postId}
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                fullWidth={true}
                maxWidth="md"
              >
                <div className="modal-container">
                  <div className="modal-video-container">
                    <video src={post.purl} controls muted="muted"></video>
                  </div>
                  <div className="comment-container">
                    <div className="comments">
                      <Comment post={post} />
                    </div>
                    <div
                      style={{
                        height: "2%",
                        width: "100%",
                        backgroundColor: "white",
                      }}
                    ></div>
                    <div className="comment-write-area">
                      <AddComment post={post} user={userData} />
                    </div>
                  </div>
                </div>
              </Dialog>
            </div>
          </React.Fragment>
        ))
      )}
    </div>
  );
}
