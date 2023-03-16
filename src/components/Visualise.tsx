import React, { useContext } from "react";
// import { useTranslation } from "react-i18next";
///
import { Row, Col } from "react-bootstrap";
///
import NotesContext from "../store/notes_context";

export default function Visualise(): JSX.Element {
  // const { t } = useTranslation();
  const noteCtx = useContext(NotesContext);

  const ViewNotes = (): JSX.Element => {
    return (
      <>
        {noteCtx.nodeSet.map((i, k) => (
          <p key={k}>{i.noteSetName}</p>
        ))}
      </>
    );
  };
  return (
    <>
      <Row></Row>
      <Row>
        <Col>
          <p> Note Visualization </p>
          <ViewNotes />
        </Col>
        <Col></Col>
      </Row>
    </>
  );
}
