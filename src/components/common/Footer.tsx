import React, { useContext } from "react";
///
import { NoteAppContext } from "../../store/notes_context";
///
import { Row, Col } from "react-bootstrap";

const Footer = (): JSX.Element => {
  const { errorMessage } = useContext(NoteAppContext);

  return (
    <>
      <Row></Row>
      <Row>
        <Col></Col>
        <Col></Col>
        <Col>{errorMessage === "" ? <></> : errorMessage }</Col>
      </Row>
    </>
  );
};

export default Footer;
