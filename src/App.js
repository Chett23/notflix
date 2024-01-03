import "./App.css";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";


function App() {

  return (
    <div className={"bg-background-950 h-[3000px] text-center"}>
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
