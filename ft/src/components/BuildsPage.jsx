import { Link } from "react-router-dom";

function BuildsPage() {
  return (
    <main className="collaborate-layout">
      <aside className="left-nav">
        <h2 className="brand-title">codev</h2>
        <nav className="nav-sheet">
          <p className="nav-item">HOME</p>
          <p className="nav-item">DEV</p>

          <div className="nav-group">
            <Link className="nav-item nav-link" to="/collaborate">
              COLLABORATE
            </Link>
            <p className="nav-sub-title">LIVE TRACKING</p>
            <p className="nav-sub-item">Work Items</p>
          </div>

          <div className="nav-group">
            <p className="nav-item active">CI/CD</p>
            <p className="nav-sub-item">CI/CD</p>
            <p className="nav-sub-item">Analysis</p>
            <p className="nav-sub-item">Validation</p>
            <p className="nav-sub-item active-sub">Builds</p>
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
          <h1>Builds</h1>
        </header>

        <article className="builds-content">
          <p>
            When someone merges code into your repository, codev automatically builds the affected
            Salesforce packages and prepares them for deployment. No external CI/CD tool or
            pipeline configuration is needed and it works out of the box.
          </p>
          <p>
            Think of this as the step where your metadata changes are packaged up and made ready
            to deploy. codev does it automatically on every merge, and it only builds what
            actually changed.
          </p>

          <h3>What happens when code is merged</h3>
          <ul>
            <li>
              codev detects the merge and identifies affected domains. Unaffected domains are
              skipped entirely.
            </li>
            <li>
              Each affected package is built. codev compiles metadata, runs configured validations,
              and produces a versioned artifact.
            </li>
            <li>
              A release candidate is created after all affected packages are built. It appears
              automatically on the Release Candidates page.
            </li>
            <li>
              Builds within the same repository and branch are queued so back-to-back merges do not
              conflict during artifact publishing.
            </li>
          </ul>

          <h3>Configuring builds</h3>
          <h4>Enabling and disabling</h4>
          <p>
            Build on Merge is enabled by default. To turn it off, click Workflow Settings on the
            Builds page and toggle Build on merge.
          </p>
          <p>
            If you also run builds from your own CI/CD pipelines (using <code>sfp build</code> and{" "}
            <code>sfp publish</code>), those builds always appear on this page. codev&apos;s built-in
            workflow and external pipelines coexist.
          </p>

          <h4>Building on other branches</h4>
          <p>
            By default, codev triggers builds for merges to <code>main</code>. To build on
            additional branches (for example <code>develop</code> or <code>release/*</code>), go to
            Settings &gt; Organization &gt; Projects, open your project, and add branches to the
            array:
          </p>
          <pre className="code-snippet">{`"branches": ["main", "develop"]`}</pre>

          <h4>Excluding specific branches</h4>
          <p>
            If Build on Merge is enabled but you want to skip certain branches, use Workflow
            Settings and configure Exclude specific branches. Wildcards such as{" "}
            <code>release/*</code> and <code>hotfix-*</code> are supported.
          </p>

          <h4>Controlling what gets built</h4>
          <p>
            codev uses release configs in your repository to determine package-domain mapping.
            Additional build behavior can be controlled via <code>sfdx-project.json</code>:
          </p>
          <ul>
            <li>
              Skip package builds entirely with <code>"ignoreOnStage": ["build"]</code> in a
              package entry.
            </li>
            <li>
              Build package groups together using <code>"buildCollection"</code> so related
              packages always build together.
            </li>
            <li>
              Ignore metadata components with per-stage <code>.forceignore</code> files.
            </li>
            <li>
              Use different scratch org definitions per package by setting{" "}
              <code>scratchOrgDefFilePaths</code>.
            </li>
          </ul>
        </article>
      </section>
    </main>
  );
}

export default BuildsPage;
