import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function ProtectedRoute({ children }) {
  const { isLoggedIn, authLoaded, setProtectedDestination } =
    useContext(CurrentUserContext);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn && authLoaded) {
      setProtectedDestination(location.pathname);
      navigate("/");
    }
  }, [
    authLoaded,
    isLoggedIn,
    location.pathname,
    navigate,
    setProtectedDestination,
  ]);

  if (!authLoaded) return <React.Fragment></React.Fragment>;
  if (isLoggedIn) return <React.Fragment>{children}</React.Fragment>;
  return <React.Fragment></React.Fragment>;
}

export default ProtectedRoute;
