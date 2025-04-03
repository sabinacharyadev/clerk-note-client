import { UserButton, useUser } from "@clerk/clerk-react";
import { Container, Form, Navbar } from "react-bootstrap";

const UserNavBar = () => {
  const { user } = useUser();
  return (
    <Navbar className="bg-body-tertiary ">
      <Container>
        <p className="fw-bold m-3 d-sm-none ">Notify</p>
        <Navbar.Collapse className="justify-content-end">
          <Form.Control
            type="text"
            placeholder="Search your notes"
            className="me-3"
          />

          <Navbar.Text className="d-flex justify-content-center align-items-center">
            <span className="mx-3 d-none d-sm-block ">
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
