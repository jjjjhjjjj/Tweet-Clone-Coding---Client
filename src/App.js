import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import "./App.css";

/**
 * [ToDo]
 * - Auth Error Bus... - Login Page v
 * - Socket v
 * -  set-cookie
 */

function App() {
  return (
    <section className="font-sans w-full h-screen flex flex-col">
      <Header />
      <Outlet />
    </section>
  );
}

export default App;
