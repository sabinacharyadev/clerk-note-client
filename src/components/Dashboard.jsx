import { useAuth, UserButton, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Container,
  Form,
  Navbar,
  Row,
  Col,
  Stack,
  Table,
} from "react-bootstrap";
import SingleNoteCard from "./SingleNoteCard";
import UserNavBar from "./UserNavBar";
import { IoAddCircleSharp } from "react-icons/io5";

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
      <Row className="vh-100">
        <Col
          xs={2}
          lg={1}
          className="border shadow d-flex flex-column align-items-center"
        >
          <p className="fw-bold" style={{ marginBottom: "5rem" }}>
            Notify
          </p>
          <Button variant="bg-transparent">
            <IoAddCircleSharp size="2.5em" />
          </Button>
        </Col>
        <Col xs={10} lg={11}>
          <UserNavBar />
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
          <Stack
            gap={4}
            direction="horizontal"
            className="d-flex flex-wrap p-3"
          >
            {notes.map((note) => (
              <SingleNoteCard key={note._id} noteData={note} />
            ))}
          </Stack>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
