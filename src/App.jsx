import "./App.css";
import {
  SignedIn,
  SignedOut,
  SignUpButton,
  SignInButton,
} from "@clerk/clerk-react";
import Dashboard from "./components/Dashboard";
import { Button, Row, Stack } from "react-bootstrap";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <SignedOut>
        <NavBar />
        <div className="bg-body-tertiary vw-100">
          <Row className="vh-100">
            <Stack className="d-flex justify-content-center align-items-center">
              <h1 className="display-1">What will you</h1>
              <h1 className="display-1">
                <span className="text-primary">note</span> today ?
              </h1>
              <h3 className="my-4 display-6 ">
                Capture Ideas. Organize Effortlessly. Remember Everything!
              </h3>

              <SignUpButton className="my-4">
                <Button size="lg" variant="primary">
                  Start Notify today
                </Button>
              </SignUpButton>

              <p className="d-flex align-items-center">
                Already have an account?
                <SignInButton>
                  <Button variant="link">Login</Button>
                </SignInButton>
              </p>
            </Stack>
          </Row>
        </div>
      </SignedOut>

      <SignedIn>
        <Dashboard />
      </SignedIn>
    </>
  );
}

export default App;
