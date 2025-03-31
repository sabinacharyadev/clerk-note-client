import "./App.css";
import {
  SignedIn,
  SignedOut,
  SignUpButton,
  SignInButton,
} from "@clerk/clerk-react";
import Dashboard from "./Dashboard";
import { Button, Container, Row, Stack } from "react-bootstrap";

function App() {
  return (
    <>
      <SignedOut>
        <Container>
          <Row className="vh-100 ">
            <Stack className="d-flex justify-content-center align-items-center">
              <h1>Note</h1>
              <p>Note Taking made easy and simple</p>
              <p>Not registered with us? </p>

              <SignUpButton>
                <Button variant="link">Sign up</Button>
              </SignUpButton>

              <p>Login to see your notes</p>

              <SignInButton>
                <Button variant="link">Login</Button>
              </SignInButton>
            </Stack>
          </Row>
        </Container>
      </SignedOut>

      <SignedIn>
        <Dashboard />
      </SignedIn>
    </>
  );
}

export default App;
