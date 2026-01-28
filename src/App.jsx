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
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}
