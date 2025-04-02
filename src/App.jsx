import "./App.css";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import Dashboard from "./components/Dashboard";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";

function App() {
  const { user } = useUser();
  if (!user) {
    localStorage.setItem("userSession", null);
  }

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
