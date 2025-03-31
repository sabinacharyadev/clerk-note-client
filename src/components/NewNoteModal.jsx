import { Button, Modal } from "react-bootstrap";
import NewNoteForm from "./NewNoteForm";

const NewNoteModal = ({
  showNewNoteModal,
  handleNewNoteModalClose,
  handleOnSubmit,
  note,
  handleOnChange,
}) => {
  return (
    <Modal show={showNewNoteModal} onHide={handleNewNoteModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>New Note</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <NewNoteForm
          handleOnSubmit={handleOnSubmit}
          note={note}
          handleOnChange={handleOnChange}
          handleNewNoteModalClose={handleNewNoteModalClose}
        />
      </Modal.Body>
    </Modal>
  );
};

export default NewNoteModal;
