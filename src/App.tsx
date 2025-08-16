import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/front/home_page/Home";
import Login from "./components/front/connexion_form/login/login";
import Admin from "./components/front/dashboard/admin";
import { ThemeProvider } from "./components/front/dashboard/ThemeContext/ThemeProvider";
import ServicesSection from "./components/front/my_service_components/ServiceSection";
import ServiceDetail from "./components/front/my_service_components/Service.detail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home-page" element={<Home />} />
        <Route
          path="/admin/*"
          element={
            <ThemeProvider>
              <Admin />
            </ThemeProvider>
          }
        />

        <Route path="/" element={<ServicesSection />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
