import { useAuth, UserButton, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Container, Form, Navbar, Table } from "react-bootstrap";

const Dashboard = () => {
  const { user } = useUser();
  const { getToken } = useAuth();

  const [mongoUserId, setMongoUserId] = useState("");
  const [notes, setNotes] = useState([]);

  const [form, setForm] = useState({ note: "" });
  const { note } = form;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const token = await getToken();

    await axios
      .post(
        "http://localhost:3000/note",
        {
          userId: mongoUserId,
          note: note,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => res.data)
      .catch((error) => console.log(error));
    getNotes();
  };

  const saveUser = async () => {
    const token = await getToken();
    const response = await axios
      .post(
        "http://localhost:3000/saveUser",
        {
          userId: user.id,
          email: user.primaryEmailAddress.emailAddress,
          name: user.fullName,
          role: "buyer",
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => res.data)
      .catch((error) => console.log(error));

    const { data } = await response;

    setMongoUserId(data._id);
    // console.log(data);
  };

  const getNotes = async () => {
    const token = await getToken();

    const response = await axios
      .get(
        "http://localhost:3000/note",

        {
          headers: {
            Authorization: token,
            userId: mongoUserId,
          },
        }
      )
      .then((res) => res.data)
      .catch((error) => console.log(error));

    const { data } = await response;
    setNotes(data);
  };

  useEffect(() => {
    saveUser();
    if (mongoUserId) getNotes();
  }, [mongoUserId]);

  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Notes</Navbar.Brand>
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
      <Form onSubmit={handleOnSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Note</Form.Label>
          <Form.Control
            type="text"
            name="note"
            value={note}
            onChange={handleOnChange}
            placeholder="Enter note"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <h1>Notes</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note, index) => (
            <tr key={note._id}>
              <td>{index + 1}</td>
              <td>{note.note}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Dashboard;
