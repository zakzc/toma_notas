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
  let indentationStyle = noteCtx.currentViewMode;
  const getIndentationStyle = (indentationLevel: number) => {
    let indent;
    switch (indentationStyle) {
      // simple note rendering, no levels
      case 0:
        indent = <></>;
        break;
      // numbered
      case 1:
        indent = parseInt(indentationLevel, 10);
        break;
      default:
        indent = <></>;
        break;
    }
    return indent;
  };
  ///
  const IndentedNote = (eachNote) => {
    let indentationLevel = parseInt(eachNote.eachNote.textLevel, 10);
    const indentationSymbol = getIndentationStyle(indentationLevel);
    let indentation =
      indentationStyle === 0 ? "" : `\xa0\xa0\xa0\xa0`.repeat(indentationLevel);
    return (
      <p>
        {indentation}
        {indentationSymbol}
        {indentationStyle === 0 ? <></> : "."} {eachNote.eachNote.noteText}
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
