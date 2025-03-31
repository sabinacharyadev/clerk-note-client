import { UserButton, useUser } from "@clerk/clerk-react";
import { Container, Navbar } from "react-bootstrap";

const UserNavBar = () => {
  const { user } = useUser();
  return (
    <Navbar className="bg-body-tertiary ">
      <Container>
        <Navbar.Brand href="#home">Notify</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="d-flex justify-content-center align-items-center">
            <span className="mx-3">
              {user.firstName && <span>Hello, {user.firstName}</span>}
            </span>
            <UserButton />
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default UserNavBar;
