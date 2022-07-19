import React from "react";
// import ReactDom from "react-dom";
import "./Video.css";

export default function Video({ post }) {
  function handleClick(e) {
    e.preventDefault();
    e.target.muted = !e.target.muted;
  }
  // function handleEnded(e) {
  //   let nextVideo = ReactDom.findDOMNode(e.target).parentNode.nextSibling;
  //   if (nextVideo !== null) {
  //     nextVideo.scrollIntoView();
  //     e.target.muted = true;
  //   }
  // }

  return (
    <video
      src={post.purl}
      muted="muted"
      onClick={handleClick}
      id={post.pid}
      height={448}
      width={400}
      style={{scrollSnapAlign:"start" }}
    />
  );
}
