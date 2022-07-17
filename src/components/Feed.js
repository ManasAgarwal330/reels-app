import React from "react";
import Upload from "./Upload.js";
import { AuthContext } from "../Context/AuthContext";
import { database } from "../firebase";
import Posts from "./Posts";
import "./Feed.css";

export default function Feed() {
  const { logout, user } = React.useContext(AuthContext);
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
        <></>
      ) : (
        <div className="feed-container">
          <Upload userData={userData} />
          <button onClick={logout}>logout</button>
          <Posts userData={userData} />
        </div>
      )}
    </>
  );
}
