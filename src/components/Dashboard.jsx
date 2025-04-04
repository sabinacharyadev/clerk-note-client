import { useAuth, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { Button, Row, Col, Stack, Spinner } from "react-bootstrap";
import SingleNoteCard from "./SingleNoteCard";
import UserNavBar from "./UserNavBar";
import { IoAddCircleSharp } from "react-icons/io5";
import { saveUser } from "../axios/userAxios";
import { createNote, deleteNotes, getNotes } from "../axios/noteAxios";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import SingleNoteCardPlaceholder from "./SingleNoteCardPlaceholder";
import sortNoteByDateDesc from "../utilities/sortNoteByDateDesc";

const Dashboard = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const dbUserId = localStorage.getItem("userSession");

  const [selectedIds, setSelectedIds] = useState([]);

  const [notes, setNotes] = useState([]);

  const [isPlaceholderActive, setIsPlaceholderActive] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [searchedString, setSearchedString] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  // Handle Add new note button
  const handleOnSubmit = async () => {
    setSearchedString("");
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
    setSearchedString("");
  };

  // Handles Search functionality
  const handleOnSearchTextChange = (e) => {
    const { value } = e.target;
    setSearchedString(value);
    populateSearchResults(value);
  };

  const populateSearchResults = (query) => {
    // fetch data from existing note
    if (query) {
      const queriedData = notes.filter((item) =>
        item.note.toLowerCase().includes(query.toLowerCase())
      );
      const sortedArrayByDate = sortNoteByDateDesc(queriedData);
      setSearchResult(sortedArrayByDate);
      return;
    }
    setSearchResult([]);
    getSavedNotes();
  };

  // Fetches new note data from api
  const getSavedNotes = async () => {
    const dbUserId = localStorage.getItem("userSession");
    const { data } = await getNotes(getToken, dbUserId);
    const sortedArrayByDate = sortNoteByDateDesc(data);
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
      <Row
        style={{
          fontFamily: "Comfortaa",
          height: "100dvh",
          width: "100dvw",
        }}
      >
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
          <UserNavBar
            handleOnSearchTextChange={handleOnSearchTextChange}
            searchedString={searchedString}
          />
          {/* Heading Stack */}
          <Stack
            direction="horizontal"
            className="d-flex justify-content-between mx-4"
          >
            <h2 className="p-4 py-0 mt-4">Notes</h2>
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
                  <span className="badge text-bg-danger">
                    {selectedIds.length}
                  </span>
                )}
              </button>
            )}
          </Stack>

          {/* Empty list message */}
          {!notes.length && !isPlaceholderActive && !searchedString && (
            <p className="p-5">Add some quick notes to get started. . .</p>
          )}

          {/* Search result empty message */}
          {!searchResult.length && searchedString && (
            <p className="p-5">Nothing found here. Add more quick notes. . .</p>
          )}

          {/* Display list of notes*/}
          {notes && (
            <Stack
              gap={4}
              direction="horizontal"
              style={{ height: "80vh" }}
              className="d-flex flex-wrap p-4 ms-2 overflow-scroll"
            >
              {isPlaceholderActive && <SingleNoteCardPlaceholder />}
              {(searchedString ? searchResult : notes).map((note) => (
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
        {/* Add button on small screen */}

        <Button
          className="position-fixed bottom-0 end-0 w-auto d-sm-none mb-4 me-2 text-end"
          variant="transparent"
          onClick={handleOnSubmit}
        >
          <IoAddCircleSharp size="3.5em" />
        </Button>
      </Row>
    </>
  );
};

export default Dashboard;
