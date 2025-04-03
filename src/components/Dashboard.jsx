import { useAuth, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { Button, Row, Col, Stack } from "react-bootstrap";
import SingleNoteCard from "./SingleNoteCard";
import UserNavBar from "./UserNavBar";
import { IoAddCircleSharp } from "react-icons/io5";
import { saveUser } from "../axios/userAxios";
import { createNote, deleteNotes, getNotes } from "../axios/noteAxios";
import { compareDesc, parseISO } from "date-fns";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const dbUserId = localStorage.getItem("userSession");

  const [selectedIds, setSelectedIds] = useState([]);

  const [notes, setNotes] = useState([]);

  // Handle Add new note button
  const handleOnSubmit = async () => {
    const data = await createNote(getToken, dbUserId, "New note");
    console.log(data);
    getSavedNotes();
  };

  // Handle multiple cards clicked
  const handleOnCardClick = (noteId) => {
    const isDuplicate = selectedIds.includes(noteId);
    if (!isDuplicate) {
      setSelectedIds([...selectedIds, noteId]);
    } else {
      setSelectedIds(selectedIds.filter((item) => item !== noteId));
    }
  };

  // Handles delete button clicked
  const handleOnDeleteClick = async () => {
    const response = await deleteNotes(getToken, selectedIds);
    console.log(response);
    setSelectedIds([]);
    getSavedNotes();
  };

  // Fetches new note data
  const getSavedNotes = async () => {
    const dbUserId = localStorage.getItem("userSession");
    const { data } = await getNotes(getToken, dbUserId);

    const sortedArrayByDate = data.sort((a, b) =>
      compareDesc(parseISO(a.updatedAt), parseISO(b.updatedAt))
    );
    setNotes(sortedArrayByDate);
  };

  // Save user id on successful login
  const saveUserID = async () => {
    const { data } = await saveUser(getToken, user);
    localStorage.setItem("userSession", data._id);
    getSavedNotes();
  };

  useEffect(() => {
    saveUserID();
  }, []);

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
          <Button variant="bg-transparent" onClick={handleOnSubmit}>
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
            {!!selectedIds.length && (
              <button
                type="button"
                onClick={handleOnDeleteClick}
                class="btn btn-outline-dark"
              >
                Delete Selected{" "}
                <span class="badge text-bg-danger">{selectedIds.length}</span>
              </button>
            )}
          </Stack>

          {!notes.length && (
            <p className="p-5">Add some quick notes to get started. . .</p>
          )}

          {notes && (
            <Stack
              gap={4}
              direction="horizontal"
              style={{ height: "75vh" }}
              className="d-flex flex-wrap p-4 ms-2 overflow-scroll"
            >
              {notes.map((note) => (
                <motion.div
                  key={note._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <SingleNoteCard
                    noteData={note}
                    handleOnCardClick={handleOnCardClick}
                    selectedIds={selectedIds}
                    dbUserId={dbUserId}
                    setNotes={setNotes}
                  />
                </motion.div>
              ))}
            </Stack>
          )}
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
