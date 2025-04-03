import { useAuth, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { Button, Row, Col, Stack, Spinner } from "react-bootstrap";
import SingleNoteCard from "./SingleNoteCard";
import UserNavBar from "./UserNavBar";
import { IoAddCircleSharp } from "react-icons/io5";
import { saveUser } from "../axios/userAxios";
import { createNote, deleteNotes, getNotes } from "../axios/noteAxios";
import { compareDesc, parseISO } from "date-fns";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import SingleNoteCardPlaceholder from "./SingleNoteCardPlaceholder";

const Dashboard = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const dbUserId = localStorage.getItem("userSession");

  const [selectedIds, setSelectedIds] = useState([]);

  const [notes, setNotes] = useState([]);

  const [isPlaceholderActive, setIsPlaceholderActive] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  // Handle Add new note button
  const handleOnSubmit = async () => {
    setIsPlaceholderActive(true);
    const data = await createNote(getToken, dbUserId, "");
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
    setIsLoading(true);
    const response = await deleteNotes(getToken, selectedIds);
    console.log(response);
    setSelectedIds([]);
    getSavedNotes();
    setIsLoading(false);
  };

  // Fetches new note data
  const getSavedNotes = async () => {
    const dbUserId = localStorage.getItem("userSession");
    const { data } = await getNotes(getToken, dbUserId);

    const sortedArrayByDate = data.sort((a, b) =>
      compareDesc(parseISO(a.updatedAt), parseISO(b.updatedAt))
    );
    setNotes(sortedArrayByDate);

    setIsPlaceholderActive(false);
  };

  // Save user id on successful login
  const saveUserID = async () => {
    const { data } = await saveUser(getToken, user);
    localStorage.setItem("userSession", data._id);
    getSavedNotes();
  };

  useEffect(() => {
    saveUserID();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Row className="vh-100" style={{ fontFamily: "Comfortaa" }}>
        {/* Side Panel */}
        {/* Visibility none on small screen */}
        <Col
          sm={2}
          lg={1}
          className="d-none d-sm-block border shadow text-center"
        >
          <p className="fw-bold mt-4" style={{ marginBottom: "3rem" }}>
            Notify
          </p>

          {/* Add button on large screen */}
          <Button
            className="d-none d-sm-block mx-auto"
            variant="bg-transparent"
            onClick={handleOnSubmit}
          >
            <IoAddCircleSharp size="2.5em" />
          </Button>
        </Col>

        {/* User HomePage */}
        <Col className="px-0">
          <UserNavBar />
          {/* Heading Stack */}
          <Stack
            direction="horizontal"
            className="d-flex justify-content-between mx-4"
          >
            <h2 className="p-4 my-4">Notes</h2>
            {/* Delete Button */}
            {!!selectedIds.length && (
              <button
                type="button"
                onClick={handleOnDeleteClick}
                class="btn btn-outline-dark"
              >
                Delete Selected{" "}
                {isLoading && (
                  <Spinner animation="border" variant="danger" size="sm" />
                )}
                {!isLoading && (
                  <span class="badge text-bg-danger">{selectedIds.length}</span>
                )}
              </button>
            )}
          </Stack>

          {/* Empty list message */}
          {!notes.length && !isPlaceholderActive && (
            <p className="p-5">Add some quick notes to get started. . .</p>
          )}

          {/* Display list of notes */}
          {notes && (
            <Stack
              gap={4}
              direction="horizontal"
              style={{ height: "75vh" }}
              className="d-flex flex-wrap p-4 ms-2 overflow-scroll"
            >
              {isPlaceholderActive && <SingleNoteCardPlaceholder />}
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
          {/* Add button on small screen */}

          <Button
            className="position-absolute bottom-0 end-0 d-block d-sm-none "
            variant="bg-transparent"
            onClick={handleOnSubmit}
          >
            <IoAddCircleSharp size="3.5em" />
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
