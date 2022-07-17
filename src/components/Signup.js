import React, { useState, useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./Signup.css";
import Alert from "@mui/material/Alert";
import { Input } from "@mui/material";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Link,useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext.js";
import { database, storage } from "../firebase";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [file, setFile] = useState("");
  const { signup } = useContext(AuthContext);
  const history = useNavigate();

  const handleClick = async () => {
    if (name === "" || email === "" || password === "" || file === null) {
      setError("Please fill and upload the necessary details");
      setTimeout(() => {
        setError(null);
      }, 2000);
      return;
    }
    try {
      setLoading(true);
      let userObj = await signup(email, password);
      let uid = userObj.user.uid;
      let uploadTask = storage.ref(`/users/${uid}/ProfileImage`).put(file);
      uploadTask.on('state_changed',fn1,fn2,fn3);
      function fn1(snapshot){
      }

      function fn2(error){
        setError(error);
        setTimeout(() => setError(null),2000);
        setLoading(false);
        return;
      }

      function fn3(){
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          database.users.doc(uid).set(
            {
                fullName:name,
                email:email,
                profilePic:url,
                createdAt:database.getTimeStamp(),
                userId:uid
            });
            setLoading(false);
            history("/");
        })
      }
    } catch (error) {
      setError(error);
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-wrapper">
        <Card sx={{ width: 400 }}>
          <div className="signup-image">
            <CardMedia
              component="img"
              height="140"
              image="https://raw.githubusercontent.com/udai1931/ReactYT/master/reels/src/Assets/Instagram.JPG"
              alt="Instagram Logo"
              sx={{ height: "60%", width: "60%" }}
            />
          </div>
          <CardContent sx={{ paddingTop: "0.5rem" }}>
            <Typography
              gutterBottom
              variant="p"
              component="div"
              align="center"
              sx={{ fontSize: "0.8rem", color: "gray" }}
            >
              Signup to see photos and videos from your friends.
            </Typography>
            {error !== null && <Alert severity="error">{error}</Alert>}
            <div
              className="signup-input-wrapper"
              style={{ marginTop: "0.5rem" }}
            >
              <Input
                placeholder="Email"
                fullWidth="true"
                color="primary"
                autoFocus="true"
                type="text"
                margin="dense"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="Password"
                fullWidth="true"
                color="primary"
                autoFocus="true"
                type="password"
                margin="dense"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <Input
                placeholder="Full Name"
                fullWidth="true"
                color="primary"
                autoFocus="true"
                type="text"
                margin="dense"
                onChange={(e) => setName(e.target.value)}
              />
              <Button
                startIcon={<CloudUploadIcon />}
                variant="outlined"
                color="secondary"
                sx={{ alignSelf: "center" }}
                component="label"
                fullWidth="true"
              >
                Upload Profile Image
                <input
                  type="file"
                  accept="image/*"
                  className="signup-upload-image"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </Button>
            </div>
            <Button
              variant="contained"
              color="primary"
              sx={{ alignSelf: "center", marginTop: "1rem" }}
              component="div"
              fullWidth="true"
              disabled={loading}
              onClick={handleClick}
            >
              Sign Up
            </Button>
            <Typography
              gutterBottom
              variant="p"
              component="div"
              align="center"
              sx={{ marginTop: "1rem", fontSize: "0.9rem", color: "gray" }}
            >
              By signing up, you agree to our Terms, Data Policy and Customer
              Policy.
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ width: 400, marginTop: "0.5rem" }}>
          <Typography
            gutterBottom
            variant="p"
            component="h5"
            align="center"
            sx={{ marginTop: "1rem", fontSize: "0.9rem", color: "gray" }}
          >
            Have an account?<Link to="/login"> Log In</Link>
          </Typography>
        </Card>
      </div>
    </div>
  );
}
