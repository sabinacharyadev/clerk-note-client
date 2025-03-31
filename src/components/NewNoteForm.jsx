import { Button, Form, Stack } from "react-bootstrap";

const NewNoteForm = ({
  handleOnSubmit,
  note,
  handleOnChange,
  handleNewNoteModalClose,
}) => {
  return (
    <Form onSubmit={handleOnSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Note</Form.Label>
        <Form.Control
          type="text"
          name="note"
          value={note}
          onChange={handleOnChange}
          placeholder="Enter note"
        />
      </Form.Group>

      <Stack gap={2} direction="horizontal" className="float-end">
        <Button variant="secondary" onClick={handleNewNoteModalClose}>
          Close
        </Button>

        <Button
          variant="primary"
          type="submit"
          onClick={handleNewNoteModalClose}
        >
          Submit
        </Button>
      </Stack>
    </Form>
  );
};

export default NewNoteForm;
