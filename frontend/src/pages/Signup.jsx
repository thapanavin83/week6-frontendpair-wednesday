import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch("/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Signup failed");
      }

      const user = {
        email: data.email,
        token: data.token,
      };

      localStorage.setItem("user", JSON.stringify(user));

      setIsAuthenticated(true);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="signup">
      <h2>Signup</h2>

      {error && <div className="error">{error}</div>}

      <form onSubmit={handleFormSubmit}>
        <label>Email:</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password:</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;