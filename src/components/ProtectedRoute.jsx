import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export function ProtectedRoute({ children }) {
  const { isLoggedIn, authLoaded, setProtectedDestination } =
    useContext(CurrentUserContext);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn && authLoaded) {
      setProtectedDestination(location.pathname);
      navigate("/");
    }
  }, [authLoaded, isLoggedIn, location.pathname]);

  if (!authLoaded) return null;
  if (isLoggedIn) return children;
  return null;
}

export default ProtectedRoute;
