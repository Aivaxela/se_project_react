import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContexts";

export function ProtectedRoute({ children }) {
  const { isLoggedIn, authLoaded, setProtectedDestination } =
    useContext(AppContext);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn && authLoaded) {
      console.log("setting dest");
      setProtectedDestination(location.pathname);
      navigate("/");
    }
  }, [authLoaded, isLoggedIn, location.pathname]);

  if (!authLoaded) return null;
  if (isLoggedIn) return children;
  return null;
}

export default ProtectedRoute;
