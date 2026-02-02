import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/patient/Login";
import Reports from "./pages/patient/Reports";
import ReportDetails from "./pages/patient/ReportDetails";
import Analytics from "./pages/patient/Analytics";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/report/:id" element={<ReportDetails />} />
        <Route path="/reports/analytics" element={<Analytics />} />
        <Route path="/analytics" element={<Analytics />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
