import "./App.css";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import Dashboard from "./Dashboard";

function App() {
  return (
    <>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <Dashboard />
      </SignedIn>
    </>
  );
}

export default App;
