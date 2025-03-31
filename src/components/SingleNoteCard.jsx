import { Button, Card } from "react-bootstrap";
import { format } from "date-fns";

const SingleNoteCard = ({ noteData }) => {
  const { note, updatedAt = "", backgroundColor } = noteData;
  console.log(noteData);

  return (
    <Card
      className={backgroundColor}
      style={{ width: "18rem", height: "18rem", borderRadius: "2rem" }}
    >
      <Card.Body className="p-4">
        <Card.Text>{note}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <Card.Text>{format(new Date(updatedAt), "MM/dd/yyyy")}</Card.Text>
      </Card.Footer>
    </Card>
  );
};

export default SingleNoteCard;
