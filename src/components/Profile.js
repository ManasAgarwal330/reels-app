import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { database } from "../firebase";
import Navbar from "./Navbar";
import Avatar from "@mui/material/Avatar";
import "./Profile.css";
import Like from "./Like.js";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import Dialog from "@mui/material/Dialog";
import AddComment from "./AddComment";
import Comment from "./Comment";

export default function Profile() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [open, setOpen] = React.useState(null);

  const handleClickOpen = (pid) => {
    setOpen(pid);
  };

  const handleClose = () => {
    setOpen(null);
  };

  useEffect(() => {
    let unsub = database.users
      .doc(id)
      .onSnapshot((snapshot) => setUser(snapshot.data()));

    return unsub;
  }, [id]);

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
        setPost(parr);
      });

    return unsub;
  }, []);

  useEffect(() => {
    async function func() {
      if (user !== null) {
        if (user.postIds === undefined) return;
        let parr = [];
        for (let i = 0; i < user.postIds.length; i++) {
          let postData = await database.posts.doc(user.postIds[i]).get();
          parr.push({ ...postData.data(), postId: postData.id });
        }
        setPost(parr);
      }
    }
    func();
  }, [user]);

  return (
    <>
      {user === null ? (
        <CircularProgress
          sx={{ position: "absolute", top: "10%", left: "48%", color: "red" }}
        ></CircularProgress>
      ) : (
        <>
          <Navbar user={user} />
          <div className="upper-info-container">
            <div className="profile-pic">
              <Avatar
                alt={user.fullName}
                src={user.profilePic}
                sx={{ height: "4rem", width: "4rem" }}
              />
            </div>
            <div className="profile-user-data">
              <div className="profile-email">
                <span>Email:&nbsp;</span>
                <span>{user.email}</span>
              </div>
              <div className="profile-posts">
                <span>Number of Posts:</span>
                {post === null ? (
                  <>
                    <span>0</span>
                  </>
                ) : (
                  <>
                    <span>&nbsp;{user.postIds.length}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <hr />
          <div className="profile-post-container">
            {post === null ? (
              <></>
            ) : (
              post.map((post, index) => (
                <React.Fragment key={index}>
                  <div className="profile-posts-video">
                    <video
                      src={post.purl}
                      loop
                      muted="muted"
                      style={{ height: "100%", width: "100%" }}
                    />
                    <div className="profile-fa">
                      <Avatar
                        alt={user.fullName}
                        src={user.profilePic}
                        sx={{
                          marginRight: "0.5rem",
                          height: "2rem",
                          width: "2rem",
                        }}
                      />
                      <h5
                        style={{ color: "black", backgroundColor: "lightgrey" }}
                      >
                        {user.fullName}
                      </h5>
                    </div>
                    <Like
                      post={post}
                      user={user}
                      styleProp={{
                        position: "absolute",
                        bottom: "0%",
                        left: "9%",
                      }}
                    />
                    <ChatBubbleIcon
                      className="profile-chat-icon"
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
                            <AddComment post={post} user={user} />
                          </div>
                        </div>
                      </div>
                    </Dialog>
                  </div>
                </React.Fragment>
              ))
            )}
          </div>
        </>
      )}
    </>
  );
}
