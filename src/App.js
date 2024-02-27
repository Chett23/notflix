import "./App.css";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

import { Outlet } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <div className={" min-h-screen bg-background-950 text-center"}>
      <Navbar />
      <ScrollToTop />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
