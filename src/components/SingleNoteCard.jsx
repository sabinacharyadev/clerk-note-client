import { Card, Stack } from "react-bootstrap";
import { format } from "date-fns";
import { AiOutlineEdit } from "react-icons/ai";
import { TiTick } from "react-icons/ti";

const SingleNoteCard = ({ noteData }) => {
  const { note, updatedAt = "", backgroundColor } = noteData;
  return (
    <Card
      className={backgroundColor}
      style={{ width: "18rem", height: "18rem", borderRadius: "2rem" }}
    >
      <Card.Body className="p-4">
        <Card.Text>{note}</Card.Text>
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
            <AiOutlineEdit size="1.5em" />
            <TiTick size="2em" />
          </Stack>
        </Stack>
      </Card.Footer>
    </Card>
  );
};

export default SingleNoteCard;
