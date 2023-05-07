import React, { useContext } from "react";
///
import { Row } from "react-bootstrap";
///
import { NoteAppContext } from "../../store/notes_context";
///
import TextArea from "./TextArea";

export default function EditMode(): JSX.Element {
  const { noteToEdit } = useContext(NoteAppContext);
  console.log("got ", noteToEdit);
  ///
  const EditNote = () => (
    <>
      {(noteToEdit && noteToEdit.noteText) ? noteToEdit.noteText: "No note to edit"}
      <TextArea />
    </>
  );
  ///
  return (
    <>
      <Row>
        <br />
        <br />
      </Row>
      <br />
      <Row>
        {noteToEdit && noteToEdit.noteText ? (
          <EditNote />
        ) : (
          "No note selected to edit"
        )}
      </Row>
    </>
  );
}
