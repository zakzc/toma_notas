import React, {useContext} from "react";
// import { useTranslation } from "react-i18next";
///
import { Row, Col } from "react-bootstrap";
///
import NotesContext from "../store/notes_context";

export default function Visualise(): JSX.Element {
  // const { t } = useTranslation();
  const noteCtx = useContext(NotesContext);
  console.log(noteCtx)
  return (
    <>
      <Row></Row>
      <Row>
        <Col></Col>
        <Col>
          <p> No notes to view currently </p>
        </Col>
        <Col></Col>
      </Row>
    </>
  );
}
