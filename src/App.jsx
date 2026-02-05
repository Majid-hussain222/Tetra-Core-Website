import { Routes, Route } from "react-router-dom";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

// Pages
import Home from "./pages/Home";
import ServicesPage from "./pages/ServicesPage";
import PortfolioPage from "./pages/PortfolioPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import CareersPage from "./pages/Careers";

// Service Pages
import SoftwareService from "./pages/SoftwareService";
import CloudService from "./pages/CloudService";
import AIService from "./pages/AIService";
import MobileService from "./pages/MobileService";
import UIUXService from "./pages/UIUXService";
import DevOpsService from "./pages/DevOpsService";

export default function App() {
  return (
    <div className="bg-primary text-textLight min-h-screen overflow-x-hidden">
      
      {/* Fixed Header */}
      <Header />

      {/* Spacer to offset fixed header height */}
      <div className="h-[80px]" />

      {/* Page Content */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Service Detail Pages */}
          <Route path="/services/software" element={<SoftwareService />} />
          <Route path="/services/cloud" element={<CloudService />} />
          <Route path="/services/ai" element={<AIService />} />
          <Route path="/services/mobile" element={<MobileService />} />
          <Route path="/services/uiux" element={<UIUXService />} />
          <Route path="/services/devops" element={<DevOpsService />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}
