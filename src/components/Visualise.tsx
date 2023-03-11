import React from "react";
import { useTranslation } from "react-i18next";
import { Row, Col } from "react-bootstrap";

export default function Visualise(): JSX.Element {
  // const { t } = useTranslation();

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
