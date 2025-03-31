import { SignInButton, SignUpButton } from "@clerk/clerk-react";
import { Button, Container, Navbar } from "react-bootstrap";

const NavBarSignOut = () => {
  return (
    <Navbar className="bg-body-tertiary position-fixed vw-100">
      <Container>
        <Navbar.Brand href="#home">Notify</Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <SignInButton>
              <Button variant="link">Log in</Button>
            </SignInButton>
          </Navbar.Text>

          <Navbar.Text>
            <SignUpButton>
              <Button variant="primary">Sign up</Button>
            </SignUpButton>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBarSignOut;
