import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/NPCI-Logo.png";

const API_BASE = "http://127.0.0.1:8000";

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin1234");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`, {
        method: "POST"
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || "Login failed");
      }
      navigate("/collaborate");
    } catch (loginError) {
      setError(loginError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page-container">
      <section className="card">
        <img src={logo} alt="NPCI Logo" className="npci-logo" />
        <h1>DevOps</h1>
        <p className="muted-text">Sign in</p>
        <form onSubmit={handleLogin} className="form">
          <label>
            Username
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
              placeholder="Enter username"
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              placeholder="Enter password"
            />
          </label>
          {error && <p className="error-text">{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? "Signing In..." : "Login"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default LoginPage;
