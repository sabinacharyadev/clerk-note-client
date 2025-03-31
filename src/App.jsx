import "./App.css";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import Dashboard from "./components/Dashboard";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";

function App() {
  return (
    <>
      <SignedOut>
        <NavBar />
        <HomePage />
      </SignedOut>

      <SignedIn>
        <Dashboard />
      </SignedIn>
    </>
  );
}

export default App;
