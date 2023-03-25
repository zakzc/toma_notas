import React, { useContext } from "react";
// import { useTranslation } from "react-i18next";
///
import { Row, Col } from "react-bootstrap";
///
import { NoteAppContext } from "../../store/notes_context";
import {NoteSetInterface} from "../../data/interfaces"
///
import ViewNotes from "../common/ViewNotes";

export default function Visualise(): JSX.Element {
  // const { t } = useTranslation();
  const noteCtx = useContext(NoteAppContext);
  const currentNode: NoteSetInterface =
    noteCtx.currentlySelectedNoteSet as NoteSetInterface;
  ///
  return (
    <>
      <Row></Row>
      <Row>
        <Col>
          <br />
          <h4> Current note set: {currentNode.noteSetName}</h4>
          <br />
          <ViewNotes />
        </Col>
        <Col></Col>
      </Row>
    </>
  );
}
