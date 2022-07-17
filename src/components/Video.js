import React from "react";
import ReactDom from "react-dom";
import "./Video.css";

export default function Video({ post }) {
  function handleClick(e) {
    e.preventDefault();
    e.target.muted = !e.target.muted;
  }
  function handleEnded(e) {
    let nextVideo = ReactDom.findDOMNode(e.target).parentNode.nextSibling;
    if (nextVideo !== null) {
      nextVideo.scrollIntoView();
      e.target.muted = true;
    }
  }

  return (
    <video
      src={post.purl}
      muted="muted"
      onClick={handleClick}
      onEnded={handleEnded}
      id={post.pid}
      autoPlay
      style={{ height: "100%", width: "100%",scrollSnapAlign:"start" }}
    />
  );
}