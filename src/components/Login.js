import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./Login.css";
import { Input } from "@mui/material";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { CarouselProvider, Slider, Slide, Image } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { AuthContext } from "../Context/AuthContext";
import Alert from "@mui/material/Alert";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login } = React.useContext(AuthContext);
  const history = useNavigate();

  const handleClick = () => {
    if (email === "" || password === "") {
      setError("Please fill the necessary details");
      setTimeout(() => {
        setError(null);
      }, 2000);
      return;
    }
    setLoading(true);
    login(email, password)
      .then(() => {
        setLoading(false);
        history("/");
      })
      .catch(function (error) {
        setLoading(false);
        setError(error.message);
        setTimeout(() => {
          setError(null);
        }, 2000);
        return;
      });
  };

  return (
    <div className="login-container">
      <div
        className="login-image-wrapper"
        style={{
          backgroundImage: `url("https://raw.githubusercontent.com/udai1931/ReactYT/master/reels/src/Assets/insta.png")`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            height:"72%",
            width:"54.5%",
            top: "15.2%",
            left: "32.2%",
            // border:"2px solid black"
          }}
        >
          <CarouselProvider
            naturalSlideWidth={238}
            naturalSlideHeight={423}
            totalSlides={5}
            hasMasterSpinner
            isPlaying={true}
            infinite
            dragEnabled={false}
            touchEnabled={false}
            visibleSlides={1}
          >
            <Slider>
              <Slide index={1}>
                <Image src="https://raw.githubusercontent.com/udai1931/ReactYT/master/reels/src/Assets/img1.jpg" />
              </Slide>
              <Slide index={2}>
                <Image src="https://raw.githubusercontent.com/udai1931/ReactYT/master/reels/src/Assets/img2.jpg" />
              </Slide>
              <Slide index={3}>
                <Image src="https://raw.githubusercontent.com/udai1931/ReactYT/master/reels/src/Assets/img3.jpg" />
              </Slide>
              <Slide index={4}>
                <Image src="https://raw.githubusercontent.com/udai1931/ReactYT/master/reels/src/Assets/img4.jpg" />
              </Slide>
              <Slide index={5}>
                <Image src="https://raw.githubusercontent.com/udai1931/ReactYT/master/reels/src/Assets/img5.jpg" />
              </Slide>
            </Slider>
          </CarouselProvider>
        </div>
      </div>
      <div className="login-content-wrapper">
        <Card sx={{ width: 400 }}>
          <div className="login-image">
            <CardMedia
              component="img"
              height="140"
              image="https://raw.githubusercontent.com/udai1931/ReactYT/master/reels/src/Assets/Instagram.JPG"
              alt="Instagram Logo"
              sx={{ height: "60%", width: "60%" }}
            />
          </div>
          <CardContent sx={{ paddingTop: "0.5rem" }}>
            {error != null && <Alert severity="error">{error}</Alert>}
            <div className="login-input-wrapper">
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
                onChange={(e) => setPassword(e.target.value)}
              />
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
              LOG IN
            </Button>
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
            Dont't have an account?<Link to="/signup"> Sign Up</Link>
          </Typography>
        </Card>
      </div>
    </div>
  );
}
