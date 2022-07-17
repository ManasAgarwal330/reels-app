import React from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function PrivateRoute() {
  const { user } = React.useContext(AuthContext);
  const history = useNavigate();
  React.useEffect(() => {
    user !== null ? history("/") : history("/login");
  }, [user]);
  return <></>;
}
