import "./App.css";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className={" bg-background-950 text-center"}>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
