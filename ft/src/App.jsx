import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import CollaboratePage from "./components/CollaboratePage";
import BuildsPage from "./components/BuildsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/collaborate" element={<CollaboratePage />} />
      <Route path="/builds" element={<BuildsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
