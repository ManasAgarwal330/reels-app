import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./Signup.css";
import Alert from "@mui/material/Alert";
import { Input } from "@mui/material";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Link } from "react-router-dom";
export default function Signup() {
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
            {true && (
              <Alert severity="error">
                This is an error alert — check it out!
              </Alert>
            )}
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
              />
              <Input
                placeholder="Password"
                fullWidth="true"
                color="primary"
                autoFocus="true"
                type="password"
                margin="dense"
              />
              <Input
                placeholder="Full Name"
                fullWidth="true"
                color="primary"
                autoFocus="true"
                type="text"
                margin="dense"
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
                />
              </Button>
            </div>
            <Button
              startIcon={<CloudUploadIcon />}
              variant="contained"
              color="primary"
              sx={{ alignSelf: "center", marginTop: "1rem" }}
              component="div"
              fullWidth="true"
            >
              Signup
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
