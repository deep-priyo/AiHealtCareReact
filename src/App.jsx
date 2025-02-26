import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Diagnosis from "./pages/Diagnosis";
import MedicalHistory from "./pages/MedicalHistory";

import Contact from "./components/Contact";
import Appointments from "./pages/Appointments";
import Medications from "./pages/Medications";
import AiDoctor from "./pages/AiDoctor.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/diagnosis" element={<Diagnosis />} />
        <Route path="/history" element={<MedicalHistory />} />
        <Route path="/medications" element={<Medications />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/history" element={<MedicalHistory />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/aidoctor" element={<AiDoctor />} />
      </Routes>
    </Router>
  );
}

export default App;
