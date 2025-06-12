import { Outlet } from "react-router-dom";
import Navbar from "./components/Home/Navbar";

function App() {
  return (
    <>
      <Navbar/>
      <Outlet/>
    </>
  );
}

export default App