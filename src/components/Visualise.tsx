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
  const IndentedNote = (eachNote) => {
    let indentationLevel = parseInt(eachNote.eachNote.textLevel, 10);
    const indentationSymbol = indentationLevel
    let indentation = `\xa0\xa0\xa0\xa0`.repeat(indentationLevel);
    return (
      <p>
        {indentation}
        {indentationSymbol}. {eachNote.eachNote.noteText}
      </p>
    );
  };
  ///
  const NoteViewer = (): JSX.Element => {
    return (
      <>
        {currentSet.map((i, k) => (
          <IndentedNote eachNote={i} key={k} />
        ))}
      </>
    );
  };
  ///
  return (
    <>
      <Row></Row>
      <Row>
        <Col>
          <br />
          <h4> Current note set: {currentNode.noteSetName}</h4>
          <br />
          <NoteViewer />
        </Col>
        <Col></Col>
      </Row>
    </>
  );
}
