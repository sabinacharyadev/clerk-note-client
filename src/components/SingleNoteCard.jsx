import { Button, Card, Stack, Form } from "react-bootstrap";
import { compareDesc, format, parseISO } from "date-fns";
import { AiOutlineEdit } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { getNotes, updateNote } from "../axios/noteAxios";

const SingleNoteCard = ({
  noteData,
  handleOnCardClick,
  selectedIds,
  dbUserId,
  setNotes,
}) => {
  const { getToken } = useAuth();

  const { note, updatedAt = "", backgroundColor } = noteData;

  const [isEditMode, setIsEditMode] = useState(false);

  const [formData, setFormData] = useState(noteData);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOnEditClick = () => {
    setIsEditMode(true);
  };

  const getSavedNotes = async () => {
    const { data } = await getNotes(getToken, dbUserId);

    const sortedArrayByDate = data.sort((a, b) =>
      compareDesc(parseISO(a.updatedAt), parseISO(b.updatedAt))
    );
    setNotes(sortedArrayByDate);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const response = await updateNote(getToken, formData);
    console.log(response);
    setIsEditMode(false);
    getSavedNotes();
  };
  return (
    <Card
      className={`${backgroundColor} ${
        selectedIds.includes(noteData._id) ? "border-danger border-3" : "border"
      }`}
      role="button"
      style={{ width: "18rem", height: "18rem", borderRadius: "2rem" }}
      onClick={() => handleOnCardClick(noteData._id)}
    >
      <Form onSubmit={handleOnSubmit}>
        <Card.Body style={{ height: "14rem" }} className="p-4">
          {isEditMode && (
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                className={`${backgroundColor} border-0`}
                as="textarea"
                name="note"
                value={formData.note}
                rows={6}
                onChange={handleOnChange}
                autoFocus
              />
            </Form.Group>
          )}
          {!isEditMode && <Card.Text className="p-2">{note}</Card.Text>}
        </Card.Body>
        <Card.Footer>
          <Stack
            direction="horizontal"
            className="d-flex justify-content-between align-items-center"
          >
            <Card.Text className="my-auto">
              {format(new Date(updatedAt), "MMM dd, yyyy")}
            </Card.Text>
            <Stack direction="horizontal">
              {!isEditMode && (
                <Button
                  onClick={handleOnEditClick}
                  variant={
                    backgroundColor === "bg-white text-black"
                      ? "outline-dark"
                      : "outline-light"
                  }
                >
                  <AiOutlineEdit size="1.5em" />
                </Button>
              )}
              {isEditMode && (
                <Button
                  type="submit"
                  variant={
                    backgroundColor === "bg-white text-black"
                      ? "outline-dark"
                      : "outline-light"
                  }
                >
                  <TiTick size="1.5em" />
                </Button>
              )}
            </Stack>
          </Stack>
        </Card.Footer>
      </Form>
    </Card>
  );
};

export default SingleNoteCard;
