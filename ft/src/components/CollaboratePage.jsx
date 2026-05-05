import { useState } from "react";
import { Link } from "react-router-dom";

const API_BASE = "http://127.0.0.1:8000";

function CollaboratePage() {
  const [githubUsername, setGithubUsername] = useState("");
  const [githubToken, setGithubToken] = useState("");
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const connectGithub = async (event) => {
    event.preventDefault();
    setStatus("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/github/repos?username=${encodeURIComponent(githubUsername)}`, {
        headers: {
          github_token: githubToken
        }
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || "Could not fetch repositories");
      }
      setProjects(data.projects || []);
      if ((data.projects || []).length === 0) {
        setStatus("No repositories found for this account.");
      } else {
        setStatus("GitHub connected. Choose your project.");
      }
    } catch (githubError) {
      setStatus(githubError.message);
      setProjects([]);
      setSelectedProject("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="collaborate-layout">
      <aside className="left-nav">
        <h2 className="brand-title">codev</h2>
        <nav className="nav-sheet">
          <p className="nav-item">HOME</p>
          <p className="nav-item">DEV</p>

          <div className="nav-group">
            <p className="nav-item active">COLLABORATE</p>
            <p className="nav-sub-title">LIVE TRACKING</p>
            <p className="nav-sub-item">Work Items</p>
          </div>

          <div className="nav-group">
            <p className="nav-item">CI/CD</p>
            <p className="nav-sub-item">CI/CD</p>
            <p className="nav-sub-item">Analysis</p>
            <p className="nav-sub-item">Validation</p>
            <Link className="nav-sub-item nav-link" to="/builds">
              Builds
            </Link>
            <p className="nav-sub-item">Release Candidates</p>
            <p className="nav-sub-item">Releases</p>
          </div>

          <p className="nav-item">FLOWS</p>
          <p className="nav-item">OPS</p>
          <p className="nav-item">REPORTS</p>

          <div className="nav-group">
            <p className="nav-item">ENVIRONMENTS</p>
            <p className="nav-sub-title">ENVIRONMENT MANAGEMENT</p>
            <p className="nav-sub-item">Environments</p>
            <p className="nav-sub-item">Deployment Matrix</p>
            <p className="nav-sub-title">POOLS MANAGEMENT</p>
            <p className="nav-sub-item">Overview</p>
            <p className="nav-sub-item">Monitoring</p>
            <p className="nav-sub-item">Configuration</p>
            <p className="nav-sub-item">Assignment Rules</p>
          </div>

          <div className="nav-group">
            <p className="nav-item">SETTINGS</p>
            <p className="nav-sub-title">ORGANIZATION</p>
            <p className="nav-sub-item">Projects</p>
            <p className="nav-sub-item">Orgs</p>
            <p className="nav-sub-item">Teams</p>
            <p className="nav-sub-item">Members</p>
            <p className="nav-sub-item">Integrations</p>
            <p className="nav-sub-item">Webhooks</p>
            <p className="nav-sub-title">APP CONFIGURATION</p>
            <p className="nav-sub-item">General</p>
          </div>
        </nav>
      </aside>

      <section className="collaborate-board">
        <div className="board-top-strip">/</div>
        <header className="board-header">
          <h1>Welcome</h1>
        </header>

        <form onSubmit={connectGithub} className="github-bar">
          <input
            type="text"
            value={githubUsername}
            onChange={(event) => setGithubUsername(event.target.value)}
            required
            placeholder="GitHub username"
          />
          <input
            type="password"
            value={githubToken}
            onChange={(event) => setGithubToken(event.target.value)}
            required
            placeholder="GitHub token"
          />
          <button type="submit" disabled={loading}>
            {loading ? "Connecting..." : "Login GitHub"}
          </button>
        </form>

        <div className="project-picker">
          <span>Select Project</span>
          <select
            value={selectedProject}
            onChange={(event) => setSelectedProject(event.target.value)}
            disabled={projects.length === 0}
          >
            <option value="">Select project</option>
            {projects.map((project) => (
              <option key={project.id} value={project.full_name}>
                {project.full_name}
              </option>
            ))}
          </select>
        </div>

        <section className="project-grid">
          <article className="project-column">
            <p className="column-title">Current Project</p>
            <div className="project-card highlight">
              <p className="project-name">
                {selectedProject || "No project selected"}
                <span className="project-dot" />
              </p>
              <p className="project-source">GitHub</p>
            </div>
          </article>

          <article className="project-column">
            <p className="column-title">Other Projects</p>
            <div className="project-list">
              {projects
                .filter((project) => project.full_name !== selectedProject)
                .slice(0, 4)
                .map((project) => (
                  <div className="project-card" key={project.id}>
                    <p className="project-name">
                      {project.full_name}
                      <span className="project-dot" />
                    </p>
                  </div>
                ))}
              {projects.length === 0 && (
                <div className="project-card">
                  <p className="project-name">No projects loaded</p>
                </div>
              )}
            </div>
          </article>
        </section>

        {status && <p className="status-text">{status}</p>}
      </section>
    </main>
  );
}

export default CollaboratePage;
