import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleClick = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h1>Book Library</h1>

      <div className="links">
        <Link to="/">Home</Link>

        {isAuthenticated ? (
          <>
            <Link to="/add-book">Add Book</Link>

            {user && <span>{user.email}</span>}

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