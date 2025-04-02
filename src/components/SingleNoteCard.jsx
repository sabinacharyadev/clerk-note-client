import { Button, Card, Stack, Form } from "react-bootstrap";
import { format } from "date-fns";
import { AiOutlineEdit } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
import { useState } from "react";

const SingleNoteCard = ({ noteData }) => {
  const { note, updatedAt = "", backgroundColor } = noteData;
  const [isEditMode, setIsEditMode] = useState(false);
  const [form, setForm] = useState({ ...noteData });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...note, [name]: value });
  };

  const handleOnEditClick = () => {
    setIsEditMode(true);
  };
  const handleOnUpdateClick = () => {
    setIsEditMode(false);
  };
  return (
    <Card
      className={backgroundColor}
      style={{ width: "18rem", height: "18rem", borderRadius: "2rem" }}
    >
      <Card.Body className="p-4">
        {isEditMode && (
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                className={`${backgroundColor} border-0`}
                as="textarea"
                name="note"
                value={form.note}
                rows={6}
                onChange={handleOnChange}
                autoFocus
              />
            </Form.Group>
          </Form>
        )}
        {!isEditMode && <Card.Text>{note}</Card.Text>}
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
                onClick={handleOnUpdateClick}
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
    </Card>
  );
};

export default SingleNoteCard;
