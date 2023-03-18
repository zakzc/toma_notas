import React, { useContext } from "react";
// import { useTranslation } from "react-i18next";
///
import { Row, Col } from "react-bootstrap";
///
import { NoteAppContext } from "../store/notes_context";

export default function Visualise(): JSX.Element {
  // const { t } = useTranslation();
  const noteCtx = useContext(NoteAppContext);
  const currentNode = noteCtx.currentlySelectedNoteSet;
  const currentSet = currentNode.noteSetNote;
///
  const ViewNotes = (): JSX.Element => {
    return (
      <>
        {currentSet.map((i, k) => (
          <p key={k}>{i.noteText}</p>
        ))}
      </>
    );
  };
  return (
    <>
      <Row></Row>
      <Row>
        <Col>
          <h4> Current note set: {currentNode.noteSetName}</h4>
          <ViewNotes />
        </Col>
        <Col></Col>
      </Row>
    </>
  );
}
