import { Card, Placeholder } from "react-bootstrap";

const SingleNoteCardPlaceholder = () => {
  return (
    <Card style={{ width: "18rem", height: "18rem", borderRadius: "2rem" }}>
      <Card.Body style={{ height: "14rem" }}>
        <Placeholder as={Card.Body} animation="glow">
          <Placeholder xs={12} />
        </Placeholder>
        <Placeholder as={Card.Body} animation="glow">
          <Placeholder xs={12} />
        </Placeholder>

        <Placeholder as={Card.Body} animation="glow">
          <Placeholder xs={12} />
        </Placeholder>
      </Card.Body>

      <Card.Footer
        style={{
          borderBottomLeftRadius: "2rem",
          borderBottomRightRadius: "2rem",
        }}
      >
        <Placeholder as={Card.Body} animation="glow">
          <Placeholder xs={6} />
        </Placeholder>
      </Card.Footer>
    </Card>
  );
};

export default SingleNoteCardPlaceholder;
