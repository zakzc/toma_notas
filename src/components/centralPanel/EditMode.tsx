import React, { useContext } from "react";
///
import { Row } from "react-bootstrap";
///
import { NoteAppContext } from "../../store/notes_context";
///
import TextArea from "./TextArea";

export default function EditMode(): JSX.Element {
  const { noteToEdit } = useContext(NoteAppContext);
  ///
  const EditNote = () => (
    <>
      <div
        style={{
          border: "2px solid",
          backgroundColor: "#d3d3d3", // light gray
        }}
      >
        {noteToEdit && noteToEdit.noteText && noteToEdit.noteText !== ""
          ? noteToEdit.noteText
          : "No note to edit"}
      </div>
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
        {noteToEdit && noteToEdit.noteText && noteToEdit.noteText !== "" ? (
          <EditNote />
        ) : (
          "No note selected to edit"
        )}
      </Row>
    </>
  );
}
