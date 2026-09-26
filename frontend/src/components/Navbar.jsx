import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  // Safely parse localStorage data to prevent runtime errors if JSON is invalid
  const getUserEmail = () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      return user?.email || "";
    } catch {
      return "";
    }
  };

  const handleClick = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/">
        <h1>Book Library</h1>
      </Link>

      <div className="links">
        <Link to="/">Home</Link>

        {isAuthenticated ? (
          <>
            <Link to="/add-book">Add Book</Link>
            <span>{getUserEmail()}</span>
            <button onClick={handleClick}>Log out</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;