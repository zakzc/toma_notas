import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
///
import { NoteAppContext } from "../../store/notes_context";
import { Button, Col, Form, Row } from "react-bootstrap";
import Plus from "../svg/Plus";

export default function UserNotes(): JSX.Element {
  const noteCtx = useContext(NoteAppContext);
  const [addNote, setAddNote] = useState<string>("");
  const [newNoteName, setNewNoteName] = useState<string>("");
  const router = useRouter();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.length <= 50) {
      setAddNote(value);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (noteCtx.userIsLoggedIn === true) {
      setNewNoteName(addNote);
      noteCtx.addUserNote(addNote);
      setAddNote("");
      // TODO Send note to context
    } else {
      router.push("/logInSignUp");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col>
          <Form.Group controlId="note">
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
