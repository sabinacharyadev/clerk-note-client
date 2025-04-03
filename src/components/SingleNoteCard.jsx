import { Button, Card, Stack, Form } from "react-bootstrap";
import { compareDesc, format, parseISO } from "date-fns";
import { TiTick } from "react-icons/ti";
import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { getNotes, updateNote } from "../axios/noteAxios";
import generateTextAreaFocusColor from "../utilities/TextAreaFocusColorMatcher";

const SingleNoteCard = ({
  noteData,
  handleOnCardClick,
  selectedIds,
  dbUserId,
  setNotes,
}) => {
  const { getToken } = useAuth();

  const { updatedAt = "", backgroundColor } = noteData;

  const [isEditMode, setIsEditMode] = useState(true);

  const [formData, setFormData] = useState(noteData);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

  const handleEventBubbling = (e) => {
    e.stopPropagation();
  };

  const handleOnTextAreaClick = (e) => {
    e.stopPropagation();
    setIsEditMode(true);
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
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control
              className={`${backgroundColor} border-0`}
              as="textarea"
              placeholder="Note"
              name="note"
              value={formData.note}
              rows={6}
              onChange={handleOnChange}
              onClick={handleOnTextAreaClick}
              onFocus={(e) =>
                (e.target.style.boxShadow =
                  generateTextAreaFocusColor(backgroundColor))
              }
              autoFocus
            />
          </Form.Group>
        </Card.Body>
        <Card.Footer
          style={{
            borderBottomLeftRadius: "2rem",
            borderBottomRightRadius: "2rem",
          }}
        >
          <Stack
            direction="horizontal"
            className="d-flex justify-content-between align-items-center"
            style={{ height: "3rem" }}
          >
            <Card.Text className="my-auto">
              {format(new Date(updatedAt), "MMM dd, yyyy")}
            </Card.Text>
            <Stack direction="horizontal">
              {isEditMode && (
                <Button
                  type="submit"
                  onClick={handleEventBubbling}
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
