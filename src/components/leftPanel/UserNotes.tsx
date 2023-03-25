import React, { useContext, useState } from "react";
//
import { NoteAppContext } from "../../store/notes_context";
///
import { Button, Col, Form, Row } from "react-bootstrap";
import Plus from "../svg/Plus";

export default function UserNotes(): JSX.Element {
  const noteCtx = useContext(NoteAppContext);
  const [addNote, setAddNote] = useState<string>("");
  const [newNoteName, setNewNoteName] = useState<string>("");
  ///

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.length <= 50) {
      setAddNote(value);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNewNoteName(addNote);
    noteCtx.addUserNote(addNote);
    console.log("submitted: ", newNoteName);
    setAddNote("");
    // TODO Send note to context
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col>
          <Form.Group controlId="note">
            {/* <Form.Label>New note:</Form.Label> */}
            <Form.Control
              type="text"
              value={addNote}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Button variant="flat" size="lg" type="submit">
            <Plus />
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
