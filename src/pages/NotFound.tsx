import { Navigate } from "react-router-dom";

const NotFound = () => {
  /**
   * Automatically redirects any 404 / non-existent route 
   * back to the landing page.
   */
  return <Navigate to="/" replace />;
};

export default NotFound;