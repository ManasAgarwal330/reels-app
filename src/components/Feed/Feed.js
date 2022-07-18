import React from "react";
import Upload from "../Upload/Upload.js";
import { AuthContext } from "../../Context/AuthContext";
import { database } from "../../firebase";
import Posts from "../Posts/Posts";
import "./Feed.css";
import Navbar from "../Navbar/Navbar.js";
import CircularProgress from "@mui/material/CircularProgress";

export default function Feed() {
  const { user } = React.useContext(AuthContext);
  const [userData, setUserData] = React.useState("");

  React.useEffect(() => {
    if (user === null) return;
    const unsub = database.users.doc(user.uid).onSnapshot((snapshot) => {
      setUserData(snapshot.data());
    });

    return unsub;
  }, [user]);

  return (
    <>
      {user === null || userData === undefined ? (
        <CircularProgress
          sx={{ position: "absolute", top: "10%", left: "48%", color: "red" }}
        ></CircularProgress>
      ) : (
        <div className="feed-container">
          <Navbar user={userData} />
          <Upload userData={userData} />
          <Posts userData={userData} />
        </div>
      )}
    </>
  );
}
