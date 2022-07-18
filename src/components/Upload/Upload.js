import React, { useState } from "react";
import Button from "@mui/material/Button";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import "./Upload.css";
import Alert from "@mui/material/Alert";
import { storage, database } from "../../firebase.js";
import { v4 as uuidv4 } from "uuid";
import LinearProgress from "@mui/material/LinearProgress";

export default function Upload(props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState();

  const handleUpload = async (file) => {
    if (file == null) {
      setError("Please select a file first");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }
    if (file.size / (1024 * 1024) > 100) {
      setError("The size of file is very big");
      setTimeout(() => {
        setError(null);
      }, 2000);
      return;
    }
    let uid = uuidv4();
    setLoading(true);
    let uploadTask = storage.ref(`/posts/${uid}/${file.name}`).put(file);
    uploadTask.on("state_changed", fn1, fn2, fn3);
    function fn1(snapshot) {
      let pro = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setProgress(pro);
    }

    function fn2(error) {
      setError(error);
      setLoading(false);
      setTimeout(() => {
        setError(null);
      }, 2000);
      return;
    }

    function fn3() {
      uploadTask.snapshot.ref.getDownloadURL().then((url) => {
        let obj = {
          pid: uid,
          purl: url,
          userId: props.userData.userId,
          name: props.userData.fullName,
          userPic: props.userData.profilePic,
          createdAt: database.getTimeStamp(),
          likes: [],
          comments: [],
        };
        console.log("Yepp");
        database.posts
          .add(obj)
          .then(async (ref) => {
            await database.users.doc(props.userData.userId).update({
              postIds:
                props.userData.postIds === undefined
                  ? [ref.id]
                  : [...props.userData.postIds, ref.id],
            });
          })
          .then(() => {
            console.log(props.userData.userId);
            setLoading(false);
          })
          .catch((error) => {
            setError(error);
            setLoading(false);
            setTimeout(() => {
              setError(null);
            }, 2000);
          });
      });
    }
  };

  return (
    <div style={{marginBottom:"0.5rem",marginTop:"0.5rem"}}>
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<FileUploadIcon />}
          component="label"
          disabled={loading}
        >
          <input
            hidden
            type="file"
            accept="video/*"
            onChange={(e) => handleUpload(e.target.files[0])}
          />
          Upload Post
        </Button>
        {loading && (
          <LinearProgress
            color="secondary"
            variant="determinate"
            value={progress}
            sx={{ width: "10rem", height: "0.5rem", marginTop: "0.5rem" }}
          />
        )}
        {error && <Alert severity="error">{error}</Alert>}
    </div>
  );
}
