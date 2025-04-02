import { useAuth, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { Button, Row, Col, Stack } from "react-bootstrap";
import SingleNoteCard from "./SingleNoteCard";
import UserNavBar from "./UserNavBar";
import { IoAddCircleSharp } from "react-icons/io5";
import NewNoteModal from "./NewNoteModal";
import { saveUser } from "../axios/userAxios";
import { createNote, getNotes } from "../axios/noteAxios";

const Dashboard = () => {
  const { user } = useUser();
  const { getToken } = useAuth();

  const [selectedIds, setSelectedIds] = useState([]);

  const [mongoUserId, setMongoUserId] = useState("");
  const [notes, setNotes] = useState([]);
  const [showNewNoteModal, setShowNewNoteModal] = useState(false);
  const handleNewNoteModalClose = () => {
    setShowNewNoteModal(false);
    setForm("");
  };

  const [form, setForm] = useState({ note: "" });
  const { note } = form;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    createNote(getToken, mongoUserId, note);
    getNotes();
    handleNewNoteModalClose();
  };

  saveUser(getToken, user, setMongoUserId);
  getNotes(getToken, mongoUserId, setNotes);

  useEffect(() => {
    saveUser();
    if (mongoUserId) getNotes();
  }, [mongoUserId]);

  return (
    <>
      <Row className="vh-100" style={{ fontFamily: "Comfortaa" }}>
        {/* Side Panel */}
        <Col
          xs={2}
          lg={1}
          className="border shadow d-flex flex-column align-items-center"
        >
          <p className="fw-bold mt-4" style={{ marginBottom: "3rem" }}>
            Notify
          </p>
          <Button
            variant="bg-transparent"
            onClick={() => setShowNewNoteModal(true)}
          >
            <IoAddCircleSharp size="2.5em" />
          </Button>
        </Col>

        {/* User HomePage */}
        <Col xs={10} lg={11} className="px-0">
          <UserNavBar />
          <Stack
            direction="horizontal"
            className="d-flex justify-content-between mx-4"
          >
            <h2 className="p-4 my-4">Notes</h2>
            <button type="button" class="btn btn-outline-dark">
              Delete Selected <span class="badge text-bg-danger">4</span>
            </button>
          </Stack>

          <Stack
            gap={4}
            direction="horizontal"
            style={{ height: "75vh" }}
            className="d-flex flex-wrap p-4 ms-2 overflow-scroll"
          >
            {notes.map((note) => (
              <SingleNoteCard key={note._id} noteData={note} />
            ))}
          </Stack>

          <NewNoteModal
            showNewNoteModal={showNewNoteModal}
            handleNewNoteModalClose={handleNewNoteModalClose}
            handleOnSubmit={handleOnSubmit}
            note={note}
            setForm={setForm}
            handleOnChange={handleOnChange}
          />
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
